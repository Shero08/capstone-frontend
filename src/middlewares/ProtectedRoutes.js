import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

const useAuth = () => {
    const session = JSON.parse(localStorage.getItem('token'));

    if(!session){
        return false
    }

    return true
}

const ProtectedRoutes = () => {
    const isAuth = useAuth()

    return isAuth ? <Outlet /> : <Login />
}

export default ProtectedRoutes