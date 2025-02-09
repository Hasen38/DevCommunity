import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ posts , loading}) => {
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
    {posts.data && posts.data.length > 0 ? (
      posts.data.map((post) => (
        <div key={post.id} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100">
          {/* Blog Image */}
          <div className="relative h-56 overflow-hidden">
            {post.image ? (
              <img
                src={`http://localhost:8000${post.image}`}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                alt={post.title}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Blog Content */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
              {post.title}
            </h2>
            
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-gray-600">
                  {post.user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">{post.user?.name}</span>
                <span className="mx-2">•</span>
              
                Posted on {new Date(post.created_at).toLocaleDateString()}
                
              </div>
            </div>

            <p className="text-gray-600 text-base line-clamp-3 mb-4">{post.body}</p>

            <div className="flex items-center justify-between mt-6">
              <Link
                to={`/show/${post.id}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
              >
                Read more
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>

              <Link 
                to={`edit/${post.id}`} 
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="col-span-full text-center text-gray-500">No blog posts found</div>
    )}
  </div>
  );
};

export default BlogCard;
