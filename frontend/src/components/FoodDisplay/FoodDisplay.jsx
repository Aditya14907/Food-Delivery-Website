// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../ContextAPI/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
// eslint-disable-next-line no-unused-vars, react/prop-types
const FoodDisplay = ({category}) => {
   {/*Category is user selected items.category is came from the assets.js file food_list object */}
   
   const {food_list} = useContext(StoreContext)

   return (
   <div className='food-display' id='food-display'>
         <h2>Top Dishes Near you</h2>
         <div className="food-display-list">
            {food_list.map((item,index)=>{
               {/*It will filter the food-items based on you select if you select it give food items related to salad only */}
               if (category==="All" || category===item.category){
                  // console.log(`Processing item: ${item.name}, Category: ${item.category}`);
                  return <FoodItem key={index} id={item._id} name={item.name} price={item.price} description={item.description} image={item.image}/>
               }
            })}
         </div>
   </div>
   )
}

export default FoodDisplay