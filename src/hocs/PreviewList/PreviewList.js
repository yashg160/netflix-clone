import React from 'react';
import './preview-list.scss';

const PreviewList = ({ header, previewData, onDataItemClick }) => {
  const handleListItemClick = (event, dataItem) => {
    event.preventDefault();
    event.stopPropagation();

    onDataItemClick && onDataItemClick(dataItem);
  };

  return (
    <section className='preview-list-container'>
      <h3 className='list-header'>
        <span className='header-wrapper'>
          <a href='/' className='header-link'>
            {header}
            <span className='add-action'>Explore All {`>`}</span>
          </a>
        </span>
      </h3>

      <div className='list-content'>
        {previewData?.map((previewDataItem) => {
          return (
            <div
              className='list-item'
              key={previewDataItem.id}
              onClick={(event) => handleListItemClick(event, previewDataItem)}
            >
              <img
                src={`${process.env.REACT_APP_IMAGE_BASE_PATH}${previewDataItem.poster_path}`}
              />
              <div className='add-action-button'>
                <svg viewBox='0 0 512 512'>
                  <path d='M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z' />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PreviewList;
