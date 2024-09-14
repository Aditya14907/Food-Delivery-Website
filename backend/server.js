import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/food_routes.js"
import userRouter from "./routes/user_route.js"
import 'dotenv/config'
import cartRouter from "./routes/cart_routes.js"
import orderRouter from "./routes/order_routes.js"
//app config
const app = express()
//Port number is created
const port=4000

//creation of middleware
app.use(express.json()) //When the backend recieves request from frontend at that time data will be parsed using json
app.use(cors())

app.get("/",(req,res)=>{
        res.send("API IS WORKING")
})

//Connect DB
connectDB();

//API end point for food
app.use("/api/food",foodRouter)
//Here we mount the uploads folder in images route after that if we add images file name then we can get the access
app.use("/images",express.static('uploads'))
//End point for user
app.use("/api/user",userRouter)
//Api endpoint for the cart
app.use("/api/cart",cartRouter)
//Api endpoint for order
app.use("/api/order",orderRouter)
//To run the express server
app.listen(port, ()=>{
    console.log(`Server started on http://localhost:${port}`)
})
//mongodb+srv://nithinaditya149:Aditya07@cluster0.nwsas.mongodb.net/?