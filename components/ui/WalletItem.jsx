import React from "react";
import { Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { walletDashboardStyles } from "../../stylesheets/walletDashboard";
import { globalStyles } from "../../stylesheets/global";
import { typography } from "../../stylesheets/constants";
const WalletItem = ({
  name,
  exchangeRate = 0,
  balance = 0,
  shorthand = "",
}) => {
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
        <MaterialCommunityIcons name="ethereum" size={36} color="white" />
        <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <Text style={{ ...globalStyles.primaryText, ...typography.h6 }}>
            {name}
          </Text>
          <Text style={{ ...globalStyles.secondaryText }}>{shorthand}</Text>
        </View>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "colun",
          gap: 5,
          alignItems: "flex-end",
        }}
      >
        <Text style={{ ...globalStyles.primaryText, ...typography.h6 }}>
          {balance}
        </Text>
        <Text style={{ ...globalStyles.secondaryText }}>
          1 {shorthand} &asymp; {`\u20B9`} {exchangeRate}
        </Text>
      </View>
    </View>
  );
};

export default WalletItem;
