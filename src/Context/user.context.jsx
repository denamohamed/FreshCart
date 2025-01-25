import { useState } from "react";
import { createContext } from "react";

export let userContext = createContext("")
export default function UserProvider({children}){
    let [ token , setToken ] = useState(localStorage.getItem("token"))

     function Logout(){
        setToken(null)
        localStorage.removeItem('token')
    }

    return (
        <userContext.Provider value={{ token , setToken , Logout }}>
            {children}
        </userContext.Provider>
    )
}