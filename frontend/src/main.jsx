import React from 'react';
import * as ReactDOM from "react-dom/client";
import Router  from './App';
import AppProvider from './Context/Maincontext';
import { RouterProvider } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('root')).render(
    <AppProvider>
      <RouterProvider router={Router}/>
     </AppProvider>
);
