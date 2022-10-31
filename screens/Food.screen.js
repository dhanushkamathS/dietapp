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
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NativeBaseProvider, Text, Box ,ScrollView,HStack,Input,Icon,Pressable,AlertDialog,Skeleton, VStack} from 'native-base';
import HomeDisplay from '../components/HomeDisplay';
import { useFoodData ,posteUserFood,AddFoodToDb} from '../utils/GetFoodData';
import Chicken from '../resource/images/chicken.svg'

const AddFoodScreen = ({route, navigation }) => {
      const { foodType } = route.params;
     const { isLoading, isError, data:response, error,isSuccess} = useFoodData()
     const [input,setInput] = useState("")
     const [filteredDataSource, setFilteredDataSource] = useState([]);
     const [masterDataSource, setMasterDataSource] = useState([]);

      useEffect(() => {
        if(isSuccess){
          setFilteredDataSource(response?.data?.data ?? [])
          setMasterDataSource(response?.data?.data ?? [])
        }
  }, [isSuccess]);
    

  const searchFilterFunction = (text) => {
    if (text) {

      const newData = masterDataSource.filter((item)=>{
          const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
      })

      setFilteredDataSource(newData);
      setInput(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setInput(text);
    }
  };

     if(isLoading){
         return(
            <Box flex={1} bgColor="gray.100" pt="6">
          <Box py="3" pl="2">   
           <HStack space={3} mx="2">
                <HStack bg="white"  rounded="2xl" shadow="2">             
                  <Box justifyContent="center"pl="1">
                      <Icon as={Entypo} name="magnifying-glass" size={8} color="black" alignItems="center"/>
                  </Box>
                  <Input  width={width*0.7}  size="2xl"  color="gray.700" placeholder="Food"  variant="unstyled" selectionColor="blue.200" />
                </HStack>   
                 <Pressable onPress={()=>{navigation.navigate("DbFoodScreen")}}>
                    <Box justifyContent="center" >
                        <Icon as={AntDesign} name="pluscircle" color="black" size={10}/> 
                    </Box>
                 </Pressable>
            </HStack> 
          </Box>
          <VStack alignItems="center" space={3} >
              <Skeleton  width="95%" h="12" rounded="lg" startColor="gray.100" shadow="3" />
              <Skeleton  width="95%" h="12" rounded="lg" startColor="gray.100" shadow="3"/>
          </VStack>
      </Box>
      )
     }



     if(isError){
      return(
        <Box bg="blueGray.900" h="full" justifyContent="center" alignContent="center" alignItems="center">
        <Text color="white" fontSize="2xl">error : { error.message}</Text>
        <Text color={"white"} fontSize="2xl">
          Please restart the app
        </Text>
        </Box>
      ) 
     }

    // console.log(response)
   return (
      <Box flex={1} bgColor="gray.100" pt="6">
          <Box py="3" pl="2">   
            <HStack space={3} mx="2">
                <HStack bg="white"  rounded="2xl" shadow="2">             
                  <Box justifyContent="center"pl="1">
                      <Icon as={Entypo} name="magnifying-glass" size={8} color="black" alignItems="center"/>
                  </Box>
                  <Input  width={width*0.7} value={input} onChangeText={(val)=>{searchFilterFunction(val)}} size="2xl"  color="gray.700" placeholder="Food"  variant="unstyled" selectionColor="blue.200" />
                </HStack>   
                 <Pressable onPress={()=>{navigation.navigate("DbFoodScreen")}}>
                    <Box justifyContent="center" >
                        <Icon as={AntDesign} name="pluscircle" color="black" size={10}/> 
                    </Box>
                 </Pressable>
            </HStack> 
          </Box>
          {
             !filteredDataSource.length ? 
            <Box  h="full" justifyContent="center" alignItems="center">
              <Text fontSize="md" fontWeight="semibold">something went wrong</Text>
              <Text fontSize="md" fontWeight="semibold">Please restart the App.</Text>
            </Box>:
            <ScrollView flex="1" showsVerticalScrollIndicator={false} bgColor>

                {
                  filteredDataSource.map((food)=>{
                    return(
                        <DisplayComp key={food._id} navigation={navigation} foodObj={food} foodType={foodType}/>             
                    )
                  })
                }

          </ScrollView>
          }
          
      </Box>
   
  );
};



const DisplayComp  = ({foodObj,foodType,navigation}) => {
    return(
       <Pressable onPress={()=>{navigation.navigate("AddFoodScreen",{foodObj,foodType})}}>
         <HStack   p="2" borderRadius="md" space="2xl" my="1">
            <Box bgColor="gray.100"   shadow="4" rounded="full" h={width*0.13} w="full" justifyContent="center">
            {/* <Box bgColor="#FBC785"  shadow="3" rounded="full" h={width*0.13} w="full" justifyContent="center"> */}
                 <Box paddingX={4}>
                   <HStack alignItems="center"space={2}> 
                      <Chicken/>
                      <Text fontSize={"2xl"} fontWeight="semibold">{foodObj.name.toUpperCase()}</Text>
                    </HStack>
                  </Box>
              </Box>
        </HStack>
       </Pressable>
    )
}


export default AddFoodScreen;