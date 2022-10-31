import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import Navigation from './navigation/Navigation';
import { NativeBaseProvider} from 'native-base';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import HomeScreen from './screens/Home.screen';
import { UserProvider } from './contextStore/UserContext';
const queryClient = new QueryClient()

const App = () => {
  
 
   return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
         <Navigation/>
      </NativeBaseProvider>
      </QueryClientProvider>
    </UserProvider>
  );
};


export default App;
