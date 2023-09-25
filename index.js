const express=require('express')

const {connection} =require("../Be/db")

const {userRouter}= require("../Be/Routes/users.route")

const {postRouter}= require("../Be/Routes/post.route")
require("dotenv").config()


const app = express()

app.use(express.json())


app.use("users",userRouter)

app.use("posts",postRouter)


app.listen(process.env.PORT,async()=>{
  try{
    await connection

    console.log("connected to DB")
    console.log(`Running at ${process.env.PORT}  port`)
  }
  catch(err){
console.log(err)
  }
})