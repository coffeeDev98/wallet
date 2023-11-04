import React, { useContext, useEffect, useState } from "react";
import {
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
import { typography } from "../stylesheets/constants";
import { GlobalContext } from "../context/global";

const MakeTransactionScreen = () => {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [networkResponse, setNetworkResponse] = useState({
    status: null,
    message: "",
  });

  const { screen, setScreen } = useContext(GlobalContext);

  useEffect(() => {
    console.log("NETWORK_RESPONSE: ", networkResponse);
  }, [networkResponse]);

  const handleDestinationAddressChange = (val) => {
    setDestinationAddress(val);
  };

  const handleAmountChange = (val) => {
    const regex = /^(0|[1-9]\d*)\.?\d{0,5}$/;
    if (!regex.test(val)) return;

    setAmount(val);
  };

  const transfer = async () => {
    // Set the network response status to "pending"
    setNetworkResponse({
      status: "pending",
      message: "",
    });

    try {
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
        // Set the network response status to "error" and the message to the receipt
        setNetworkResponse({
          status: "error",
          message: JSON.stringify(receipt),
        });
        return { receipt };
      }
    } catch (error) {
      // An error occurred while sending the transaction
      console.error({ error });
      // Set the network response status to "error" and the message to the error
      setNetworkResponse({
        status: "error",
        message: error.reason || JSON.stringify(error),
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
          onChangeText={(val) => val !== NaN && handleAmountChange(val)}
        />
        <View style={makeTransactionStyles.buttonContainer}>
          <Button
            style={{
              button: { ...globalStyles.secondaryButton.button, width: "50%" },
              text: { ...globalStyles.secondaryButton.text },
            }}
            title="Cancel"
            onPress={() => {
              setScreen("wallet");
            }}
          />
          <Button
            style={{
              button: { ...globalStyles.primaryButton.button, width: "50%" },
              text: { ...globalStyles.primaryButton.text },
            }}
            title="Transfer"
            onPress={transfer}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
    //   <AccountTrasactions account={account} />
  );
};

export default MakeTransactionScreen;
