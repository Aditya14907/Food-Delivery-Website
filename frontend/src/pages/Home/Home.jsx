{/*To display the Home page*/}
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import AppDownload from '../../components/AppDownload/AppDownload'
const Home = () => {

    const [category,setCategory] = useState("All");
  return (
    <div>
        <Header/> {/*Here we mount the Header file into Home page */}
        <ExploreMenu category={category} setCategory={setCategory}/> {/*Here we mount the ExploreMenu file into Home page */}
        <FoodDisplay category={category}/> {/*HEre we mount FoodDisplay file */}
        <AppDownload/>
    </div>
  )
}

export default Home
{/*Header contents the View menu button and some paragraphs*/}
{/*In Home page we are mainly seeing the content Menu,Food-items if we particularly selected,Otherwise there will be some food items from each category */}