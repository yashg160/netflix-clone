import React, { useRef, useState, useEffect } from 'react';

import './navbar.scss';

const Navbar = () => {
  const navContainerRef = useRef(null);
  const [currentStyle, setCurrentStyle] = useState({});

  useEffect(() => {
    window.onscroll = () => {
      if (window.scrollY >= 50) {
        setCurrentStyle({
          backgroundColor: 'rgb(24, 24, 24)',
        });
      } else {
        setCurrentStyle({});
      }
    };
  }, []);

  return (
    <nav className='navbar'>
      <div className=''>
        <div className='container' ref={navContainerRef} style={currentStyle}>
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
