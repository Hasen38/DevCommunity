import React, { useState, useEffect } from "react";
import axiosClient from "../Axios/Axios-client";
import BlogCard from "../components/Blogcard";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

function Home() {
  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get("/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = `/posts?page=${currentPage}`;
        if (selectedCategory !== "all") {
          url += `&category=${selectedCategory}`;
        }
        const response = await axiosClient.get(url);
        console.log(response);
        setPosts(response);
        setTotalPages(response.data.meta.last_page); // Adjust this based on your API response structure
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory, currentPage]);

  // Get category icon based on name
  const getCategoryIcon = (name) => {
    const icons = {
      "Web Development": "🌐",
      "Mobile Development": "📱",
      DevOps: "⚙️",
      "Artificial Intelligence": "🤖",
      Cybersecurity: "🔒",
      "Cloud Computing": "☁️",
      "Data Science": "📊",
      "UI/UX Design": "🎨",
      default: "📝",
    };
    return icons[name] || icons.default;
  };

  return (
    <div className="container px-4 mx-auto">
      {/* Category Section */}
      <div className="my-8">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          Explore With Categories
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div
            onClick={() => setSelectedCategory("all")}
            className={`cursor-pointer p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === "all"
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-800 hover:bg-purple-50"
            } shadow-md`}
          >
            <div className="mb-2 text-3xl">📚</div>
            <h3 className="font-semibold">All Posts</h3>
            <p className="text-sm opacity-75">View everything</p>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`cursor-pointer p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-800 hover:bg-purple-50"
              } shadow-md`}
            >
              <div className="mb-2 text-3xl">
                {getCategoryIcon(category.name)}
              </div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm opacity-75">View posts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-bold text-center text-gray-800">
          {selectedCategory === "all"
            ? "Latest Posts"
            : `Posts in ${
                categories.find((c) => c.id === selectedCategory)?.name || ""
              }`}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="w-12 h-12 rounded-full border-b-2 border-purple-600 animate-spin"></div>
          </div>
        ) : (
          <BlogCard posts={posts} loading={false} />
        )}
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default Home;
