import React from 'react';

import './navbar.scss';

const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className=''>
        <div className='container'>
          <a href='/'>
            <img src='/netflix-logo.png' className='logo-picture'></img>
          </a>
          <img src='/profile.png' className='display-picture'></img>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
