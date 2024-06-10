const category_model = require("../models/category.model");
const product_model = require("../models/product.model")
const cart_model = require("../models/cart.model")
const user_model = require("../models/user.model")
const jwt = require('jsonwebtoken')
const auth_config = require('../configs/auth.config')

exports.insertInToCart = async (req, res) => {
    try {
        const token = req.headers['x-access-token']
        
        jwt.verify(token,auth_config.secret,async (err,decoded)=>{
           
            const user = await user_model.findOne({userId : decoded.id})
           
            let cost = user.total_cost;
            for(p of req.body.products){
                prod = await product_model.findOne({name : p})
                user.cart.push(prod.name);
                cost += prod.cost;
            }
            user.total_cost = cost
            
            await user.save()
            // console.log(cost);
            res.status(200).send({
               cart : user.cart,
               cost : user.total_cost
            })
    
        })  

    } catch (err) {
        console.log("#### Error while inserting the products into the cart #### ", err);
        res.status(500).send({
            message: "Internal server error while updating the cart"
        });
    }
}
exports.showCart = async (req,res)=>{
    try{
        const token = req.headers['x-access-token']
        
        jwt.verify(token,auth_config.secret,async (err,decoded)=>{
           
        const user = await user_model.findOne({userId : decoded.id})
        res.status(200).send({
            cart : user.cart,
            cost : user.total_cost

        })
        })


    }
    catch(err){
        console.log("Error, while showing the cart",err)
        res.status(500).send({
            message : "Internal server error while showing the cart"
        })

    }
}

exports.removeProductsFromCart = async (req,res)=>{
    try{
        const token = req.headers['x-access-token']
        
        jwt.verify(token,auth_config.secret,async (err,decoded)=>{

            const user = await user_model.findOne({userId : decoded.id})
            let cost = user.total_cost;
            
            for(p of req.body.products){
                const prod = await user.cart.find(ele => ele == p);
                const product = await product_model.findOne({name : p})
                console.log(product);
                cost -= product.cost;
                // console.log(prod);
                if(prod == undefined){
                    return res.status(400).send({
                        message : "No such product is there in the cart!!"
                    })
                }
                const index = await user.cart.indexOf(p);
                 console.log(index);
                const x = user.cart.splice(index, 1);
                // console.log(index);
                //  total += product.cost
                // cost -= total

             }
             user.total_cost = cost
            //  console.log
            //  user.total_cost = cost
            
            await user.save()
             console.log(cost);
            res.status(200).send({
               cart : user.cart,
               cost : user.total_cost
            })
        })
         
    }
    catch(err){
        console.log("Error while trying to remove the product from the cart",err);
        res.status(500).send({
            message : "Internal server error while trying to remove the products from the cart"

        })
    }
}