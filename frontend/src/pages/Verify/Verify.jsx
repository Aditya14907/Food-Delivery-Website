// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../ContextAPI/StoreContext';
import axios  from 'axios';
const Verify = () => {

    const [searchParams,setSearchParams] = useSearchParams();
    const success = searchParams.get("success");
    const orderId = searchParams.get("orderId");
    const {url} = useContext(StoreContext);
    const navigate = useNavigate();
    const verifyPayment = async () =>{
        const response = await axios.post(url+"/api/order/verify",{success,orderId});
        if(response.data.success)
        {
            navigate("/myorders");
        }
        else
        {
            navigate("/")
        }
    }
    useEffect(()=>{
        verifyPayment();
    },[])
return (
    <div className='verify'>
        {/*Upto when payment is not happened it will spin */}
        <div className="spinner"></div>

    </div>
)
}

export default Verify