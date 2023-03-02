import React,{useState,useEffect,createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStoredId } from '../utils/utils'; 
export const UserContext = createContext()


export const UserProvider = (props) =>{

    const [userId,setUserId] = useState(null)
    const [isLoading,setIsLoading] = useState(true)

 

    useEffect(()=>{
        
        const setIdToContext = async ()=>{ 
            try {
                const value = await getStoredId()
                if(value!= null){
                    setUserId(value)
                    setIsLoading(false)
                    return
                }
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        setIdToContext()
        
    },[])

 

    return(
        <UserContext.Provider value={[userId,setUserId,isLoading]}>
            {props.children}
        </UserContext.Provider> 
    )

}