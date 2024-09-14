// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react'
{/*To add the products we have created this file*/}
import './Add.css'
import { assets } from '../../assets/assets'
import axios from "axios"
import { toast } from 'react-toastify'
const Add = () => {
    const url = "http://localhost:4000";
    {/*To store the image */}
    const [image,setImage] = useState(false)
    {/*To store the product name,description,category,price */}
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:"Salad"
    })
    {/*When we type on input field it will get updated in console or database */}
    const onChangeHandler = (event)=>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}))
    }
    {/*To check whether our data is updating or not */}
    useEffect(()=>{
            console.log(data);
    },[data])
    const onSubmitHandler = async (event)=>{
            {/*To not reload */}
            event.preventDefault();
            {/*To store the whole data of products in a form */}
            const formData = new FormData();
            formData.append("name",data.name)
            formData.append("description",data.description)
            formData.append("price",Number(data.price))
            formData.append("category",data.category)
            formData.append("image",image)
            {/*As Add is a post method so we use and path is API endpoint */}
            const response = await axios.post(`${url}/api/food/add`,formData);
            if(response.data.success)
            {
                    setData({
                        name:"",
                        description:"",
                        price:"",
                        category:"Salad"
                    })
                    setImage(false)
                    toast.success(response.data.message)
            }
            else
            {
                toast.error(response.data.message)
            }
    }
return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandler}>
        <div className="add-image-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    {/*It will give the preview of the image */}
                    <img className='image' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                {/*This will open the computer browser to choose image */}
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id="image" hidden required/>
            </div>
            <div className="add-product-name flex-col">
                <p>Product name</p>
                <input onChange={onChangeHandler} value={data.name}  type="text" name='name' placeholder='Type here' />
            </div>
            <div className="add-product-description flex-col">
                <p>Product Description</p>
                <textarea onChange={onChangeHandler} value={data.description} name='description' rows="6" placeholder='Enter Product Description' required></textarea>
            </div>
            <div className="add-product-price-category">
                <div className="add-category flex-col">
                    <p>Product category</p>
                    <select onChange={onChangeHandler}  name="category">
                        <option value="Salad">Salad</option>
                        <option value="Rolls">Rolls</option>
                        <option value="Deserts">Deserts</option>
                        <option value="Sandwich">Sandwich</option>
                        <option value="Cake">Cake</option>
                        <option value="Pure Veg">Pure Veg</option>
                        <option value="Pasta">Pasta</option>
                        <option value="Noodles">Noodles</option>
                    </select>
                </div>
                <div className="add-price flex-col">
                    <p>Product Price</p>
                    <input onChange={onChangeHandler} value={data.price} type='Number' name='price' placeholder='₹40' />
                </div>
            </div>
            <button type='submit' className='add-button'>ADD</button>
        </form>
        
    </div>
)
}

export default Add