import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';



function LoginScreen() {

    const [levelOfStudy, setLevelOfStudy] = useState('');
    const [interestedTopics, setInterestedTopics] = useState('');
    const navigation = useNavigation();
    

    const elementarySchoolSubjects = [
    'Social Studies',
    'Science and Nature',
    'Art and Music',
    'Physical Education',
    'Mathematics and Logic',
    'Language Arts',
    'Reading and Writing',
    'Critical Thinking',
    'Character Education',
  ];

     const middleSchoolSubjects = [
    'History and Geography',
    'Earth and Space Science',
    'Life Science',
    'Physical Science',
    'Foreign Languages',
    'Computer Science',
    'Health and Wellness',
    'Creative Writing',
    'Journalism',
  ];

   const highSchoolSubjects = [
    'Mathematics and Statistics',
    'Science and Engineering',
    'Social Sciences',
    'Arts and Humanities',
    'Business',
    'Communications and Journalism',
    'Computer Science and Information Technology',
    'Education',
    'Health and Wellness',
    'Law and Public Policy',
  ];

   const collegeSubjects = [
    'Anthropology',
    'Biology',
    'Chemistry',
    'Computer Science',
    'Economics',
    'Education',
    'Engineering',
    'English',
    'Geography',
    'History',
    'Law',
    'Mathematics',
    'Medicine',
    'Philosophy',
    'Physics',
    'Psychology',
    'Sociology',
  ];

   const subjects =
    levelOfStudy === 'Elementary School'
      ? elementarySchoolSubjects
      :levelOfStudy === 'Middle School'
      ? middleSchoolSubjects
      : levelOfStudy === 'High School'
      ? highSchoolSubjects
      : collegeSubjects;

const handleSubmit = () => {
  var qs = require('qs');
  var data = qs.stringify({
    studyLevel: levelOfStudy,
    topicOfInterest: interestedTopics,
    'studyYear': '1st year' 
  });
  var config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://daila.onrender.com/api/v1/study',
    headers: { 
      'X-Token': 'f1fa2b39-bea7-4c4c-abf1-7c31503be0c5'
    },
    data: data
  };

  axios(config)
    .then(async function (response) {
      console.log(JSON.stringify(data));
      console.log(JSON.stringify(response.data));
      try {
        await AsyncStorage.setItem('studyId', response.data.studyId);
        console.log('studyId stored successfully');
      } catch (error) {
        console.log('Error storing studyId: ', error);
        const studyId = await AsyncStorage.getItem('studyId');
        console.log('Study ID:', studyId);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
};



    return (
    <View style={styles.container}>
    
       <View style={styles.subContainer}>
           <Text style={styles.welcome}>Getting Started</Text>
       </View>
    
        <View style={styles.subContainerB}>
          <View style={styles.innerContainer}> 
          <View style={styles.inputContainer}>
              <Picker
                style={styles.input}
                selectedValue={levelOfStudy}
                onValueChange={(itemValue) => setLevelOfStudy(itemValue)}
                >
              <Picker.Item label="Elementary School" value="Elementary School" />
              <Picker.Item label="Middle School" value="Middle School" />
              <Picker.Item label="High School" value="High School" />
              <Picker.Item label="College" value="College" />
              </Picker>
           </View>
         
             {levelOfStudy === 'Elementary School' ? (
            <View style={styles.inputContainer}>
            <Picker 
            style={styles.input}
            selectedValue={interestedTopics}
            onValueChange={(itemValue) => setInterestedTopics(itemValue)}
            >  
               {elementarySchoolSubjects.map((subject) => (
                  <Picker.Item key={subject} label={subject} value={subject} />
                ))}
            </Picker>
            </View>
             ) : levelOfStudy === 'Middle School' ? (
                <View style={styles.inputContainer}>
              <Picker
                style={styles.input}
                selectedValue={interestedTopics}
                onValueChange={(itemValue) => setInterestedTopics(itemValue)}>
                {middleSchoolSubjects.map((subject) => (
                  <Picker.Item key={subject} label={subject} value={subject} />
                ))}
              </Picker>
            </View>
          ) : levelOfStudy === 'High School' ? (
             <View style={styles.inputContainer}>
            <Picker
              style={styles.input}
              selectedValue={interestedTopics}
              onValueChange={(itemValue) => setInterestedTopics(itemValue)}>
              {highSchoolSubjects.map((subject) => (
                <Picker.Item key={subject} label={subject} value={subject} />
              ))}
            </Picker>
          </View>
        ) : (
          
           <View style={styles.inputContainer}>
            <Picker
              style={styles.input}
              selectedValue={interestedTopics}
              onValueChange={(itemValue) => setInterestedTopics(itemValue)}>
              {collegeSubjects.map((subject) => (
                <Picker.Item key={subject} label={subject} value={subject} />
              ))}
            </Picker>
          </View>
        )} 
           </View>
        </View>
      
      <View>
  <TouchableOpacity 
    onPress={() => {
      handleSubmit();
      navigation.navigate('BellPrompt');
    }} 
      style={styles.customLogIn}
      >
        <Text style={styles.text}>NEXT</Text>
      </TouchableOpacity>
    </View>

      </View>
);

}

const styles = StyleSheet.create({
     
     container: {
    flex: 1,
    alignItems: 'center', 
    //justifyContent: 'center'
  },
    
    subContainer:{
        backgroundColor: 'white',
        height: 120,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 55,
        borderTopWidth: 0, 
        padding: 20,
        paddingTop: 30,
     },

      welcome: {
      color: 'black',
      fontSize: 45,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    
    subContainerB:{
        backgroundColor: 'white',
        height: 350,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center', 
       // justifyContent: 'center',
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
        paddingTop: 0,
        marginTop: 40,
        paddingBottom: 40,
        //flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35, 
     },
 
      inputContainer: {
      padding: 10,
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 10,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      marginLeft: 20,
      marginRight: 20, 
      marginTop: 50,
      width: '100%',  
      height: 50,
    },

    input: {
    flex: 1,
    height: 40,
    //margin: 10
    //backgroundColor: 'green'
  },

  innerContainer: {
    marginTop: 70,
    height: '50%',
    justifyContent: 'center'
    //width: 300
  },

  subtitle: { 
      color: 'black',
       fontSize: 16,
       textAlign: 'center',
      width: 20,
      marginBottom: 0,
      //fontWeight: 'bold',
    },

    customLogIn: {
    backgroundColor: '#3C4142',
    borderRadius: 10,
    padding: 8,
    width: '50%',
    alignSelf: 'center',
    marginTop: 50,
    alignItems: 'center',  
    height: 40,
    },

    text: {
    color: '#0bdc9f',
    fontSize: 11,
    fontWeight: 'bold',
    padding: 5,

  },

})

export default LoginScreen;