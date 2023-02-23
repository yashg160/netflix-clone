import React, { useState, useEffect } from 'react';

import { fetchTrendingMovies } from '../../services/DataService';

import './banner.scss';

const LandingBanner = () => {
  const [trendingContentData, setTrendingContentData] = useState({});

  useEffect(() => {
    fetchTrendingMovies()
      .then((response) => {
        const data = response.results; // [] of movies or TV shows
        const min = 0; // min bound for random function
        const max = data.length - 1; // max bound is last index of arr
        const index = Math.floor(Math.random() * (max - min + 1)) + min; // get a random index between 0 and length of results arr
        const dataItem = data[index]; // randomg arr item

        if (dataItem && Object.keys(dataItem) != 0)
          setTrendingContentData(dataItem);
      })
      .catch((err) => {
        console.error('Error while fetching trending data', err);
      });
  }, []);

  return (
    <div className='landing-banner'>
      <div className='landing-banner-content'>
        <img
          className='backdrop-image'
          src={`${process.env.REACT_APP_IMAGE_BASE_PATH}${trendingContentData.backdrop_path}`}
        />

        <div className='description-container'>
          <h3 className='description-title'>
            {trendingContentData?.name ||
              trendingContentData?.title ||
              trendingContentData?.original_name ||
              trendingContentData?.original_title}
          </h3>

          <p className='description-overview'>{trendingContentData.overview}</p>

          <div className='description-buttons-container'>
            <button className='action-button button-play'>
              <img src='play.svg' />
              Play
            </button>
            <button className='action-button button-info'>
              <img src='info.svg' />
              More Info
            </button>
          </div>
        </div>

        {/* <img
          src={`${process.env.REACT_APP_IMAGE_BASE_PATH}${trendingContentData.poster_path}`}
        /> */}
      </div>
    </div>
  );
};

export default LandingBanner;
