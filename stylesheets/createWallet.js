import { StyleSheet } from "react-native";
import { theme, typography } from "./constants";

export const createWalletStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
  },
  btnContainer: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  },

  recoveryInputContainer: {
    width: "75%",
    display: "flex",
    flexDirection: "column",
    gap: 10,
    paddingTop: 25,
    borderTopWidth: 1,
    borderTopColor: theme.colorPalette.grey[700],
  },
  recoveryTextInput: {
    backgroundColor: theme.colorPalette.grey[0],
    color: "#fff",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    borderColor: "#777",
    borderRadius: 8,
  },
});
