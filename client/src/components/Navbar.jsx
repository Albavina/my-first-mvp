import React from 'react';
import {Link} from "react-router-dom";
import "./Navbar.css"

export default function Navbar() {
  return (
    <>
    <div className='navbar'>
        <Link to = "/">Find your new best friend</Link>
        <Link to = "/collaborator">Collaborate</Link>
        <Link to = "/home">About us</Link>
        <Link to = "/admin">Admin</Link>
    </div>
    </>
  );
};
