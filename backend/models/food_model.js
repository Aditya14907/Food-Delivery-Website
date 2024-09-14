import mongoose from "mongoose";

const foodSchema = mongoose.Schema({
    name: {type:String,required:true},
    description : {type:String,required:true},
    price : {type:Number,required:true},
    image : {type:String,required:true}, // It takes URL
    category : {type:String,required:true}
})

//Creation of food Model
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema) // this function creates again and again the model to overcome we add one thing
                //model is already created
export default foodModel;