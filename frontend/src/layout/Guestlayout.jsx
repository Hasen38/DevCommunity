import React from 'react'
import { Outlet } from 'react-router-dom';

function Guestlayout(){
  return (
    <div>
<h1>Auth layout</h1>
<main>
    <Outlet/>
</main>

    </div>
  )
}

export default Guestlayout
