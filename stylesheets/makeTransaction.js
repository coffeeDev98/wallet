import { StyleSheet } from "react-native";
import { theme } from "./constants";
import { globalStyles } from "./global";

export const makeTransactionStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    backgroundColor: theme.colorPalette.grey[0],
  },

  input: {
    display: "flex",
    height: 48,
    paddingHorizontal: 12,
    alignItems: "center",
    alignSelf: "stretch",
    borderRadius: 6,
    borderWidth: 0.5,
    borderColor: theme.colorPalette.grey[600],
    backgroundColor: theme.colorPalette.grey[0],
    color: globalStyles.primaryText.color,
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    paddingHorizontal: 12,
    // marginTop: 48,
  },

  cancelBtn: {
    width: "50%",
  },
  confirmBtn: {
    width: "50%",
  },
});
