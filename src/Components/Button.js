import react from "react";
import { StyleSheet,Text, TouchableOpacity } from "react-native";


export default function (props) {
    return (
         <TouchableOpacity style={styles.customLogIn} {...props}>
            <Text style={styles.text}>{props.children}</Text>
          </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
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
    }
});