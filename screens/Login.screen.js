import React ,{useState,useContext, useEffect}from 'react';
import {Box,Text,Pressable,Skeleton,VStack,HStack,Center,Image,Input,Spinner} from 'native-base';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { emailValidator,storeUserId } from '../utils/utils';
import { getUserId } from '../utils/GetFoodData';
import Background from '../resource/images/background.jpg'
const { width, height } = Dimensions.get('window')
import { UserContext } from '../contextStore/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';





const  LoginScreen= () => {

    const mutation = getUserId()
    const [userId,setUserId] = useContext(UserContext)
    const [username,setUsername] = useState("dhanush")

    useEffect(()=>{

      if(  mutation.isSuccess  && mutation?.data?.data?.user?.length === 1){
        console.log(mutation?.data?.data)
        setUserId(mutation?.data?.data?.user[0]._id)
        storeUserId(mutation?.data?.data?.user[0]._id)
      }
    },[mutation.isSuccess])
    
    const submit = () =>{
      const data = {
        username:username.toLowerCase()
      }
      mutation.mutate(data)
      // console.log("click")
    }

  
  return (
        <Box bgColor={"gray.200"} flex="1">
          <Box bgColor={"gray.200"}>
            <Image source={Background} h={width*0.7} borderBottomRadius="full" overflow="hidden" alt="Image"/>
          </Box>
          <Box  h="full">
              <Box  h="1/5" justifyContent={"center"} alignItems="center">
                <Text fontSize="4xl" color={"green.500"} >Login to MyDiet</Text>
              </Box>
              <VStack alignItems="center"  space="16">
                 <Box> 
                    <Input value={username} onChangeText={(val)=>{setUsername(val)}} variant="underlined" w="70%" fontSize="md"  placeholder="username" />
                    {
                  mutation.isSuccess  && mutation?.data?.data?.user?.length === 0 ?
                  <Text color={"red.500"} fontSize="md">
                    username not found
                  </Text>:
                  null
                }
                 </Box>
                 <Pressable w="60%" onPress={submit}>
                    {
                  mutation.isLoading ?
                  <Box bgColor="blue.900" p="3" alignItems={"center"} rounded="3xl">
                      <Spinner size={"sm"} color="white"/>
                   </Box>
                 :
                    <Box bgColor="blue.900" p="3" alignItems={"center"} rounded="3xl">
                      <Text fontSize="xl" color="white">Login</Text>
                   </Box>
                }
                </Pressable>
              </VStack>
              <Box>
                
                {/* {
                    
                  mutation.isSuccess  && mutation?.data?.data?.user?.length === 1 ?
                  <Text>found</Text>
                  :
                  null
                
                } */}
               
              
              </Box>
          </Box>
        </Box> 

  );
};






export default LoginScreen;