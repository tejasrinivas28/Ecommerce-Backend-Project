const productController = require('../controllers/product.controller')
//localhost:8888/ecomm/api/v1/auth/signup
const auth_mw = require('../middlewares/auth.mw')
module.exports =(app)=> {
    app.post("/ecomm/api/v1/auth/createproduct",[auth_mw.verifyToken,auth_mw.isAdmin],productController.createNewProduct);
    app.get("/ecomm/api/v1/auth/getallproducts",[auth_mw.verifyToken],productController.getAllProducts)
}