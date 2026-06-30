import {FastField} from 'formik';
import api from '../../../APICall/api';
import MessageHandler from '../../../APICall/messageHandler';
import {Utills} from '../../../config';
import ActionType from '../ActionType/actionType';

export const GetCourseBySearch = (data) => {
    return dispatch => {
      return api(`course/listing?page=1&limit=10&categoryIDs=${data?.categoryIDs}&searchQuery=${data.searchQuery}&isFilter=true`, null, 'get',dispatch)
      .then(async(response) => {
        return response?.data;
      })
        .catch(error => {
            console.log("catch ===>",error);
          Utills.showToast(error);
          return false;
        })
        .finally(() => {
          dispatch({type: ActionType.HOME_LOADER, payload: false});
        });
    };
  };



export const GetCourseByIdSectionWise = (data) => {
  return dispatch => {
    return api(`course/listing?page=1&limit=10&categoryIDs=${data?.categoryIDs}`, null, 'get')
    .then(async(response) => {
      return response?.data;
    })
      .catch(error => {
          console.log("catch ===>",error);
        Utills.showToast(error);
        return false;
      })
      .finally(() => {
        dispatch({type: ActionType.HOME_LOADER, payload: false});
      });
  };
};
