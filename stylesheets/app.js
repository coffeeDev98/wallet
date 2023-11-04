import { StyleSheet } from "react-native";
import { theme, typography } from "./constants";

export const appStyles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    paddingVertical: 34,
    paddingHorizontal: 12,
    backgroundColor: theme.colorPalette.grey[0],
    ...typography.global,
  },
});