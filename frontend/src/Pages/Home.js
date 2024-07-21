import React from "react";

import Blog from "../components/Home/Blog"
import Category from "../components/Home/Category"
import Feed from "../components/Home/Feed"
import BestProducts from "../components/Home/BestProducts"
import Sliders from "../components/Home/Sliders"
import NewProducts from "../components/Home/NewProducts"
import Ads from "../components/Home/Ads"
import Deals from "../components/Home/Deals";
import Trending from "../components/Home/Trending";





function Home() {
  
  return (
<>
      <Sliders/>
      <Category/>
      <Deals/>
      <NewProducts/>
      <Trending/>
      <Ads/>
      <BestProducts/>
      <Feed/>
      <Blog/>
      </>
     

  );
}

export default Home;
