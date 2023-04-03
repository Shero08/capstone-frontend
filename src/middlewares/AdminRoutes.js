import { Outlet } from "react-router-dom";
import Login from "../pages/Login";

const useAuth = () => {
    const session = JSON.parse(localStorage.getItem('token'));

    if(session){
        const actualRole = session.role
        return actualRole === 'admin'
    }

    return false
}

const AdminRoutes = () => {
    const isAuth = useAuth()

    return isAuth ? <Outlet /> : <Login />
}

export default AdminRoutes