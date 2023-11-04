import "react-native-gesture-handler";
import "react-native-get-random-values";
import "@ethersproject/shims";
import { useState } from "react";
import { View, TouchableWithoutFeedback, Keyboard } from "react-native";
import { AccountContext } from "./context/account";
import { appStyles } from "./stylesheets/app";
import BottomNavbar from "./components/BottomNavbar.jsx";
import { NavigationContainer } from "@react-navigation/native";
import StackNav from "./components/StackNav";

const App = () => {
  const [account, setAccount] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState("");

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <AccountContext.Provider
        value={{ account, setAccount, seedPhrase, setSeedPhrase }}
      >
        <View style={appStyles.container}>
          <NavigationContainer>
            <StackNav />
          </NavigationContainer>
          {/* <NavigationContainer>
            <BottomNavbar />
          </NavigationContainer> */}
        </View>
      </AccountContext.Provider>
    </TouchableWithoutFeedback>
  );
};
export default App;
