import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
// import { TransactionService } from "../service/transactionService";
import { TRANSACTION_API_KEY, TRANSACTION_API_URL } from "../constants";
import { goerli } from "../models/Chain";
import axios from "axios";
import { ethers } from "ethers";
import { globalStyles } from "../stylesheets/global";
import { typography } from "../stylesheets/constants";
import WalletItem from "../components/ui/WalletItem";
import { AccountContext } from "../context/account";
import { accountTransactionsStyles } from "../stylesheets/accountTransactions";
import { MaterialIcons } from "@expo/vector-icons";

const getTransactionsApi = async (address) => {
  const options = {
    method: "GET",
    url: `${TRANSACTION_API_URL}/${address}`,
    params: { chain: goerli.name.toLowerCase() },
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-API-Key": TRANSACTION_API_KEY,
    },
  };

  //   const response = await fetch(`${TRANSACTION_API_URL}/${address}`, options);
  const response = await axios(options);
  return response.data;
};

const AccountTrasactions = ({ navigation }) => {
  const [transactions, setTransactions] = useState([]);

  const [networkResponse, setNetworkResponse] = useState({
    status: null,
    message: "",
  });
  const { account } = useContext(AccountContext);

  const getTransactions = useCallback(() => {
    setNetworkResponse({
      status: "pending",
      message: "",
    });
    account?.address &&
      getTransactionsApi(account.address)
        .then((response) => {
          setTransactions([
            ...response?.result.map((res) => {
              const gasInGwei = ethers.utils.formatUnits(res.gas, "gwei");
              return {
                status:
                  account?.address.toLowerCase() ===
                  res.from_address.toLowerCase()
                    ? "Sent"
                    : "Received",
                amount: ethers.utils.formatEther(res.value),
                from: res.from_address,
                to: res.to_address,
                gas: gasInGwei,
                timestamp: new Date(res.block_timestamp).toLocaleString(),
              };
            }),
          ]);
        })
        .catch((error) => {
          console.log("get_transactions_error: ", error);
          setNetworkResponse({
            status: "error",
            message: JSON.stringify(error),
          });
        })
        .finally(() => {
          setNetworkResponse({
            status: "complete",
            message: "",
          });
        });
  }, [account?.address]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);
  return (
    <View style={accountTransactionsStyles.container}>
      <View
        style={globalStyles.flexRow({
          width: "100%",
          justify: "flex-start",
          align: "center",
          gap: 24,
          marginBottom: 10,
        })}
      >
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text
          style={{
            ...globalStyles.primaryText,
            ...typography.h3,
            ...typography.weight.bold,
          }}
        >
          Transactions
        </Text>
      </View>

      {transactions.length > 0 ? (
        <View>
          <FlatList
            data={transactions}
            renderItem={({ item }) => {
              return (
                <WalletItem
                  name={item?.status}
                  balance={item?.amount}
                  shorthand="ETH"
                />
              );
            }}
          />
        </View>
      ) : (
        <View
          style={globalStyles.flex({
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          })}
        >
          <ActivityIndicator size="large" />
        </View>
      )}
    </View>
  );
};

export default AccountTrasactions;
