const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/User")


const register = async (req, res) => {
    const image = req.image?.filename || ""; // Handle file upload
    const { firstname, lastname, phone, email, password, active, diagnosis } = req.body
    if (!firstname || !email || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields ars required",
            data: null
        })
    }
    //Add the user to DB
    //כרגע הצגתי מהאבחון את כל השדות מלבד המספר הסידורי, אולי בהמשך נשנה
    //validate the adding user is unique
    try {
        const existedUser = await User.findOne({ email }).lean()
        if (existedUser) {
            return res.status(409).json({
                error: true,
                message: 'The user is already exist!',
                data: null
            })
        }
        //Validate the password
        //for password encryption:
        const hashPwd = await bcrypt.hash(password, 10)

        // Create and store the new user
        const user = await User.create({ firstname, lastname, phone, email, password: hashPwd, image, active, diagnosis });
        if (user) {
            console.log("המשתמש נרשם בהצלחה " + firstname);

            await user.save();
            // res.status(201).json({
            //     error: false,
            //     message: 'New user created',
            //     data: { _id: user._id, firstname: user.firstname }
            // });

        } else {
            console.error('Error creating user:', error);
            return res.status(400).json({
                error: true,
                message: error,
                data: null
            });
        }


        //ע"מ לקודד סיסמה מורכבת
        // require('crypto').randomBytes(64).toString('hex')
        //Give the token to the user
        const userInfo = {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            //is admin or user?
            permission: user.permission,
            image: user.image,
            diagnosis: user.diagnosis
        }

        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN, { expiresIn: "15m" })

        const refreshToken = jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })

        res.cookie("jwt", refreshToken, {
            //האם רק אותו דומיין
            httpOnly: true,
            //7 ימים
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.json({ accessToken, user })

    } catch (error) {
        // Handle errors
        console.error('Error during registration:', error);
        return res.status(500).json({
            error: true,
            message: 'Internal server error',
            data: null
        });
    }
}
const login = async (req, res) => {
    const { firstname, email, password } = req.body
    if (!firstname || !email || !password) {
        return res.status(401).json({
            error: true,
            message: "All fields ars required",
            data: null
        })
    }
    //Get the user from DB
    //כרגע הצגתי מהאבחון את כל השדות מלבד המספר הסידורי, אולי בהמשך נשנה
    const foundUser = await User.findOne({ email: email, active: true }).populate("diagnosis", { IdentificationNum: 0 }).lean()
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
    console.log("המשתמש נכנס בהצלחה " + firstname);

    //ע"מ לקודד סיסמה מורכבת
    // require('crypto').randomBytes(64).toString('hex')
    //Give the token to the user
    const userInfo = {
        id: foundUser._id,
        firstname: foundUser.firstname,
        lastname: foundUser.lastname,
        email: foundUser.email,
        //is admin or user?
        permission: foundUser.permission,
        image: foundUser.image,
        diagnosis: foundUser.diagnosis
    }

    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN, { expiresIn: "15m" })

    const refreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })

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
                email: decode.email,
                active: true
            }).
                populate("diagnosis", { diagnosis: 1 }).lean()
            const userInfo = {
                id: foundUser._id,
                firstname: foundUser.firstname,
                lastName: foundUser.lastname,
                email: foundUser.email,
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
module.exports = { register, login, refresh, logout }