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
import { theme, typography } from "../stylesheets/constants";

const defaultNetworkVal = {
  status: null,
  message: "",
};
const CreateWallet = ({ navigation }) => {
  const [showRecoverInput, setShowRecoverInput] = useState(false);

  const [networkResponse, setNetworkResponse] = useState(defaultNetworkVal);

  const { account, setAccount, seedPhrase, setSeedPhrase } =
    useContext(AccountContext);

  useEffect(() => {
    if (account?.address) {
      setNetworkResponse({
        status: "complete",
        message: "Wallet created!",
      });
      setShowRecoverInput(false);
      navigation.navigate("wallet");
    }
  }, [account]);

  useEffect(() => {
    setNetworkResponse(defaultNetworkVal);
  }, [seedPhrase]);

  const recoverAccount = async () => {
    await setNetworkResponse({
      status: "pending",
      message: "",
    });
    try {
      const result = await generateAccount(seedPhrase);
      setAccount(result.account);
    } catch (error) {
      console.log("failed to import wallet: ", error);
      setNetworkResponse({ status: "error", message: "Invalid Seed Phrase" });
    }
    // setShowRecoverInput(false);
  };

  const createAccount = async () => {
    await setNetworkResponse({
      status: "pending",
      message: "",
    });
    try {
      const result = await generateAccount();
      setAccount(result.account);
      setSeedPhrase(result.seedPhrase);
    } catch (error) {
      console.log("failed to create wallet: ", error);
      setNetworkResponse({
        status: "error",
        message: "Failed to create wallet",
      });
    }
  };

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
              onPress={() => {
                Keyboard.dismiss();
                recoverAccount();
              }}
            />
            <Button
              style={globalStyles.secondaryButton}
              title="Back"
              onPress={() => {
                setShowRecoverInput(false);
              }}
            />
            {networkResponse.status === "error" && (
              <View
                style={globalStyles.flexRow({
                  width: "100%",
                  justify: "center",
                })}
              >
                <Text style={{ color: theme.colorPalette.danger[600] }}>
                  {networkResponse.message}
                </Text>
              </View>
            )}
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
            {networkResponse.status === "error" && (
              <View>
                <Text style={{ color: theme.colorPalette.danger[600] }}>
                  {networkResponse.message}
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateWallet;
