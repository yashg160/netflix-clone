import React, { useEffect, useState } from 'react';
import PreviewList from '../PreviewList/PreviewList';
import './landing-page-content.scss';
import {
  fetchNetflixOriginals,
  fetchTopRatedMovies,
  fetchActionMovies,
  fetchComedyMovies,
} from '../../services/DataService';

const LandingPageContent = ({}) => {
  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  useEffect(() => {
    fetchNetflixOriginals()
      .then((response) => {
        setNetflixOriginals(response.results);
      })
      .catch((err) => console.error('Error while fetchin netflix originals'));

    fetchTopRatedMovies()
      .then((response) => {
        setTopRatedMovies(response.results);
      })
      .catch((err) => console.error('Error while fetchin top rated moveis'));

    fetchActionMovies()
      .then((response) => {
        setActionMovies(response.results);
      })
      .catch((err) => console.error('Error while fetchin action movies'));

    fetchComedyMovies()
      .then((response) => {
        setComedyMovies(response.results);
      })
      .catch((err) => console.error('Error while fetchin netflix originals'));
  }, []);

  return (
    <section className='page-content'>
      <div className='global-container'>
        <PreviewList header='Only On Netflix' previewData={netflixOriginals} />
        <PreviewList header='Top Rated Content' previewData={topRatedMovies} />
        <PreviewList header='High Octane Action' previewData={actionMovies} />
        <PreviewList header='For Laughs' previewData={comedyMovies} />
      </div>
    </section>
  );
};

export default LandingPageContent;
