require('dotenv').config()
const express = require("express")
const app = express()
// require("./config/database")
const cors = require("cors")
const mongoose = require("mongoose")
app.use(cors())
const ejs = require('ejs')
app.set("view engine","ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// schema require

const User = require('./models/user.model')

// const bd = process.env.MONGO_URL
// mongoose.connect(bd)
// .then(()=>{
//     console.log("db is connected")
// })
// .catch((error)=>{
//     console.log(error.message)
//     process.exit(1)
// })
// bcrypt require
const bcrypt = require('bcrypt');
const saltRounds = 10;

require("./config/database")

app.get("/",(req,res)=>{
    res.render("index")
})

// register : get
app.get("/register",(req,res)=>{
    res.render("register")
})

// register : post

app.post("/register",async(req,res)=>{
    try {
        const user = await  User.findOne({username:req.body.username})
        if(user) return res.status(400).send("user is already create")
        bcrypt.hash(req.body.password, saltRounds, async (err, hash)=> {
            const newUser = new User({
                username : req.body.username,
                password : hash
            })
            await newUser.save()
            res.status(201).redirect("/login")
        });
        

    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

// logind : get

app.get("/login",(req,res)=>{
    res.render("login")
})

// logind : post 

app.post("/login",(req,res)=>{
    try {
        res.status(200).send("user login")
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// profile protected route 

app.get("/profile",(req,res)=>{
    res.render("profile")
})

// logout route

app.get("/logout",(req,res)=>{
    res.redirect("/")
})

module.exports = app