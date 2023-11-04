import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateWallet from "../screens/CreateWallet";
import WalletDashboard from "../screens/WalletDashboard";
import { useContext } from "react";
import { AccountContext } from "../context/account";

const Stack = createNativeStackNavigator();

const StackNav = () => {
  const { account } = useContext(AccountContext);

  return (
    <Stack.Navigator screenOptions={{ headerTitle: false }}>
      <Stack.Screen name="create" component={CreateWallet} />
      <Stack.Screen name="wallet" component={WalletDashboard} />
      {/* <Stack.Screen name="create" component={CreateWallet} /> */}
    </Stack.Navigator>
  );
};

export default StackNav;
