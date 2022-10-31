import React , {useEffect,useState,useContext}from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TabNavigator } from './Tabnavigation.nav';
import { PreloginNavigator } from './Prelogin.navigation';
import { UserContext } from '../contextStore/UserContext';
export default Navigation = () =>{

    const [userId,setUserId] = useContext(UserContext)
    
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