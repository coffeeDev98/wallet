import { StyleSheet } from "react-native";
import { theme } from "./constants";

export const walletDashboardStyles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  card: {
    borderRadius: 12,
    backgroundColor: theme.colorPalette.grey[900],
    paddingHorizontal: 16,
    paddingVertical: 32,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    minHeight: 253,
  },
  balanceInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "stretch",
    marginBottom: 25,
  },
  sendIcon: {
    backgroundColor: theme.colorPalette.danger[600],
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 48,
    aspectRatio: 1,
  },
  walletsSection: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  walletItem: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    padding: 12,
    justifyContent: "space-between",
  },
});
