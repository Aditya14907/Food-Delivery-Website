import express from "express"
import { addToCart,removeFromCart,getCart } from "../controllers/cart_controller.js"
import authMiddleWare from "../middleware/auth.js";
//It will create a router
const cartRouter = express.Router();
//As we pass the middleware function the router will take the user token and authenticate the token to check authorized user or not
cartRouter.post("/add",authMiddleWare,addToCart)
cartRouter.post("/remove",authMiddleWare,removeFromCart)
cartRouter.post("/get",authMiddleWare,getCart)

export default cartRouter;