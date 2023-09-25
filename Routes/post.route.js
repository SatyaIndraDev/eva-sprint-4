const express = require("express");

const {postModel} = require("../Model/post.model")

const {auth}=require("../Middleware/authmiddlware")

const postRouter=express.Router()

postRouter.use(auth)


postRouter.get("/",async(req,res)=>{

    try{

    
        const {device,device1,device2}=req.query
        if(device){
            const posts= await postModel.find({userID:req.body.userID,device1,device2})
            if(posts.length===0){
                res.json({msg:"Post Not Found"})
            }
            else{
                res.status(200).json({posts})
            }
        }
        else{
            const posts =await postModel.find({userID:req.body.userID})
            if(posts.length===0){
                res.json({msg:"Post Not Found"})
            }
            else{
                res.status(200).json({posts})
            }
        }
    }
    catch(err){
        res.status(400).json({error:err})

    }
})



postRouter.post("/create",async(req,res)=>{

    try{

    
         const post= new postModel(req.body)
            await post.save()
            res.json({msg:"Post create successfully"})
           
        }
       
        
   
    catch(err){
        res.json({error:err})

    }
})



postRouter.patch("/update/:id",async(req,res)=>{

    try{

        const userID=req.body.userID
        const postID=req.body.id
      
       const posts= await postModel.find({_id:postID})

    const userIDinPost=post.userID

       if(userID===userIDinPost){
       await postModel.findByIdAndUpdate({_id:postID},req.body)
       res.status(200).json({msg:`${post.title} has been updated`})
       }
           
           else{
            res.status(400).json({msg:"Not Autherized"})
           }
           
        }
       
        
   
    catch(err){
        res.status(400).json({error:err})

    }
})



postRouter.delete("/delete/:id",async(req,res)=>{

    try{

        const userID=req.body.userID
        const postID=req.body.id
      
       const posts= await postModel.find({_id:postID})

    const userIDinPost=post.userID

       if(userID===userIDinPost){
       await postModel.findByIdAndDelete({_id:postID})
       res.status(200).json({msg:"Post has been deleted"})
       }
           
           else{
            res.status(400).json({msg:"Not Autherized"})
           }
           
        }
       
        
   
    catch(err){
        res.status(400).json({error:err})

    }
})


module.exports={
    postRouter
}