import {FastField} from 'formik';
import api from '../../../APICall/api';
import MessageHandler from '../../../APICall/messageHandler';
import {Utills} from '../../../config';
import ActionType from '../ActionType/actionType';


export const validUserForPaymnet = (data) => {
  return async dispatch => {
    dispatch({type: ActionType.HOME_LOADER, payload: true});
    try {
      const response = await api('auth/validatePassword', data, 'post',dispatch)
      MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({type: ActionType.HOME_LOADER, payload: false});
    }
  };
};



export const validateOtp = (data) => {
  return async dispatch => {
    dispatch({type: ActionType.HOME_LOADER, payload: true});
    try {
      const response = await api('auth/validate/withdrawOtp', data, 'post',dispatch)
      MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      dispatch({type: ActionType.HOME_LOADER, payload: false});
      return false;
    } finally {
      dispatch({type: ActionType.HOME_LOADER, payload: false});
    }
  };
};


