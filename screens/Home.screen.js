import React, { useContext } from 'react';
import { NativeBaseProvider, Text, Box,Pressable} from 'native-base';
import HomeDisplay from '../components/HomeDisplay';
import FoodList from '../components/FoodList';
import HomeLoadingComp from '../components/HomeLoadingComp';
import { useUserStatsData,createUser } from '../utils/GetFoodData';
import { UserContext } from '../contextStore/UserContext';


const HomeScreen = ({ navigation}) => {
      const [userId,setUserId] = useContext(UserContext)
     const { isLoading, isError, data:response, error,isSuccess} = useUserStatsData(userId)
    //  const mutation = createUser()


     
     if(isLoading){
         return(
          <HomeLoadingComp/>
      )
     }



     if(isError){
      return(
        <Box bg="blueGray.900" h="full" justifyContent="center" alignContent="center" alignItems="center">
        {/* <Text color="white" fontSize="2xl">error : {error.message}</Text> */}
        <Text color={"white"} fontSize="2xl">
          Please restart the app
        </Text>
        </Box>
      )
     }

  return (
    <Box flex="1">
      {
        response?.data == undefined ?
          <Box bg="blueGray.900" h="full" justifyContent="center" alignContent="center" alignItems="center">
            <Text color={"white"} fontSize="4xl">
              Please restart the app
            </Text>
            <Text color="white" fontSize="md">{response.message}</Text>
        </Box>
        :
        <Box flex={"1"}>
           <Box alignItems="center">
           <HomeDisplay foodObj={response?.data?.data?.statOfDay} mainData={response?.data?.data?.mainData}/>
        </Box>
         <Text fontFamily="EncodeSansCondensed-Bold" fontSize={"3xl"}  p="2">MY DIARY</Text>
           <FoodList navigation={navigation} foodConsumed={response?.data?.data?.foodConsumed} />
        </Box> 
      }
       
        
    </Box>
  )

  const submit = async () =>{
   try {
        const data = {
        name:"qwerqwweddf",
        MainCalories:2000,
        MainCarb:200,
        MainProtein:200,
        MainFat:200
        }
      
      mutation.mutate(data)
   } catch (error) {
      console.log("error")
      console.log(error)
   }


  }

  if(mutation.isLoading){
    return(
      <Text>loading</Text>
    )
  }

  if(mutation.isError){
    return(
      <Box>
         <Pressable onPress={submit}>
          <Text fontSize={"4xl"}>click</Text>
        </Pressable>
      <Text>
        errir: 
        {JSON.stringify(mutation.error.response.data)}
      </Text>
      </Box>
    )
  }
  const value=undefined;
  return(
    <Box bgColor={"gray.300"} h="full" justifyContent="center" alignItems={"center"}>
        <Pressable onPress={submit}>
          <Text fontSize={"4xl"}>click</Text>
        </Pressable>
        {
          mutation.isSuccess?
          <Text>
            success
            {JSON.stringify(mutation.data.response)}
          </Text>
          :
          null
        }
        {
          value?.status ?
          <Text>dhdhh</Text>
          :
          <Text>
            ffh
          </Text>
        }
      
    </Box>
  )
 
   
};



export default HomeScreen;