import { StyleSheet } from "react-native";
import { theme } from "./constants";

export const bottomNavbarStyles = StyleSheet.create({
  container: {
    height: 52,
    // position: "absolute",
    // bottom: 20,
    alignSelf: "center",
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingTop: 7,
    justifyContent: "space-around",
    // alignItems: "center",
    gap: 30,
    borderRadius: 12,
    backgroundColor: theme.colorPalette.grey[900],
    shadowColor: "rgba(7, 6, 18, 0.10)",
    shadowOffset: "0px 4px 20px 0px",
    zIndex: 9999,
  },
  navItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
});
