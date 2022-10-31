import React ,{useContext, useEffect,useState}from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Dimensions,
  View
} from 'react-native';
const {width,height} = Dimensions.get("window")
import { NativeBaseProvider, Text, Box ,ScrollView,HStack,Input,Fab,Center,Button,Icon,Pressable,AlertDialog,Skeleton, VStack} from 'native-base';
import { posteUserFood } from '../utils/GetFoodData';
import { CalorieCalculator } from '../utils/utils';
import { CommonActions } from '@react-navigation/native';
import { UserContext } from '../contextStore/UserContext';
const AddFoodScreen = ({route,navigation}) => {

    const mutation = posteUserFood()   
    const [userId,setUserId] = useContext(UserContext)
    const {foodObj,foodType} = route.params 
    const [input,setInput] = useState()
    const [fooddata,setFooddata] = useState({name:foodObj.name,carb:foodObj.carb,protein:foodObj.protein,fat:foodObj.fat,calories:foodObj.calories})

    const calculate = (val)=>{
          const data = CalorieCalculator(val,foodObj.carb,foodObj.fat,foodObj.protein)
      setInput(val)
      setFooddata({...fooddata,carb:data.carb,protein:data.protein,fat:data.fat,calories:data.calories})
      
    }

    const submit =()=>{
       const data = {
         name:fooddata.name,
        calories:fooddata.calories,
        protein:fooddata.protein,
        carb:fooddata.carb,
        fat:fooddata.fat,
        foodType:foodType,
        userId
      }

      if(input.match(/^[0-9]+$/) != null){
      mutation.mutate(data)
      }
    }

    if(mutation.isLoading){
      return(
        <Box justifyContent="center" h="full">
          <VStack  space={8} overflow="hidden" rounded="md" m="2" shadow="4">
            <Skeleton h="40" />
            <Skeleton.Text px="4" />
            <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
             <Center>
              <Box bgColor="gray.300" w="70%" rounded="3xl" mb="3" pb="1">
                <Text textAlign="center" fontSize="2xl" color="white">
                  Loading
                </Text>
              </Box>
              </Center>
          </VStack>
      </Box>
      )
    }

 
   return (
            <Box bgColor="gray.400" >
              <Box h="full" justifyContent="center">
                {
                   (mutation?.data?.response?.status  ==0) || (mutation?.data?.response?.status == 400) ?
                  <ErrorComp navigation={navigation}/>:
                  null
                } 
                {
                  mutation.isSuccess ?
                  <SuccessComp navigation={navigation}/>
                  :
                  null
                }
              <Box   borderWidth="0" m="3" shadow="4" p="2" bgColor="white" rounded="lg">
                <Box>
                </Box>
                  <Center>
                    <Text fontWeight="medium" fontSize="lg">Nutrition Per 100g</Text>
                    <Text fontSize="sm" fontStyle="italic" fontWeight="semibold">{foodObj.name}</Text>
                  </Center>
                  <HStack h={width*0.3} >
                    <Box   justifyContent="center">
                      <Box bgColor="green.400" w={width*0.25} h={width*0.25} borderRadius="full" justifyContent="center" alignItems="center">
                          <Box bgColor="white" w={width*0.22} h={width*0.22} borderRadius="full" justifyContent="center" alignItems="center" >
                            <Text fontWeight="bold">{parseInt(fooddata.calories)}</Text>
                            <Text fontSize="xs">Calories</Text>
                          </Box>
                      </Box>
                    </Box>
                    <HStack  w="full" ml={width*0.13} space="9" >
                      <Box  justifyContent="center">
                        <Text>Carbs</Text>
                        <Box bgColor="orange.400" w={width*0.1} h={width*0.1} borderRadius="full" justifyContent="center" alignItems="center">
                          <Text fontSize="xs" color="white">{parseInt(fooddata.carb)}g</Text>
                        </Box>
                      </Box>

                      <Box  justifyContent="center">
                        <Text>Fat</Text>
                        <Box bgColor="pink.500" w={width*0.1} h={width*0.1} borderRadius="full" justifyContent="center" alignItems="center">
                          <Text fontSize="xs" color="white">{parseInt(fooddata.fat)}g</Text>
                        </Box>
                      </Box>

                      <Box justifyContent="center">
                        <Text>Protein</Text>
                        <Box bgColor="purple.600" w={width*0.1} h={width*0.1} borderRadius="full" justifyContent="center" alignItems="center">
                          <Text fontSize="xs" color="white">{parseInt(fooddata.protein)}g</Text>
                        </Box>
                      </Box>
                    </HStack>
                  </HStack>
                <Box>

          
                </Box>
                <Box width="full">
                  <Text>food Type : <Text fontWeight="semibold">{foodType}</Text></Text>
                  <Text>Amount of servings in grams</Text>
                  <Box h="3"></Box>
                  <Input  value={input} onChangeText={(val)=>{calculate(val)}}  size="md" keyboardType="number-pad"  placeholder="0"  variant="unstyled" borderWidth="1" selectionColor="blue.200" />
                  <Box h="5">
                  
                  </Box>
                    <Button onPress={submit} variant="solid" bgColor="#226DFF">Add</Button>
                </Box>
                </Box>
                </Box>
              </Box>
  );
};


const SuccessComp = ({navigation}) =>{

  setTimeout(()=>{
// navigation.dispatch(CommonActions.goBack());
navigation.navigate('Home')
  },1000)

  return(
     <Center>
        {/* <Box bgColor="success.600" w="70%" rounded="3xl">
            <Text textAlign="center" fontSize="2xl" color="white">
              Added Successfullly
              </Text>
          </Box> */}
      </Center>
  )
}

const ErrorComp = ({navigation}) =>{
   setTimeout(()=>{
// navigation.dispatch(CommonActions.goBack());
navigation.navigate('Home')
  },1000)
  return(
     <Center>
         <Box bgColor="error.600" w="60%" p="1" rounded="3xl">
        <Text textAlign="center" fontSize="md" color="white">
            something went wrong. Try again
          </Text>
        </Box>
      </Center>
  )
}




export default AddFoodScreen