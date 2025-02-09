import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import axiosClient from '../Axios/Axios-client';

const EditPost = () => {
//   const history = useHistory();
  const { post } = useParams(); // Getting post ID from URL params
  const [blogs, setBlogs] = useState({
    title: '',
    body: '',
    image: '',
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);  // Loading state for fetching data

  // Fetch the post data from Laravel API
  useEffect(() => {
    axiosClient.get(`/posts/${post}`)
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching post data:', error);
        setLoading(false);
      });
  }, [post]);

  const handleTitleChange = (e) => {
    setBlogs((prevPost) => ({ ...prevPost, title: e.target.value }));
  };

  const handleBodyChange = (e) => {
    setBlogs((prevPost) => ({ ...prevPost, body: e.target.value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBlogs((prevPost) => ({ ...prevPost, image: imageUrl }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedPost = { ...blogs };
    if (imageFile) {
      // Simulating image upload by storing it as a URL (upload to the server in a real case)
      updatedPost.image = URL.createObjectURL(imageFile);
    }

    axios.put(`posts/${post}`, updatedPost)
      .then(() => {
        // history.push(`/posts/${id}`); // Redirect to the updated post page
      })
      .catch((error) => {
        console.error('Error updating post:', error);
      });
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 bg-white rounded-xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={blogs.title}
            onChange={handleTitleChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="body" className="block text-lg font-medium text-gray-700">Body</label>
          <textarea
            id="body"
            value={blogs.body}
            onChange={handleBodyChange}
            className="mt-2 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="image" className="block text-lg font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 w-full text-sm text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {blogs.image && (
            <div className="mt-4">
              <h4 className="text-md font-medium text-gray-700">Current Image</h4>
              <img src={post.image} alt="Current Post" className="mt-2 max-w-full h-auto rounded-md" />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
