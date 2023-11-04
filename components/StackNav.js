import { createStackNavigator } from "@react-navigation/stack";
import CreateWallet from "../screens/CreateWallet";
import WalletDashboard from "../screens/WalletDashboard";
import MakeTransactionScreen from "../screens/MakeTransactionScreen";
import AccountTrasactions from "../screens/AccountTrasactions";

const Stack = createStackNavigator();

const StackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        id="create"
        name="create"
        options={{ headerShown: false }}
        component={CreateWallet}
      />
      <Stack.Screen
        id="wallet"
        name="wallet"
        options={{ headerShown: false }}
        component={WalletDashboard}
      />
      <Stack.Screen
        id="send"
        name="send"
        options={{ headerShown: false }}
        component={MakeTransactionScreen}
      />
      <Stack.Screen
        id="history"
        name="history"
        options={{ headerShown: false }}
        component={AccountTrasactions}
      />
    </Stack.Navigator>
  );
};

export default StackNav;
