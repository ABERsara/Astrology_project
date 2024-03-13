const mongoose=require("mongoose")

const connctDB=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URI)
    }catch(ex){
        console.log("**************************")
        console.log("ex")
    }
}
module.exports=connctDB