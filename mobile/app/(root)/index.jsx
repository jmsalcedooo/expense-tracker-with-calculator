import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo"
import { Link, useRouter, useFocusEffect } from "expo-router"
import { FlatList, Image, Text, TouchableOpacity, View, Alert, RefreshControl } from "react-native"
import { SignOutButton } from "@/components/SignOutButton"
import { useEffect, useState } from "react"
import { useTransactions } from "@/hooks/useTransactions"
import PageLoader from "@/components/PageLoader"
import { Ionicons } from "@expo/vector-icons"
import { BalanceCard } from "@/components/BalanceCard"
import { TransactionItem } from "@/components/TransactionItem"
import { NoTransactionsFound } from "@/components/NoTransactionsFound"
import { useTheme } from "@/context/ThemeContext"
import { createHomeStyles } from "@/assets/styles/home.styles"
import { THEMES } from "@/constants/colors"
import React from "react"

export default function Page() {
  const { user } = useUser()
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { transactions, summary, isLoading, loadData, deleteTransaction} = useTransactions(user.id);

  const { COLORS, switchTheme } = useTheme();
  const styles = createHomeStyles(COLORS);
  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadData();
    }, [loadData])
  );

  // useEffect (() => {
  //   loadData();
  // }, [loadData]);

  const handleDelete = (id) => {
    Alert.alert("Delete Transaction", "Are you sure you want to delete this transaction?", [ 
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteTransaction(id)},
    ]);
  };

  if(isLoading && !refreshing) return <PageLoader />

  return (
    <View style = {styles.container}>
      <View style={styles.content}>

        <View style = {styles.header}>

          <View style = {styles.headerLeft}>
            <Image
              source={require("@/assets/images/logo.png")}
              style={styles.headerLogo}
              resizeMode="contain"
            /> 
          
          <View style={styles.welcomeContainer}>
            <Text style={styles.welcomeText}>Welcome,</Text>
              <Text style={styles.usernameText}>
                {user?.emailAddresses[0]?.emailAddress.split("@")[0]}  
              </Text>
            </View>
          </View>

          <View style={styles.headerRight}>
            {/* <TouchableOpacity style = {styles.addButton} onPress={() => router.push("/create")}>
              <Ionicons name="add-circle" size={22} color={COLORS.card} />
            </TouchableOpacity> */}
            
            <TouchableOpacity
              style={styles.moonButton}
              onPress={() => switchTheme(COLORS === THEMES.dark ? "purple" : "dark")}
            >
              <Ionicons name="moon" size={22} color={COLORS.text} />
            </TouchableOpacity>

            <TouchableOpacity
            style={styles.moonButton}
            onPress={() => router.push("/calculator")}
             >
            <Ionicons name="calculator-outline" size={22} color={COLORS.text} />
            </TouchableOpacity>

            <SignOutButton/>
          </View>
        </View>

        <BalanceCard summary={summary} />
        
        <View style = {styles.transactionsHeaderContainer}>
          <Text style = {styles.sectionTitle}>All Transactions</Text>
            
          <TouchableOpacity style = {styles.addButton} onPress={() => router.push("/create")}>
            <Ionicons name="add-circle" size={22} color={COLORS.card} />
          </TouchableOpacity>
          
        </View>
        
        

      </View>
      
      <FlatList 
      
        style = {styles.transactionsList}
        contentContainerStyle = {styles.transactionsListContent}
        data = {transactions}
        renderItem={({item}) => <TransactionItem item={item} onDelete={handleDelete} />}
        ListEmptyComponent={<NoTransactionsFound />} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />

    </View>
  )
}
