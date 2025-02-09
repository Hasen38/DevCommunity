import React from 'react';
import {createBrowserRouter,createRoutesFromElements,Route } from 'react-router-dom';
import Mainlayout from './layout/Mainlayout';
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import Login from './pages/Login';
import Contact from './pages/Contact';
import './index.css';
import Signup from './pages/Signup';
import Create from './pages/Create'
import Edit from './pages/Edit';

    const router = createBrowserRouter(
        createRoutesFromElements(
        <>
            <Route path='/'  element={<Mainlayout/>}>
            <Route index element={<Home />} />
            {/* <Route path='blogs'  element={<Blogs />} /> */}
            <Route path='about'  element={<About />} />
            <Route path='contact'  element={<Contact />} />
            <Route exact path='/show/:id'  element={<Blog />} />
            <Route exact path='/edit/:id'  element={<Edit/>} />
            </Route>
                <Route path='/login' element={<Login/>}/>
                <Route path='/Signup' element={<Signup/>}/>
                <Route path='/create' element={<Create/>}/>
                {/* <Route path='/verifyemail' element={<Verifyemail/>}/> */}
            </>
        )
    ); 
export default router;
