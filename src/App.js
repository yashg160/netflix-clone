import { useState } from 'react';

import Navbar from './components/Navbar/Navbar';
import LandingBanner from './components/LandingBanner/LandingBanner';
import LandingPageContent from './hocs/LandingPageContent/LandingPageContent';

import './styles/globals.scss';
import './styles/app.scss';

function App() {
  const [landingBannerRef, setLandingBannerRef] = useState(null);

  return (
    <div className='App'>
      <Navbar />
      <LandingBanner passRefToParent={(ref) => setLandingBannerRef(ref)} />
      <LandingPageContent landingBannerRef={landingBannerRef} />
    </div>
  );
}

export default App;
