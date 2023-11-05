import { StyleSheet } from "react-native";
import { theme, typography } from "./constants";

export const globalStyles = StyleSheet.create({
  primaryButton: {
    button: {
      backgroundColor: theme.colorPalette.primary[700],
      borderRadius: 8,
      width: "100%",
    },
    text: {},
  },
  secondaryButton: {
    button: {
      width: "100%",
      borderRadius: 8,
      borderWidth: 0.5,
      borderColor: "#fff",
      backgroundColor: theme.colorPalette.grey[0],
    },
    text: {},
  },
  primaryText: {
    color: "#fff",
  },
  secondaryText: {
    color: theme.colorPalette.grey[600],
  },
  flex: (props) => ({
    display: "flex",
    ...props,
  }),
  flexRow: ({ gap, justify, align, width, ...others }) => ({
    display: "flex",
    flexDirection: "row",
    ...(gap && { gap }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(width && { width }),
    ...others,
  }),
  flexCol: ({ gap, justify, align, width, ...others }) => ({
    display: "flex",
    flexDirection: "column",
    ...(gap && { gap }),
    ...(justify && { justifyContent: justify }),
    ...(align && { alignItems: align }),
    ...(width && { width }),
    ...others,
  }),
});
