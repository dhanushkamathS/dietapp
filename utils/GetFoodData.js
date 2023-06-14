import { useQuery,useMutation,useQueryClient } from 'react-query'
import axios from 'axios'
const BASE_URI = "add your backend link here"
// const BASE_URI = "https://dietappbackend.herokuapp.com"
import { UserContext } from '../contextStore/UserContext'


//get user stats
const fetchUserStatsData = (id) => {
    console.log(id)
  return axios.get(`${BASE_URI}/api/day-stats/${id}`).catch((error)=>{return(error)})
}

export const useUserStatsData = (id) => {
  return useQuery(['userStats',id], ()=> fetchUserStatsData(id))
}


//get all food from database
const fetchFoodData = () => {
  return axios.get(`${BASE_URI}/api/db-food`).catch((error)=>{return(error)})
}

export const useFoodData = () => {
  return useQuery('foodData', fetchFoodData)
}

//add food to user history
const posteUserFoodData = (data) =>{
  
    //  data.userId = userId
     return axios.post(`${BASE_URI}/api/user-food`,data).catch((error)=>{return(error)})

}

export const posteUserFood = ()=>{
const queryClient = useQueryClient()
  return useMutation(posteUserFoodData,{
    onSuccess:()=>{
       queryClient.invalidateQueries(["userStats"])
    }
  })
}


//remove food from user history
const deleteUserFoodData = (data) =>{
  //  data.userId = userId
   return axios.delete(`${BASE_URI}/api/user-food`,{data:{...data}}).catch((error)=>{return(error)})
}

export const deleteUserFood = ()=>{
const queryClient = useQueryClient()
  return useMutation(deleteUserFoodData,{
    onSuccess:()=>{
       queryClient.invalidateQueries(["userStats"])
    }
  })
}


//add new food to database
const postFoodToDb = (data) =>{
     return axios.post(`${BASE_URI}/api/db-food`,data).catch((error)=>{return(error)})
}

export const AddFoodToDb =  () =>{
 
      const queryClient = useQueryClient()
  return useMutation(postFoodToDb,{
    onSuccess:()=>{
       queryClient.invalidateQueries(["foodData"])
    }
  })
}

// testing with fetch

const createUserApi =  (data) =>{
  // return  fetch("https://dietbackend.vercel.app/api/create-user", {method: "post",
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  // //make sure to serialize your JSON body
  //     body: JSON.stringify(data)
  //   })
  return axios.post("https://dietbackend.vercel.app/api/create-user",{...data}).catch((error)=>{return(error)})
}

export const createUser =  () =>{  
  return useMutation(createUserApi)
  
}

const getUserIdApi =  (data) =>{
  return axios.post("https://dietbackend.vercel.app/api/get-user",{...data}).catch((error)=>{return(error)})
}

export const getUserId =  () =>{  
  return useMutation(getUserIdApi)
  
}
