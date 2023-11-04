import React, { useContext } from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { walletDashboardStyles } from "../../stylesheets/walletDashboard";
import { globalStyles } from "../../stylesheets/global";
import { typography } from "../../stylesheets/constants";
import { GlobalContext } from "../../context/global";
import { icons } from "../../constants";
import ETH from "../../assets/eth.svg";
import BTC from "../../assets/btc.svg";
import BNB from "../../assets/bnb.svg";
const WalletItem = ({ name, exchangeRate, balance, shorthand = "" }) => {
  const { screen } = useContext(GlobalContext);
  return (
    <View style={walletDashboardStyles.walletItem}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          gap: 6,
          alignItems: "center",
        }}
      >
        {shorthand === "ETH" && <ETH />}
        {shorthand === "BTC" && <BTC />}
        {shorthand === "BNB" && <BNB />}
        {/* {icons[name] || (
          <MaterialCommunityIcons name="ethereum" size={36} color="white" />
        )} */}
        <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            {screen === "history" && (
              <MaterialCommunityIcons
                name={
                  name.toLowerCase() === "sent"
                    ? "arrow-up-thin"
                    : "arrow-down-thin"
                }
                size={16}
                color={globalStyles.secondaryText.color}
              />
            )}
            <Text
              style={{
                ...globalStyles[
                  screen === "wallet" ? "primaryText" : "secondaryText"
                ],
                ...typography.h6,
              }}
            >
              {name}
            </Text>
          </View>
          <Text
            style={{
              ...globalStyles[
                screen === "wallet" ? "secondaryText" : "primaryText"
              ],
            }}
          >
            {shorthand}
          </Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "colun",
          gap: 5,
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Text style={{ ...globalStyles.primaryText, ...typography.h6 }}>
          {balance} {screen === "history" && shorthand}
        </Text>
        {screen === "wallet" && (
          <Text style={{ ...globalStyles.secondaryText }}>
            1 {shorthand} &asymp; {`\u20B9`} {exchangeRate}
          </Text>
        )}
      </View>
    </View>
  );
};

export default WalletItem;
