import React from "react";
import { Link } from "react-router-dom";

// Image placeholder component
const ImagePlaceholder = () => (
  <div className="flex justify-center items-center w-full h-full bg-gray-200">
    <svg
      className="w-16 h-16 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  </div>
);

// Author info component
const AuthorInfo = ({ user, createdAt }) => (
  <div className="flex items-center mb-4 space-x-2">
    <div className="flex justify-center items-center w-8 h-8 bg-gray-300 rounded-full">
      <span className="text-sm font-medium text-gray-600">
        {user ? user.charAt(0).toUpperCase() : "?"}
      </span>
    </div>
    <div className="text-sm text-gray-600">
      <span className="font-medium">{user?.name}</span>
      <span className="mx-2">•</span>
      Posted on {new Date(createdAt).toLocaleDateString()}
    </div>
  </div>
);

// Blog card component
const BlogCard = ({ posts, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  const renderBlogPost = (post) => (
    <div
      key={post.id}
      className="overflow-hidden bg-white rounded-xl border border-gray-100 shadow-md transition-all duration-300 hover:shadow-xl"
    >
      {/* Blog Image */}
      <div className="overflow-hidden relative h-56">
        {post.image ? (
          <img
            src={`http://localhost:8000${post.image}`}
            className="object-cover w-full h-full transition-transform duration-500 transform hover:scale-105"
            alt={post.title}
          />
        ) : (
          <ImagePlaceholder />
        )}
      </div>

      {/* Blog Content */}
      <div className="p-6">
        <h2 className="mb-2 text-2xl font-bold text-gray-800 transition-colors duration-200 line-clamp-2 hover:text-blue-600">
          {post.title}
        </h2>

        <AuthorInfo user={post.user} createdAt={post.created_at} />

        <p className="mb-4 text-base text-gray-600 line-clamp-3">{post.body}</p>

        <div className="flex justify-between items-center mt-6">
          <Link
            to={`/show/${post.id}`}
            className="inline-flex items-center font-medium text-blue-600 transition-colors duration-200 hover:text-blue-800"
          >
            Read more
            <svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>

          <Link
            to={`edit/${post.id}`}
            className="px-4 py-2 text-sm text-white bg-gray-800 rounded-lg transition-colors duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {posts.data.data && posts.data.data.length > 0 ? (
        posts.data.data.map(renderBlogPost)
      ) : (
        <div className="col-span-full text-center text-gray-500">
          No blog posts found
        </div>
      )}
    </div>
  );
};

export default BlogCard;
