import React, { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { bottomNavbarStyles } from "../stylesheets/bottomNavbar";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { theme } from "../stylesheets/constants";
import { globalStyles } from "../stylesheets/global";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import WalletDashboard from "../screens/WalletDashboard";
import MakeTransactionScreen from "../screens/MakeTransactionScreen";
import AccountTrasactions from "../screens/AccountTrasactions";
import StackNav from "./StackNav";
import { AccountContext } from "../context/account";
import CreateWallet from "../screens/CreateWallet";

const items = [
  {
    icon: "account-balance-wallet",
    label: "Wallet",
    screen: "wallet",
  },
  {
    icon: "search",
    label: "Search",
    screen: "search",
  },
  {
    icon: "history",
    label: "History",
    screen: "history",
  },
];

const Item = ({ icon, label, screen, active = false, onPress }) => {
  return (
    <Pressable
      style={bottomNavbarStyles.navItem}
      onPress={() => {
        onPress(screen);
      }}
    >
      <MaterialIcons
        name={icon}
        size={24}
        color={active ? "#fff" : theme.colorPalette.grey[600]}
      />
      <Text
        style={active ? globalStyles.primaryText : globalStyles.secondaryText}
      >
        {label}
      </Text>
    </Pressable>
  );
};
const Tab = createBottomTabNavigator();
const BottomNavbar = () => {
  const { account } = useContext(AccountContext);
  return (
    // <View>
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // ...bottomNavbarStyles.container,
          height: 52,
          alignSelf: "center",
          display: "flex",
          flexDirection: "row",
          width: "100%",
          paddingTop: 7,
          justifyContent: "space-around",
          gap: 30,
          borderRadius: 12,
          backgroundColor: theme.colorPalette.grey[900],
          shadowColor: "rgba(7, 6, 18, 0.10)",
          shadowOffset: "0px 4px 20px 0px",
          zIndex: 9999,
          ...(!account && { display: "none" }),
        },
        tabBarShowLabel: false,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="createTab"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="create"
                size={24}
                color={focused ? "#fff" : theme.colorPalette.grey[600]}
              />
            </View>
          ),
        }}
        component={CreateWallet}
      />
      <Tab.Screen
        name="walletTab"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="account-balance-wallet"
                size={24}
                color={focused ? "#fff" : theme.colorPalette.grey[600]}
              />
            </View>
          ),
        }}
        component={WalletDashboard}
      />
      <Tab.Screen
        name="sendTab"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Feather
                name="arrow-up-right"
                size={24}
                color={focused ? "#fff" : theme.colorPalette.grey[600]}
              />
            </View>
          ),
        }}
        component={MakeTransactionScreen}
      />
      <Tab.Screen
        name="historyTab"
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <MaterialIcons
                name="history"
                size={24}
                color={focused ? "#fff" : theme.colorPalette.grey[600]}
              />
            </View>
          ),
        }}
        component={AccountTrasactions}
      />

      {/* <View style={bottomNavbarStyles.container}>
        <Item
          icon="account-balance-wallet"
          label="Wallet"
          screen="wallet"
          onPress={onPress}
          active={screen === "wallet"}
        />
        <Item
          icon="search"
          label="Search"
          screen="search"
          onPress={onPress}
          active={screen === "search"}
        />
        <Item
          icon="history"
          label="History"
          screen="history"
          onPress={onPress}
          active={screen === "history"}
        />
      </View> */}
    </Tab.Navigator>
    // </View>
  );
};

export default BottomNavbar;
