import React ,{useEffect,useState}from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Dimensions
} from 'react-native';
const {width,height} = Dimensions.get("window")
import { NativeBaseProvider, Text, Box,HStack,VStack,Progress,Icon } from 'native-base';
import Fire from '../resource/images/fire.svg'
import Rice from '../resource/images/rice.svg'
import Eggs from '../resource/images/eggs.svg'
import Pizza from '../resource/images/pizza.svg'
import CircularProgress from './CircularProgress';
const HomeDisplay = ({foodObj,mainData}) => {


    

   return (
      <Box w="full" h={width*0.8} bgColor="gray.100" borderRadius="xl" p="4">
        <HStack  h={width*0.5}>
            <Box w="1/2" >
                <Box mb="4" pl="3">
                    <Text fontSize="3xl" fontFamily="Bodoni-Bold">
                        TODAY'S 
                    </Text>
                    <Text fontSize="3xl"  fontFamily="Bodoni-Bold" marginTop={width*(-0.04)}>
                        GOAL
                    </Text>
                </Box>
                <HStack alignContent="baseline" >
                    <Fire width="25" height="25" />
                    <Text fontSize={"md"} color="orange.600" fontWeight="bold" > Calorise</Text>
                </HStack>
                <HStack pl="9">
                    <Text fontSize={"4xl"}  fontWeight="bold">{parseInt(foodObj?.calories) ?? 0 }</Text>
                    <VStack  h={width*0.1} justifyContent="flex-end">
                        <Text fontSize="md" fontWeight="black">Kcal</Text>
                    </VStack>
                </HStack>
            </Box>
            <Box w ="1/2"  justifyContent="center" alignItems="center">
               
                <CircularProgress size={width*0.45} consumed={foodObj?.calories ?? 0} total={mainData?.calories ?? 100}/>
            </Box>
        </HStack>
        <Box>
            <HStack justifyContent={"space-evenly"}  w="full">
            <ProgressComp Icon={Rice} name={"carbs"} consumed={foodObj?.carb ?? 0} total={mainData?.carb ?? 100} color="#6295ED"/>
            <ProgressComp Icon={Eggs} name={"proteins"} consumed={foodObj?.protein ?? 0} total={mainData?.protein ?? 100} color="#E11717"/>
            <ProgressComp Icon={Pizza} name={"fats"} consumed={foodObj?.fat ?? 0} total={mainData?.fat ?? 100} color="#E2C218"/>
            </HStack>
        </Box>
      </Box>
   
  );
};



const ProgressComp = ({Icon,name,consumed,total,color}) =>{

    return(
        <Box px="3"  my="1">
            <Box alignItems="center">
                <Icon width={width*0.13} height={width*0.13}/>   
            </Box>
            <Text fontWeight="black" textAlign={"center"} fontSize="xs">{name.toUpperCase()}</Text>
            <Progress w={width*0.23} h="2.5" mt="1" value={(consumed/total)*100}  _filledTrack={{bg: color}}/>
            <Text fontSize="xs" textAlign={"center"}>{parseInt(consumed)}g/{parseInt(total)}g</Text>
        </Box>
    )
}


export default HomeDisplay;