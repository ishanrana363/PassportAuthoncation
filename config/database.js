const mongoose  = require("mongoose");
require("dotenv").config()
const db = process.env.MONGO_URL
mongoose.connect(db)
.then(()=>{
    console.log("db is connect")
})
.catch((error)=>{
    console.log(error.message)
})

