import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/BlogView.css';

const BlogView = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comment, setComment] = useState({ name: '', comment: '' });

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`).then(res => setBlog(res.data));
    }, [id]);

    const handleComment = async (e) => {
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_API_URL}/blogs/${id}/comments`, comment);
        setComment({ name: '', comment: '' });
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
        setBlog(res.data);
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="blog-view-container">
            <h1>{blog.title}</h1>
            <p className="blog-view-meta">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
            <img className="blog-view-image" src={`${import.meta.env.VITE_IMG_URL}/${blog.image}`} alt={blog.title} />
            <div className="blog-view-content">{blog.content}</div>

            <div className="comment-section">
                <h3>Comments</h3>
                {blog.comments.map((c, i) => (
                    <div className="comment" key={i}>
                        <b>{c.name}</b>
                        {c.comment}
                    </div>
                ))}

                <form onSubmit={handleComment} className="comment-form">
                    <input name="name" placeholder="Your Name" value={comment.name} onChange={(e) => setComment({ ...comment, name: e.target.value })} required />
                    <textarea name="comment" placeholder="Write your comment" value={comment.comment} onChange={(e) => setComment({ ...comment, comment: e.target.value })} required />
                    <button type="submit">Post Comment</button>
                </form>
            </div>
        </div>
    );
};

export default BlogView;
