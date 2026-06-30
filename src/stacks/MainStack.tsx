import React, { useEffect } from 'react';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { AuthStack } from './AuthStack';
import { HomeStack } from './HomeStack';
import { useDispatch, useSelector } from 'react-redux';
// import {RootState} from '../redux/reducers'; // Replace with the actual file where RootState is defined
import { RouteNames } from '../config';
import ActionType from '../Redux/Action/ActionType/actionType';
import { AfterOnboard } from './AfterOnboard';
import { SignupModal } from '../components/SignupModal';
import { isLogin, Logout, showLoginPleaseModal } from '../Redux/Action/AuthActions/authActions';
import { RootState } from '../screens/HomeScreens/HomeScreen';
import { SessionExpire } from '../components/SessionExpire';

export const MainStack = () => {
  //main stack
  const MainStack = createStackNavigator();
  const modalHandling = useSelector((state: RootState) => state?.AuthReducer?.plsLogin);
  const modalHandlingsession = useSelector((state: RootState) => state?.AuthReducer?.session);

  const dispatch = useDispatch();
  const authorize = false;

  useEffect(() => {
    dispatch({type: ActionType.HOME_LOADER, payload: false});
    dispatch({type: ActionType.AUTH_LOADER, payload: false});
  }, []);

  const ISLOGIN = useSelector(state => state?.AuthReducer?.islogin);
  // useSelector((state) => state?.user?.authorize);

  const isChangeRoute = false;
  // useSelector(
  //   (state: RootState) => state?.user?.checkingLoader,
  // );
  // console.log('redirection=?=> ', ISLOGIN);

  const AuthScreens = AuthStack.map(stack => (
    <MainStack.Screen
      key={stack.key}
      name={stack.name}
      component={stack.component}
    />
  ));
  const HomeScreens = HomeStack.map(stack => (
    <MainStack.Screen
      key={stack.key}
      name={stack.name}
      component={stack.component}
      options={{
        gestureEnabled:
          stack.name == RouteNames.HomeRoutes.VideoPlayerScreen ?
            false
            :
            stack.name == RouteNames.HomeRoutes.WebViewScreen ?
            false
            :
            stack.name == RouteNames.HomeRoutes.AfterPurchaseCourseDetails ?
              false
              :
              true,
      }}
    />
  ));


  const OnBoard = AfterOnboard.map(stack => (
    <MainStack.Screen
      key={stack.key}
      name={stack.name}
      component={stack.component}
    />
  ));


  // function closeModal() {
  //   dispatch(showLoginPleaseModal(false))
  // }

  function closeModal() {
    dispatch(showLoginPleaseModal(false));
    setTimeout(() => {
      // dispatch(Logout());
      dispatch(isLogin("afterOnboard"));
    }, 100);
  }

  function closeModalSession() {
    dispatch(SessionExpire(false));
    setTimeout(() => {
      // dispatch(Logout());
      dispatch(isLogin("afterOnboard"));
    }, 100);
  }

  


  return (
    <>
      <MainStack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.DefaultTransition,
        }}>
        {
          ISLOGIN == 'homescreen'
            ? HomeScreens //when user signin in any way like ph no,google,email.
            : ISLOGIN == 'afterOnboard'
              ? OnBoard //when user do logout or successfully onboard
              : AuthScreens //when app is open first time
        }
      </MainStack.Navigator>

      {modalHandling ?
        <SignupModal onPress={closeModal} />
        : null}

      {modalHandlingsession ?
        <SessionExpire onPress={closeModalSession} />
        : null}

    </>
  );
};
