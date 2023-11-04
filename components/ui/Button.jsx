import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

export default function Button(props) {
  const { onPress, title = "", style = {} } = props;
  return (
    <Pressable
      style={{ ...defaultStyles.button, ...style?.button }}
      onPress={onPress}
    >
      <Text style={{ ...defaultStyles.text, ...style?.text }}>{title}</Text>
    </Pressable>
  );
}

const defaultStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
