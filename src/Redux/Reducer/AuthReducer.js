import ActionType from '../Action/ActionType/actionType';

const initialState = {
  signupData: {},
  course_Object: {},
  check: '',
  loginres: null,
  authLoader: false,
  islogin: false,
  phoneToken: null,
  restTok: '',
  userToken: '',
  resendOtp: '',
  changePassword: null,
  plsLogin: false,
  session: false


};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SIGN_UP:
      return {...state, signupData: action.payload};
    case ActionType.CHECK:
      return {
        ...state,
        check: action.payload,
      };
    case ActionType.LOGIN_RES:
      return {
        ...state,
        loginres: action.payload,
      };
    case ActionType.AUTH_LOADER:
      return {
        ...state,
        authLoader: action.payload,
      };
    case ActionType.IS_LOGIN:
      return {
        ...state,
        islogin: action.payload,
      };
    case ActionType.REST_PASS_TOK:
      return {
        ...state,
        restTok: action.payload,
      };
    case ActionType.TOKEN:
      return {
        ...state,
        userToken: action.payload,
      };
    case ActionType.RESEND_OTP:
    return {
      ...state,
      resendOtp: action.payload,
    };
    case ActionType.CHANGE_PASSWORD:
      return {
        ...state,
        changePAssword: action.payload,
      };
    case ActionType.PLEASE_LOGIN:
      return {
        ...state,
        plsLogin: action.payload,
      };
    case ActionType.SESSION_EXPIRE:
      return {
        ...state,
        session: action.payload,
      };

    case ActionType.LOGOUT:
      return {
        ...state,
        signupData: {},
        course_Object: {},
        check: '',
        loginres: null,
        authLoader: false,
        islogin: "afterOnboard",
        phoneToken: null,
        restTok: '',
        userToken: '',
        plsLogin: false,
        session: false,
        resendOtp: '',
        changePassword: null,
      };
    default:
      return state;
  }
};
