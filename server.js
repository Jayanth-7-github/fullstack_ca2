const express=require("express")
const mongoose=require("mongoose")
const cors=require('cors')

require("dotenv").config()

const port =process.env.PORT

const app=express()

app.use(express.json())

app.use(cors())

const User=require("./schema")



app.post("/restor",async(req,res)=>{
    const {name,location,cuisine,rating ,menu}=req.body
    
    try {
        const newres=new User({name,location,cuisine,rating,menu})
        if(!name || !location || !cuisine ||!rating || !menu ){
            res.status(400).json({Message:"error: Validation failed: [field] is required"})
        }

        newres.save();
        
        res.status(200).json({message:"Successfull ",newres})
        
    } catch (error) {
        res.status(500).json({message:"error : Something went wrong"})
    }
})


app.get("/restor", async(req,res)=>{
    res.status(200).json({message:"sdkjs"})
})


const mongodburl=mongoose.connect(process.env.mongodb)



app.put("/restor/:id",async(req,res)=>{
    const update= User.findByIdAndUpdate(req.params.id,req.body,{new:true})
    if(!update){
        res.status(404).json({message:"error : Restaurant not found"})
    }
    else{
        res.status(200).json({message:"successfully updated"})
    }
})

app.delete("/restor/:id",async(req,res)=>{
    const deleted= User.findByIdAndDelete(req.body)
    if(!deleted){
        res.status(404).json({message:"error : Restaurant not deleted"})
    }
    else{
        res.status(200).json({message:"successfully deleted"})
    }
})



app.listen(port,()=>{
    console.log(`running on http://localhost:${port}`)
})