import {useSelector} from "react-redux"
import { selectedToken } from "../features/auth/authSlice"
import { jwtDecode } from "jwt-decode";
const useAuth = ()=>{
    const token  = useSelector(selectedToken)
    let isAdmin = false
    let isUser = false
    if(token){
        const userDecoded = jwtDecode(token)
        const {_id, username, permission, firstname,lastname,image, diagnosis} = userDecoded
        isAdmin = permission ==="Admin"
        isUser = permission ==="User"
        return {_id, username, isAdmin,isUser, firstname,lastname,image,permission, diagnosis}

    }

    return {_id:"", username:'', isAdmin, isUser, firstname:'',lastname:"",image:null,diagnosis:null, permission:""}


}
export default useAuth