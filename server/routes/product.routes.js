const express = require("express");
const productcontroller = require("../controllers/products.controller");
const IsAdmin = require("../middleware/IsAdmin")
const isAuth = require("../middleware/isAuth");
const productRouter = express.Router();

productRouter.get("/getproducts",productcontroller.getProduct)
productRouter.get("/getProductById/:id",productcontroller.getProductById)
productRouter.post("/post", productcontroller.postData);
productRouter.delete("/post", productcontroller.deleteProductByname);
// admin 
productRouter.post("/admin/add-product", isAuth, IsAdmin, productcontroller.addProduct);
productRouter.delete("/admin/delete-product", isAuth, IsAdmin, productcontroller.deleteProductByname);
productRouter.put("/admin/edit-product/:id", isAuth, IsAdmin, productcontroller.editProduct);



module.exports = productRouter;
