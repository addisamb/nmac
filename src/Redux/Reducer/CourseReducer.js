import ActionType from '../Action/ActionType/actionType';

const initialState = {
  mycourses: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.MY_COURSES:
      return {
        ...state,
        mycourses: action.payload,
      };
      case ActionType.LOGOUT:
        return {
          ...state,
          mycourses: {}
      }
    default:
      return state;
  }
};


