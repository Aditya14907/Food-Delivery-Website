import userModel from "../models/user_model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

//Function for login user
const logInUser = async(req,res) => {
    const {email,password} = req.body;
    try {
        const user = await userModel.findOne({email})

        if(!user)
        {
            res.json({success:false,message:"Please register first"})
        }

        //Check whether the password written and in database are same or not
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch)
        {
            res.json({success:false,message:"Incorrect Password"})
        }
        const token = createToken(user._id)
        res.json({success:true,token})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//Function for register user
const registerUser = async(req,res) => {
    const {name,email,password} =  req.body;
    try{
        //If user already exists in database then throw an error
        const exists = await userModel.findOne({email})
        if(exists)
        {
            return res.json({success:false,message:"Already registered by the user"})
        }

        //Validation email format & strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"Please enter a valid e-mail"})
        }
        if(password.length < 8)
        {
            return res.json({success:false,message:"Password must contains more than 8 elements"})
        }

        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@!#$%^&*])[A-Za-z\d@!#$%^&*]{8,}$/;

        if (!regex.test(password)) {
        return res.json({ 
                success: false, 
                message: "Password must contain at least one uppercase letter, one number, and one special character (@, !, &.)." 
            });
        }

        //Encrypt the password using bcrypt
        const salt = await bcrypt.genSalt(10) //It will strongly the password
        const hashedPassword = await bcrypt.hash(password,salt);

        //New user add to database
        const newUser = await userModel({
            name:name,
            email:email,
            password:hashedPassword
        })

        //To save the data in database
        const user = newUser.save()
        //Create token for authentication purpose
        const token = createToken(user._id)
        res.json({success:true,token});
    }
    catch(error)
    {
        console.log(error);
        res.json({success:false,message:"Error Occurred"})
    }
}

export {logInUser,registerUser};