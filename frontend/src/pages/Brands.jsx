import React from 'react';
import '../styles/Brands.css';

const brandsList = [
  { name: 'Nike', logo: '/assets/brands/nike.png' },
  { name: 'Samsung', logo: '/assets/brands/samsung.png' },
  { name: 'Parker', logo: '/assets/brands/parker.png' },
  { name: 'Apple', logo: '/assets/brands/apple.png' },
  { name: 'Tupperware', logo: '/assets/brands/tupperware.png' },
  { name: 'Lenovo', logo: '/assets/brands/lenovo.png' },
  { name: 'Boat', logo: '/assets/brands/boat.png' },
  { name: 'Logitech', logo: '/assets/brands/logitech.png' },
  { name: 'Milton', logo: '/assets/brands/milton.png' },
  { name: 'Happilo', logo: '/assets/brands/happilo.png' },
  { name: 'Sony', logo: '/assets/brands/sony.png' },
  { name: 'Canon', logo: '/assets/brands/canon.png' },
];

const Brands = () => {
  return (
    <div className="brands-container">
      <h1 className="brands-heading">Brands We Offer</h1>
      <p className="brands-description">
        At MF Global Services, we collaborate with top-tier national and international brands to deliver high-quality corporate gifts. From tech to lifestyle, these brands ensure your gifting experience is premium and memorable.
      </p>

      <div className="brands-grid">
        {brandsList.map((brand, index) => (
          <div className="brand-card" key={index}>
            <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
            <p className="brand-name">{brand.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Brands;
