import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CalculatorButton = ({ title, type, onPress, COLORS }) => (
  <TouchableOpacity
    style={[
      styles.button,
      {
        backgroundColor:
          type === "top"
            ? COLORS.textLight
            : type === "right"
            ? COLORS.text
            : COLORS.card,
      },
    ]}
    onPress={onPress}
  >
    <Text
      style={{
        fontSize: 34,
        color: type === "number" ? COLORS.text : COLORS.white,
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    height: 75,
    width: 75,
    borderRadius: 36,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
  },
});

export default CalculatorButton;