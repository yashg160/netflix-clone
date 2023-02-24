import React from 'react';
import './preview-list.scss';

const PreviewList = ({ header, previewData }) => {
  return (
    <section className='preview-list-container'>
      <h3 className='list-header'>
        <span className='header-wrapper'>
          <a href='/' className='header-link'>
            {header}
            <span className='add-action'>Explore All ></span>
          </a>
        </span>
      </h3>
      <div className='list-content'>
        {previewData?.map((previewDataItem) => {
          return (
            <div className='list-item' key={previewDataItem.id}>
              <img
                src={`${process.env.REACT_APP_IMAGE_BASE_PATH}${previewDataItem.poster_path}`}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewList;
