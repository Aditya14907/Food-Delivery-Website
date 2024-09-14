import express from "express"
import { addFood,listFood, removeFood } from "../controllers/food_controller.js"
//to create image data storage
import multer from "multer"

//Create express router
const foodRouter = express.Router();
//Image Storage Engine
const storage = multer.diskStorage({
    destination : "uploads",
    //cb means callback
    filename:(req,file,cb)=>{
            return cb(null,`${Date.now()}${file.originalname}`) // To create unique names for files
    }
})
//middleware storage creation
const upload = multer({storage:storage})
//post method is used to add the data into the server
foodRouter.post("/add",upload.single("image"),addFood)
//To display the food list create a new route
foodRouter.get("/list",listFood)
//Endpoint for to remove the food items
foodRouter.post("/remove",removeFood)

export default foodRouter;