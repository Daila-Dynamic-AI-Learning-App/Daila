import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import SHOW_PASSWORD_PNG from './../assets/showPass.png'


export default (props) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <View style={styles.inputContainer}>
            <Image
              source={props.icon}
              style={styles.icon}
            />

            <TextInput
                style={styles.input}
                {...props}
              secureTextEntry={!showPassword}
            />
            {
                props?.type == 'password' ?
                    (
                        <TouchableOpacity onPress={toggleShowPassword}>
                            <Image
                                source={
                                showPassword
                                    ? SHOW_PASSWORD_PNG
                                    : SHOW_PASSWORD_PNG
                                }
                                style={styles.icon}
                            />
                        </TouchableOpacity>
                    ):null
            }
           
          </View>
    );
};

//style section 
const styles = StyleSheet.create({
    input: {
        flex: 1,
        height: 40,
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

})