import { useSelector } from "react-redux";
import { selectedToken } from "./authSlice";
import { useEffect, useRef, useState } from "react";
import { useRefreshMutation } from "./authApiSlice";
import { Outlet } from "react-router-dom";

const CheckLoginNotRequired = () => {
    console.log("I'm going to check my token")
const token = useSelector(selectedToken)
console.log("token: "+ token)
const effectRan = useRef(false)

const [trueSuccess, setTrueSuccess] = useState(false)

const [refresh, {
isUninitialized,
isLoading,
isSuccess,
isError,
error
}] = useRefreshMutation()

useEffect(() =>{
if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

const verifyRefreshToken = async () => {
console.log("verifying refresh token ");
try {
await refresh()
console.log("do refresh")
setTrueSuccess(true)
console.log("success refresh")

}
catch (err) {
console.log(err);
}



}
if (!token) verifyRefreshToken();
}
return () => effectRan.current = true
}, [token, refresh])

let content;
if(isLoading){
console.log("loading");
content=<h1>Loading</h1>
}
else{
    console.log("send outlet")
content=<Outlet/>
}
return content
};

export default CheckLoginNotRequired;