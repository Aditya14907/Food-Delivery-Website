// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../ContextAPI/StoreContext'
{/*This contains the object food_list id,name,price,description,image */}
// eslint-disable-next-line react/prop-types
const FoodItem = ({id,name,price,description,image}) => {

    {/* It was using because we can order one items of n quantity it just like a count*/}
    // const [itemCount,setItemCount] = useState(0)
    const {cartItems,addToCart,removeFromCart,url} = useContext(StoreContext);
return (
    <div className='food-item'>
        <div className="food-item-img-container"> {/*Url is used to fetch the image from the backend api */}
            <img className='food-item-image' src={url+"/images/"+image} alt="" />
            {/*It is used for the quantity you can add or remove */}
            {!cartItems[id] 
                        ?<img className='add' onClick={()=>addToCart(id)} src={assets.add_icon_white} alt=''/>
                        :<div className='food-item-counter'>
                            <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt=''/>
                            <p>{cartItems[id]}</p>
                            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                        </div>

            }
        </div>
        <div className="food-item-info">
            <div className="food-item-info-rating">
            <p>{name}</p>
            <img src={assets.rating_starts} alt="" />
            </div>
            <p className='food-item-description'>{description}</p>
            <p className="food-item-price">₹{price}</p>
        </div>

    </div>
)
}

export default FoodItem