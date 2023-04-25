// In App.js in a new project
//import 'node-libs-react-native/globals';
//global.Buffer = global.Buffer || require('buffer').Buffer;

//import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import RootNavigator from './src/RootNavigator';



const Stack = createNativeStackNavigator();

function App() {
  return (
    <RootNavigator/>
  );
}

export default App;