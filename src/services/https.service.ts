import axios, {AxiosRequestConfig} from 'axios';
import util from '../config/utills/utils.helper';
import {
  // V1_BASE_URL,
  BASE_URL,
  BASE_PATH,
  // REFRESH_TOKEN_URL,
  API_TIMEOUT,
} from './config';
import dataHandlerService from './dataHandler.service';

const customAxios = (contentType: string = 'application/json') => {
  const instance = axios.create({
    baseURL: BASE_URL + BASE_PATH,
    headers: {'Content-Type': contentType},
    timeout: API_TIMEOUT,
  });

  instance.interceptors.request.use(async (config: any) => {
    // var tokenn = util.getCurrentUserAccessToken();

    let authToken = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken 

    // var token =
    //   'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im11bmliODhAZ21haWwuY29tIiwidXNlcklEIjoiNjUzYmFlNDAxYmMxMTU4YzJhNGEyYTdlIiwidXNlclR5cGUiOiJVc2VyIiwiaWF0IjoxNjk4NDEwMTIzfQ.tK1fmYVg2dsrdV4Nb7wi4dg6GBFptAjs1iTDtGpqbOU';

    // console.log('TOKEN---', tokenn);
    // console.log('urlllll=====', config?.url);

    if (authToken) {
      config.headers = {
        ...config.headers,
        authorization: `${authToken}`,
      };
    }

    return config;
  });

  return instance;
};

export default customAxios;
