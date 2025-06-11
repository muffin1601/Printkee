import React from 'react'
import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";
import OurServices from '../components/OurServices';
import Brands from '../components/Brands';
import AboutUs from '../components/AboutUs';


const Home = () => {
  return (
    <>
      <HeroSection />
      <CategorySlider />
      <OurServices />
      <Brands />
      <AboutUs />
    </>
  )
}

export default Home;