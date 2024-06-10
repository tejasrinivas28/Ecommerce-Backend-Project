const cartController = require('../controllers/cart.controller');
auth_mw = require('../middlewares/auth.mw')
module.exports =(app)=> {
    app.put("/ecomm/api/v1/insertintocart",[auth_mw.verifyToken],cartController.insertInToCart);
    app.get("/ecomm/api/v1/auth/showcart",[auth_mw.verifyToken],cartController.showCart);
    app.delete("/ecomm/api/v1/auth/removeproducts",[auth_mw.verifyToken],cartController.removeProductsFromCart);
}   