import React, { useState, useEffect } from 'react';
import axiosClient from '../Axios/Axios-client';
import BlogCard from '../components/Blogcard';
import { Link } from 'react-router-dom';

function Home() {
  const [posts, setPosts] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosClient.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        let url = '/posts';
        if (selectedCategory !== 'all') {
          url += `?category=${selectedCategory}`;
        }
        const response = await axiosClient.get(url);
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory]);

  // Get category icon based on name
  const getCategoryIcon = (name) => {
    const icons = {
      'Web Development': '🌐',
      'Mobile Development': '📱',
      'DevOps': '⚙️',
      'Artificial Intelligence': '🤖',
      'Cybersecurity': '🔒',
      'Cloud Computing': '☁️',
      'Data Science': '📊',
      'UI/UX Design': '🎨',
      'default': '📝'
    };
    return icons[name] || icons.default;
  };

  return (
    <div className="container mx-auto px-4">
      {/* Category Section */}
      <div className="my-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explore Topics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            onClick={() => setSelectedCategory('all')}
            className={`cursor-pointer p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
              selectedCategory === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-800 hover:bg-purple-50'
            } shadow-md`}
          >
            <div className="text-3xl mb-2">📚</div>
            <h3 className="font-semibold">All Posts</h3>
            <p className="text-sm opacity-75">View everything</p>
          </div>

          {categories.map((category) => (
            <div
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`cursor-pointer p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-white text-gray-800 hover:bg-purple-50'
              } shadow-md`}
            >
              <div className="text-3xl mb-2">{getCategoryIcon(category.name)}</div>
              <h3 className="font-semibold">{category.name}</h3>
              <p className="text-sm opacity-75">View posts</p>
            </div>
          ))}
        </div>
      </div>

      {/* Posts Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {selectedCategory === 'all' 
            ? 'Latest Posts' 
            : `Posts in ${categories.find(c => c.id === selectedCategory)?.name || ''}`}
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : (
          <BlogCard posts={posts} loading={false} />
        )}
      </div>
    </div>
  );
}

export default Home;
