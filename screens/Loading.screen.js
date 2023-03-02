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







const LoadingScreen= () =>{

    return(
    <Box alignItems={'center'}  height={"100%"} justifyContent={'center'}>
      <Text fontSize={'3xl'} color={'blue.700'}>Loading...</Text>
    </Box>
    )
}

export default LoadingScreen;