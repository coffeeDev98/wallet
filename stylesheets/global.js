import { StyleSheet } from "react-native";
import { theme, typography } from "./constants";

export const globalStyles = StyleSheet.create({
  primaryButton: {
    button: {
      backgroundColor: theme.colorPalette.primary[700],
      borderRadius: 8,
      width: "100%",
      ...typography.global,
    },
    text: {
      ...typography.global,
    },
  },
  secondaryButton: {
    button: {
      width: "100%",
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: "#fff",
    },
    text: {
      ...typography.global,
    },
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: theme.colorPalette.grey[600],
  },
});
