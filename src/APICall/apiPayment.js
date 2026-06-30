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
    ...(params && { data: JSON.stringify(params) }),
  };
  return axios(CALL_BACK_URL, options)
    .then((response) => {
      return response;
    })
    .catch(async (error) => {
      
      console.log("====ERROR=====",error.response.status);
      if (error.response.status == 401) {
        dispatch(showSessionExpireModal(true));
        return
      }

      return error.response;
    });
};

export default apiPayment;