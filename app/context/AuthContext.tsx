"use client"

import { Children, createContext,useContext,useEffect,useState } from "react";


const AuthContext=createContext<any>(null)

export const useAuth=()=>useContext(AuthContext)


export const AuthProvided =({

    children
}: {
    children:React.ReactNode
})=>{
   const [isLoggedIn,setIsLoggedIn]=useState(false);

     const checkAuth = async () => {
           const response = await fetch("/api/auth/check", {
               credentials: "include"
           });
           const data = await response.json();
           setIsLoggedIn(data.authenticated);
   
       }
   
       useEffect(() => {
           checkAuth();
       }, []);
   
   return (
   <AuthContext.Provider
      value={{
         isLoggedIn,
         setIsLoggedIn
      }}
   >
      {children}
   </AuthContext.Provider>
);
}