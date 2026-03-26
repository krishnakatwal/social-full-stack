import { createContext, useContext, useEffect, useState } from "react";

import {  useNavigate } from "react-router-dom";
import { token, userClient } from "../clients/api";

const UserContext = createContext(null)

//check if there is a token, if so assume that there's is a user 
const initialUser = token() ? {username: null } : null

//custom provider to wrap our app
function UserProvider({children}){
//set the intial state the null or a temporary user : {}
    const [user,setUser] = useState(initialUser)

    const navigate = useNavigate()

    //useEffect that vaerifies the token and retrieves user data
    useEffect(()=>{

        async function getUser(){
            try {
                
        //check if there is a token (if no token , then we can skip the steps)
        if(!token()) return

        //use the token to verify the user  (is token valid? is it exoired)
       const {data} = await userClient.get('/')
    //    await new Promise (res => setTimeout(res,1000))

        //if verified that token is legit, take the user data and save it to state
       setUser(data)

            } catch (error) {
                //if verification fails, logout the user
                console.log(error)
                logout()
            }
       
        }
        getUser()
        
    },[])

    const logout = ()=>{

        //clear the user state
        setUser(null)

        //clear the local storage
        localStorage.removeItem('token')

        //navigate the user to login
        navigate('/login')
    }

    const value = {
        user,
        setUser,
        logout
    }

    return(
       <UserContext.Provider value={value}>
        {children}
       </UserContext.Provider>
    )
}

//custom hook to easily access context value
 export function useUser(){
  return  useContext(UserContext)
}

export default UserProvider