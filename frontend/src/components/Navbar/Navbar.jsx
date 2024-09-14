// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import {Link, useNavigate} from 'react-router-dom'
import { StoreContext } from '../../ContextAPI/StoreContext'
{/*Assets contains the icons and food item images*/}
// eslint-disable-next-line react/prop-types
const Navbar = ({setShowLogin}) => {

  const [menu,setMenu] = useState("Home");
  // eslint-disable-next-line no-unused-vars
  const {getTotalAmount,token,setToken} = useContext(StoreContext)
  const navigate = useNavigate();
  const logout=()=>{
      localStorage.removeItem("token");
      setToken("");
      //After logout to home page
      navigate("/");
  }
  {/*It is when we click on Home then it will be active and it shows the content related to that */}
  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className='navbar-menu'>
        {/*Here we replace li with Link so that when we click on menu it will open explore menu,mobile app then it will open mobile app,if we click on contact us goes to footer */}
        <Link to='/' onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</Link> {/*When we point at that then it will be active onclick it will show the content on that page*/}
        <a href='#explore-menu' onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</a>
        <a href='#app-download' onClick={()=>setMenu("Mobile App")} className={menu==="Mobile App"?"active":""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu("Contact Us")} className={menu==="Contact Us"?"active":""}>Contact Us</a>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            <div className={getTotalAmount()===0 ? "":"dot"}></div> {/* When any product is bought, the dot will be visible; otherwise, it will not. */}
        </div>
        {/*When the user is sign up then we remove and add profile image*/}
        {!token ? <button onClick={()=>(setShowLogin(true))}>Sign In</button> 
        : <div className='navbar-profile'>
              <img src={assets.profile_icon}/>
              <ul className="nav-profile-dropdown">
                <li onClick={()=>navigate('/myorders')}><img src={assets.bag_icon}/><p>Orders</p></li>
                <hr/>
                <li onClick={logout}><img src={assets.logout_icon}/><p>Logout</p></li>
              </ul>
        </div> }
        
      </div>
    </div>
  )
}

export default Navbar
{/*It is mainly the Navigation Bar type */}