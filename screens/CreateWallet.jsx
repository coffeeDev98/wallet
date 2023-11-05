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
import { defaultNetworkVal } from "../constants";

const CreateWallet = ({ navigation }) => {
  const [showRecoverInput, setShowRecoverInput] = useState(false);
  const [networkResponse, setNetworkResponse] = useState(defaultNetworkVal);
  const [accountCreationMode, setAccountCreationMode] = useState("");

  const { account, setAccount, seedPhrase, setSeedPhrase } =
    useContext(AccountContext);

  useEffect(() => {
    if (account?.address) {
      setNetworkResponse({
        status: "complete",
        message: "Wallet created!",
      });
      setAccountCreationMode("");
      setShowRecoverInput(false);
      navigation.navigate("wallet");
    }
  }, [account]);

  useEffect(() => {
    setNetworkResponse(defaultNetworkVal);
  }, [seedPhrase]);

  useEffect(() => {
    accountCreationMode === "recover" && recoverAccount();
    accountCreationMode === "create" && createAccount();
  }, [accountCreationMode]);

  const recoverAccount = async () => {
    try {
      if (seedPhrase.includes(" ")) {
        const result = await generateAccount(seedPhrase);
        setAccount(result.account);
      } else {
        throw new Error("Invalid Seed Phare");
      }
    } catch (error) {
      console.log("failed to import wallet: ", error);
      setNetworkResponse({ status: "error", message: "Invalid Seed Phrase" });
      setAccountCreationMode("");
    }
  };

  const createAccount = async () => {
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
      setAccountCreationMode("");
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
                accountCreationMode !== "" ? <ActivityIndicator /> : "Submit"
              }
              onPress={() => {
                Keyboard.dismiss();
                setAccountCreationMode("recover");
              }}
            />
            <Button
              style={globalStyles.secondaryButton}
              title="Back"
              onPress={() => {
                setNetworkResponse(defaultNetworkVal);
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
              title={
                accountCreationMode !== "" ? (
                  <ActivityIndicator />
                ) : (
                  "Generate Account"
                )
              }
              onPress={() => {
                setAccountCreationMode("create");
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
