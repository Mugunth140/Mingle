import React from 'react';
import '../sass/components/navbar.scss';

const HamMenu = () => {

  const handleHam = () => {
    const hamMenu = document.querySelector('.ham-menu');
    hamMenu.classList.toggle('Ham-active');
  }

  return (
    <>
    <div className="ham-menu" onClick={handleHam}>
     <span className='menu-line'></span>
     <span className='menu-line'></span>
    </div>
    </>
  )
}

export default HamMenu