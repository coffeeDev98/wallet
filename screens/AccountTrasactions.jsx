import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
// import { TransactionService } from "../service/transactionService";
import { TRANSACTION_API_KEY, TRANSACTION_API_URL } from "../constants";
import { goerli } from "../models/Chain";
import axios from "axios";
import { shortenAddress } from "../utils/accountUtils";
import { ethers } from "ethers";

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

const AccountTrasactions = ({ account }) => {
  const [transactions, setTransactions] = useState([]);

  const [networkResponse, setNetworkResponse] = useState({
    status: null,
    message: "",
  });

  const getTransactions = useCallback(() => {
    setNetworkResponse({
      status: "pending",
      message: "",
    });
    getTransactionsApi(account.address)
      .then((response) => {
        setTransactions(response?.result || []);
      })
      .catch((error) => {
        console.log({ error });
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
  }, [account.address]);

  useEffect(() => {
    getTransactions();
  }, [getTransactions]);
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Transactions</Text>

      <ScrollView style={styles.table}>
        <View style={styles.row}>
          <View>
            <Text>Hash</Text>
          </View>
          <View>
            <Text>From</Text>
          </View>
          <View>
            <Text>To</Text>
          </View>
          <View>
            <Text>Value</Text>
          </View>
          <View>
            <Text>Timestamp</Text>
          </View>
        </View>

        {/* use <FlatList> here */}
        {transactions.map((t) => (
          <View key={t.hash} style={styles.row}>
            <View>
              <Text>{shortenAddress(t.hash)}</Text>
            </View>
            <View>
              <Text>{shortenAddress(t.from_address)}</Text>
            </View>
            <View>
              <Text>{ethers.utils.formatEther(t.value)} ETH</Text>
            </View>
            <View>
              <Text>{shortenAddress(t.to_address)}</Text>
            </View>
            <View>
              <Text>{new Date(t.block_timestamp).toLocaleString()}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AccountTrasactions;

const styles = StyleSheet.create({
  container: {
    // width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // alignSelf: "stretch",
  },
  header: {
    marginBottom: 10,
  },
  table: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "stretch",
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignSelf: "stretch",
    gap: 30,
  },
});
