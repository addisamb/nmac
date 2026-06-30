import { FastField } from 'formik';
import api from '../../../APICall/api';
import MessageHandler from '../../../APICall/messageHandler';
import { Utills } from '../../../config';
import ActionType from '../ActionType/actionType';
import dataHandlerService from '../../../services/dataHandler.service';
import { useDispatch } from 'react-redux';
import { showLoginPleaseModal } from '../AuthActions/authActions';

export const GetProfileData = () => {
  return dispatch => {
    return api('user/getMe', null, 'get', dispatch)
      .then(response => {
        if (Array.isArray(response?.data?.message)) {
          Utills.showToast(response?.data?.message[0], '', 'error');
        }
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      });
  };
};

// export const getHtmlData = () => {
//   return dispatch => {
//     return api('submit-quiz/course/certificate/656f2c2a02577055bb77d744', null, 'get')
//       .then(response => {

//         // console.log("===ss=>",response.data);

//         MessageHandler(response?.data);
//         // Utills.showToast(response?.data);
//         return response?.data;
//       })
//       .catch(error => {
//         Utills.showToast(error);
//         return false;
//       })
//       .finally(() => {
//         dispatch({type: ActionType.HOME_LOADER, payload: false});
//       });
//   };
// };

export const updateProfile = updatedProfileData => {
  return dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    return api('user/updateProfile', updatedProfileData, 'patch', dispatch)
      .then(response => {
        // MessageHandler(response?.data);
        return response?.data?.status;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const submitCoin = data => {
  return dispatch => {
    return api('bonus-coin/chat', data, 'post', dispatch)
      .then(response => {
        // MessageHandler(response?.data);
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      });
  };
};

export const getCourseDetails = id => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.HOME_LOADER, payload: true });
      const response = await api(`course/${id}`, null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const getCourseDetailsWithoutLoder = id => {
  return async dispatch => {
    try {
      const response = await api(`course/${id}`, null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const GetCourse = () => {
  return dispatch => {
    return api('course/listing', null, 'get', dispatch)
      .then(response => {
        // MessageHandler(response?.data);
        dispatch({
          type: ActionType.COURSE_LIST,
          payload: response?.data?.responseData,
        });
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const likeAndUnlikeCourse = courseId => {
  let userData = dataHandlerService?.getStore()?.getState()
    ?.HomeReducer?.userData;

  return async dispatch => {
    if (userData?.type == 'guest') {
      // return true
      dispatch({ type: ActionType.PLEASE_LOGIN, payload: true });
      return;
    }

    try {
      const response = await api(
        `favourite-course`,
        courseId,
        'post',
        dispatch,
      );
      // if (response?.data?.status == false) {
      //     Utills.showToast(response?.data?.message, '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const GetFavouriteCourses = () => {
  return dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    return api('favourite-course', null, 'get', dispatch)
      .then(response => {
        // MessageHandler(response?.data);
        // if (Array.isArray(response?.data?.message)) {
        //   Utills.showToast(response?.data?.message[0], '', 'error');
        // }
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const getCategories = () => {
  return dispatch => {
    return api('category', null, 'get', dispatch)
      .then(response => {
        const modifiedData = response?.data?.responseData.map(item => ({
          ...item,
          ischecked: false,
        }));

        dispatch({ type: ActionType.CATEGORY_LIST, payload: modifiedData });
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      });
  };
};

export const storeFcm = data => {
  return dispatch => {
    return api('notifications/setDeviceToken', data, 'post', dispatch)
      .then(response => {
        if (response.status == 201) {
          console.log('token saved to backend successfully');
        }
      })
      .catch(error => {
        Utills.showToast(error, '', 'error');
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const chatsMsg = res => {
  return dispatch => {
    dispatch({ type: ActionType.CHATS, payload: res });
  };
};

export const course_ObjectData = res => {
  return dispatch => {
    dispatch({ type: ActionType.COURSE_OBJECT, payload: res });
  };
};

export const progressReport = res => {
  return dispatch => {
    dispatch({ type: ActionType.PROGRESS_REPORT, payload: res });
  };
};

// Support chat
export const joinSupportChat = res => {
  return dispatch => {
    dispatch({ type: ActionType.JOIN_SUPPORT_CHAT, payload: res });
  };
};

//course detail tap bar view

export const submitRatting = data => {
  return dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    return api('rating', data, 'post', dispatch)
      .then(response => {
        // MessageHandler(response?.data);
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error, '', 'error');
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const onCompleteVideo = body => {
  return dispatch => {
    return api('course-content-history', body, 'post', dispatch)
      .then(response => {
        // if (Array.isArray(response?.data?.message)) {
        //   Utills.showToast(response?.data?.message[0], '', 'error');
        // }
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error, '', 'error');
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const userEnrolled = id => {
  return dispatch => {
    return api(`enrolled-course/${id}`, null, 'post', dispatch)
      .then(response => {
        // MessageHandler(response?.data);
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error, '', 'error');
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const toggleFavorite = (categoryId, courseId) => ({
  type: ActionType.TOGGLE_FAVORITE,
  payload: { categoryId, courseId },
});

//// After course enrolled

export const QuizAndAssignmentData = id => {
  return async dispatch => {
    try {
      const response = await api(`quiz/listing/${id}`, null, 'get', dispatch);

      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const SubmitQuizData = payload => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.HOME_LOADER, payload: true }); // Start loader
      return api('submit-quiz', payload, 'post', dispatch).then(response => {
        // MessageHandler(response?.data);
        return response?.data;
      });
    } catch (error) {
      console.error('Error during API call:', error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false }); // Stop loader
    }
  };
};

export const getBonusMaterial = id => {
  return async dispatch => {
    try {
      const response = await api(
        `course-content/bonus-content/${id}`,
        null,
        'get',
        dispatch,
      );
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const getProgressReport = id => {
  return async dispatch => {
    try {
      const response = await api(`analytics/data/${id}`, null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const checkCourseCompletedorNot = id => {
  return async dispatch => {
    try {
      const response = await api(
        `courseCompletionStatus/${id}`,
        null,
        'get',
        dispatch,
      );
      // MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const SpecificQuiz = id => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api(`quiz/${id}`, null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      dispatch({
        type: ActionType.SPECIFIC_QUIZ,
        payload: response?.data?.responseData,
      });
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const GetAssiignment = id => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      // const response = await api(`assignmentListing/656f2c2a02577055bb77d744`, null, 'get');
      const response = await api(
        `assignmentListing/${id}`,
        null,
        'get',
        dispatch,
      );
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const ChangeLanguageApi = payload => {
  return async dispatch => {
    try {
      const response = await api(
        `user/updateLanguage`,
        payload,
        'patch',
        dispatch,
      );
      // MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      console.error('Error during API call:', error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false }); // Stop loader
    }
  };
};

export const GetAssiignmentWithoutLoader = id => {
  return async dispatch => {
    try {
      const response = await api(
        `assignmentListing/${id}`,
        null,
        'get',
        dispatch,
      );
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const SpecificAssignment = id => {
  return async dispatch => {
    try {
      const response = await api(`assignment/${id}`, null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const SpecificAssignmentScore = id => {
  return async dispatch => {
    try {
      const response = await api(
        `submittedAssignment/${id}`,
        null,
        'get',
        dispatch,
      );
      if (Array.isArray(response?.data?.message)) {
        Utills.showToast(response?.data?.message[0], '', 'error');
      }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const SubmitAssignment = payload => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.HOME_LOADER, payload: true }); // Start loader
      return api('submit-assignment', payload, 'post', dispatch).then(
        response => {
          // MessageHandler(response?.data);
          return response?.data;
        },
      );
    } catch (error) {
      console.error('Error during API call:', error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false }); // Stop loader
    }
  };
};

export const sendWithdrawOtp = payload => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.HOME_LOADER, payload: true }); // Start loader
      return api('auth/send/withdrawOtp', payload, 'post', dispatch).then(
        response => {
          // MessageHandler(response?.data);
          // dispatch({type: ActionType.HOME_LOADER, payload: false}); // Stop loader
          return response?.data;
        },
      );
    } catch (error) {
      console.error('Error during API call:', error);
      dispatch({ type: ActionType.HOME_LOADER, payload: false }); // Stop loader
      Utills.showToast(error, '', 'error');
      return false;
    } finally {
      console.log('finally');
      dispatch({ type: ActionType.HOME_LOADER, payload: false }); // Stop loader
    }
  };
};

export const GetQuizAnswer = id => {
  return async dispatch => {
    try {
      dispatch({ type: ActionType.HOME_LOADER, payload: true });
      const response = await api(`submit-quiz/${id}`, null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

// EndPoint Change karna hai
export const TrendingCoursesData = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api(
        'course/listing?listing=trending',
        null,
        'get',
        dispatch,
      );

      console.log('sadsada===>,', response);
      console.log('hfdjhdjhdjhjdhd', TrendingCoursesData);

      // Remove the 'return;' statement

      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      dispatch({
        type: ActionType.TRENDING_COURSES_DATA,
        payload: response?.data?.responseData,
      });
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const getMyReferals = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api('user/myReferrals', null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const PopularCoursesData = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api(
        'course/listing?listing=popular',
        null,
        'get',
        dispatch,
      );
      console.log('dbgdggdghd', response?.data);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      dispatch({
        type: ActionType.POPULAR_COURSES_DATA,
        payload: response?.data?.responseData,
      });
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const NewCoursesData = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api(
        'course/listing?listing=newCourses',
        null,
        'get',
        dispatch,
      );
      console.log('dbgdggdghd', response?.data);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      dispatch({
        type: ActionType.NEW_COURSES_DATA,
        payload: response?.data?.responseData,
      });
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const recommendedCoursesData = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api(
        'course/listing?listing=recommendedCourses',
        null,
        'get',
        dispatch,
      );
      console.log('dbgdggdghd', response?.data);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      dispatch({
        type: ActionType.RECOMANDED_COURSE_DATA,
        payload: response?.data?.responseData,
      });
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const TopPointReciver = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api('topReceiver', null, 'get', dispatch);
      console.log('dbgdggdghd', response?.data);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      dispatch({
        type: ActionType.TOP_POINT_RECEIVER,
        payload: response?.data,
      });
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const getCertificate = id => {
  return async dispatch => {
    try {
      const response = await api(
        `submit-quiz/course/certificate/${id}`,
        null,
        'get',
        dispatch,
      );
      // MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const courseComplete = id => {
  return async dispatch => {
    try {
      const response = await api(
        `enrolled-course/completeCourse/${id}`,
        null,
        'patch',
        dispatch,
      );
      // MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const TransactionHistory = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api('transactionHistory', null, 'get', dispatch);
      console.log('dbgdggdghd', response?.data);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const getNotification = () => {
  return async dispatch => {
    // dispatch({type: ActionType.HOME_LOADER, payload: true});
    try {
      const response = await api(
        'notifications/getMine',
        null,
        'get',
        dispatch,
      );
      const notifications = response?.data?.data; // Extract notifications from response
      dispatch({
        type: ActionType.STORE_NOTIFICATIONS,
        payload: notifications,
      }); // Dispatch action to store notifications

      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }

      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      // dispatch({type: ActionType.HOME_LOADER, payload: false});
    }
  };
};

export const PointAndAmmountData = () => {
  return async dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    try {
      const response = await api(`getPointsAndAmount`, null, 'get', dispatch);
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      // dispatch({
      //   type: ActionType.POINT_AND_AMMOUNT,
      //   payload: response?.data,
      // });
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    } finally {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
    }
  };
};

export const CheckPaymentStatus = courseId => {
  return async dispatch => {
    try {
      const response = await api(
        `payment/recentPayment/${courseId}`,
        null,
        'get',
        dispatch,
      );
      // if (Array.isArray(response?.data?.message)) {
      //   Utills.showToast(response?.data?.message[0], '', 'error');
      // }
      MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const muteNotifications = () => {
  return async dispatch => {
    try {
      const response = await api(
        `user/toggleNotifications`,
        null,
        'patch',
        dispatch,
      );
      // MessageHandler(response?.data);
      return response?.data;
    } catch (error) {
      Utills.showToast(error);
      return false;
    }
  };
};

export const enrollAndDetuctAmount = id => {
  return dispatch => {
    return api(`enroll-course/coinExchange/${id}`, null, 'post', dispatch)
      .then(response => {
        // MessageHandler(response?.data);
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      });
  };
};

export const deleteAccount = () => {
  return dispatch => {
    return api('user/permanently', null, 'delete', dispatch)
      .then(response => {
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      });
  };
};
