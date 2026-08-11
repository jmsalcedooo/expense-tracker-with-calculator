import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../assets/styles/home.styles";
import { COLORS } from "../constants/colors";
import { useRouter } from "expo-router";
import { createHomeStyles } from "../assets/styles/home.styles";
import { useTheme } from "../context/ThemeContext";

export const NoTransactionsFound = () => { 
    const router = useRouter();
    const { COLORS } = useTheme();
    const styles = createHomeStyles(COLORS);
    return (
        <View style={styles.emptyState}>
        <Ionicons
            name="receipt-outline"
            size={60}
            color={COLORS.text}
            style={styles.emptyStateIcon}
        />

        <Text style={styles.emptyStateTitle}>No transactions yet</Text> 
        <Text style={styles.emptyStateText}>
            Start tracking your finances by adding your first transaction 
        </Text>
        
        <TouchableOpacity style={styles.emptyStateButton} onPress={() => router.push("/create")}> 
            <Ionicons name="add-circle" size={18} color={COLORS.incomeexpense} />
            <Text style={styles.emptyStateButtonText}>Add Transaction</Text>
        </TouchableOpacity>
    </View>
    );
};