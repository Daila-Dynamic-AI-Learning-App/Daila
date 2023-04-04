import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import axios from "axios";
import qs from "qs";
import { useNavigation } from "@react-navigation/native";

const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    if (!email || !password || !username || !country) {
      setError("Please fill in all required fields.");
      return;
    }

    var data = {
      email,
      password,
      username,
      country,
    };
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://daila.onrender.com/api/v1/register",
      headers: { "content-type": "application/json" },
      data: data,
    };

    try {
      const response = await axios(config);
      console.log(JSON.stringify(response.data));
      if (response.data.message === "success") {
        navigation.navigate("Home");
      } else {
        setError(response.data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      setError("Network error. Please try again later.");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.boxx}>
          <View style={styles.inputContainer}>
            <Image source={require("./assets/trans.png")} style={styles.icon} />
            <TextInput
              style={styles.inputt}
              placeholder="Enter your full name"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image
              source={require("./assets/flag-icon.png")}
              style={styles.icon}
            />

            <TextInput
              style={styles.inputt}
              placeholder="Enter your country"
              value={country}
              onChangeText={setCountry}
            />
          </View>

          <View style={styles.inputContainer}>
            <Image source={require("./assets/gMail.png")} style={styles.icon} />

            <TextInput
              style={styles.inputt}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.line} />

          <View style={styles.inputContainer}>
            <Image
              source={require("./assets/passWord.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputt}
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
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

          <View style={styles.inputContainer}>
            <Image
              source={require("./assets/passWord.png")}
              style={styles.icon}
            />
            <TextInput
              style={styles.inputt}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
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

          <TouchableOpacity style={styles.customLogIn} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  boxx: {
    marginTop: 80,
  },

  inputContainer: {
    padding: 10,
    backgroundColor: "white",
    marginTop: 20,
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

  inputt: {
    flex: 1,
    height: 40,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#3C4142",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#0bdc9f",
    fontSize: 18,
    fontWeight: "bold",
  },

  icon: {
    marginRight: 10,
    height: 15,
    width: 15,
  },

  line: {
    height: 1,
    backgroundColor: "black",
    marginTop: 20,
    width: "85%",
    left: 25,
  },

  innerBottonsContainer: {
    //backgroundColor: 'yellow',
    height: 80,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 0,
    paddingTop: 0,
    marginTop: 15,
    marginBottom: 0,
    //paddingBottom: 40,
    flexDirection: "row",
    //marginLeft: 3,
    marginRight: 15,
    width: "100%",
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
});

export default NewUser;