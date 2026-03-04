import React, { useEffect } from "react";
import CategoryBanner from "../components/CategoryBanner";
import ProductSlider from "../components/ProductSlider";
import CategoryIcons from "../components/Category";
import PromoMenuBanner from "../components/Promo-menu";
import WhyIHerb from "../components/Whyherb";
import Pouseslider from "../components/Pouseslider";
import WellnessHub from "../components/WellnessHub";
import axios from "axios";


const Home = () => {

  async function GetallUser(){
    try {

      const data = await axios.get( `${import.meta.env.VITE_BASEURL}/api/product/getproducts`)
      console.log(data)
      
    } catch (error) {
      console.log(error)
      
    }
  }
  useEffect(()=>{
    GetallUser()
  },[])


  return (
    <div className="mainDiv">
      <PromoMenuBanner />
      <CategoryBanner />
      <ProductSlider title={"spacials"} category={"Specials picked for you"} />
      <ProductSlider
        title={"Recommended for you"}
        category={"recommendedProducts"}
      />

      <CategoryIcons />

      <ProductSlider title={"Trending now"} category={"trending"} />
      <ProductSlider title={"Best Sellers"} category={"Best Sellers"} />
      <ProductSlider title={"New Arrivals"} category={"New arrivals"} />
      <WhyIHerb />
      <Pouseslider />
      <WellnessHub />
    </div>
  );
};

export default Home;
