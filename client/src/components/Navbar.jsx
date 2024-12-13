import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <header>
      <div className='navbar-logo'>
        <Link to='/'>
        <img src="/logo.png" alt="logo" height={32} width={32} />
        <h1>Mingle</h1>
        </Link>
      </div>
      <div className='navbar-links'></div>
    </header>
    </>
  )
}

export default Navbar