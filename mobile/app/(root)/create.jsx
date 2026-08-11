import { View, Text, Alert, TouchableOpacity, TextInput, ActivityIndicator, ActivityIndicatorBase } from 'react-native';
import { useRouter } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { useState } from 'react';   
import { API_URL } from '../../constants/api';
// import { styles } from '../../assets/styles/create.styles'; 
// import { COLORS } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';
import { createCreateStyles } from '../../assets/styles/create.styles';
import { useTheme } from "../../context/ThemeContext";

const CATEGORIES = [
    { id: "income", name: "Income", icon: "cash" },
    { id: "bills", name: "Bills", icon: "receipt" },
    { id: "food", name: "Food & Drinks", icon: "fast-food" },
    { id: "shopping", name: "Shopping", icon: "cart" },
    { id: "transportation", name: "Transportation", icon: "car" }, 
    { id: "entertainment", name: "Entertainment", icon: "film" }, 
    
    // Additional categories:
    { id: "health", name: "Health", icon: "medkit" },
    { id: "education", name: "Education", icon: "school" },
    { id: "travel", name: "Travel", icon: "airplane" },
    { id: "gift", name: "Gifts", icon: "gift" },
    { id: "home", name: "Home", icon: "home" },
    { id: "investment", name: "Investment", icon: "trending-up" },
    { id: "pet", name: "Pet Care", icon: "paw" },
    { id: "phone", name: "Phone", icon: "call" },
    { id: "utilities", name: "Utilities", icon: "flash" },
    { id: "sports", name: "Sports", icon: "football" },
    { id: "other", name: "Other", icon: "ellipsis-horizontal" },
];

const CreateScreen = () => {
    //📌📌
    const { COLORS } = useTheme();
    const styles = createCreateStyles(COLORS);

    const router = useRouter();
    const {user} = useUser();
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(""); 
    const [isExpense, setIsExpense] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleBack = () => {
    if (router.canGoBack()) {
        router.back();
    } else {
        router.replace("/"); // or any fallback route
    }
    };

    const handleCreate = async () => {
    // validations
    if (!title.trim()) return Alert.alert("Error", "Please enter a transaction title"); 
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) { 
        Alert.alert("Error", "Please enter a valid amount");
    return;
    }
    
    if (!selectedCategory) return Alert.alert("Error", "Please select a category");
    
    setIsLoading(true);
    try {
        // Format the amount (negative for expenses, positive for income) 
        const formattedAmount = isExpense
        ? -Math.abs (parseFloat(amount)) 
        : Math.abs(parseFloat(amount));
        
        const response = await fetch(`${API_URL}/transactions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user.id,
                title,
                amount: formattedAmount,
                category: selectedCategory,
            }),
        })
        
        if (!response.ok) {
            const errorData = await response.json();
            console.log(errorData)
            throw new Error(errorData.error || "Failed to create transaction");
        }
        
        Alert.alert("Success", "Transaction created successfully");
        router.back();
        
    } catch (error) {
            Alert.alert("Error", error.message || "Failed to create transaction"); console.error("Error creating transaction:", error);
            console.error("Error creating transaction:", error);
    } finally{
        setIsLoading(false)
    }

    }

    return (
        <View style={styles.container}>

            {/* HEADER */}
            <View style={styles.header}>  
                {/* <TouchableOpacity style={styles.backButton} onPress={() => router.back()}> 
                    <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Ionicons name="arrow-back" size={24} color={COLORS.text} />
                </TouchableOpacity>
                

                <Text style={styles.headerTitle}>New Transaction</Text>
                
                <TouchableOpacity
                    style={[styles.saveButtonContainer, isLoading && styles.saveButtonDisabled]}
                    onPress={handleCreate}
                    disabled={isLoading}
                >

                    <Text style={styles.saveButton}>{isLoading ? "Saving..." : "Save"}</Text>
                    {!isLoading && <Ionicons name="checkmark" size={18} color={COLORS.text} />} 
                </TouchableOpacity>

            </View>

            <View style={styles.card}>
            <View style={styles.typeSelector}>
            
            {/* EXPENSE SELECTOR */} 
            <TouchableOpacity
                style={[styles.typeButton, isExpense && styles.typeButtonActive]} 
                onPress={() =>setIsExpense(true)}
            >
                <Ionicons
                    name="arrow-down-circle"
                    size={22}
                    color={isExpense ? COLORS.white: COLORS.expense} 
                    style={styles.typeIcon}
                />
                <Text style={[styles.typeButtonText, isExpense && styles.typeButtonTextActive]}>
                    Expense
                </Text>
            
            </TouchableOpacity>

            {/* INCOME SELECTOR */} 
            <TouchableOpacity
                style={[styles.typeButton, !isExpense && styles.typeButtonActive]} 
                onPress={() => setIsExpense(false)}
            >
                <Ionicons
                    name="arrow-up-circle"
                    size={22}
                    color={!isExpense ? COLORS.white: COLORS.income} 
                    style={styles.typeIcon}
                />
                <Text style={[styles.typeButtonText, !isExpense && styles.typeButtonTextActive]}>
                    Income
                </Text>
            
                </TouchableOpacity>
            </View>

            {/* AMOUNT CONTAINER */} 
            <View style={styles.amountContainer}>
                <Text style={styles.currencySymbol}>₱</Text>
                <TextInput 
                style={styles.amountInput}
                placeholder="0.00"
                placeholderTextColor={COLORS.text}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                />
            </View>

            {/* INPUT CONTAINER */}
            <View style={styles.inputContainer}>
            <Ionicons
                name="create-outline"
                size={22}
                color={COLORS.text}
                style={styles.inputIcon}
            />
            <TextInput
                style={styles.input}
                placeholder="Transaction Title"
                placeholderTextColor={COLORS.text}
                value={title}
                onChangeText={setTitle}
            />
            </View>

            {/* TITLE */}
            <Text style={styles.sectionTitle}>
                <Ionicons name="pricetag-outline" size={16} color={COLORS.text} /> Category
            </Text>

            <View style={styles.categoryGrid}>
                {CATEGORIES.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category.name && styles.categoryButtonActive,
                        ]}
                        onPress={() => setSelectedCategory(category.name)}
                    >
                        <Ionicons
                            name={category.icon}
                            size={20}
                            color={
                                    selectedCategory === category.name
                                    ? COLORS.white
                                    : COLORS.text
                            }
                        />
                        <Text
                            style={[
                                styles.categoryButtonText,
                                selectedCategory === category.name && styles.categoryButtonTextActive,
                            ]}
                        >
                            {category.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        {isLoading && (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size = "large" color = {COLORS.primary}/>
            </View>
        )}
        </View>
    )
}

export default CreateScreen;