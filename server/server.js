require("dotenv").config()
const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/connectDB")
const app=express()
const PORT=process.env.PORT || 2024
connectDB()
//middlware
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static("public"))
app.get("/",(req,res)=>{
res.send("homePage")
})

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
