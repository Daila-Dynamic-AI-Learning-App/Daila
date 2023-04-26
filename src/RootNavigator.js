import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoadScreen from "./Screens/LoadScreen";
import HomeScreen from "./Screens/HomeScreen";
import LoginScreen from "./Screens/LoginScreen";
import NewUser from "./Screens/NewUserScreen";
import BellPrompt from "./Screens/BellPromptScreen";
import SignupScreen from "./Screens/SignupScreen";
import CheckingAnswers from "./Screens/AnswerScreen";
import ProfileScreen from './Screens/ProfileScreen';

const Stack = createNativeStackNavigator();


export default () => {
    return (
         <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
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
                <Stack.Screen name="Profile" component={ProfileScreen}
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
    )
}