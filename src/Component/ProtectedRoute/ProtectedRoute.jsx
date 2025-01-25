import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { userContext } from '../../Context/user.context'

export default function ProtectedRoute({children}) {
    let { token } = useContext(userContext)
    if(token){
        return children
    }
    else{
        return <Navigate to="/auth/login" />
    }
}
