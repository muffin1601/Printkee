import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "../styles/CategorySlider.css"; 

const CategorySlider = () => {
  const [categories, setCategories] = useState([]);




  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/category/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  return (
    <div className="category-slider-container">
      <h2 className="category-slider-heading">All Catgories to Explore</h2>
      <p className="category-slider-subheading">
        Discover a world of thoughtful gifting — from stylish apparel and custom accessories to practical office essentials and eco-friendly totes. Whether you're celebrating a milestone, promoting your brand, or simply saying thank you, explore our curated categories designed to make every gift feel personal and memorable.
      </p>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={4}
        navigation
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        className="category-swiper"
      >
        {categories.map((item) => (
          <SwiperSlide key={item._id}>
            <div className="category-card">
              <div className="category-image-container">
                {item.isNew && <span className="category-new-badge">New</span>}
                <img className="category-image" src={item.image} alt={item.name} />
              </div>
              <h3 className="category-title">{item.name}</h3>
              {/* <div className="category-stars">☆☆☆☆☆</div> */}
              <button className="category-explore-btn" onClick={() =>
                          window.location.href = `/${item.slug}`

                        } >Explore →</button>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CategorySlider;
