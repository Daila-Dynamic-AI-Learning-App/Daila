import React, { useState, useEffect } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  Button, 
  KeyboardAvoidingView, 
  ScrollView,  
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator, 
  Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default () => {
    return ( 
        <View>
            <Text>Profile</Text>
      </View>
    )
};