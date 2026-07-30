import { BASE_PATH, BASE_URL } from './constants';
import axios from 'axios';
import MessageHandler from './messageHandler';
import dataHandlerService from '../services/dataHandler.service';
import { showLoginPleaseModal, showSessionExpireModal } from '../Redux/Action/AuthActions/authActions';

const api = async (path, params, method,dispatch) => {

  let authToken = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken 
  let url = BASE_URL + BASE_PATH + path;
  console.log("====[][]]=====",url,"-", params,"-", "method", method,"---00===",authToken);
  let options;
  options = {
    headers: 
    authToken ? {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    }
    :
    {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: method,
    ...(params && { data: JSON.stringify(params) }),
  };
  return axios(url, options)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
      console.log("=====", error);

      // No response at all (timeout, offline, CORS, server down): error.response
      // is undefined. Reading error.response.status here used to crash. Return a
      // shaped object so callers that read `.data` don't blow up either.
      if (!error?.response) {
        return {
          data: {
            status: false,
            message: 'Unable to reach the server. Please check your connection.',
          },
        };
      }

      if (error.response.status == 401) {
        // dispatch is optional — many callers don't pass it. Calling an undefined
        // dispatch here used to crash with "undefined is not a function".
        if (typeof dispatch === 'function') {
          dispatch(showSessionExpireModal(true));
        }
        // Return the response (not undefined) so callers reading `.data` are safe.
        return error.response;
      }

      return error.response;
    });
};

export default api;