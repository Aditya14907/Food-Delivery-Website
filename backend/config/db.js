//It is used to connect with mongoose
import mongoose from "mongoose";

export const connectDB = async() => {
        await mongoose.connect('mongodb+srv://nithinaditya149:Aditya07@cluster0.nwsas.mongodb.net/food_delivery').then(()=>console.log("DB Connected"));
}