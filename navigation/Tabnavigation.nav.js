import React ,{useEffect,useContext}from "react";
import HomeScreen from "../screens/Home.screen";
import FoodScreen from "../screens/Food.screen";
import AddFoodScreen from "../screens/AddFood.screen";
import DbFoodScreen from "../screens/DbFood.Screen";
import DeleteFoodScreen from "../screens/DeleteFoodScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
export const TabNavigator = () => {

  

  return(
     <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddFoodScreen" component={AddFoodScreen} />
        <Stack.Screen name="DbFoodScreen" component={DbFoodScreen} />
        <Stack.Screen name="FoodScreen" component={FoodScreen} />
        <Stack.Screen name="DeleteFoodScreen" component={DeleteFoodScreen} />
      </Stack.Navigator>
  )
 
}
