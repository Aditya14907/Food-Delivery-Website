import userModel from "../models/user_model.js"

//add items into the users cart
const addToCart = async (req,res)=>{
    try{
        //To get the user's data we will check the id
        let userData = await userModel.findById(req.body.userId);//Get the users data
        let cartData = await userData.cartData;//Get the user cart data
        //If the item is not present in the cart then create a new entry
        if(!cartData[req.body.itemId])
        {
            cartData[req.body.itemId]=1;
        }
        else
        {
            cartData[req.body.itemId] += 1;
        }
        //Update the cart data
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Item is added into the cart"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
//remove items from the user cart
const removeFromCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0)
        {
            cartData[req.body.itemId] -=1;
        }
        //Update the cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from Cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
//fetch the user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,getCart}