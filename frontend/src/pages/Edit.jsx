import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import axiosClient from "../Axios/Axios-client";
import { useNavigate } from "react-router-dom";

const EditPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, [id]);
  const navigate = useNavigate();
  const fetchPost = async () => {
    try {
      const response = await axiosClient.get(`/posts/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error("Error fetching post data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("body", formData.body);
      if (imageFile) {
        formDataToSend.append("image", imageFile);
      }

      await axiosClient.put(`/posts/${id}`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect or show success message
      navigate("/");
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8 mx-auto mt-10 max-w-3xl bg-white rounded-xl shadow-lg">
      <h2 className="mb-6 text-3xl font-semibold text-center text-gray-800">
        Edit Post
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-lg font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="p-3 mt-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="body"
            className="block text-lg font-medium text-gray-700"
          >
            Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={handleInputChange}
            className="p-3 mt-2 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="image"
            className="block text-lg font-medium text-gray-700"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 w-full text-sm text-gray-700 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formData.image && (
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 text-md">
                Current Image
              </h4>
              <img
                src={formData.image}
                alt="Current Post"
                className="mt-2 max-w-full h-auto rounded-md"
              />
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Update Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
