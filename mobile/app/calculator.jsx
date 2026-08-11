import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from 'expo-router';
import CalculatorButton from "../components/CalculatorButton";

const Calculator = () => {
  const { COLORS } = useTheme();
  const [firstValue, setFirstValue] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState("");
  const router = useRouter();

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/");
    }
  };

  const handleNumberInput = (num) => {
    if (displayValue === "0") {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  const handleOperatorInput = (op) => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue("0");
  };

  const handleCalculation = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    let result = 0;
    if (operator === "+") result = num1 + num2;
    else if (operator === "-") result = num1 - num2;
    else if (operator === "*") result = num1 * num2;
    else if (operator === "/") result = num2 !== 0 ? num1 / num2 : "Err";
    else if (operator === "%") result = num1 % num2;

    setDisplayValue(result.toString());
    setOperator("");
    setFirstValue("");
  };

  const handleClear = () => {
    setDisplayValue("0");
    setOperator("");
    setFirstValue("");
  };

  const handleDelete = () => {
    if (displayValue.length === 1) {
      setDisplayValue("0");
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      
<View style={styles.header}>
  <TouchableOpacity style={styles.backButton} onPress={handleBack}>
    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
  </TouchableOpacity>
  <Text style={[styles.headerTitle, { color: COLORS.text }]}>Calculator</Text>
  {/* Add an empty view to balance the row */}
  <View style={{ width: 40 }} />
</View>

      <View style={[styles.display, { backgroundColor: COLORS.card }]}>
        <Text style={{ fontSize: 30, fontWeight: "300", color: COLORS.text }}>
          {firstValue + operator}
        </Text>
        <Text style={{ fontSize: 50, fontWeight: "300", color: COLORS.text }}>
          {displayValue}
        </Text>
      </View>
      <View style={styles.keypad}>
        <View style={styles.row}>
          <CalculatorButton title="C" type="top" onPress={handleClear} COLORS={COLORS} />
          <CalculatorButton title="⌫" type="top" onPress={handleDelete} COLORS={COLORS} />
          <CalculatorButton title="%" type="top" onPress={() => handleOperatorInput("%")} COLORS={COLORS} />
          <CalculatorButton title="÷" type="right" onPress={() => handleOperatorInput("/")} COLORS={COLORS} />
        </View>
        <View style={styles.row}>
          <CalculatorButton title="7" type="number" onPress={() => handleNumberInput("7")} COLORS={COLORS} />
          <CalculatorButton title="8" type="number" onPress={() => handleNumberInput("8")} COLORS={COLORS} />
          <CalculatorButton title="9" type="number" onPress={() => handleNumberInput("9")} COLORS={COLORS} />
          <CalculatorButton title="×" type="right" onPress={() => handleOperatorInput("*")} COLORS={COLORS} />
        </View>
        <View style={styles.row}>
          <CalculatorButton title="4" type="number" onPress={() => handleNumberInput("4")} COLORS={COLORS} />
          <CalculatorButton title="5" type="number" onPress={() => handleNumberInput("5")} COLORS={COLORS} />
          <CalculatorButton title="6" type="number" onPress={() => handleNumberInput("6")} COLORS={COLORS} />
          <CalculatorButton title="-" type="right" onPress={() => handleOperatorInput("-")} COLORS={COLORS} />
        </View>
        <View style={styles.row}>
          <CalculatorButton title="1" type="number" onPress={() => handleNumberInput("1")} COLORS={COLORS} />
          <CalculatorButton title="2" type="number" onPress={() => handleNumberInput("2")} COLORS={COLORS} />
          <CalculatorButton title="3" type="number" onPress={() => handleNumberInput("3")} COLORS={COLORS} />
          <CalculatorButton title="+" type="right" onPress={() => handleOperatorInput("+")} COLORS={COLORS} />
        </View>
        <View style={styles.row}>
          <CalculatorButton title="0" type="number" onPress={() => handleNumberInput("0")} COLORS={COLORS} />
          <CalculatorButton title="00" type="number" onPress={() => handleNumberInput("00")} COLORS={COLORS} />
          <CalculatorButton title="." type="number" onPress={() => handleNumberInput(".")} COLORS={COLORS} />
          <CalculatorButton title="=" type="right" onPress={handleCalculation} COLORS={COLORS} />
        </View>
      </View>
    </View>
  );
};

export default Calculator;

const styles = StyleSheet.create({
   container: {
    flex: 1,
  },
  header: {
    paddingTop: 15,
    height: 85,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  display: {
    flex: 0.7,
    paddingVertical: 10,
    paddingHorizontal: 58,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  keypad: {
    flex: 2,
    justifyContent: "center",
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
});