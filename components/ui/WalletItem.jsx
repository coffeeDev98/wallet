import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { walletDashboardStyles } from "../../stylesheets/walletDashboard";
import { globalStyles } from "../../stylesheets/global";
import { typography } from "../../stylesheets/constants";
import ETH from "../../assets/eth.svg";
import BTC from "../../assets/btc.svg";
import BNB from "../../assets/bnb.svg";
import { useRoute } from "@react-navigation/native";

const WalletItem = ({ name, exchangeRate, balance, shorthand = "" }) => {
  const route = useRoute();
  return (
    <View
      style={{
        ...walletDashboardStyles.walletItem,
        ...(route.name === "history" && { paddingLeft: 4 }),
      }}
    >
      <View style={globalStyles.flexRow({ gap: 6, align: "center" })}>
        {shorthand === "ETH" && <ETH />}
        {shorthand === "BTC" && <BTC />}
        {shorthand === "BNB" && <BNB />}
        {/* {icons[name] || (
          <MaterialCommunityIcons name="ethereum" size={36} color="white" />
        )} */}
        <View style={globalStyles.flexCol({ gap: 5 })}>
          <View style={globalStyles.flexRow({ align: "center" })}>
            {route.name === "history" && (
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
                  route.name === "wallet" ? "primaryText" : "secondaryText"
                ],
                ...typography.h6,
                ...(route.name === "history" && {
                  position: "relative",
                  left: -4,
                }),
              }}
            >
              {name}
            </Text>
          </View>
          <Text
            style={{
              ...globalStyles[
                route.name === "wallet" ? "secondaryText" : "primaryText"
              ],
              ...(route.name === "history" && { marginLeft: 5 }),
            }}
          >
            {shorthand}
          </Text>
        </View>
      </View>
      <View
        style={globalStyles.flexCol({
          gap: 5,
          align: "flex-end",
          justify: "center",
        })}
      >
        <Text style={{ ...globalStyles.primaryText, ...typography.h6 }}>
          {balance} {route.name === "history" && shorthand}
        </Text>
        {route.name === "wallet" && (
          <Text style={{ ...globalStyles.secondaryText }}>
            1 {shorthand} &asymp; {`\u20B9`} {exchangeRate}
          </Text>
        )}
      </View>
    </View>
  );
};

export default WalletItem;
