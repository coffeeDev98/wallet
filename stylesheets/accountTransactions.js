import { StyleSheet } from "react-native";
import { theme } from "./constants";

export const accountTransactionsStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.colorPalette.grey[0],
  },
});
