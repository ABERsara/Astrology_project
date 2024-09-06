const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")

//
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
    const foundUser = await User.findOne({ username: username, active: true }).populate("diagnosis", { IdentificationNum: 0 }).lean()
    if (!foundUser) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    //Validate the password
    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    //ע"מ לקודד סיסמה מורכבת
    // require('crypto').randomBytes(64).toString('hex')
    //Give the token to the user
    const userInfo = {
        username: foundUser.username,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        //is admin or uder?
        permission: foundUser.permission,
        image: foundUser.image,
        diagnosis: foundUser.diagnosis
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN, { expiresIn: "15m" })

    const refreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })

    res.cookie("jwt", refreshToken, {
        //האם רק אותו דומיין
        httpOnly: true,
        //7 ימים
        maxAge: 7 * 24 * 60 * 60 * 1000
    })

    res.json({ accessToken })

}
//כניסה דרך הטקן שנשמר בעוגיה למשך 7 ימים
const refresh = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(401).json({
            error: true,
            message: "Unauthorized",
            data: null
        })
    }
    const refreshToken = cookies.jwt

    jwt.verify(refreshToken,
        process.env.REFRESH_TOKEN,
        async (err, decode) => {
            if (err) {
                return res.status(403).json({
                    error: true,
                    message: "Forbidden",
                    data: null
                })
            }
            const foundUser = await User.findOne({
                username: decode.username,
                active: true
            }).
                populate("diagnosis", { diagnosis: 1 }).lean()
            const userInfo = {
                _id: foundUser._id,
                username: foundUser.username,
                firstname: foundUser.firstname,
                lastName: foundUser.lastname,
                permission: foundUser.permission,
                image: foundUser.image,
                diagnosis: foundUser.diagnosis
            }

            const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN, { expiresIn: '15m' })

            res.json({ accessToken })
        })

}
//מחיקת העוגיה 
const logout = async (req, res) => {
    const cookies = req.cookies
    if (!cookies?.jwt) {
        return res.status(204).json({
            error: true,
            message: "No Content",
            data: null
        })
    }
    res.clearCookie("jwt", {
        httpOnly: true
    })
    res.json({
        error: false,
        message: "Cookie Cleard",
        data: null
    })
}
module.exports = { login, refresh, logout }