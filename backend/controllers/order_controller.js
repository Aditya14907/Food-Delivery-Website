import orderModel from "../models/order_model.js"
import userModel from "../models/user_model.js"
import Stripe from "stripe"
//We are integrating the stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
//Placing user order from frontend
const placeOrder = async(req,res) => {
    const frontend_url = "http://localhost:5173";
    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        //To save in the database
        await newOrder.save();
        //Once the order is placed by the user then clear his cart
        await userModel.findByIdAndUpdate(req.body.userId,{cartData : {}});

        //To create the stripe payment link 
        //For item charges
        const line_items = req.body.items.map((item)=>({
            price_data :{
                currency : "inr",
                product_data:{
                    name:item.name
                },
                unit_amount : item.price*100
            },
            quantity:item.quantity
        }))
        //For delivery charges
        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount : 20*100
            },
            quantity:1
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url : session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
//Temporary verification 
const verifyOrder = async (req,res) =>{
    const {orderId,success} = req.body;
    try {
        if(success=="true")
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"})
        }
        else
        {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Failed"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const userOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//Listing orders for admin panel
const listOrders = async(req,res)=>{
        try {
            //To fetch all the orders data of all the users
            const orders = await orderModel.find({});
            res.json({success:true,data:orders})
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
}

//For updating the order status into the backend
const updateStatus = async(req,res)=>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
        res.json({success:true,message:"Status updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}