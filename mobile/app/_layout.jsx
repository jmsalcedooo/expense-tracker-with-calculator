import { Slot } from "expo-router";
import SafeScreen from "@/components/SafeScreen"
import { ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { StatusBar } from 'expo-status-bar';


import { ThemeProvider } from "../context/ThemeContext";

// export default function RootLayout() {
//   return (
//     <ClerkProvider tokenCache={tokenCache}>
//         <SafeScreen>
//           <Slot />
//         </SafeScreen>
//         <StatusBar style = "dark"/>
//     </ClerkProvider>
//   );
// }

export default function RootLayout() {
  return (
    <ClerkProvider 
      publishableKey="pk_test_Zmlyc3QtZG9kby02OC5jbGVyay5hY2NvdW50cy5kZXYk" 
      tokenCache={tokenCache}
    >
      <ThemeProvider>
        <SafeScreen>
          <Slot />
        </SafeScreen>
        <StatusBar style="dark" />
      </ThemeProvider>
    </ClerkProvider>
  );
}
