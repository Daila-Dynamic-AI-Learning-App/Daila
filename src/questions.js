import React, { useState, useEffect } from 'react';
import { View, 
  Text, 
  StyleSheet, 
  Button, 
  TextInput, 
  KeyboardAvoidingView, 
  ScrollView,  
  Platform,
  TouchableOpacity, 
  Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import axios from 'axios';


function WarningDialog({ onConfirm, onCancel }) {
  const text = 'Your progress will be lost if you cancel your work';
  const navigation = useNavigation();

  return (
        <View style={styles.popUp}>
        <View style={styles.background}>
          <SignupScreen style={styles.signup} />
        </View>

         <View style={styles.overBlur} />


        <BlurView intensity={180} tint="dark" style={styles.popBlurContainer}>
        

       <View style={styles.popNoContainer}>
         <View style={styles.popRoundContainer}>
          <Text style={styles.popnumInRound}>i</Text>
        </View>
        </View>
        
        <View style={styles.innerContainer}>
        <Text style = {styles.popText}>{text}</Text>
          <View style={styles.innerBottonsContainer}>
          
            <TouchableOpacity onPress={() => {
          navigation.navigate('Signup');
        onCancel();
        }} 
        style={styles.customLogIn}>
      <Text style={styles.customLogInText}>Continue</Text>
      </TouchableOpacity>
                
      <TouchableOpacity 
        onPress={() => {
        navigation.navigate('Login')
        onConfirm();
      }}
        style = {styles.customLogIn}>
          <Text style={styles.customLogInText}>Exit Test</Text>
        </TouchableOpacity>
          </View>
      
          </View>  
      </BlurView>
      </View>
  );
    
}

function SignupScreen() {

  const [questionIndex, setQuestionIndex] = useState(0);
const [questions, setQuestions] = useState([]);
const [answerInput, setAnswerInput] = useState('');
const [prompt, setPrompt] = useState('');
const [isLoading, setIsLoading] = useState(true);
const [showWarning, setShowWarning] = useState(false);

const navigation = useNavigation();
useEffect(() => {
  const fetchData = async () => {
    const studyId = 'YOUR_STUDY_ID_HERE';
    const token = 'YOUR_AUTHORIZATION_TOKEN_HERE';

    try {
      const response = await axios.get(
        `https://daila.onrender.com/api/v1/question/6424a1c9210f2d7c7036c42f?studyId=${studyId}`,
        {
          headers: {
            'X-Token': token,
          },
        },
      );

      setPrompt(response.data.prompt);
      setQuestions(response.data.questions);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  fetchData();
}, []);


const handleAnswerSubmit = () => {
  if (questionIndex < questions.length - 1){
    setAnswerInput('');
    setQuestionIndex(questionIndex + 1);
  }
  else{
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate('Answers');
    }, 2000);
  }
};

const handleCancelPress = () => {
    setShowWarning(true);
  };

  const handleWarningConfirm = () => {
    setShowWarning(false);
  };

/*
  if (isLoading){
    return (
      <View style={styles.loadingContainer}>
          <Image source={require('./assets/Iconnn.png') }
            style={styles.logo} 
            resizeMode='contain'
            />
            <Text style={styles.subtitle}>Checking Answers...</Text>
      </View>
    );
  }
*/

 if (showWarning) {
    return (
    <WarningDialog 
      onConfirm={handleWarningConfirm} 
      onCancel={() => setShowWarning(false)}
    />
  );
  }
  //0559340134
  return (    

      <KeyboardAvoidingView>
        <ScrollView>
          
      <View style={[styles.container, styles.content,  { zIndex: 0 }]}>

        {showWarning && <View style={[styles.overlay, { zIndex: 1 }]} />}
        {showWarning && (
          
            <WarningDialog
              onConfirm={handleWarningConfirm}
              onCancel={() => setShowWarning(false)}
              navigation={navigation}
            />
        )}

      <View style={styles.subContainerB}>
                <Text style={styles.welcome}>{prompt}</Text>
      </View>
          
        <View style={styles.queNoContainer}>
         <View style={styles.queRoundContainer}>
          <Text style={styles.numInRound}>1</Text>
        </View>

        </View>

        <View style={styles.inputContainer}>
        <TextInput 
          style={styles.answerInput}
          placeholder="Enter Answer"
          value={answerInput}
          multiline={true}
          onChangeText={(text) => setAnswerInput(text)}
        />     
        <Button title='>>' onPress={handleAnswerSubmit} />
        </View>

      <TouchableOpacity onPress={handleCancelPress}>
        <View style={styles.cancelContainer}>
        <View style={styles.numContainer}> 
           <Text style={styles.xxx}>X</Text>
        </View>
      </View> 
      </TouchableOpacity>    
      

    </View>
  </ScrollView> 
    </KeyboardAvoidingView>
     
    );
}

  const styles = StyleSheet.create({

    loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8f8f6',
  },

     keyboardAvoidingView: {
    flex: 1,
  },

    container: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
  },

   subContainerB:{
        backgroundColor: 'white',
        height: 400,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 55,
        borderTopWidth: 1, 
        borderBottomWidth: 1.3,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 50,
        marginTop: 80,
        paddingBottom: 40,
        //flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35, 
        width: '93%',
     },

        numContainer:{
        height: 60,
        backgroundColor: '#3C4142',
        borderTopRightRadius: 90,
        borderTopLeftRadius: 90,
        borderBottomLeftRadius: 90,
        borderBottomRightRadius: 90,
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: '#ddd',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 55, 
        marginTop: 10, 
        width: 60
     },

     welcome: {
      color: 'black',
      fontSize: 25,
      fontWeight: 'bold',
      fontStyle: 'normal',
      alignContent: 'center',
      padding: 10
    },

     subtitle: { 
      color: 'white',
       fontSize: 16,
       textAlign: 'center',
       width: 250,
      marginBottom: 30,
      //fontWeight: 'bold',
    },

      inputContainer: {
      padding: 10,
      backgroundColor: 'white',
      marginTop: 0,
      flexDirection: 'row',
      borderRadius: 15,
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ddd',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 5,
      marginLeft: 20,
      marginRight: 20,    
    },

    answerInput: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    padding: 5,
    flex: 1,
},

 result: {
  color: 'green',
  fontSize: 16,
  fontWeight: 'bold',
  textAlign: 'center',
},

      signupContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 80,
        alignSelf: 'center',
        backgroundColor: 'white',
        height: 100
  },

    logo: {
    width: 300,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,  
    marginBottom: 0,
    marginTop: 100,
  },

    background: {
      flex: 1,
  },

     subtitle: { 
      color: 'black',
       fontSize: 16,
       textAlign: 'center',
      width: 250,
      marginTop: 0,
      fontWeight: 'bold',
      marginBottom: 100
    },

    cancelContainer: {
    position: 'relative',
    top: 10,
   marginBottom: 17
  },

      queNoContainer: {
      //position: 'absolute',
      left: '50%',
      marginBottom: -15,
      top: -428,
      marginRight: 350,
      width: 60,
      height: 60,
      borderRadius: 30,
      borderWidth: 1,
      borderColor: 'black',
      backgroundColor: 'white',
      alignContent: 'center',
      alignItems: 'center',
      
      },

      queRoundContainer:{
        height: 50,
        backgroundColor: 'white',
        borderRadius: 25,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 50
     },

    xxx: {
      color: '#0bdc9f',
      fontSize: 25,
      //fontWeight: 'bold',
      padding: 2
    },

    numInRound: {
      color: 'black',
      fontSize: 30,
      fontWeight: 'bold',
      marginTop: 4
    },

    dialogOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  dialogContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    position: 'absolute',
    alignSelf: 'center',
    top: 210, // change this to adjust the vertical position of the dialog box
    left: '10%',
    right: '10%',
    zIndex: 1,
  
  },

  warningText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },

  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },

   blurContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0, 
     alignItems: 'center',
    justifyContent: 'center',
    flex: 1, 
  },

  overlay: {
   flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },

     popUp: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  popBlurContainer: {
        //backgroundColor: 'blue',
        height: 400,
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        alignItems: 'center', 
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'black',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 55,
        borderTopWidth: 1, 
        borderBottomWidth: 1.3, 
        width: '93%',
  },

  popText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#fff', 
    
  },

  logo: {
      width: 150,
      height: 150,
      marginBottom: 30,
       backgroundColor: 'red',
    },

      innerContainer:{
        height: 220,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 0,
        marginTop: 50,
        //paddingBottom: 40,
        //flexDirection: 'row',
        marginLeft: 35,
        marginRight: 35, 
        width: '80%',
     },

      popNoContainer: {
      top: -30,
      width: 60,
      height: 60,
      alignContent: 'center',
      alignItems: 'center',
      },
  
      popRoundContainer:{
        height: 100,
        backgroundColor: 'white',
        borderRadius: 100,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: 100,
        borderColor: 'black',
        borderWidth: 2,
        top: 15
     },
  
     popnumInRound: {
      color: 'black',
      fontSize: 70,
      fontWeight: 'bold',
    },

    popText: {
      color: 'white',
      fontSize: 25,
      fontWeight: 'bold',
      fontStyle: 'normal',
      alignContent: 'center',
      padding: 10
    },

     innerBottonsContainer:{
        //backgroundColor: 'yellow',
        height: 80,
        alignItems: 'center', 
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 0,
        paddingTop: 0,
        marginTop: 15,
        marginBottom: 20,
        //paddingBottom: 40,
        flexDirection: 'row',
        //marginLeft: 3,
        marginRight: 15, 
        width: '100%',
     },

    customLogIn: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 10,
    width: 100,
    alignSelf: 'center',
    margin: 20,
    alignItems: 'center',  
    height: 45,
    left: -4
    },
    
    customLogInText: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 3,

  },
  
    background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  signup: {
    flex: 1,
  },

  overBlur: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
})


export default SignupScreen;