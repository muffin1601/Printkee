import React, { useState,} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BlogForm.css';

const BlogForm = () => {
  const [form, setForm] = useState({ title: '', content: '', author: '' });
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (image) data.append('image', image);

    await axios.post(`${import.meta.env.VITE_API_URL}/blogs/post`, data);
    alert('Blog posted!');
    setForm({ title: '', content: '', author: '' });
    setImage(null);
    navigate('/blogs');
  };

  return (
    <section className="blog-form-wrapper">
      <form onSubmit={handleSubmit} className="blog-form slide-up">
        <h2>Post a New Blog</h2>
        <input name="title" placeholder="Blog Title" onChange={handleChange} required />
        <input name="author" placeholder="Author Name" onChange={handleChange} required />
        <textarea name="content" placeholder="Write your content here..." rows="6" onChange={handleChange} required />
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="submit-btn">Post Blog</button>
      </form>
    </section>
  );
};

export default BlogForm;
