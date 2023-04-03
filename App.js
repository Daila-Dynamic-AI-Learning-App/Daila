// In App.js in a new project
//import 'node-libs-react-native/globals';
//global.Buffer = global.Buffer || require('buffer').Buffer;

//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';


import HomeScreen from './src/Home';
import LoginScreen from './src/selectLevel';
import SignupScreen from './src/questions';
import CheckingAnswers from './src/Answers';
import LoadScreen from './src/loadingScreen';
import BellPrompt from './src/bellPrompt';
import NewUser from './src/newUser';


const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = React.useState(false);
 
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000)
  }, []);

  if( isLoading ) {
    return(
      <View style={{flex: 1,justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator size="large" />
      </View>
    )
  }
  return (
    
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="LoadingScreen" component={LoadScreen} 
         options={{
            headerTitle: '',
            headerShown: false
          }}
        />

        <Stack.Screen name="Home" component={HomeScreen} 
          options={{
            headerTitle: '',
          }}
        />
         <Stack.Screen name="Login" component={LoginScreen}
          options={{
            headerTitle: '',
          }}
         />
         
         <Stack.Screen name="UserSignup" component={NewUser}
          options={{
            headerTitle: '',
          }}
         />

        <Stack.Screen name='BellPrompt' component={BellPrompt} 
         options={{
            headerTitle: '',
          }}
        />  
         <Stack.Screen name="Signup" component={SignupScreen} 
          options={{
            headerTitle: '',
          }}
         />
         <Stack.Screen name="Answers" component={CheckingAnswers} 
          options={{
            headerTitle: '',
          }}
         />
          
         </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;