import React from 'react'
import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";
import OurServices from '../components/OurServices';
import Brands from '../components/Brands';
import AboutUs from '../components/AboutUs';
import CorporateGiftingSolutions from "../components/CorporateGiftingSolutions";
import ShopByOccasion from '../components/ShopByOccasion';


const Home = () => {
  return (
    <>
      <HeroSection />
      <CategorySlider />
      <ShopByOccasion />
      <OurServices />
      <CorporateGiftingSolutions />
      <Brands />
      <AboutUs />
    </>
  )
}

export default Home;