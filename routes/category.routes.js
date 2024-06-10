const categoryController = require('../controllers/category.controller')
//localhost:8888/ecomm/api/v1/auth/signup
auth_mw = require('../middlewares/auth.mw')
module.exports =(app)=> {
    app.post("/ecomm/api/v1/category",[auth_mw.verifyToken,auth_mw.isAdmin],categoryController.create_cat);
    app.get("/ecomm/api/v1/auth/getcategories",[auth_mw.verifyToken],categoryController.getAllCategories);
    app.get("/ecomm/api/v1/auth/getsinglecategory",[auth_mw.verifyToken],categoryController.getSingleCategory);
    app.put("/ecomm/api/v1/auth/updatecategory",[auth_mw.verifyToken,auth_mw.isAdmin],categoryController.editCategory);
    app.delete("/ecomm/api/v1/auth/removecategory",[auth_mw.verifyToken,auth_mw.isAdmin],categoryController.removeCategory)
}