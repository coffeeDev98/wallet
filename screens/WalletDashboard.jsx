import { ethers } from "ethers";
import React, { useContext, useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { toFixedIfNecessary } from "../utils/accountUtils";
import { goerli } from "../models/Chain";
import { walletDashboardStyles } from "../stylesheets/walletDashboard";
import { globalStyles } from "../stylesheets/global";
import { theme, typography } from "../stylesheets/constants";
import { geckoGetPrice } from "../api/geckoAPI";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import WalletItem from "../components/ui/WalletItem";
import { FlatList } from "react-native";
import { shorthands } from "../constants";
import { AccountContext } from "../context/account";

const WalletDashboard = ({ navigation }) => {
  const { account, setAccount, setSeedPhrase } = useContext(AccountContext);
  const [balance, setBalance] = useState(account?.balance || 0);
  const [balanceInINR, setBalanceInINR] = useState(0);
  const [prices, setPrices] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const provider = new ethers.providers.JsonRpcProvider(goerli.rpcUrl);
      let accountBalance = await provider.getBalance(account.address);
      setBalance(
        String(toFixedIfNecessary(ethers.utils.formatEther(accountBalance)))
      );
    };
    account?.address && fetchData();
  }, [account?.address]);

  useEffect(() => {
    geckoGetPrice().then((price) => {
      setPrices(price);
      setBalanceInINR(price["ethereum"]?.inr * balance);
    });
  }, [balance]);

  return (
    <View style={walletDashboardStyles.container}>
      <View
        style={{
          marginBottom: 20,
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            ...globalStyles.primaryText,
            ...typography.h3,
            ...typography.weight.bold,
          }}
        >
          Hi There!
        </Text>
        <MaterialIcons
          name="logout"
          size={24}
          color="#fff"
          style={{ transform: [{ rotate: "180deg" }] }}
          onPress={() => {
            setAccount(null);
            setSeedPhrase("");
            navigation.navigate("create");
          }}
        />
      </View>
      <View style={walletDashboardStyles.card}>
        <View style={walletDashboardStyles.balanceInfo}>
          <Text
            style={{
              ...globalStyles.primaryText,
              color: theme.colorPalette.grey[400],
              marginBottom: 10,
            }}
          >
            Total Protfolio Value
          </Text>
          <Text style={{ ...globalStyles.primaryText, ...typography.h1 }}>
            {`\u20B9`} {balanceInINR.toFixed(3)}
          </Text>
          <Text style={{ ...globalStyles.secondaryText, ...typography.h3 }}>
            {balance} ETH
          </Text>
        </View>
        <View style={{ display: "flex", flexDirection: "row", gap: 30 }}>
          <Pressable
            style={{
              ...walletDashboardStyles.sendIcon,
              backgroundColor: theme.colorPalette.primary[700],
            }}
            onPress={() => {
              navigation.navigate("history");
            }}
          >
            <MaterialIcons name="history" size={24} color="#fff" />
          </Pressable>
          <Pressable
            style={walletDashboardStyles.sendIcon}
            onPress={() => {
              navigation.navigate("send");
            }}
          >
            <Feather name="arrow-up-right" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      <View style={walletDashboardStyles.walletsSection}>
        <WalletItem
          name="Ethereum"
          balance={balance}
          exchangeRate={prices?.ethereum?.inr}
          shorthand="ETH"
        />
        <FlatList
          data={Object.keys(prices).filter((item) => item !== "ethereum")}
          renderItem={({ item }) => (
            <WalletItem
              name={`${item[0].toUpperCase()}${item.slice(1)}`}
              balance={0}
              exchangeRate={prices[item]?.inr}
              shorthand={shorthands[item]}
            />
          )}
        />
        {/* <View style={walletDashboardStyles.walletItem}>
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
                Ethereum
              </Text>
              <Text style={{ ...globalStyles.secondaryText }}>ETH</Text>
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
              1 ETH &asymp; {`\u20B9`} {prices?.ethereum?.inr}
            </Text>
          </View>
        </View> */}
      </View>
    </View>
  );
};

export default WalletDashboard;

/**
 * 
 * 
 * 
 **  Balance : 0.5ETH
 **  ACCOUNT:  {"address": "0x96b28Dd06c22383B3C342c7ed156a0eb2f390FCf", "balance": "0", "privateKey": "0x66e73149fccd29f0bc9e0a7f71c060d12d671b7caace0781847877472ea8ca74"}
 **  RECOVERY_SEED_PHRASE:  success vacant robust giggle enhance style reflect shiver glare grape rigid crumble
 *
 * 
 **  iOS Wallet
 **  ACCOUNT:  {"address": "0x50C1DE04BB60b0f3C403Aab0d6163203AB14fDb7", "balance": "0", "privateKey": "0x0f9e2029b3e46e61019c210cc222287b356d9198eefa78393f88cf03b2c07190"}
 **  RECOVERY_SEED_PHRASE: connect stage term smooth siege escape insect maximum law culture where town


 */
