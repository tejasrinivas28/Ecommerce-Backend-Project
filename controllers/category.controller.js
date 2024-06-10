// const categoryModel = require('../models/category.model')
const category_model = require('../models/category.model')

exports.create_cat = async (req,res)=>{
    const request_body = req.body

    const cat_obj = {
        name : request_body.name,
        description : request_body.description
    }
    try{
        const category =  await category_model.create(cat_obj)

        res.status(201).send(category)

    }
    catch(err){
        console.log("Error while creating the category",err);
        res.status(500).send({
            message : "Error while creating the category"
        })
    }
}

// Get all categories

exports.getAllCategories = async(req,res)=>{
    const request_body = req.body

    try{
        const categories = await category_model.find()
        res.status(200).send(categories)

    }
    catch(err){
        console.log("Error while getting all categories",err)
        res.status(500).send({
            message : "Internal server error while getting all categories"
        })

    }

}

// Get single Category based on name

exports.getSingleCategory = async (req,res)=>{
    const request_body = req.body
    
    try{
        const singleCategory = await category_model.find({name : request_body.name})
        res.status(200).send(singleCategory)
    }catch(err){
        console.log("Error while getting category with name",err)
        res.status(500).send({
            message : "Internal server error while getting the category"
        })
    }
}

// Updating the category

exports.editCategory = async(req,res)=>{
    try{

    const request_body = req.body

    const category = await category_model.findOne({name : request_body.categoryName})
    // console.log(category)
    if(category == null){
        return res.status(400).send({
            message : "No such category is present in the DB"
        })
    }
    category.name = request_body.name ? request_body.name : category.name
    category.description = request_body.description ? request_body.description : category.description

    const updatedCategory = await category_model.updateOne({
        name : category.name,
        description : category.description
    })

    res.status(200).send(updatedCategory)
    }
    catch(err){
        console.log("Error while updating category data",err)
        res.status(500).send({
            message : "Internal server error while updating the data"
        })
    }



}

// Deleting a category

exports.removeCategory = async (req,res)=>{
    try{
    const request_body = req.body
    const checkCategory = await category_model.findOne({name : request_body.name});
    // console.log(checkCategory)
    if(checkCategory == null){
        return res.status(400).send({
            message : "No such category is present!!"
        })
    } 
     const category = await category_model.deleteOne(checkCategory)
     res.status(200).send({
        message : "Requested Category got Deleted!!"
     })
    }
    
    catch(err){
        console.log("Error while deleting category data",err)
        res.status(500).send({
            message : "Internal server error while updating the data"
        })
    }

}

