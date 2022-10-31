import React from 'react';
import {Text, Box,Pressable,Skeleton,VStack,HStack,Center} from 'native-base';

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







const HomeLoadingComp = () =>{

    return(
    <Box>
        <Center w="100%">
            <VStack w="full"  space={4} overflow="hidden" rounded="md">
                <Skeleton h="40" startColor="gray.300" />
                <Skeleton.Text px="4" />
                <Skeleton px="4" my="4" rounded="md" startColor="gray.300" />
            </VStack>
        </Center>
        <Box alignItems="center">
            <VStack w="98%" space={1} bg="gray.300">
            <Skeleton.Text h="32" px="4" pt="5"  rounded="md" shadow="1" startColor="gray.100" />
            <Skeleton.Text h="32" px="4" pt="5" rounded="md" shadow="1" startColor="gray.100" />
            <Skeleton.Text h="32" px="4" pt="5" rounded="md" shadow="1" startColor="gray.100" />
            </VStack>
        </Box>
    </Box>
    )
}

export default HomeLoadingComp;