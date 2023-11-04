import React, { useContext, useEffect, useState } from "react";
import {
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { generateAccount } from "../utils/accountUtils";
import { AccountContext } from "../context/account";
import { createWalletStyles } from "../stylesheets/createWallet";
import Button from "../components/ui/Button";
import { globalStyles } from "../stylesheets/global";
import { ActivityIndicator } from "react-native";
import { typography } from "../stylesheets/constants";

const CreateWallet = ({ navigation }) => {
  const [showRecoverInput, setShowRecoverInput] = useState(false);
  const [loader, setLoader] = useState({ show: false });

  const [networkResponse, setNetworkResponse] = useState({
    status: null,
    message: "",
  });

  useEffect(() => {
    console.log("NETWORK_RESPONSE: ", networkResponse);
  }, [networkResponse]);
  const { account, setAccount, seedPhrase, setSeedPhrase } =
    useContext(AccountContext);

  const recoverAccount = async () => {
    setLoader({ show: true });
    setNetworkResponse({
      status: "pending",
      message: "",
    });
    const result = await generateAccount(seedPhrase);
    setAccount(result.account);
    // setShowRecoverInput(false);
  };

  const createAccount = async () => {
    setLoader({ show: true });
    setNetworkResponse({
      status: "pending",
      message: "",
    });
    const result = await generateAccount();
    setAccount(result.account);
    setSeedPhrase(result.seedPhrase);
  };

  useEffect(() => {
    if (account?.address) {
      setLoader({ show: false });
      setNetworkResponse({
        status: "complete",
        message: "Transfer complete!",
      });
      setShowRecoverInput(false);
      navigation.navigate("wallet");
    }
  }, [account]);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={createWalletStyles.container}>
        <View style={{ width: "75%" }}>
          <Text
            style={{
              ...typography.weight.bold,
              ...globalStyles.primaryText,
              fontSize: 72,
            }}
          >
            Wallet Setup
          </Text>
        </View>
        <View style={{ width: "75%", marginBottom: 72 }}>
          <Text
            style={{
              ...typography.h5,
              ...typography.weight.medium,
              ...globalStyles.secondaryText,
              maxWidth: "55%",
            }}
          >
            Import an existing wallet or create a new one
          </Text>
        </View>

        {showRecoverInput ? (
          <View style={createWalletStyles.recoveryInputContainer}>
            <TextInput
              style={createWalletStyles.recoveryTextInput}
              value={seedPhrase}
              placeholder="Enter Seed Phrase"
              placeholderTextColor="#fff"
              onChangeText={(e) => {
                setSeedPhrase(e);
              }}
            />
            <Button
              style={globalStyles.primaryButton}
              title={
                networkResponse.status === "pending" ? (
                  <ActivityIndicator />
                ) : (
                  "Submit"
                )
              }
              onPress={recoverAccount}
            />
            <Button
              style={globalStyles.secondaryButton}
              title="Back"
              onPress={() => {
                setShowRecoverInput(false);
              }}
            />
          </View>
        ) : (
          <View style={createWalletStyles.btnContainer}>
            <Button
              style={globalStyles.primaryButton}
              title="Generate Account"
              onPress={() => {
                createAccount();
              }}
            />
            <Button
              style={globalStyles.secondaryButton}
              title="Import Using Seed Phare"
              onPress={() => {
                setShowRecoverInput((prev) => !prev);
              }}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateWallet;
