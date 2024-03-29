import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


function BellPrompt() {

    const navigation = useNavigation();
    const [questionIndex, setQuestionIndex] = useState(0);
    const [answerInput, setAnswerInput] = useState('');
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [showWarning, setShowWarning] = useState(false);
    
    const getQuestionById = async () => {
    const studyId = await AsyncStorage.getItem('studyId');
    console.log('studyId:', studyId);
    const token = await AsyncStorage.getItem('token');
    setLoading(true);
    const config = {
     method: 'get',
      maxBodyLength: Infinity,
     url: `https://daila.onrender.com/api/v1/question/${studyId}`,
     headers: { 
    'X-Token': token
      }
      
};

    
      
  try {
    setPrompt(''); 
    console.log(config.url)
    const response = await axios(config);
    setPrompt(response.data.prompt);
    AsyncStorage.setItem('prompt', response.data.prompt);
    console.log('Request was successful!');
  } catch (error) {
    console.log(error);
    setShowWarning(true);
  } 
  finally {
    setLoading(false);}
};

  return (
    <View style={styles.container}>
      
      <View style={styles.subContainerB}>
      <View style={styles.bellContainer}>
        <Image source={require('./../assets/bell2.png')}
    style={styles.logo}
    />
    
       <Text style={styles.welcome}>
          This is an assessment test. 
          Once you start you
          cannot interrupt it.
       </Text>
       </View>
      
    </View>
    {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#0bdc9f" />
        </View>
      )}
    <TouchableOpacity 
  onPress={async () => {
    await getQuestionById();
    navigation.navigate('Signup');
  }} 
  style={styles.customLogIn}
>
  <Text style={styles.text}>Start Test</Text>
</TouchableOpacity>


         <TouchableOpacity 
        onPress={() => 
        navigation.navigate('Login')} 
        style = {styles.customLogIn}
        >
          <Text style={styles.text}>Cancel</Text>
        </TouchableOpacity>
    </View>
  );
}

    const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center'
  },

    customLogIn: {
    backgroundColor: '#3C4142',
    borderRadius: 10,
    padding: 8,
    width: '70%',
    marginTop: 30,
    alignItems: 'center',  
    height: 40,
    },
  
     subContainerB:{
        backgroundColor: 'white',
        height: 400,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        //alignItems: 'center', 
        //justifyContent: 'center',
        borderWidth: 1,
        borderTopWidth: 1, 
        borderBottomWidth: 1.3,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        marginTop: 20,
        paddingBottom: 40,
        //flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35, 
        width: '93%',
     },

      logo: {
      width: 150,
      height: 150,
      marginBottom: 30,
    },

    subtitle: { 
      color: 'white',
       fontSize: 16,
       textAlign: 'center',
      width: 250,
      marginBottom: 15,
      //fontWeight: 'bold',
    },

    text: {
    color: '#0bdc9f',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: -3
  },

   welcome: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      fontStyle: 'normal',
      alignContent: 'center',
      padding: 10,
      },

    bellContainer: {
      alignContent: 'center',
      alignItems: 'center',
      //backgroundColor: 'red',
      height: '100%',
      marginTop: -10,
      width: '100%'
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


})


export default BellPrompt;
