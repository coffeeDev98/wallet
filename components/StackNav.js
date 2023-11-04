import { createStackNavigator } from "@react-navigation/stack";
import CreateWallet from "../screens/CreateWallet";
import WalletDashboard from "../screens/WalletDashboard";
import MakeTransactionScreen from "../screens/MakeTransactionScreen";
import AccountTrasactions from "../screens/AccountTrasactions";
import { useContext, useEffect } from "react";
import { AccountContext } from "../context/account";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="create"
        options={{ headerShown: false }}
        component={CreateWallet}
      />
      <Stack.Screen
        name="wallet"
        options={{ headerShown: false }}
        component={WalletDashboard}
      />
      <Stack.Screen
        name="send"
        options={{ headerShown: false }}
        component={MakeTransactionScreen}
      />
      <Stack.Screen
        name="history"
        options={{ headerShown: false }}
        component={AccountTrasactions}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
