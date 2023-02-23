import axiosInstance from './CreateService';
import { API_CONSTANTS } from '../common/APIConstants';

export const fetchTrendingMovies = (dataPayload = {}) => {
  const API_URL = API_CONSTANTS.FETCH_TRENDING;

  return axiosInstance.get(API_URL, dataPayload);
};

export const fetchNetflixOriginals = (dataPayload = {}) => {
  const API_URL = API_CONSTANTS.FETCH_NETFLIX_ORIGINALS;

  return axiosInstance.get(API_URL, dataPayload);
};

export const fetchTopRatedMovies = (dataPayload = {}) => {
  const API_URL = API_CONSTANTS.FETCH_TOP_RATED;

  return axiosInstance.get(API_URL, dataPayload);
};

export const fetchActionMovies = (dataPayload = {}) => {
  const API_URL = API_CONSTANTS.FETCH_ACTION_MOVIES;

  return axiosInstance.get(API_URL, dataPayload);
};

export const fetchComedyMovies = (dataPayload = {}) => {
  const API_URL = API_CONSTANTS.FETCH_COMEDY_MOVIES;

  return axiosInstance.get(API_URL, dataPayload);
};
