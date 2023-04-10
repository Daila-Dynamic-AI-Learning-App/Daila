import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";



const NewUser = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState('');
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const COUNTRIES = [
    { name: "Afghanistan", code: "AF" },
{ name: "Albania", code: "AL" },
{ name: "Algeria", code: "DZ" },
{ name: "Andorra", code: "AD" },
{ name: "Angola", code: "AO" },
{ name: "Antigua and Barbuda", code: "AG" },
{ name: "Argentina", code: "AR" },
{ name: "Armenia", code: "AM" },
{ name: "Australia", code: "AU" },
{ name: "Austria", code: "AT" },
{ name: "Azerbaijan", code: "AZ" },
{ name: "Bahamas", code: "BS" },
{ name: "Bahrain", code: "BH" },
{ name: "Bangladesh", code: "BD" },
{ name: "Barbados", code: "BB" },
{ name: "Belarus", code: "BY" },
{ name: "Belgium", code: "BE" },
{ name: "Belize", code: "BZ" },
{ name: "Benin", code: "BJ" },
{ name: "Bhutan", code: "BT" },
{ name: "Bolivia", code: "BO" },
{ name: "Bosnia and Herzegovina", code: "BA" },
{ name: "Botswana", code: "BW" },
{ name: "Brazil", code: "BR" },
{ name: "Brunei", code: "BN" },
{ name: "Bulgaria", code: "BG" },
{ name: "Burkina Faso", code: "BF" },
{ name: "Burundi", code: "BI" },
{ name: "Cambodia", code: "KH" },
{ name: "Cameroon", code: "CM" },
{ name: "Canada", code: "CA" },
{ name: "Cape Verde", code: "CV" },
{ name: "Central African Republic", code: "CF" },
{ name: "Chad", code: "TD" },
{ name: "Chile", code: "CL" },
{ name: "China", code: "CN" },
{ name: "Colombia", code: "CO" },
{ name: "Comoros", code: "KM" },
{ name: "Congo", code: "CG" },
{ name: "Costa Rica", code: "CR" },
{ name: "Croatia", code: "HR" },
{ name: "Cuba", code: "CU" },
{ name: "Cyprus", code: "CY" },
{ name: "Czech Republic", code: "CZ" },
{ name: "Denmark", code: "DK" },
{ name: "Djibouti", code: "DJ" },
{ name: "Dominica", code: "DM" },
{ name: "Dominican Republic", code: "DO" },
{ name: "East Timor", code: "TL" },
{ name: "Ecuador", code: "EC" },
{ name: "Egypt", code: "EG" },
{ name: "El Salvador", code: "SV" },
{ name: "Equatorial Guinea", code: "GQ" },
{ name: "Eritrea", code: "ER" },
{ name: "Estonia", code: "EE" },
{ name: "Eswatini (Swaziland)", code: "SZ" },
{ name: "Ethiopia", code: "ET" },
{ name: "Fiji", code: "FJ" },
{ name: "Finland", code: "FI" },
{ name: "France", code: "FR" },
{ name: "Gabon", code: "GA" },
{ name: "Gambia", code: "GM" },
{ name: "Georgia", code: "GE" },
{ name: "Germany", code: "DE" },
{ name: "Ghana", code: "GH" },
{ name: "Greece", code: "GR" },
{ name: "Grenada", code: "GD" },
{ name: "Guatemala", code: "GT" },
{ name: "Guinea", code: "GN" },
{ name: "Guinea-Bissau", code: "GW" },
{ name: "Guyana", code: "GY" },
{ name: "Haiti", code: "HT" },
{ name: "Honduras", code: "HN" },
{ name: "Hungary", code: "HU" },
{ name: "Iceland", code: "IS" },
{ name: "India", code: "IN" },
{ name: "Indonesia", code: "ID" },
{ name: "Iran", code: "IR" },
{ name: "Iraq", code: "IQ" },
{ name: "Ireland", code: "IE" },
{ name: "Israel", code: "IL" },
{ name: "Italy", code: "IT" },
{ name: "Jamaica", code: "JM" },
{ name: "Japan", code: "JP" },
{ name: "Jordan", code: "JO" },
{ name: "Kazakhstan", code: "KZ" },
{ name: "Kenya", code: "KE" },
{ name: "Kiribati", code: "KI" },
{ name: "Kosovo", code: "XK" },
{ name: "Kuwait", code: "KW" },
{ name: "Kyrgyzstan", code: "KG" },
{ name: "Laos", code: "LA" },
{ name: "Latvia", code: "LV" },
{ name: "Lebanon", code: "LB" },
{ name: "Lesotho", code: "LS" },
{ name: "Liberia", code: "LR" },
{ name: "Libya", code: "LY" },
{ name: "Liechtenstein", code: "LI" },
{ name: "Lithuania", code: "LT" },
{ name: "Luxembourg", code: "LU" },
{ name: "Madagascar", code: "MG" },
{ name: "Malawi", code: "MW" },
{ name: "Malaysia", code: "MY" },
{ name: "Maldives", code: "MV" },
{ name: "Mali", code: "ML" },
{ name: "Malta", code: "MT" },
{ name: "Marshall Islands", code: "MH" },
{ name: "Mauritania", code: "MR" },
{ name: "Mauritius", code: "MU" },
{ name: "Mexico", code: "MX" },
{ name: "Micronesia", code: "FM" },
{ name: "Moldova", code: "MD" },
{ name: "Monaco", code: "MC" },
{ name: "Mongolia", code: "MN" },
{ name: "Montenegro", code: "ME" },
{ name: "Morocco", code: "MA" },
{ name: "Mozambique", code: "MZ" },
{ name: "Myanmar (Burma)", code: "MM" },
{ name: "Namibia", code: "NA" },
{ name: "Nauru", code: "NR" },
{ name: "Nepal", code: "NP" },
{ name: "Netherlands", code: "NL" },
{ name: "New Zealand", code: "NZ" },
{ name: "Nicaragua", code: "NI" },
{ name: "Niger", code: "NE" },
{ name: "Nigeria", code: "NG" },
{ name: "North Korea", code: "KP" },
{ name: "North Macedonia (Macedonia)", code: "MK" },
{ name: "Norway", code: "NO" },
{ name: "Oman", code: "OM" },
{ name: "Pakistan", code: "PK" },
{ name: "Palau", code: "PW" },
{ name: "Panama", code: "PA" },
{ name: "Papua New Guinea", code: "PG" },
{ name: "Paraguay", code: "PY" },
{ name: "Peru", code: "PE" },
{ name: "Philippines", code: "PH" },
{ name: "Poland", code: "PL" },
{ name: "Portugal", code: "PT" },
{ name: "Qatar", code: "QA" },
{ name: "Romania", code: "RO" },
{ name: "Russia", code: "RU" },
{ name: "Rwanda", code: "RW" },
{ name: "Saint Kitts and Nevis", code: "KN" },
{ name: "Saint Lucia", code: "LC" },
{ name: "Saint Vincent and the Grenadines", code: "VC" },
{ name: "Samoa", code: "WS" },
{ name: "San Marino", code: "SM" },
{ name: "Sao Tome and Principe", code: "ST" },
{ name: "Saudi Arabia", code: "SA" },
{ name: "Senegal", code: "SN" },
{ name: "Serbia", code: "RS" },
{ name: "Seychelles", code: "SC" },
{ name: "Sierra Leone", code: "SL" },
{ name: "Singapore", code: "SG" },
{ name: "Slovakia", code: "SK" },
{ name: "Slovenia", code: "SI" },
{ name: "Solomon Islands", code: "SB" },
{ name: "Somalia", code: "SO" },
{ name: "South Africa", code: "ZA" },
{ name: "South Korea", code: "KR" },
{ name: "South Sudan", code: "SS" },
{ name: "Spain", code: "ES" },
{ name: "Sri Lanka", code: "LK" },
{ name: "Sudan", code: "SD" },
{ name: "Suriname", code: "SR" },
{ name: "Sweden", code: "SE" },
{ name: "Switzerland", code: "CH" },
{ name: "Syria", code: "SY" },
{ name: "Taiwan", code: "TW" },
{ name: "Tajikistan", code: "TJ" },
{ name: "Tanzania", code: "TZ" },
{ name: "Thailand", code: "TH" },
{ name: "Timor-Leste", code: "TL" },
{ name: "Togo", code: "TG" },
{ name: "Tonga", code: "TO" },
{ name: "Trinidad and Tobago", code: "TT" },
{ name: "Tunisia", code: "TN" },
{ name: "Turkey", code: "TR" },
{ name: "Turkmenistan", code: "TM" },
{ name: "Tuvalu", code: "TV" },
{ name: "Uganda", code: "UG" },
{ name: "Ukraine", code: "UA" },
{ name: "United Arab Emirates", code: "AE" },
{ name: "United Kingdom", code: "GB" },
{ name: "United States of America", code: "US" },
{ name: "Uruguay", code: "UY" },
{ name: "Uzbekistan", code: "UZ" },
{ name: "Vanuatu", code: "VU" },
{ name: "Venezuela", code: "VE" },
{ name: "Vietnam", code: "VN" },
{ name: "Yemen", code: "YE" },
{ name: "Zambia", code: "ZM" },
{ name: "Zimbabwe", code: "ZW" },

    // Add more countries here
  ];
  
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  const handleCountrySelect = () => {
    setCountry(selectedCountry);
    setShowPicker(false);
  };
  
  
  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("😵‍💫 Error","Passwords don't match.");
      return;
    }
    if (!email || !password || !username) {
      Alert.alert("🤨 Error","Please fill in all required fields.");
      return;
    }
    setLoading(true);
    var data = {
      email,
      password,
      username,
      country
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
      console.log(config.data);
      setError("Network error. Please try again later.");
    }
    finally {
      setLoading(false);}
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

          <TouchableOpacity
  style={[styles.inputContainer, styles.pickerContainer]}
  onPress={() => setShowPicker(true)}
>
  <Image
    source={require("./assets/flag-icon.png")}
    style={styles.icon}
  />
  <Text style={styles.pickerText}>
    {country ? country : "Select your country"}
  </Text>
  <Image
    source={require("./assets/arrow.png")}
    style={styles.icon}
  />
</TouchableOpacity>


          <Modal visible={showPicker} animationType="slide">
            <View style={styles.modalContainer}>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowPicker(false)}>
              
                </TouchableOpacity>
                <Text style={styles.modalHeaderText}>Select your country</Text>
                <View style={styles.modalHeaderRight}>
                  <TouchableOpacity onPress={() => setShowPicker(false)}>
                    <Text style={styles.modalHeaderButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleCountrySelect()}>
                    <Text style={styles.modalHeaderButtonText}>Select</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedCountry}
                  onValueChange={(itemValue) =>
                    setSelectedCountry(itemValue)
                  }
                >
                  {COUNTRIES.map((country) => (
                    <Picker.Item
                      key={country.code}
                      label={`${country.name} (${country.code})`}
                      value={country.name}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </Modal>
        
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

          <View style={styles.containerload}>
     

    </View>

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
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0bdc9f" />
        </View>
      )}
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
  picker: {
      flex: 1,
      width: "100%",
     // or whatever height you prefer
  }
,  
containerload: {
  flex: 1,
  backgroundColor: 'black',
  // other styles as needed
},
modalContainer: {
  flex: 1, 
  justifyContent: 'center',
  backgroundColor: '#808080',
  padding: 20,
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
  modalHeader: {
    backgroundColor: "#eee",
    height: 60,

    alignItems: "center",
    flexDirection: "row",
    paddingLeft: 7,
    paddingRight: 3,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  

modalHeaderText: {
  fontSize: 20,
  fontWeight: "bold",
  textAlign: "center",
  flex: 1,
},

modalHeaderRight: {
  flexDirection: "row",
},

modalHeaderButtonText: {
  fontSize: 16,
  marginLeft: 10,
  marginRight: 10,
  color: "#0DA57A",
},

pickerText: {
  flex: 1,
  fontSize: 16,
  color: "#555",
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
   pickerContainer: {
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: 'white',
    marginLeft: 20,
    marginRight: 20,
  },
  
  
});

export default NewUser;