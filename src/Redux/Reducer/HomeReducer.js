import ActionType from '../Action/ActionType/actionType';

const initialState = {
  userData: {},
  mycourses: {},
  courseList: [],
  updatedProfileData: {},
  homeLoader: false,
  categoryList: [],
  getFavouriteCourse: [],
  course_Object: {},
  quizandassignmentdata: [],
  assignmentdata: [],
  specificQuiz: {},
  progress_Report: {},
  trending_course_data: [],
  popular_course_data: [],
  new_course_data: [],
  recomanded_Course_data: [],
  top_point_receiver: [],
  point_and_ammount: {},
  notifications: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_ME_DATA:
      // console.log('--d-a-da-d', action.payload);
      return {
        ...state,
        userData: action.payload,
      };
    case ActionType.UPDATE_USER_PROFILE:
      return {
        ...state,
        updatedProfileData: action.payload,
      };
    case ActionType.HOME_LOADER:
      return {
        ...state,
        homeLoader: action.payload,
      };
    case ActionType.MY_COURSES:
      return {
        ...state,
        mycourses: action.payload,
      };
    case ActionType.COURSE_LIST:
      return {
        ...state,
        courseList: action.payload,
      };
    case ActionType.CATEGORY_LIST:
      return {
        ...state,
        categoryList: action.payload,
      };
    case ActionType.GET_FAVOURITE_COURSE:
      return {
        ...state,
        getFavouriteCourse: action.payload,
      };
    case ActionType.CHATS:
      return {
        ...state,
        chatsMsg: action.payload,
      };
    case ActionType.JOIN_SUPPORT_CHAT:
      return {
        ...state,
        joinSupportChat: action.payload,
      };
    case ActionType.COURSE_OBJECT:
      return {
        ...state,
        course_Object: action.payload,
      };
    case ActionType.PROGRESS_REPORT:
      return {
        ...state,
        progress_Report: action.payload,
      };
    //
    case ActionType.TRENDING_COURSES_DATA:
      return {
        ...state,
        trending_course_data: action.payload,
      };
    case ActionType.POPULAR_COURSES_DATA:
      return {
        ...state,
        popular_course_data: action.payload,
      };
    case ActionType.NEW_COURSES_DATA:
      return {
        ...state,
        new_course_data: action.payload,
      };
    case ActionType.RECOMANDED_COURSE_DATA:
      return {
        ...state,
        recomanded_Course_data: action.payload,
      };
    case ActionType.TOP_POINT_RECEIVER:
      return {
        ...state,
        top_point_receiver: action.payload,
      };
    case ActionType.POINT_AND_AMMOUNT:
      return {
        ...state,
        point_and_ammount: action.payload,
      };
    case ActionType.STORE_NOTIFICATIONS:
      return {
        ...state,
        notifications: action.payload,
      };
    //
    case ActionType.TOGGLE_FAVORITE:
      const {categoryId, courseId} = action.payload;
      return {
        ...state,
        courseList: state.courseList.map(item => ({
          ...item,
          [categoryId]: item[categoryId].map(entry => ({
            ...entry,
            isFavourite:
              entry._id === courseId ? !entry.isFavourite : entry.isFavourite,
          })),
        })),
      };
    case ActionType.QUIZ_AND_ASSIGNMET_DATA:
      return {
        ...state,
        quizandassignmentdata: action.payload,
      };
    case ActionType.ASSIGNMENT_DATA:
      return {
        ...state,
        assignmentdata: action.payload,
      };
    case ActionType.GET_BONUS:
      return {
        ...state,
        bonus_material: action.payload,
      };
    case ActionType.SPECIFIC_QUIZ:
      return {
        ...state,
        specificQuiz: action.payload,
      };

    case ActionType.LOGOUT:
      return {
        ...state,
        userData: {},
        getFavouriteCourse: [],
        quizandassignmentdata: [],
        assignmentdata: [],
        updatedProfileData: {},
        mycourses: {},
        courseList: [],
        trending_course_data: [],
        popular_course_data: [],
        new_course_data: [],
        top_point_receiver: [],
        point_and_ammount: {},
        notifications: [],
        homeLoader: false,
        categoryList: [],
        course_Object: {},
        specificQuiz: {},
        progress_Report: {}
      };
    default:
      return state;
  }
};
