import { View, Text } from "react-native";
// import { styles} from "../assets/styles/home.styles"; 
// import { COLORS } from "../constants/colors";
import { useTheme } from "../context/ThemeContext";
import { createHomeStyles } from "../assets/styles/home.styles";

export const BalanceCard = ({ summary }) => {
    const { COLORS } = useTheme();
    const styles = createHomeStyles(COLORS);

    return (
        <View style={styles.balanceCard}>
            <Text style={styles.balanceTitle}>Total Balance</Text> 
            {/* <Text style={styles.balanceAmount}>₱{parseFloat(summary.balance).toFixed(2)}</Text> */}
            <Text style={styles.balanceAmount}>{`₱ ${Math.abs(parseFloat(summary.balance)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</Text>
            <View style={styles.balanceStats}>
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Income</Text>
                    <Text style={[styles.balanceStatAmount, { color: COLORS.income }]}> 
                        {/* +₱{parseFloat(summary.income).toFixed(2)} */}
                        {`+₱${parseFloat(summary.income).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </Text>
                </View>
                {/* <View style={[styles.balanceStatItem, styles.statDivider]} /> */}
              
                <View style={styles.balanceStatItem}>
                    <Text style={styles.balanceStatLabel}>Expenses</Text>
                    <Text style={[styles.balanceStatAmount, { color: COLORS.expense }]}>
                        {/* -₱{Math.abs(parseFloat(summary.expenses)).toFixed(2)} */}
                         {`-₱${Math.abs(parseFloat(summary.expenses)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                    </Text>
                </View>
            </View>
        </View>
    );
};