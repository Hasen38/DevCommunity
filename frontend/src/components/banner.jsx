import React from 'react';
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-indigo-600 overflow-hidden">
      {/* Decorative circles */}
      <div className="hidden sm:block sm:absolute sm:inset-y-0 sm:h-full sm:w-full">
        <div className="relative h-full max-w-7xl mx-auto">
          <svg
            className="absolute right-full transform translate-y-1/4 translate-x-1/4 lg:translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-purple-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)" />
          </svg>
          <svg
            className="absolute left-full transform -translate-y-3/4 -translate-x-1/4 md:-translate-y-1/2 lg:-translate-x-1/2"
            width="404"
            height="784"
            fill="none"
            viewBox="0 0 404 784"
          >
            <defs>
              <pattern
                id="5d0dd344-b041-4d26-bec4-8d33ea57ec9b"
                x="0"
                y="0"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <rect x="0" y="0" width="4" height="4" className="text-purple-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#5d0dd344-b041-4d26-bec4-8d33ea57ec9b)" />
          </svg>
        </div>
      </div>

      <div className="relative pt-6 pb-16 sm:pb-24">
        <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Discover the Art of</span>
              <span className="block text-yellow-300">Modern Development</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Where innovation meets inspiration. Join our community of passionate developers crafting the future through elegant code, 
              thoughtful solutions, and compelling stories. Every line of code has a story — share yours.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/create"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-yellow-300 hover:bg-yellow-400 md:py-4 md:text-lg md:px-10"
                >
                  Start Writing
                </Link>
              </div>
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <Link
                  to="/blog"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-800 hover:bg-purple-900 md:py-4 md:text-lg md:px-10"
                >
                  Read Articles
                </Link>
              </div>
            </div>
          </div>
        </main>

        {/* Stats section */}
        <div className="mt-10">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4 sm:gap-6 lg:gap-8">
              <div className="px-4 py-5 bg-purple-800 bg-opacity-25 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-100 truncate">Total Posts</dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-300">2.7K</dd>
              </div>
              <div className="px-4 py-5 bg-purple-800 bg-opacity-25 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-100 truncate">Active Writers</dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-300">500+</dd>
              </div>
              <div className="px-4 py-5 bg-purple-800 bg-opacity-25 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-100 truncate">Topics</dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-300">50+</dd>
              </div>
              <div className="px-4 py-5 bg-purple-800 bg-opacity-25 shadow rounded-lg overflow-hidden sm:p-6">
                <dt className="text-sm font-medium text-gray-100 truncate">Daily Readers</dt>
                <dd className="mt-1 text-3xl font-semibold text-yellow-300">12K</dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;