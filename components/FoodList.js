import React ,{useEffect,useState}from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
const {width,height} = Dimensions.get("window")
import { NativeBaseProvider, Text, Box,ScrollView,HStack, VStack,Pressable,Icon } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Breakfast from '../resource/images/breakfast.svg'
import Lunch from '../resource/images/lunch.svg'
import Dinner from '../resource/images/dinner.svg'
import IonicIcons from 'react-native-vector-icons/Ionicons'
const FoodList = ({foodConsumed,navigation}) => {
   return (
       <ScrollView showsVerticalScrollIndicator={true}  h="100%">
                <DisplayComp foodType={"breakfast"} foodData={foodConsumed?.breakfast} navigation={navigation} name={"Breakfast"} Icons={Breakfast} colors={["#F8B509B9","#EFE843B9","#DEBE5CB9"]}/>
                <DisplayComp foodType={"lunch"} foodData={foodConsumed?.lunch}  navigation={navigation} name={"Lunch"} Icons={Lunch} colors={["#56B4D3B9","#403DE0B9","#403DE0B9"]}/>
                <DisplayComp foodType={"dinner"} foodData={foodConsumed?.dinner}  navigation={navigation} name={"Dinner"} Icons={Dinner} colors={["#E1A735B9","#D69311B9","#D69311B9"]}/>
                <Box h="4"></Box>
                
        </ScrollView> 
  );
};


const DisplayComp = ({Icons,colors,name,navigation,foodType,foodData})=>{

    var caloriesConsumed=0;
    foodData?.map((food)=>{
        caloriesConsumed += food.caloriesConsumed ;
    })

    return (
        <Box alignItems="center" marginY="1">
            {/* <Box width="95%" bg="#C2C2C2" rounded="3xl" shadow="2"> */}
            <Box width="95%" bg="gray.100" borderWidth="1" rounded="3xl" shadow="2">
            {/* <LinearGradient colors={[colors[0], colors[1], colors[2]]} style={{borderRadius:15}}   > */}
                <Box   p="3">
                    <HStack justifyContent="space-between">
                        <HStack space={1}>
                            <Icons width={width*0.1} height={width*0.1}/>
                            <Text fontSize="xl" fontWeight="semibold">{name}</Text>
                        </HStack>
                        <VStack>
                            <Pressable onPress={()=>{navigation.navigate('FoodScreen',{foodType})}}>
                               <Icon as={IonicIcons} name="add-circle-outline" size={8} color="black"/>
                            </Pressable>
                            <Text>{parseInt(caloriesConsumed)} kcal</Text>
                        </VStack>
                    </HStack>
                        <VStack >
                            {
                              
                                foodData?.map((food)=>{
                                    return(
                                        <Pressable key={food._id} onLongPress={()=>{navigation.navigate('DeleteFoodScreen',{foodObj:food})}}>
                                        <Text fontFamily="PlayfairDisplay-Bold"  fontSize="lg" my="1" py="1"   fontWeight="semibold">{food.foodName}</Text>                                          
                                        </Pressable>
                                    )
                                })
                            }
                        </VStack>        
                </Box>
            {/* </LinearGradient> */}
            </Box>
        </Box>
    )
}



export default FoodList;