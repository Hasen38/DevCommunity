import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Banner from '../components/banner'
import Footer from '../components/Footer'


function Mainlayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <Navbar />
        <Banner/>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default Mainlayout;
