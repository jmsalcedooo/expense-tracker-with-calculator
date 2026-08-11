import { useClerk } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity, Alert, Platform } from 'react-native'
// import { styles } from "../assets/styles/home.styles"
// import { COLORS } from "../constants/colors.js"
import { createHomeStyles } from "../assets/styles/home.styles"
import { useTheme } from "../context/ThemeContext"


export const SignOutButton = () => {
  const { signOut } = useClerk();
  
  //📌
  const { COLORS } = useTheme();
  const styles = createHomeStyles(COLORS);


  const handleSignOut = async () => {
    if (Platform.OS === 'web') {
      // Standard browser confirmation for Vercel
      const confirmOut = window.confirm("Are you sure you want to log out?");
      if (confirmOut) {
        await signOut();
      }
    } else {
      // Native iOS/Android pop-up for Expo Go
      Alert.alert("Logout", "Are you sure you want to log out?", [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: signOut }, 
      ]);
    }
  };

  return (
    <TouchableOpacity style = {styles.logoutButton} onPress={handleSignOut}>
      <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
    </TouchableOpacity>
  )
}
