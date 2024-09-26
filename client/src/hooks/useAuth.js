import {useSelector} from "react-redux"
import { selectedToken } from "../features/auth/authSlice"
import { jwtDecode } from "jwt-decode";
const useAuth = ()=>{
    const token  = useSelector(selectedToken)
    let isAdmin = false
    let isUser = false
    if(token){
        const userDecoded = jwtDecode(token)
        const {id,email, permission, firstname,lastname,image, diagnosis} = userDecoded
        // console.log(`id: ${id} ,username: ${email}, permission: ${permission},firstname: ${firstname},lastname: ${lastname},${image},diagnosis:  ${diagnosis}`)
        isAdmin = permission ==="Admin"
        isUser = permission ==="User"
        return {id, email, isAdmin,isUser, firstname,lastname,image,permission, diagnosis}

    }

    return {id:"", email:'', isAdmin, isUser, firstname:'',lastname:"",image:null,diagnosis:null, permission:""}


}
export default useAuth