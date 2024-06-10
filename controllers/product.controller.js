const category = require('../models/category.model')
const product = require('../models/product.model')

/**
 *  Create a product
 */
exports.createNewProduct = async (req,res)=>{
    try{
        const data = {
            name : req.body.name,
            description : req.body.description,
            category : req.body.category,
            cost : req.body.cost
        }
        const prod = await product.create(data)
        try{

            const cat = await category.findOne({name : prod.category})
          
            cat.products.push(prod.name)
             await cat.save()
             res.status(200).send(cat);
          

        }catch(err){

            console.log("Error while trying to find the category",err)

        }

    }
    catch(err){
        console.log("Error, while creating a product",err)
        res.status(500).send({
            message : "Internal Server Error"
        })
    }
}


/**
 * Controller to fetch all the products of a category
 */
exports.getAllProducts = async (req,res)=>{
    try{
        const cat = await category.findOne({name : req.body.category})

        if(cat == null){
           return res.status(400).send({
            message : "No such category is found !!"
           })
        }
        const products = await product.find({category : req.body.category});
    
        res.status(200).send(products);
    
     }catch(err){
        console.log("Error while getting all products", err.message);
        res.status(500).send({
            message : "Internal server error while getting all products"
        })
    }
 }