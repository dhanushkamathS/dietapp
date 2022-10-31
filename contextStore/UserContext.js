import React,{useState,useEffect,createContext} from 'react';

export const UserContext = createContext()


export const UserProvider = (props) =>{

    const [userId,setUserId] = useState(null)

    return(
        <UserContext.Provider value={[userId,setUserId]}>
            {props.children}
        </UserContext.Provider> 
    )

}