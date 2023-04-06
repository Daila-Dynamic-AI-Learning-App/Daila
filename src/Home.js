import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

function HomeScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("🤨 Error","Please fill in all required fields.");
      return;
    }
    setLoading(true);
    var data = {
      email,
      password,
    };

    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://daila.onrender.com/api/v1/login",
      headers: { "content-type": "application/json" },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(response.data); // add this line to see the response on console

      // update the token value in the state
      setToken(response.data.token);

      // save the token in the async storage
      await AsyncStorage.setItem("token", response.data.token);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        Alert.alert("😵‍💫 Error", "Username and password do not match.");
      } else {
        setError("Network error. Please try again later.");
      }
    }
    finally {
      setLoading(false);}
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  function showPasswordRecoveryAlert() {
    Alert.alert(
      '😢 Password Recovery Unavailable',
      'We are sorry to inform you that the password recovery feature is currently unavailable, but we are working on bringing it back as soon as possible. Thank you for your patience!',
      [{ text: 'OK' }]
    );
  }

  return (
    <View>
       {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0bdc9f" />
        </View>
      )}
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <Image source={require("./assets/daila-1.png")} style={styles.logo} />
          <Text style={styles.welcome}>Welcome</Text>
          <Text style={styles.subtitle}>Your Dynamic AI Learning App</Text>
        </View>

       
        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <Image source={require("./assets/gMail.png")} style={styles.icon} />

            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <View style={styles.containerload}>

    </View>

          <View style={styles.inputContainer}>
            <Image
              source={require("./assets/passWord.png")}
              style={styles.icon}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword}>
              <Image
                source={
                  showPassword
                    ? require("./assets/showPass.png")
                    : require("./assets/showPass.png")
                }
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity onPress={showPasswordRecoveryAlert}>
            <Text style={styles.subtitleB}>Forgot Password?</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogin} style={styles.customLogIn}>
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Need an account? </Text>

            <TouchableOpacity onPress={() => navigation.navigate("UserSignup")}>
              <Text style={[styles.signupText, styles.signupLink]}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center'
  },

  subContainer: {
    backgroundColor: "#3C4142",
    //padding: 100,
    height: 280,
    marginTop: 0,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  welcome: {
    color: "#0bdc9f",
    fontSize: 46,
    fontWeight: "bold",
    fontStyle: "normal",
  },

  subtitle: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    width: 250,
    marginBottom: 30,
    //fontWeight: 'bold',
  },

  logo: {
    width: 150,
    height: 200,
    marginBottom: 0,
  },

  inputContainer: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 30,
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    marginLeft: 20,
    marginRight: 20,
  },

  icon: {
    marginRight: 10,
    height: 15,
    width: 15,
  },

  input: {
    flex: 1,
    height: 40,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },

  subtitleB: {
    color: "black",
    fontSize: 10,
    textAlign: "right",
    width: 100,
    marginTop: 5,
    fontWeight: "bold",
    right: 25,
    position: "absolute",
  },

  subtitleC: {
    color: "black",
    fontSize: 10,
    textAlign: "right",
    width: 100,
    marginTop: 10,
    fontWeight: "bold",
    right: 25,
    position: "absolute",
  },

  signupContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginTop: 50,
    alignSelf: "center",
  },
  signupText: {
    color: "black",
  },

  signupLink: {
    fontWeight: "bold",
    marginLeft: 5,
    color: "black",
  },

  customLogIn: {
    backgroundColor: "#3C4142",
    borderRadius: 10,
    padding: 8,
    width: "70%",
    alignSelf: "center",
    marginTop: 50,
    alignItems: "center",
    height: 40,
  },

  text: {
    color: "#0bdc9f",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default HomeScreen;
