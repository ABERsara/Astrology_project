require("dotenv").config()
const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/connectDB")
const app=express()
const PORT=process.env.PORT || 2024
connectDB()
//middlware
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));
app.get("/",(req,res)=>{
res.send("HomePage")
})
app.use("/api/auth",require("./routes/authRouter"))
app.use("/api/users",require("./routes/userRoutes"))
app.use("/api/responses",require("./routes/responseRouter"))
app.use("/api/blogs",require("./routes/blogRouter"))
mongoose.connection.once("open",()=>{
    console.log("Connected to DB success")
    app.listen(PORT,()=>{
        console.log(`Server is runing on port ${PORT} `)
    })
})

mongoose.connection.on("error",(err)=>{
    console.log("Connected to DB failed")
    console.log(err)
})
