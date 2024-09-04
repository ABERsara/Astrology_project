import {useSelector } from "react-redux";
import {selectToken} from '../features/auth/authSlice'
import {jwtDecode} from "jwt-decode"
const useAuth=()=>{
const token =useSelector(selectToken)
let isAdmin=false
let isUser=false
if(token){
const userDecoded=jwtDecode(token)
const {_id,username,
    firstname,
    lastName,
    permission,
    imageUrl,
    diagnosis}=userDecoded
isAdmin=permission==="Manager"
isUser=permission==="User" || permission==="Group"
if(_id)
return {username,
    firstname,
    lastName,
    permission,
    imageUrl,
    diagnosis}
}
return {username:"",isAdmin,isUser,firstname:"",lastname:"",_id:""}
}
export default useAuth