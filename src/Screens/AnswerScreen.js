import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Linking, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function CheckingAnswers() {
  const [promptEnd, setPromptEnd] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const loadPrompt = async () => {
      const promptEnd = await AsyncStorage.getItem('promptEnd');
      if (promptEnd) {
        setPromptEnd(promptEnd);
      }
    };
    loadPrompt();
  }, []);

  const handleUrlPress = (url) => {
    Linking.openURL(url);
  }

  const renderText = (text) => {
    const regex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (regex.test(part)) {
        return (
          <Text key={index} style={{color: '#0bdc9f'}} onPress={() => handleUrlPress(part)}>
            {part}
          </Text>
        );
      } else {
        return part;
      }
    });
  }

  const handleReturn = () => {
    navigation.navigate('Login');
  }

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.subContainerB}>
        <Text style={styles.welcome}>
          {renderText(promptEnd)}
        </Text>
        <TouchableOpacity style={styles.returnButton} onPress={handleReturn}>
          <Text style={styles.returnText}>Return</Text>
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  subContainerB: {
    backgroundColor: '#3C4142',
    minHeight: 200,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    alignItems: 'center', 
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
    paddingBottom: 40,
    marginLeft: 35,
    marginRight: 35, 
    width: '93%',
    justifyContent: 'center',
  },
  welcome: {
    color: '#f5f5f5',
    fontSize: 16.5,
    fontWeight: 'bold',
    fontStyle: 'normal',
    padding: 10,
    textAlign: 'center',
  },
  returnButton: {
    backgroundColor: '#0bdc9f',
    borderRadius: 5,
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  returnText: {
    color: '#f5f5f5',
    fontSize: 16.5,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CheckingAnswers;
