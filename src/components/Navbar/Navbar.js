import React, { useRef, useState, useEffect } from 'react';
import NetflixLogoImage from '../../assets/netflix-logo.png';
import ProfileImage from '../../assets/profile.png';

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
          <a href='/netflix-clone'>
            <img src={NetflixLogoImage} className='logo-picture'></img>
          </a>
          <img src={ProfileImage} className='display-picture'></img>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
