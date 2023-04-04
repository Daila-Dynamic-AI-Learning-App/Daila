import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CheckingAnswers() {
  const [promptEnd, setPromptEnd] = useState('');

  useEffect(() => {
    const loadPrompt = async () => {
      const promptEnd = await AsyncStorage.getItem('promptEnd');
      if (promptEnd) {
        setPromptEnd(promptEnd);
      }
    };
    loadPrompt();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.subContainerB}>
        <Text style={styles.welcome}>
          {promptEnd}
        </Text>
      </View>
    </View>
  );
}


 const styles = StyleSheet.create({
      container: {
      flex: 1,
      alignItems: 'center', 
      justifyContent: 'center',
  },

  subContainerB:{
        backgroundColor: '#3C4142',
        height: 640,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center', 
        //justifyContent: 'center',
        borderWidth: 5,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 55,
        borderTopWidth: 0, 
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        marginTop: 10,
        paddingBottom: 40,
        //flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35, 
        width: '93%'
     },

        welcome: {
      color: '#f5f5f5',
      fontSize: 16.5,
      fontWeight: 'bold',
      fontStyle: 'normal',
      alignContent: 'center',
      padding: 10
    },

    logo: {
      width: 150,
      height: 200,
      marginBottom: 0,
      
    },

       subtitle: { 
      color: 'white',
       fontSize: 16,
       textAlign: 'center',
      width: 250,
      marginBottom: 30,
      //fontWeight: 'bold',
    },

 })





export default CheckingAnswers;