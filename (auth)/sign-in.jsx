import { useSignIn } from "@clerk/clerk-expo"
import { Link, useRouter } from "expo-router"
import { Text, TextInput, TouchableOpacity, View, Image } from "react-native"
import { useState } from "react"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
//import { styles } from "@/assets/styles/auth.styles.js"
import { Ionicons } from "@expo/vector-icons";
//import { COLORS } from "../../constants/colors";
import { createAuthStyles } from "@/assets/styles/auth.styles.js";
import { useTheme } from "../../context/ThemeContext";

export default function Page() {
  const { COLORS } = useTheme();
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()
  const styles = createAuthStyles(COLORS);
  const [emailAddress, setEmailAddress] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
const [showPassword, setShowPassword] = useState(false);

  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      if (err.errors?.[0]?.code === "form_password_incorrect"){
        setError("Password is incorrect. Please try again.");
      } else {
        setError("An error occured. Please try again.");
      }
      console.log(err)
    }
  }

  return (
    <KeyboardAwareScrollView 
      style = {{flex: 1}}
      contentContainerStyle = {{flexGrow: 1}}
      enableOnAndroid = {true}
      enableAutomaticScroll = {true}
      extraScrollHeight= {100}
    >
      <View style = {styles.container}>
          <Image source = {require("../../assets/images/revenue-i4.png")} style={styles.illustration}/>
          <Text style = {styles.title}>Log In</Text>
      
      {error ? (
        <View style = {styles.errorBox}>
          <Ionicons name = "alert-circle" size = {20} color = {COLORS.expense}/>
          <Text style = {styles.errorText}>(error)</Text>
          <TouchableOpacity onPress = {() => setError("")}>
            <Ionicons name = "close" size = {20} color = {COLORS.textLight}/> 
          </TouchableOpacity>             
        </View>
      ) : null}

      <TextInput
        style = {[styles.input, error && styles.errorInput]}
        autoCapitalize="none"
        value={emailAddress}
        placeholderTextColor= "#9A8478"
        placeholder="Enter email"
        onChangeText={(email) => setEmailAddress(email)}
      />

      {/* <TextInput
        style = {[styles.input, error && styles.errorInput]}
        value={password}
        placeholder="Enter password"
        placeholderTextColor= "#9A8478"
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
      /> */}

<View style={{ position: "relative" }}>
  <TextInput
    style={[styles.input, error && styles.errorInput, { paddingRight: 40 }]}
    value={password}
    placeholder="Enter password"
    placeholderTextColor="#9A8478"
    secureTextEntry={!showPassword}
    onChangeText={setPassword}
  />
  <TouchableOpacity
    onPress={() => setShowPassword((prev) => !prev)}
    style={{
  position: "absolute",
  right: 10,
  top: 0,
  height: "80%",
  justifyContent: "center",
  alignItems: "center",
  width: 35,
    }}
  >
    <Ionicons
      name={showPassword ? "eye-off" : "eye"}
      size={22}
      color={COLORS.text}
    />
  </TouchableOpacity>
</View>


      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style = {styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.footerContainer}>
        <Text style = {styles.footerText}>Don&apos;t have an account?</Text>
        
        <Link href ="/sign-up" asChild>
          <TouchableOpacity>
            <Text style = {styles.linkText} >Sign Up</Text>  
          </TouchableOpacity>
        </Link>
      </View>

      </View>
    </KeyboardAwareScrollView>
  )
}