import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Button from "../components/ui/Button";
import { makeTransactionStyles } from "../stylesheets/makeTransaction";
import { sendToken } from "../utils/transactionUtils";
import { globalStyles } from "../stylesheets/global";
import { theme, typography } from "../stylesheets/constants";
import { ethers } from "ethers";
import { CHAINS_CONFIG, goerli } from "../models/Chain";
import { AccountContext } from "../context/account";
import { geckoGetPrice } from "../api/geckoAPI";
import ETH from "../assets/eth.svg";

const estimateGas = async (addr, amt) => {
  const chain = CHAINS_CONFIG[goerli.chainId];
  const provider = new ethers.providers.JsonRpcProvider(chain.rpcUrl);
  if (!addr || !amt) return;

  // Create a transaction object
  const tx = {
    to: addr,
    value: ethers.utils.parseEther(amt),
  };

  // Estimate the gas limit
  return provider
    .estimateGas(tx)
    .then((estimatedGasLimit) => {
      // Gas Price (in wei)
      return provider.getGasPrice().then(async (gasPrice) => {
        const gasFee = estimatedGasLimit.mul(gasPrice);
        const gasFeeinETH = ethers.utils.formatEther(gasFee);
        const rate = await geckoGetPrice("ethereum");
        return (gasFeeinETH * rate.ethereum.inr).toFixed(2);
      });
    })
    .catch((error) => {
      console.error("Error estimating gas:", error);
    });
};

const MakeTransactionScreen = ({ navigation }) => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [gas, setGas] = useState(0);
  const [networkResponse, setNetworkResponse] = useState({
    status: null,
    message: "",
  });

  const { account } = useContext(AccountContext);

  useEffect(() => {
    if (networkResponse.status === "complete") {
      navigation.goBack();
    }
  }, [networkResponse]);

  useEffect(() => {
    if (destinationAddress && amount) {
      estimateGas(destinationAddress, amount)
        .then((g) => {
          setGas(g);
        })
        .catch((err) => {
          console.log("gas_estimate_err: ", err);
        });
    }
  }, [destinationAddress, amount]);

  const handleDestinationAddressChange = (val) => {
    setDestinationAddress(val);
  };

  const handleAmountChange = (val) => {
    setAmount(val);
  };

  const transfer = async () => {
    // Set the network response status to "pending"
    setNetworkResponse({
      status: "pending",
      message: "",
    });

    try {
      if (account?.address) {
        const { receipt } = await sendToken(
          amount,
          account.address,
          destinationAddress,
          account.privateKey
        );

        if (receipt.status === 1) {
          // Set the network response status to "complete" and the message to the transaction hash
          setNetworkResponse({
            status: "complete",
            message: "Transfer complete!",
          });
          return receipt;
        } else {
          // Transaction failed
          console.log(`Failed to send ${receipt}`);
          setNetworkResponse({
            status: "error",
            message: JSON.stringify(receipt),
          });
          return { receipt };
        }
      }
    } catch (error) {
      // An error occurred while sending the transaction
      console.error("transaction error : ", JSON.stringify(error));
      // Set the network response status to "error" and the message to the error
      setNetworkResponse({
        status: "error",
        message:
          error.code === "INVALID_ARGUMENT"
            ? error.argument === "tx.to"
              ? "Please enter Destination Address"
              : "Please enter Amount"
            : error.reason || JSON.stringify(error),
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={makeTransactionStyles.container}>
        <Text
          style={{
            ...globalStyles.primaryText,
            ...typography.h5,
            ...typography.weight.bold,
          }}
        >
          Destination Address
        </Text>
        <TextInput
          style={makeTransactionStyles.input}
          value={destinationAddress}
          placeholder="Enter Desination Address..."
          placeholderTextColor="#fff"
          onChangeText={handleDestinationAddressChange}
        />
        <Text
          style={{
            ...globalStyles.primaryText,
            ...typography.h5,
            ...typography.weight.bold,
          }}
        >
          Amount:
        </Text>
        <TextInput
          style={makeTransactionStyles.input}
          keyboardType="number-pad"
          value={`${amount}`}
          placeholder="Enter Amount..."
          placeholderTextColor="#fff"
          onChangeText={(val) => val !== NaN && handleAmountChange(val)}
        />
        <View
          style={globalStyles.flexCol({ width: "100%", justify: "flex-start" })}
        >
          <Text style={{ ...globalStyles.secondaryText, ...typography.text2 }}>
            Estimated fee
          </Text>
          <Text style={{ ...globalStyles.primaryText }}>
            {`\u20B9`} {gas}
          </Text>
        </View>
        {networkResponse.status === "error" && (
          <View>
            <Text style={{ color: theme.colorPalette.danger[600] }}>
              {networkResponse.message}
            </Text>
          </View>
        )}
        <View style={makeTransactionStyles.buttonContainer}>
          <Button
            style={{
              button: { ...globalStyles.secondaryButton.button, width: "50%" },
              text: { ...globalStyles.secondaryButton.text },
            }}
            title="Cancel"
            onPress={() => {
              navigation.navigate("wallet");
            }}
          />
          <Button
            style={{
              button: { ...globalStyles.primaryButton.button, width: "50%" },
              text: { ...globalStyles.primaryButton.text },
            }}
            title={
              networkResponse.status === "pending" ? (
                <ActivityIndicator />
              ) : (
                "Confirm"
              )
            }
            onPress={transfer}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    //   <AccountTrasactions account={account} />
  );
};

export default MakeTransactionScreen;
