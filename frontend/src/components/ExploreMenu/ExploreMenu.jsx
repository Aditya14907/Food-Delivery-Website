{/*It is used to display the menu list of food*/}
// eslint-disable-next-line no-unused-vars
import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'
{/*In assets.js there is an object of menu_list for the list of food items*/}
// eslint-disable-next-line react/prop-types
const ExploreMenu = ({category,setCategory}) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <h1>Explore our Menu</h1>
            <p className='explore-menu-text'>Delight our diverse menu,offering an exceptional collections of delicious dishes crafted with the finest ingredients and culinary expertise.Each bite is designed to satisfy your cravings and elevate your dining experience, ensuring a memorable meal every time. </p>
            <div className="explore-menu-list">
                {/*It is mainly used when we click on the Salad,Noodles then it will be active amd shows the food items based on you clciked */}
                {menu_list.map((item,index) => {
                    {/*In prev it stores the prev_item like if we click already on Salad then it will active and you again clicked then it will be inactive */}
                    return(
                            <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-items">
                                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt=''/>
                                <p>{item.menu_name}</p>
                            </div>
                    )
                })}
            </div>
            <hr/>
        </div>
    )
}

export default ExploreMenu