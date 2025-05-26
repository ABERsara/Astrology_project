require("dotenv").config()
const express=require("express")
const cors=require("cors")
const cookieParser=require("cookie-parser")
const mongoose=require("mongoose")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/connectDB")
const app=express()
const PORT=process.env.PORT || 2024
const path = require('path');
connectDB()
//middlware
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'));
// app.use('/uploads', express.static('public/uploads'));
// The "catchall" handler: for any request that doesn't
// match one above, send back index.html so React Router can handle the routing.
// app.get('/*', (req, res) => {
//     res.sendFile(path.join(__dirname+'app/index.html'));
//   });
app.get("/",(req,res)=>{
res.send("HomePage")
})
app.use("/api/auth",require("./routes/authRouter"))
app.use("/api/users",require("./routes/userRouter"))
app.use("/api/contacts",require("./routes/contactRouter"))
app.use("/api/diagnosis", require("./routes/diagnosisRouter"));
app.use("/api/responses",require("./routes/responseRouter"))
app.use("/api/blogs",require("./routes/blogRouter"))
app.use('/loved-blogs', require("./routes/lovedBlogsRouter"));
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
