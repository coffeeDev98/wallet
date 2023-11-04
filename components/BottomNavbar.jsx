import React, { useContext } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { bottomNavbarStyles } from "../stylesheets/bottomNavbar";
import { MaterialIcons } from "@expo/vector-icons";
import { theme } from "../stylesheets/constants";
import { globalStyles } from "../stylesheets/global";
import { GlobalContext } from "../context/global";

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

const BottomNavbar = () => {
  const { screen, setScreen } = useContext(GlobalContext);
  const onPress = (scr) => {
    setScreen(scr);
  };
  return (
    <View style={bottomNavbarStyles.container}>
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
    </View>
  );
};

export default BottomNavbar;
