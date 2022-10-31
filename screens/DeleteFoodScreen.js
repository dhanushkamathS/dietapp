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
import { NativeBaseProvider, Text, Box ,ScrollView,HStack,Input,Fab,CloseIcon,Center,Button,Icon,Spinner,Pressable,AlertDialog,Skeleton, VStack} from 'native-base';
import { deleteUserFood } from '../utils/GetFoodData';
import { CalorieCalculator } from '../utils/utils';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { UserContext } from '../contextStore/UserContext';
const DeleteFoodScreen = ({route,navigation}) => {


    const mutation = deleteUserFood()
    const [userId,setUserId] = useContext(UserContext)
    const {foodObj} = route.params 

const BASE_URI = "https://dietbackend.vercel.app/"
   

    const submit =async () =>{
      try {
        const data = {
        logId :foodObj._id,
        userId
      }
      
      mutation.mutate(data)
      } catch (error) {
        console.log("aa")
          console.log(error)
      }
    }

    // if(mutation.isLoading){
    //   return(
    //     <Box justifyContent="center" h="full">
    //       <VStack  space={8} overflow="hidden" rounded="md" m="2" shadow="4">
    //         <Skeleton h="40" />
    //         <Skeleton.Text px="4" />
    //         <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
    //          <Center>
    //           <Box bgColor="gray.300" w="70%" rounded="3xl" mb="3" pb="1">
    //             <Text textAlign="center" fontSize="2xl" color="white">
    //               Loading
    //             </Text>
    //           </Box>
    //           </Center>
    //       </VStack>
    //   </Box>
    //   )
    // }

 
   return (
            <Box bgColor="gray.400" >
              <Box h="full" justifyContent="center" alignItems="center">
                {
                  (mutation?.data?.response?.status  ==0) || (mutation?.data?.response?.status == 400)?
                <Text>
                    {JSON.stringify(mutation.data.response.data.msg)}
                </Text>:
                null
                }
                {
                  mutation.isSuccess?
                  <SuccessComp navigation={navigation}/>:
                  null
                }
              <Box   borderWidth="0" width="80%" m="1" shadow="4" p="2" bgColor="white" rounded="lg">
                {/* {JSON.stringify(foodObj)} */}
                <Box alignItems="flex-end" p="2">
                <Pressable onPress={()=>{navigation.navigate("Home")}}>
                    <CloseIcon/>
                </Pressable>
                </Box>
                <Text fontSize="4xl" textAlign="center" fontWeight="semibold">{foodObj.foodName}</Text>
                <Text fontSize="xl">
                    Are you sure you want to delete ?
                </Text>
                <Box width="full">
                  {mutation.isLoading?
                    <Box bgColor="red.500" >
                     <HStack alignContent="center" justifyContent="center" space="3">
                        {/* <Text color="white" fontSize="2xl" p="1" rounded="lg">Loadi</Text> */}
                      <Spinner size="lg" color="white" />
                     </HStack>
                    </Box>
                 :
                  <Button onPress={submit} mt="4" variant="solid" bgColor="red.500">delete</Button>
                }
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
  },1500)

  return(
     <Center>
        {/* <Box bgColor="success.600" w="70%" rounded="3xl">
            <Text textAlign="center" fontSize="2xl" color="white">
              Deleted Successfullly
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
        <Box bgColor="error.600" w="70%" rounded="3xl">
          <Text textAlign="center" fontSize="2xl" color="white">
            could not add
          </Text>
        </Box>
      </Center>
  )
}




export default DeleteFoodScreen