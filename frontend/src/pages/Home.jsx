import React from 'react'
import HeroSection from "../components/HeroSection";
import CategorySlider from "../components/CategorySlider";
import OurServices from '../components/OurServices';

import ShopByOccasion from '../components/ShopByOccasion';
import WhyChooseUs from '../components/WhyChooseUs';
import Industries from '../components/Industries';
import HowitWorks from '../components/HowitWorks';
import Testimonials from '../components/Testimonials';
import GetQuoteCTA from '../components/GetQuoteCTA';


const Home = () => {
  return (
    <>
      <HeroSection />
      <CategorySlider />
      <ShopByOccasion />
      <OurServices />
      <WhyChooseUs />
      <Industries />
      <HowitWorks/>
      <Testimonials />
      <GetQuoteCTA />
    </>
  )
}

export default Home;