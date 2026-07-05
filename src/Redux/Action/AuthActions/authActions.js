import Toast from 'react-native-toast-message';
import api from '../../../APICall/api';
import { Utills } from '../../../config';
// import ToastAlert from '../../../components/ToastAlert';
import ActionType from '../ActionType/actionType';
import { Alert, Platform } from 'react-native';
import MessageHandler from '../../../APICall/messageHandler';
import dataHandlerService from '../../../services/dataHandler.service';
import axios from 'axios';
import apiPayment from '../../../APICall/apiPayment';

export const LoginApi = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/email', data, 'post')
      .then(response => {
        if (
          response.data.status &&
          response.data.message == 'User is not verified'
        ) {
          let payload = {
            status: true,
            message: '',
            responseData: {
              doc: {
                email: data?.email,
              },
            },
          };

          dispatch({ type: ActionType.LOGIN_RES, payload: payload });
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          return 'navigate_verification';
        }

        if (response.data.status === false) {
          dispatch({ type: ActionType.LOGIN_RES, payload: response.data });
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          Utills.showToast(response.data.message, '', 'error');
          return false;
        } else {
          Utills.showToast(response.data.message, '', 'success');
          dispatch({ type: ActionType.LOGIN_RES, payload: response.data });
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          return response?.data?.responseData;
        }
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        Utills.showToast(
          error?.response?.data?.message ||
            'Unable to reach the server. Please check your connection.',
          '',
          'error',
        );
        return false;
      });
  };
};

export const LoginAsGuest = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/guest', data, 'post')
      .then(response => {
        // MessageHandler(response?.data);
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return response?.data;
      })
      .catch(error => {
        console.log('error=====>', error);

        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return false;
      });
  };
};

export const ValidatePromoCode = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('course/verifyPromoCode', data, 'post')
      .then(response => {
        console.log('oooooo===>', response.data);

        MessageHandler(response?.data);
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return response?.data;
      })
      .catch(error => {
        console.log('error=====>', error);

        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return false;
      });
  };
};

export const sendPayloadDataToBackend = (payloaddata, navigation) => {
  return dispatch => {
    // dispatch({type: ActionType.AUTH_LOADER, payload: true});
    return apiPayment('', payloaddata, 'post')
      .then(response => {
        MessageHandler(response?.data);
        // dispatch({type: ActionType.AUTH_LOADER, payload: false});
        return response.data;
      })
      .catch(error => {
        // dispatch({type: ActionType.AUTH_LOADER, payload: false});
        return false;
      });
  };
};

export const SocialLoginApi = (data, navigation) => {
  return dispatch => {
    // dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/social', data, 'post')
      .then(response => {
        MessageHandler('SocialLoginApi', response?.data);
        // dispatch({type: ActionType.AUTH_LOADER, payload: false});
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error, '', 'success');
        // dispatch({type: ActionType.AUTH_LOADER, payload: false});
        return false;
      })
      .finally(() => {
        // dispatch({type: ActionType.AUTH_LOADER, payload: false});
      });
  };
};

export const VerifyOtp = data => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/verifyAccount', data, 'patch')
      .then(response => {
        MessageHandler('VerifyOtp', response?.data);
        return response?.data;
      })
      .catch(error => {
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

// #ok
export const VerifyPhone = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/phone', data, 'post')
      .then(response => {
        MessageHandler('VerifyPhone', response?.data);
        return response?.data;
      })
      .catch(error => {
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

export const SignAfterVerfyOtp = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/phone', data, 'post')
      .then(response => {
        MessageHandler('SignAfterVerfyOtp', response?.data);
        return response?.data;
      })
      .catch(error => {
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

export const LoginPhone = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/phone', data, 'post')
      .then(response => {
        if (response.data.status === false) {
          if (response.data.message == 'User already exists.') {
            return 'navigate_login';
          }

          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          Utills.showToast(response.data.message, '', 'error');
          return false;
        } else {
          Utills.showToast(response.data.message, '', 'success');
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          let t = response?.data?.token;
          // setTimeout(() => {
          //   Utills.showToast(JSON.stringify(t), '' ,'success');
          // }, 2000);
          return true;
        }
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

export const LoginViaPhone = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/phone', data, 'post')
      .then(response => {
        if (response.data.status === false) {
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          if (response?.data?.message == 'name is required') {
            Utills.showToast('Account not exist', '', 'error');
            return;
          }
          Utills.showToast(response.data.message);
          return false;
        } else {
          Utills.showToast(response.data.message, '', 'success');
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          let t = response?.data?.token;
          // setTimeout(() => {
          //   Utills.showToast(JSON.stringify(t));
          // }, 2000);
          return true;
        }
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

export const ShowPhoneOtp = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('auth/user/phone', data, 'post')
      .then(response => {
        if (response.data.status === false) {
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          if (response?.data?.message == 'name is required') {
            Utills.showToast('Account not exist', '', 'error');
            return;
          }
          Utills.showToast(response.data.message);
          return false;
        } else {
          Utills.showToast(response.data.message, '', 'success');
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          let t = response?.data?.token;
          setTimeout(() => {
            Utills.showToast(JSON.stringify(t), '', 'success');
          }, 2000);
          return true;
        }
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

export const Check = () => {
  return dispatch => {
    dispatch({ type: ActionType.CHECK });
  };
};

export const isLogin = res => {
  return dispatch => {
    dispatch({ type: ActionType.IS_LOGIN, payload: res });
  };
};

export const Logout = () => {
  return dispatch => {
    dispatch({ type: ActionType.LOGOUT });
  };
};

//forget flow
export const ForgotPasswordApi = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('user/forgotPassword', data, 'patch')
      .then(response => {
        if (response.data.status === false) {
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          Utills.showToast(response.data.message, '', 'error');
          return false;
        } else {
          Utills.showToast(response.data.message, '', 'success');
          let t = response?.data?.token;
          setTimeout(() => {
            Utills.showToast(JSON.stringify(t), '', 'success');
          }, 2000);
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          dispatch({ type: ActionType.REST_PASS_TOK, payload: t });

          return true;
        }
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        Utills.showToast('Something Went Wrong', '', 'error');
        return false;
      });
  };
};

export const VerifyForgotPasswordOtp = data => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('user/verifyOTP', data, 'post')
      .then(response => {
        MessageHandler('VerifyForgotPasswordOtp', response?.data);
        return response?.data;
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        return false;
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

export const ResetPasswordApi = (data, navigation) => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('user/resetPassword', data, 'patch')
      .then(response => {
        if (response.data.status === false) {
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          Utills.showToast(response.data.message, '', 'success');
          return false;
        } else {
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          Utills.showToast(response.data.message, '', 'success');
          let t = response?.data?.token;
          return true;
        }
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        Utills.showToast('Something Went Wrong', '', 'error');
        return false;
      });
  };
};

//otp
export const ResendOtp = data => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });
    return api('user/resendOtp', data, 'post')
      .then(response => {
        console.log('ResendOPTP', response?.data);
        if (response.data.status === false) {
          Utills.showToast(response.data.message, '', 'error');
        } else {
          let t = response?.data?.token;
          dispatch({ type: ActionType.REST_PASS_TOK, payload: t });
          setTimeout(() => {
            Utills.showToast(JSON.stringify(t), '', 'success');
          }, 1000);
        }
      })
      .catch(error => {
        console.log('da=d=a=d=a=da', error?.response);
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      })
      .finally(() => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
      });
  };
};

//change password
export const changePasswordApi = data => {
  return dispatch => {
    dispatch({ type: ActionType.AUTH_LOADER, payload: true });

    return api('user/changePassword', data, 'patch')
      .then(response => {
        if (response.data.status === false) {
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          Utills.showToast(response.data.message, '', 'error');
          return false;
        } else {
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
          Utills.showToast(response.data.message, '', 'success');
          return true;
        }
      })
      .catch(error => {
        dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        Utills.showToast('Something Went Wrong', '', 'error');
        return false;
      });
  };
};

export const DrawRequest = data => {
  return dispatch => {
    dispatch({ type: ActionType.HOME_LOADER, payload: true });
    return api('notifications/withDrawalNotification', data, 'post', dispatch)
      .then(response => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
        MessageHandler('DrawRequest', response?.data);
        return response?.data;
      })
      .catch(error => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const RemovefromRedis = () => {
  return dispatch => {
    return api('auth/logout', null, 'post', dispatch)
      .then(response => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
        console.log('ASwdadada===>', response);

        // MessageHandler(response?.data);
        return response;
      })
      .catch(error => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      })
      .finally(() => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
      });
  };
};

export const showLoginPleaseModal = data => {
  return dispatch => {
    dispatch({ type: ActionType.PLEASE_LOGIN, payload: data });
  };
};

export const showSessionExpireModal = data => {
  return dispatch => {
    dispatch({ type: ActionType.SESSION_EXPIRE, payload: data });
  };
};

export const appleLoginApi = body => {
  return dispatch => {
    return api('auth/user/apple', body, 'post', dispatch)
      .then(response => {
        return response?.data;
      })
      .catch(error => {
        Utills.showToast(error);
        return false;
      });
  };
};
