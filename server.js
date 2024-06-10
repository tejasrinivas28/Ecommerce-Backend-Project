/**
 * This will be the starting file of the project
 */
const express = require("express")
const mongoose = require("mongoose")
const app = express()
const server_config = require("./configs/server.config")
const db_config  = require("./configs/db.config")
const user_model = require("./models/user.model")
const bcrypt = require("bcryptjs")


// This helps us to convert json data into JS objects..
 app.use(express.json())

/**
 * Create an admin user at the starting of the application
 * if not already present
 */

//Connection with mongodb

// It shows us where to connect
mongoose.connect(db_config.DB_URL)
// It shows us the actual connection
const db = mongoose.connection
        
db.on("error" , ()=>{
    console.log('Error while connecting to the mongoDB')
})

db.once("open", ()=>{
    console.log("Connected to MongoDB")
    init()
})

async function init(){
    try{
        let user  = await user_model.findOne({userId : "admin"})

       if(user){
          console.log("Admin is already present")
          return
        }

    }catch(err){
        console.log("Error while reading the data", err)
    }
    

    try{
      user = await user_model.create({
        name : "Teja",
        userId : "admin",
        email : "tejasrinivas28@gmail.com",
        userType : "ADMIN",
        password : bcrypt.hashSync("Welcome1",8)
      })
      console.log("Admin created ", user)


    }catch(err){
        console.log("Error while create admin", err)
    }   
}


/**
 * Stitch the route to the server 
 */
// Because once we get the call from user, it goes to app => routes => controller =>model =>DB
// This helps to connect the app to routes , so we need to stitch the routes to app.
require("./routes/auth.routes")(app)

require("./routes/category.routes")(app)

require("./routes/product.routes")(app)

require("./routes/cart.routes")(app)

/**
 * Start the server
 */
app.listen(server_config.PORT, ()=>{
    console.log("Server started at port num : ", server_config.PORT)
})

