import React, { useEffect, useState } from 'react';

import PreviewDetailsModal from '../../components/Modal/PreviewDetails';
import PreviewList from '../PreviewList/PreviewList';

import {
  fetchActionMovies,
  fetchComedyMovies,
  fetchTopRatedMovies,
  fetchNetflixOriginals,
} from '../../services/DataService';

import './landing-page-content.scss';

const LandingPageContent = ({}) => {
  const [netflixOriginals, setNetflixOriginals] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [comedyMovies, setComedyMovies] = useState([]);

  const [previewDataItem, setPreviewDataItem] = useState(null);
  const [isPreviewDetailsModalOpen, setIsPreviewDetailsModalOpen] =
    useState(false);

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
      .catch((err) => console.error('Error while fetchin comedy movies'));
  }, []);

  const handleDataItemClick = (dataItem) => {
    console.log('Called Handle Data Item. Args -', dataItem);
    setPreviewDataItem(dataItem);
    setIsPreviewDetailsModalOpen(true);
    // TODO: Open a modal with the item details
  };

  return (
    <section className='page-content'>
      <div className='global-container'>
        <PreviewList
          header='Only On Netflix'
          previewData={netflixOriginals}
          onDataItemClick={(dataItem) => handleDataItemClick(dataItem)}
        />
        <PreviewList
          header='Top Rated Content'
          previewData={topRatedMovies}
          onDataItemClick={(dataItem) => handleDataItemClick(dataItem)}
        />
        <PreviewList
          header='High Octane Action'
          previewData={actionMovies}
          onDataItemClick={(dataItem) => handleDataItemClick(dataItem)}
        />
        <PreviewList
          header='For Laughs'
          previewData={comedyMovies}
          onDataItemClick={(dataItem) => handleDataItemClick(dataItem)}
        />

        <PreviewDetailsModal
          dataItem={previewDataItem}
          isOpen={isPreviewDetailsModalOpen}
          onClose={() => setIsPreviewDetailsModalOpen(false)}
        />
      </div>
    </section>
  );
};

export default LandingPageContent;
