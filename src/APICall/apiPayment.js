import { BASE_PATH, BASE_URL, CALL_BACK_URL } from './constants';
import axios from 'axios';
import MessageHandler from './messageHandler';
import dataHandlerService from '../services/dataHandler.service';
import { showLoginPleaseModal, showSessionExpireModal } from '../Redux/Action/AuthActions/authActions';

const apiPayment = async (path, params, method,dispatch) => {

  let authToken = dataHandlerService?.getStore()?.getState()?.AuthReducer?.userToken 
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
    // Without a timeout axios waits forever on a half-open socket, leaving the
    // payment flow's loader stuck and the app hard-blocked.
    timeout: 20000,
    ...(params && { data: JSON.stringify(params) }),
  };
  return axios(CALL_BACK_URL, options)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
      console.log("====ERROR=====", error?.response?.status);

      // No response (timeout/offline/CORS/server down): don't crash on
      // error.response.status; return a shaped object for callers reading `.data`.
      if (!error?.response) {
        return {
          data: {
            status: false,
            message: 'Unable to reach the server. Please check your connection.',
          },
        };
      }

      if (error.response.status == 401) {
        if (typeof dispatch === 'function') {
          dispatch(showSessionExpireModal(true));
        }
        return error.response;
      }

      return error.response;
    });
};

export default apiPayment;