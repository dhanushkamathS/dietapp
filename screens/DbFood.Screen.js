import React ,{useEffect,useState}from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Dimensions,
  View
} from 'react-native';
const {width,height} = Dimensions.get("window")
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NativeBaseProvider, Text, Box ,ScrollView,HStack,Input,Fab,Center,Button,Icon,Pressable,AlertDialog,Skeleton, VStack} from 'native-base';
import HomeDisplay from '../components/HomeDisplay';
import { CalorieCalculator } from '../utils/utils';
import { CommonActions } from '@react-navigation/native';
import { useFoodData,AddFoodToDb } from '../utils/GetFoodData';
import Chicken from '../resource/images/chicken.svg'

const DbFoodScreen = ({navigation}) => {
  

  const mutation = AddFoodToDb()
  const [name,setName] = useState();
  const [calories,setCalories] = useState(0)
  const [carb,setCarb] = useState(0);
  const [protein,setProtein] = useState(0)
  const [fat,setFat] = useState(0);

  useEffect(()=>{
    const value = CalorieCalculator(100,carb,fat,protein)
    console.log(value)
    setCalories(value.calories)
  },[carb,protein,fat])

  const submit = async () =>{
  try {
      
    if(!name || !calories || !carb || !protein || !fat){
      return  console.log("empth")
    }
    var data = {
      name,
      calories,
      protein,
      carb,
      fat
    }

    mutation.mutate(data)
    // console.log(mutation.data.response)
  } catch (error) {
    console.log(error)
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

  return( 
       <Box h="full" justifyContent="center" bgColor="gray.300">  
                {
                  (mutation?.data?.response?.status == 0) || (mutation?.data?.response?.status == 400) ?
                  <ErrorComp navigation={navigation} data={mutation.data.response}/>:
                  null
                }
                   {
                  mutation.isSuccess ?
                  <SuccessComp navigation={navigation}/>
                  :
                  null
                }
          <Box  m="2" shadow="4" rounded="md" p="3" bgColor={"white"}>
          <Center>
            <Text fontWeight="medium" fontSize="lg">Nutrition Per 100g</Text>
            <Text fontSize="sm" fontStyle="italic" fontWeight="semibold">{name}</Text>
          </Center>
          <HStack h={width*0.3} >
            <Box  justifyContent="center">
                <Box bgColor="green.400" w={width*0.25} h={width*0.25} borderRadius="full" justifyContent="center" alignItems="center">
                  <Box bgColor="white" w={width*0.22} h={width*0.22} borderRadius="full" justifyContent="center" alignItems="center" >
                    <Text fontWeight="bold">{calories}</Text>
                    <Text fontSize="xs">Calories</Text>
                  </Box>
                </Box>
            </Box>
            <HStack  w="full" ml={width*0.13} space="9" >
              <Box  justifyContent="center">
                <Text>Carbs</Text>
                <Box bgColor="orange.400" w={width*0.1} h={width*0.1} borderRadius="full" justifyContent="center" alignItems="center">
                  <Text fontSize="xs" color="white">{carb}g</Text>
                </Box>
              </Box>

              <Box  justifyContent="center">
                <Text>Fat</Text>
                <Box bgColor="pink.500" w={width*0.1} h={width*0.1} borderRadius="full" justifyContent="center" alignItems="center">
                  <Text fontSize="xs" color="white">{fat}g</Text>
                </Box>
              </Box>

              <Box justifyContent="center">
                <Text>Protein</Text>
                <Box bgColor="purple.600" w={width*0.1} h={width*0.1} borderRadius="full" justifyContent="center" alignItems="center">
                  <Text fontSize="xs" color="white">{protein}g</Text>
                </Box>
              </Box>
            </HStack>
          </HStack>
          <Box>

        <Box>
          {mutation.isError?
            <Text>
              {JSON.stringify(mutation.error.response.data)}
              ssss
            </Text>
            :
            null
          }
        </Box>
          </Box>
          <Box width="full">
          <Box mb="3">
              <Text fontWeight={"semibold"}>Name of Food</Text>
              <Input value={name} onChangeText={(text)=>{setName(text)}}  size="md" placeholder="name"  variant="unstyled" borderWidth="1" selectionColor="blue.200" />
          </Box> 
          <Box mb="3">
              <Text fontWeight={"semibold"}>Amount of Carbs in 100g</Text>
              <Input value={carb} onChangeText={(text)=>{setCarb(text)}}  size="md" keyboardType="number-pad"  placeholder="0"  variant="unstyled" borderWidth="1" selectionColor="blue.200" />
          </Box> 
          <Box mb="3">
              <Text fontWeight={"semibold"}>Amount of Fat in 100g</Text>
              <Input value={fat} onChangeText={(text)=>{setFat(text)}}  size="md" keyboardType="number-pad"  placeholder="0"  variant="unstyled" borderWidth="1" selectionColor="blue.200" />
          </Box> 
          <Box mb="3">
            <Text fontWeight={"semibold"}>Amount of Protein in 100 g</Text>
            <Input value={protein} onChangeText={(text)=>{setProtein(text)}}   size="md" keyboardType="number-pad"  placeholder="0"  variant="unstyled" borderWidth="1" selectionColor="blue.200" />
          </Box>          
          
          <Button onPress={submit} variant="solid" bgColor="#226DFF">Add To Database</Button>
          </Box>
      
      </Box>
       </Box>
    )
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
              Added Successfulllyddd
              </Text>
          </Box> */}
      </Center>
  )
}

const ErrorComp = ({navigation,data}) =>{
   setTimeout(()=>{
// navigation.dispatch(CommonActions.goBack());
        navigation.navigate('Home')
  },1500)
  return(
     <Center>
        <Box bgColor="error.600" w="60%" p="1" rounded="3xl">
        <Text textAlign="center" fontSize="md" color="white">
            something went wrong
          </Text>
          <Text textAlign="center" fontSize="md" color="white">
            {data?.data?.msg}
          </Text>
        </Box>
      </Center>
  )
}









export default DbFoodScreen;