import React,{useEffect,useCallback} from 'react';
import { Box,Text,Pressable,Skeleton,VStack,HStack,Center} from 'native-base';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  View,
  // Text,
  Dimensions
} from 'react-native';
const {width,height} = Dimensions.get("window")
import { Svg, Circle, Text as SVGText } from 'react-native-svg'

const BACKGROUND_COLOR = '#444B6F';
const BACKGROUND_STROKE_COLOR = '#303858';
const STROKE_COLOR = '#6295ED';



const CIRCLE_LENGTH = 200; // 2PI*R
const R = CIRCLE_LENGTH / (2 * Math.PI);

const CircularProgress = ({size,consumed,total}) => {
  // const  size = 170
  const  strokeWidth = size/13
  const radius = (size - strokeWidth) / 2;
  const circum = radius * 2 * Math.PI;
  const val = (consumed/total)*100 
  const svgProgress = val >100 ? 0 : (100-val)


  return(
    <Box m="5" w={size*1.2}   alignItems="center">
        <Box position="absolute" bottom="1/3" >
          {
             total-consumed > 0 ?
             <Box>
              <Text fontSize="xl" textAlign="center" fontWeight="bold" >{parseInt(Math.abs(total-consumed),10)}</Text>
          <Text fontSize="md" textAlign="center" fontWeight="bold">Calories</Text>
          <Text fontSize="md" textAlign="center" fontWeight="bold">Remaining</Text>
            </Box>
            :
              <Box>
              <Text fontSize="xl" textAlign="center" color="red.500" fontWeight="bold" >{parseInt(Math.abs(total-consumed),10)}</Text>
          <Text fontSize="md" textAlign="center" fontWeight="bold">Calories</Text>
          <Text fontSize="md" textAlign="center" fontWeight="bold">OverBoard</Text>
            </Box>
          }
        
        </Box>
         <Svg width={size} height={size} >
        {/* Background Circle */}
        <Circle 
          stroke="#FFFF"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          {...{strokeWidth}}
        />
        
        {/* Progress Circle */}
        <Circle 
          stroke="#6295ED"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeDasharray={`${circum} ${circum}`}
          strokeDashoffset={radius * Math.PI * 2 * (svgProgress/100)}
          strokeLinecap="round"
          transform={`rotate(90, ${size/2}, ${size/2})`}
          {...{strokeWidth}}
        />
      </Svg>
    </Box>
  )

}


// const Circular = () =>{


//     return(
//       <Box bgColor="blueGray.900"  h="full" justifyContent="center" alignContent="center">
//         <Box bgColor="pink.200">
//             <Svg position="relative" >
//         <Circle
         
//           r={R}
//           stroke={BACKGROUND_STROKE_COLOR}
//           strokeWidth={5}
//         />
//         <Circle
         
//           r={R}
//           stroke={STROKE_COLOR}
//           strokeWidth={5}
//           strokeDasharray={CIRCLE_LENGTH}
//           strokeDashoffset={CIRCLE_LENGTH*0.3}
          
//           strokeLinecap={'round'}
//         />
//       </Svg>
//         </Box>
//       </Box>
//     )
   
//     return(
//     <View style={styles.container}>
//       <Text style={styles.progressText} > gfgfgfg</Text>
//       <Svg style={{ position: 'absolute' }}>
//         <Circle
//           cx={width / 2}
//           cy={height / 2}
//           r={R}
//           stroke={BACKGROUND_STROKE_COLOR}
//           strokeWidth={30}
//         />
//         <Circle
//           cx={width / 2}
//           cy={height / 2}
//           r={R}
//           stroke={STROKE_COLOR}
//           strokeWidth={30}
//           strokeDasharray={CIRCLE_LENGTH}
//           strokeDashoffset={CIRCLE_LENGTH*0.3}
          
//           strokeLinecap={'round'}
//         />
//       </Svg>
//     </View>
//     )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: BACKGROUND_COLOR,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   progressText: {
//     fontSize: 80,
//     color: 'rgba(256,256,256,0.7)',
//     width: 200,
//     textAlign: 'center',
//   },
//   button: {
//     position: 'absolute',
//     bottom: 80,
//     width: width * 0.7,
//     height: 60,
//     backgroundColor: BACKGROUND_STROKE_COLOR,
//     borderRadius: 25,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonText: {
//     fontSize: 25,
//     color: 'white',
//     letterSpacing: 2.0,
//   },
// });
export default CircularProgress;