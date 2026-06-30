import ActionType from '../Action/ActionType/actionType';

const initialState = {
    verifiedPayment: {},
};

export default (state = initialState, action) => {
  switch (action.type) {

    case ActionType.VERIFIED_USER_FOR_PAYMENT:
      return {
        ...state,
        verifiedPayment: action.payload,
      };

    default:
      return state;
  }
};


