// components/RelatedCategories.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RelatedCategories.css';
import { Link } from 'react-router-dom';

const RelatedCategories = ({ currentSubcategory }) => {
  const [related, setRelated] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/related-subcategories/${currentSubcategory}`);
        setRelated(res.data);
      } catch (err) {
        console.error('Failed to fetch related categories:', err);
      }
    };

    fetchRelated();
  }, [currentSubcategory]);

  return (
    <section className="related-categories">
      <h2>Explore More in </h2>
      <div className="related-grid">
        {related.map((cat) => (
          <Link key={cat.name} to={`/Apparel-and-Accessories/${cat.name}`}>
            <div className="related-item">
              <img src={cat.image} alt={cat.name} />
              <p className='item-name'>{cat.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default RelatedCategories;
