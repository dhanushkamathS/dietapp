import React ,{useEffect,useContext}from "react";
import LoginScreen from "../screens/Login.screen";
import SignupScreen from "../screens/Signup.screen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export const PreloginNavigator = () => {

  

  return(
     <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
      </Stack.Navigator>
  )
 
}
