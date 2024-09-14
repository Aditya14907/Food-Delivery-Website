import foodModel from "../models/food_model.js";
//import file system that is pre-defined in node.js
import fs from 'fs'

//add food item using this function we create a route
const addFood = async(req,res) =>{
    let image_filename = `${req.file.filename}`;
    const food = new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    //It is used to check whether the food successfully added to database or not
    try {
        await food.save();
        //It gives a response back like if it is correct display message
        res.json({success:true,message:"Food is Added"})
    } catch (error) {
        console.log(error)
        //It is also a response
        res.json({success:false,message:"Error occurred"})
    }
}
const listFood = async(req,res) =>{
    try {
        const food = await foodModel.find({}) // empty will give all the data
        res.json({success:true,data:food}) //data will be displayed
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error occurred"})
    }
}

//remove food items
const removeFood = async(req,res)=>{
    try {
        const food = await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{}) //It will delete from the upload folder as per given path

        //To delete from mongo database
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error occurred"})
    }
}
export {addFood,listFood,removeFood}