import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
 
export default function ProtectedRoute({children, allowedRoles}){//
    const {isAuthenticated , user} = useAuth()// true user= admin
 
    if(!isAuthenticated){
        return <Navigate to="/login" replace/>
    }
 
    if(allowedRoles && !allowedRoles.includes(user.role)){//admin && admin.includes(student)
        return <Navigate to = "/unauthorized" replace/>
    }
    return children;
}