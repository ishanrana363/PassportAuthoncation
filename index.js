const app = require("./app")
require("dotenv").config()
const Port = process.env.PORT || 4000
app.listen(Port,()=>{
    console.log(`Server run successfully at http://localhost:${Port}`)
})
