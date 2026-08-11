import { Redirect, Stack, Slot } from "expo-router"
import { useAuth } from "@clerk/clerk-expo"
import { THEMES } from "../../constants/colors";
import { useState } from "react";
import { ThemeProvider } from "../../context/ThemeContext";

// export default function AuthRoutesLayout() {
//   const { isSignedIn } = useAuth()

//   if (isSignedIn) {
//     return <Redirect href={"/"} />
//   }

//   return <Stack screenOptions = {{headerShown: false}}/>
// }

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth();

  if (isSignedIn) {
    return <Redirect href={"/"} />;
  }

  // Wrap children in ThemeProvider for context-based theming
  return (
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }} />
      {/* or <Slot /> if you use nested routes */}
    </ThemeProvider>
  );
}