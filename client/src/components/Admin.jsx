import React from 'react'
import {Link, Outlet} from "react-router-dom"
import "./Admin.css"

export default function Admin() {
  
  return (
    <>
    <div className='container'>
      <button type="submit">
        <div>
      <Link to="/adminAnimals">ANIMALS MANAGEMENT
      </Link>
      </div>
      </button>
      </div>
      <div>
        <Outlet />  
      </div>
    <div>
      <button type="submit">
      <Link to="/adminCollaborators">
      COLLABORATORS MANAGEMENT
      </Link>
        </button>
      </div>
      <div>
        <Outlet />  
      </div>
    </>
  )
}
