import React from 'react';
import { Helmet } from 'react-helmet';
import '../styles/Brands.css';

const brandsList = [
  { name: 'Adidas', logo: '/assets/brands/adidas.png', slug: 'adidas', url: '/brands/adidas' },
  { name: 'American Tourister', logo: '/assets/brands/american-tourister.png', slug: 'american-tourister', url: '/brands/american-tourister' },
  { name: 'Portronics', logo: '/assets/brands/portronics.png', slug: 'portronics', url: '/brands/portronics' },
  { name: 'Noise', logo: '/assets/brands/noise.png', slug: 'noise', url: '/brands/noise' },
  { name: 'Puma', logo: '/assets/brands/puma.png', slug: 'puma', url: '/brands/puma' },
  { name: 'Boat', logo: '/assets/brands/boat.png', slug: 'boat', url: '/brands/boat' },
  { name: 'Jack & Jones', logo: '/assets/brands/jackjones.png', slug: 'jack-and-jones', url: '/brands/jack-and-jones' },
  { name: 'Wildcraft', logo: '/assets/brands/wildcraft.png', slug: 'wildcraft', url: '/brands/wildcraft' },
  { name: 'Swiss Military', logo: '/assets/brands/swiss-military.png', slug: 'swiss-military', url: '/brands/swiss-military' },
  { name: 'Rare Rabbit', logo: '/assets/brands/rare-rabbit.png', slug: 'rare-rabbit', url: '/brands/rare-rabbit' },
  { name: 'Fuzo', logo: '/assets/brands/fuzo.png', slug: 'fuzo', url: '/brands/fuzo' },
  { name: 'Scott International', logo: '/assets/brands/scott-international.png', slug: 'scott-international', url: '/brands/scott-international' },
];

const Brands = () => {
  return (
    <div className="brands-container">
      <Helmet>
        <title>Our Brand Partners | MF Global Services</title>
        <meta
          name="description"
          content="MF Global Services partners with premium brands like Adidas, Puma, Noise, and American Tourister to provide top-quality corporate gifts. Explore our brand collaborations."
        />
      </Helmet>

      <h1 className="brands-heading">Brands We Offer</h1>
      <p className="brands-description">
        At MF Global Services, we collaborate with top-tier national and international brands to deliver high-quality corporate gifts. From tech to lifestyle, these brands ensure your gifting experience is premium and memorable.
      </p>

      <div className="brands-grid">
        {brandsList.map((brand, index) => (
          <a
            href={brand.url}
            className="brand-card"
            key={index}
          >
            <img src={brand.logo} alt={`${brand.name} logo`} className="brand-logo" />
            <p className="brand-name">{brand.name}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Brands;
