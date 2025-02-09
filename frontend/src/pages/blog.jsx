import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../Axios/Axios-client';

function Blog() {
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState(null);


  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axiosClient.get(`/posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error(err);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await axiosClient.delete(`/posts/${id}`);
        navigate('/');
      } catch (err) {
        console.error(err);
      }
    }
  };

  
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }


  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg my-10">
      {post && (
        <>
          <div className="mb-8">
            {post.image && (
              <img
                src={`http://localhost:8000${post.image}`}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            )}
          </div>
          <div className="text-center mb-6">
            <h1 className="text-4xl font-extrabold text-gray-900">{post.title}</h1>
            <p className="text-lg text-gray-500 mt-2">
              By {post.user?.name} | Posted on {new Date(post.created_at).toLocaleDateString()}
            </p>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed text-xl">{post.body}</p>
          </div>
          <div className="mt-10 flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/')} 
              className="px-6 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              Back to Blogs
            </button>
            <button 
              onClick={() => navigate(`/edit/${id}`)} 
              className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Blog;
