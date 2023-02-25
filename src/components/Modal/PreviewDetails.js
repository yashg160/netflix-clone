import React, { useState, useEffect } from 'react';

import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

import { TMDB_API_KEY } from '../../common/APIKeys';

import './preview-details.scss';

const PreviewDetailsModal = ({ isOpen, onClose, dataItem }) => {
  const [modalContainerStyle, setModalContainerStyle] = useState({
    display: 'none',
  });
  const [modalBackdropStyle, setModalBackdropStyle] = useState({});
  const [modalContentStyle, setModalContentStyle] = useState({});
  const [previewData, setPreviewData] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const [playerTarget, setPlayerTarget] = useState(null);

  useEffect(() => {
    if (isOpen) {
      // Start fetching data for the preview item
      fetchPreviewData();

      document.body.style.overflow = 'hidden';

      setModalContainerStyle({
        display: 'block',
      });

      setTimeout(() => {
        setModalBackdropStyle({
          opacity: 0.8,
        });

        setModalContentStyle({
          opacity: 1,
        });
      }, [10]);
    } else {
      document.body.style.overflow = 'auto';

      setModalBackdropStyle({
        opacity: 0,
      });

      setModalContentStyle({
        opacity: 0,
      });

      setTimeout(() => {
        setModalContainerStyle({
          display: 'none',
        });
      }, 250);
    }
  }, [isOpen]);

  useEffect(() => {
    if (playerTarget != null) {
      if (isMuted) {
        playerTarget.setVolume(0);
      } else {
        playerTarget.setVolume(100);
      }
    }
  }, [isMuted]);

  const fetchPreviewData = () => {
    // Make network requests and get the data that we need to show in the display modal
    if (dataItem) {
      movieTrailer(null, { apiKey: TMDB_API_KEY, tmdbId: dataItem.id })
        .then((response) => {
          // Reponse is a complete youtube URL like https://www.youtube.com/watch?v=ZQSDbqFzcq8
          // We need to get the query param "v" for the player
          const urlParams = new URLSearchParams(new URL(response).search);
          const ytVideoId = urlParams.get('v');
          setPreviewData({
            youtubeTrailerUrl: response,
            youtubeVideoId: ytVideoId,
          });
        })
        .catch((error) => {
          console.error('Error while fetching preview data -', error);
        });
    } else {
      console.error(
        'Could not fetch preview data. Data item is empty. -',
        dataItem
      );
    }
  };

  const handleBackdropClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose && onClose();
  };

  const handleCloseButtonClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onClose && onClose();
  };

  const handleYoutubePlayerReady = (e) => {
    // Set reference to target to change volume later
    setPlayerTarget(e.target);

    if (isMuted) {
      e.target.setVolume(0);
    }
  };

  const handleSoundClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsMuted((v) => !v);
  };

  const opts = {
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
      iv_load_policy: 3,
    },
  };

  return (
    <div className='preview-modal-container' style={modalContainerStyle}>
      <div
        className='modal-backdrop'
        style={modalBackdropStyle}
        onClick={(e) => handleBackdropClick(e)}
      ></div>

      <div className='modal-content-wrapper' style={modalContentStyle}>
        <div className='modal-content'>
          <button
            className='button-action button-circle button-highlight close-button'
            onClick={(e) => handleCloseButtonClick(e)}
          >
            <svg viewBox='0 0 24 24'>
              <path d='M6.225 4.811a1 1 0 00-1.414 1.414L10.586 12 4.81 17.775a1 1 0 101.414 1.414L12 13.414l5.775 5.775a1 1 0 001.414-1.414L13.414 12l5.775-5.775a1 1 0 00-1.414-1.414L12 10.586 6.225 4.81z' />
            </svg>
          </button>

          {isOpen && (
            <YouTube
              opts={opts}
              iframeClassName='yt-iframe'
              className='yt-player-container'
              videoId={previewData.youtubeVideoId}
              onReady={(e) => handleYoutubePlayerReady(e)}
            />
          )}

          <div className='preview-item-description'>
            <h3 className='preview-item-title'>
              {dataItem?.name ||
                dataItem?.title ||
                dataItem?.original_name ||
                dataItem?.original_title}
            </h3>

            <div className='actions-container'>
              <button className='button-action button-play'>
                <img src='play.svg' />
                Play
              </button>

              <button
                className='button-action button-circle button-highlight button-size-fix button-complete'
                // onClick={(e) => handleCloseButtonClick(e)}
              >
                <svg viewBox='0 0 16 16'>
                  <path d='M13.854 3.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3.5-3.5a.5.5 0 11.708-.708L6.5 10.293l6.646-6.647a.5.5 0 01.708 0z' />
                </svg>
              </button>

              <button
                className='button-action button-circle button-highlight button-size-fix button-feedback'
                // onClick={(e) => handleCloseButtonClick(e)}
              >
                <svg viewBox='0 0 16 16'>
                  <path d='M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 00.254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 00-.138-.362 1.9 1.9 0 00.234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 00-.443.05 9.365 9.365 0 00-.062-4.509A1.38 1.38 0 009.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 01-.145 4.725.5.5 0 00.595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 011.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 01-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 01-.121.416c-.165.288-.503.56-1.066.56z' />
                </svg>
              </button>

              <button
                className='button-action button-circle button-highlight button-size-fix button-mute'
                onClick={(e) => handleSoundClick(e)}
              >
                {isMuted && (
                  <svg viewBox='0 0 16 16' className='muted-true'>
                    <path d='M6.717 3.55A.5.5 0 017 4v8a.5.5 0 01-.812.39L3.825 10.5H1.5A.5.5 0 011 10V6a.5.5 0 01.5-.5h2.325l2.363-1.89a.5.5 0 01.529-.06zM6 5.04L4.312 6.39A.5.5 0 014 6.5H2v3h2a.5.5 0 01.312.11L6 10.96V5.04zm7.854.606a.5.5 0 010 .708L12.207 8l1.647 1.646a.5.5 0 01-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 01-.708-.708L10.793 8 9.146 6.354a.5.5 0 11.708-.708L11.5 7.293l1.646-1.647a.5.5 0 01.708 0z' />
                  </svg>
                )}

                {!isMuted && (
                  <svg viewBox='0 0 24 24'>
                    <path d='M11.553 3.064A.75.75 0 0112 3.75v16.5a.75.75 0 01-1.255.555L5.46 16H2.75A1.75 1.75 0 011 14.25v-4.5C1 8.784 1.784 8 2.75 8h2.71l5.285-4.805a.75.75 0 01.808-.13zM10.5 5.445l-4.245 3.86a.75.75 0 01-.505.195h-3a.25.25 0 00-.25.25v4.5c0 .138.112.25.25.25h3a.75.75 0 01.505.195l4.245 3.86V5.445z' />
                    <path d='M18.718 4.222a.75.75 0 011.06 0c4.296 4.296 4.296 11.26 0 15.556a.75.75 0 01-1.06-1.06 9.5 9.5 0 000-13.436.75.75 0 010-1.06z' />
                    <path d='M16.243 7.757a.75.75 0 10-1.061 1.061 4.5 4.5 0 010 6.364.75.75 0 001.06 1.06 6 6 0 000-8.485z' />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewDetailsModal;
