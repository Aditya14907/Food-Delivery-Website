{/*To display the information of the users personal details like address,phone number */}
// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../ContextAPI/StoreContext'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const PlaceOrder = () => {
  const {getTotalAmount,token,food_list,cartItems,url} = useContext(StoreContext)
  //We will create a state variable which stores the information of user address
  const [data,setData] = useState({
      firstName : "",
      lastName : "",
      email : "",
      street : "",
      city : "",
      state : "",
      pincode : "",
      country : "",
      phone : ""
  })
  const onChangeHandler = (event) =>{
    const name = event.target.name;
    const value = event.target.value;
    //Change the prev value with the current data 
    setData(data=>({...data,[name]:value}))
  }

  //This function will re-direct into payment gateway
  const placeOrder = async (event)=>{
    //To prevent reload
    event.preventDefault();
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id] > 0)
      {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })
    let orderData = {
        address:data,
        items:orderItems,
        amount: getTotalAmount() + 20
    }
    //To authenticate we call headers
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}})
    if(response.data.success)
    {
        const {session_url} = response.data;
        //To redirect the user page
        window.location.replace(session_url);
    }
    else
    {
      alert("Payment Failed")
    }
  }
  const navigate = useNavigate();
  useEffect(()=>{
    if (!token){
      navigate('/cart')
    }
    else if(getTotalAmount()===0)
    {
      navigate('/cart')
    }
  },[token])
  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className="place-order-left">
          <p className='title'> Delivery Information</p>
          <div className="multi-fields">
            <input required name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name' />
            <input required name='lastName' onChange={onChangeHandler} value={data.lastName} type="text"  placeholder='Last Name'/>
          </div>
          <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address'/>
          <input required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'/>
          <div className="multi-fields">
            <input required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City' />
            <input required name='state' onChange={onChangeHandler} value={data.state} type="text"  placeholder='State'/>
          </div>
          <div className="multi-fields">
            <input required name='pincode' onChange={onChangeHandler} value={data.pincode} type="text" placeholder='Pin Code' />
            <input required name='country' onChange={onChangeHandler} value={data.country} type="text"  placeholder='Country'/>
          </div>
          <input required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone Number' />
      </div>
      <div className="place-order-right">
          {/*We have copied from the Cart.jsx to print the total amount */}
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
              <hr />
              <div className="cart-total-details">
                    <b>Total Amount</b>
                    <b>₹{getTotalAmount()===0 ? 0 : getTotalAmount() + 20}</b>
              </div>
            </div>
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
      </div>

    </form>
  )
}

export default PlaceOrder