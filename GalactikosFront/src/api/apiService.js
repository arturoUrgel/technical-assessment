import axios from 'axios';
import {match} from './apiRoute';
import enviroment from '../enviroment';
import NetInfo from '@react-native-community/netinfo';

const apiService = axios.create({
  baseURL: enviroment.apiUrl,
  timeout: 10000,
});

const callApi = async (method, route, data = null) => {
  let serviceResponse = {};
  try {
    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      serviceResponse = {error: 'No internet connection'};
    } else {
      const response = await apiService({
        method: method,
        url: route,
        data: data,
      });
      serviceResponse = response.data;
    }
  } catch (error) {
    console.log(`Error: URL - ${route}, Error:`, error);
    if (error.response) {
      const data = error.response.data;
      if (typeof data === 'object' && data !== null) {
        serviceResponse = error.response.data;
      } else {
        serviceResponse = {
          message: 'Contact the administrator',
        };
      }
    } else if (error.request) {
      serviceResponse = {error: 'Please try again later'};
    } else {
      serviceResponse = {message: 'Error configuring the request'};
    }
  } finally {
    return serviceResponse;
  }
};

export const addMatch = async matchData =>
  await callApi('POST', match, matchData);

export const getMatches = async () => await callApi('GET', match);

export default apiService;
