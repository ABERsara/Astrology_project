const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const User=require("../models/User")


const login = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields ars required",
            data: null
        })
    }
    //Get the user from DB
    //כרגע הצגתי מהאבחון את כל השדות מלבד המספר הסידורי, אולי בהמשך נשנה
    const foundUser=await User.findOne({username:username,active:true}).populate("diagnosis",{IdentificationNum:0}).lean()

    if(!foundUser){
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })  
    }
//Validate the password
    const match=await bcrypt.compare(password,foundUser.password)

    if(!match){
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        }) 
    }
    require('crypto').randomBytes(64).toString('hex')
    //Give the token to the user
    const userInfo={
        username:foundUser.username,
        firstname:foundUser.firstname,
        lastName: foundUser.lastName,
        diagnosis:foundUser.diagnosis
    }

    const accessToken=jwt.sign(userInfo,process.env.ACCESS_TOKEN,{expiresIn:"15m"})

    const refreshToken=jwt.sign({username:foundUser.username},process.env.REFRESH_TOKEN,{expiresIn:"7d"})

    res.cookie("jwt",refreshToken,{
        httpOnly:true,
        maxAge:7*24*60*60*1000
    })

    res.json({accessToken})

}

const refresh=async (req,res)=>{

}

const logout=async (req,res)=>{
    
}
module.exports = { login,refresh }