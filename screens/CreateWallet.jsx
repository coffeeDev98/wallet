import React, { useCallback, useContext, useState } from "react";
import {
  Keyboard,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { generateAccount } from "../utils/accountUtils";
import { AccountContext } from "../context/account";
import { createWalletStyles } from "../stylesheets/createWallet";
import { theme } from "../stylesheets/constants";
import Button from "../components/ui/Button";
import { globalStyles } from "../stylesheets/global";
import { GlobalContext } from "../context/global";

const CreateWallet = () => {
  const [showRecoverInput, setShowRecoverInput] = useState(false);

  const { account, setAccount, seedPhrase, setSeedPhrase } =
    useContext(AccountContext);

  const { screen, setScreen } = useContext(GlobalContext);

  const recoverAccount = useCallback(
    // recoverAccount could be used without recoveryPhrase as an arguement but then we would have to
    // put it in a deps array.
    async (recoveryPhrase) => {
      // Call the generateAccount function with no arguments
      // Call the generateAccount function and pass it 0 and the current seedphrase
      const result = await generateAccount(recoveryPhrase);

      // Update the account state with the newly recovered account
      setAccount(result.account);

      // if (localStorage.getItem(recoveryPhraseKeyName) !== recoveryPhrase) {
      //   localStorage.setItem(recoveryPhraseKeyName, recoveryPhrase);
      // }
      setShowRecoverInput(false);
    },
    []
  );

  const createAccount = async () => {
    // Call the generateAccount function with no arguments
    const result = await generateAccount();

    // Update the account state with the newly created account
    setAccount(result.account);
    setSeedPhrase(result.seedPhrase);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={createWalletStyles.container}>
        <View style={createWalletStyles.btnContainer}>
          <Button
            style={globalStyles.primaryButton}
            title="Generate Account"
            onPress={() => {
              // const start = performance.now();
              // const w = ethers.Wallet.createRandom();
              // const end = performance.now();
              // console.log(
              //   `Creating a Wallet took ${end - start} ms. => ${w.address}`
              // );

              createAccount();
            }}
          />
          <Button
            style={globalStyles.secondaryButton}
            title="Recover Account"
            onPress={() => {
              setShowRecoverInput((prev) => !prev);
            }}
          />
        </View>
        {showRecoverInput && (
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
              title="Submit"
              onPress={() => {
                recoverAccount(seedPhrase).then(() => {
                  setShowRecoverInput(false);
                });
              }}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreateWallet;
