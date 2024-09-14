/* eslint-disable react/prop-types */
{/*To display the food items first we need to set up a Context API to access easily*/}
import axios from "axios";
import { createContext, useEffect, useState } from "react";
{/*It is used to create the Context */}
export const StoreContext = createContext(null)

const StoreContextProvider = (props) =>{

    const [cartItems,setCartItems] = useState({});
    const url = "http://localhost:4000"
    const [token,setToken] = useState("")
    //We created a state variable so that fetch the food data from database
    const [food_list,setFoodList]=useState([])
    const addToCart = async (itemId) => {
        {/*when the food_item is adding first time to cart means 0->1 quantity at that time */}
        if (!cartItems[itemId]) {
                setCartItems((prev)=>({...prev,[itemId]:1}))
                {/*...prev(spread Operator) creates a new object that includes all key-value pairs */}
                {/*The [itemId]: 1 part adds a new key-value pair or updates */}
        }
        else
        {
            setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
            {/*In this we just increase the quantity */}
        }
        if(token){
            //We have to update in the database also
            await axios.post(url+"/api/cart/add",{itemId},{headers:{token}}) //We need to pass the token header so it can authenticate
        }
    }
    const removeFromCart = async (itemId) =>{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token)
        {
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
    }
    const getTotalAmount = () => {
        let totalAmount=0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id===item);
                totalAmount += itemInfo.price * cartItems[item];
            }    
        }
        return totalAmount;
    }
    //To fetch the food from the api /api/food/list
    const fetchFoodList = async ()=>{
        const response = await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
    }

    //When we reload the page the cart is refreshing so after refresh also it should be same
    const loadCartData = async (token) =>{
        try{
            const response = await axios.post(url+"/api/cart/get",{},{headers:{token}});
            setCartItems(response.data.cartData);
        }
        catch(error){
            console.log(error);

        }
    }
    //It was used when we reload the page the account should not be logout
    useEffect(()=>{
        async function loadData(){
            await fetchFoodList();
            if(localStorage.getItem("token")){
                setToken(localStorage.getItem("token"));
                //After refresh the cart data will be stored
                await loadCartData(localStorage.getItem("token"));
            }
        }
        loadData();
    },[])
    const contextValue = {
            food_list,
            cartItems,
            setCartItems,
            addToCart,
            removeFromCart,
            getTotalAmount,
            url,
            token,
            setToken
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}


export default StoreContextProvider