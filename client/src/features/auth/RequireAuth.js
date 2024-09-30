import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const RequireAuth = ({allowPermission}) => {
    const {permission} = useAuth()
    console.log(`permission: ${permission}`)
    const userAllowed = allowPermission.includes(permission)
    if(userAllowed) return <Outlet />
    return  <Navigate to="/" replace />
}

export default RequireAuth