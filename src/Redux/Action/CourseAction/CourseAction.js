import {FastField} from 'formik';
import api from '../../../APICall/api';
import MessageHandler from '../../../APICall/messageHandler';
import {Utills} from '../../../config';
import ActionType from '../ActionType/actionType';


export const MyCourses = () => {
  return async dispatch => {
    // dispatch({type: ActionType.HOME_LOADER, payload: true});
    try {
      const response = await api('enrolled-course', null, 'get',dispatch)
      if (Array.isArray(response?.data?.message)) {
        Utills.showToast(response?.data?.message[0], '', 'error');
        console.log('response', response?.data?.message[0]);
      }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({type: ActionType.HOME_LOADER, payload: false});
    }
  };
};


