import React , {useEffect,useState,useContext}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './Tabnavigation.nav';
import { PreloginNavigator } from './Prelogin.navigation';
import { UserContext } from '../contextStore/UserContext';
import LoadingScreen from '../screens/Loading.screen'
export default Navigation = () =>{

    const [userId,setUserId,isLoading] = useContext(UserContext)
    

    if(isLoading){
        return(
            <LoadingScreen/>
        )
    }

    return(
        <NavigationContainer>
            {
                userId ?
                 <TabNavigator/>
                :
                <PreloginNavigator/>
               
            }
        </NavigationContainer>
    )
}