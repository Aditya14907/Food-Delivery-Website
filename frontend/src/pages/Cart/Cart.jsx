{/* To display the Cart items*/}
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../ContextAPI/StoreContext'
import { useNavigate } from 'react-router-dom'
const Cart = () => {

  const {cartItems,food_list,removeFromCart,getTotalAmount,url} = useContext(StoreContext)
  {/*It is used to navigate from one page to another page*/}
  const navigate = useNavigate()
  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr/>
        {/*We will link with the basket icon so when we click on it.Opens cart page(Go to Navbar.jsx)*/}
        {food_list.map((item,index)=>{
                if(cartItems[item._id] > 0)
                {
                  return(
                    // eslint-disable-next-line react/jsx-key
                  <div>
                    <div className='cart-items-title cart-items-item'>
                        {/*To fetch the image from the backend */}
                        <img src={url+"/images/"+item.image} alt=""/>
                        <p>{item.name}</p>
                        <p>₹{item.price}</p>
                        <p>{cartItems[item._id]}</p>
                        <p>₹{item.price * cartItems[item._id]}</p>
                        <p onClick={()=>removeFromCart(item._id)} className='cross'>x</p> {/*This is used to remove the cart item*/}
                    </div>
                    <hr/>
                  </div>
                  )
                }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                    <p>Item Price</p>
                    <p>₹{getTotalAmount()}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                  <p>Delivery Fees</p>
                  <p>₹{getTotalAmount()===0 ? 0 : 20}</p>
              </div>
              <hr/>
              <div className="cart-total-details">
                    <b>Total Amount</b>
                    <b>₹{getTotalAmount()===0 ? 0 : getTotalAmount() + 20}</b>
              </div>
            </div>
            <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promo-code">
          <div>
              <p>If you have a promo code,then enter here.</p>
              <div className='cart-promo-code-input'>
                <input type='text' placeholder='Enter your Promo Code'/>
                <button> Submit</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart