import { getApp } from '@react-native-firebase/app';
import {
  AppleAuthProvider,
  getAuth,
  signInWithCredential,
} from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useIsFocused } from '@react-navigation/native';
import { t } from 'i18next';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { AuthHeader, CustomText, SecondaryButton } from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import {
  appleLoginApi,
  isLogin,
  SocialLoginApi,
} from '../../../Redux/Action/AuthActions/authActions';
import { RootState } from '../../HomeScreens/HomeScreen';
import { SignupScreenProps } from '../../propTypes';
import { appleAuth } from '@invertase/react-native-apple-authentication';

const firebaseApp = getApp();
const firebaseAuth = getAuth(firebaseApp);

export const SignupScreen: React.FC<SignupScreenProps> = ({}) => {
  const dispatch = useDispatch();
  const FOCUS = useIsFocused();
  const userData = useSelector((state: RootState) => state);

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    if (FOCUS) {
      setTimeout(() => {
        dispatch({ type: ActionType.LOGOUT });
      }, 1000);
    }
  }, [FOCUS]);

  const [hidePassword, setHidePassword] = useState(true);
  let emailRef = useRef<TextInput>(null!);
  let passwordRef = useRef<TextInput>(null!);

  useEffect(() => {
    GoogleSignin.configure();
    // FbSignIn()
  }, []);

  async function AppleLogin(dispatch: Dispatch<AnyAction>) {
    try {
      // 1️⃣ Apple Sign-In request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });

      // 2️⃣ Get credential state
      const credentialState = await appleAuth.getCredentialStateForUser(
        appleAuthRequestResponse.user,
      );

      if (credentialState === appleAuth.State.AUTHORIZED) {
        const { email, fullName, user, identityToken, nonce } =
          appleAuthRequestResponse;

        const appleCredential = AppleAuthProvider.credential(
          identityToken,
          nonce,
        );

        console.log('Apple Auth Response:', appleCredential);

        // 3️⃣ Prepare payload

        // const firebaseUserCredential = await signInWithCredential(
        //   appleCredential,
        // );

        //apple
        const firebaseUserCredential = await signInWithCredential(
          firebaseAuth,
          appleCredential,
        );

        console.log(
          'Firebase User Credential:',
          firebaseUserCredential?.user?.uid,
        );

        const payload = {
          name: `${fullName?.givenName || ''} ${
            fullName?.familyName || ''
          }`.trim(),
          email: email || '',
          // sub: firebaseUserCredential,
          sub: firebaseUserCredential?.user?.uid,
        };

        console.log('Apple Payload:', payload);

        // return;

        // 4️⃣ Call backend API
        const res = await dispatch(appleLoginApi(payload));

        console.log('Apple Login API Response:', res);

        // return

        if (res && res.message === 'Success') {
          // 5️⃣ Save token in Redux
          dispatch({
            type: ActionType.TOKEN,
            payload: res?.responseData?.accessToken,
          });

          Utills.showToast(res?.message, '', 'success');

          // 6️⃣ Update login state
          dispatch(isLogin('homescreen'));

          return res;
        } else {
          // Backend returned error
          // Utills.showToast(res?.message || 'Apple login failed');
          return false;
        }
      }
    } catch (error) {
      console.error('Apple login error:', error);
      Utills.showToast('Apple login failed', '', 'error');
      return false;
    }
  }

  const languageOptions = [
    {
      name: t('continue_with_mobile'),
      icon: Images.smartphone,
      onPress: () =>
        NavigationService.navigate(RouteNames.AuthRoutes.VerifyUser, {
          from: 'signupFlow',
        }),
    },
    {
      name: t('continue_with_mail'),
      icon: Images.mail,
      onPress: () =>
        NavigationService.navigate(RouteNames.AuthRoutes.LoginScreen),
    },
    {
      name: t('continue_with_google'),
      icon: Images.GoogleLogo,
      onPress: async () => {
        await _signIn(); // Wait for the _signIn function to complete
      },
    },
    {
      name: t('continue_with_apple'),
      icon: Images.appleLogo,
      onPress: async () => {
        await AppleLogin(dispatch);
      },
    },
  ];

  async function SignOut() {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      console.log('userInfo', userInfo);

      let payload = {
        name: userInfo?.data?.user?.name,
        email: userInfo?.data?.user.email,
      };

      let res = await dispatch(SocialLoginApi(payload));

      console.log('res', res);

      Utills.showToast(res?.message);

      if (res?.status) {
        // dispatch({type: ActionType.AUTH_LOADER, payload: false});
        dispatch({
          type: ActionType.TOKEN,
          payload: res?.responseData?.accessToken,
        });
        dispatch(isLogin('homescreen'));
        SignOut();
      }
      return;
    } catch (error) {
      console.log('----------->>>>', error);
      // dispatch({type: ActionType.AUTH_LOADER, payload: false});
      if (error?.code === statusCodes.SIGN_IN_CANCELLED) {
        Utills.showToast('Sign in action cancelled', '', 'error');
      } else if (error?.code === statusCodes.IN_PROGRESS) {
        Utills.showToast(
          'operation (Google. sign in) is in progress already',
          '',
          'error',
        );
      } else if (error?.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Utills.showToast(
          'play services not available or outdated',
          '',
          'error',
        );
      } else if (error == '[Error: NETWORK_ERROR]') {
        Utills.showToast('Network Problem', '', 'error');
      } else {
        console.log('Some other error happened:', error);
        // alert(JSON.stringify(error))
        // Utills.showToast(JSON.stringify(error));
      }
    }
  };

  function SignIn() {
    NavigationService.navigate(RouteNames.AuthRoutes.SignIn);
  }

  const fetchGoogleLogin = (gEmail: any, gid: any, name: any, avatar: any) => {
    console.log({
      email: gEmail,
      id: gid,
      name: name,
      avatar: avatar,
    });

    // setLoginLoader(<ActivityIndicator size="small" color="white" />);
    // axios
    //   .post(SOCIAL_LOGIN, {
    //     email: gEmail,
    //     id: gid,
    //     name: name,
    //     avatar: avatar,
    //   })

    //   .then(response => {
    //     setSocialLoginLoader(false);
    //     const data = response.data;
    //     if (data.status) {
    //       setMessage(data.message);
    //       dispatch(setAccessToken(data.token));
    //       setLoginLoader('Login');
    //       PutAccessTokenToAsync(response.data.token);

    //       // PutAccessTokenToAsync(response.data.token);
    //     } else {
    //       Alert.alert(data.message);
    //     }
    //   })
    //   .catch(error => {
    //     setLoginLoader('Sign In');
    //     setSocialLoginLoader(false);
    //     console.log('error', error);
    //     Alert.alert('Error', error.message);
    //   });
  };
  // const PutAccessTokenToAsync = async accessToken => {
  //   try {
  //     navigation.navigate('Home');
  //     await AsyncStorage.setItem('@user_token', accessToken);
  //   } catch (e) {
  //     console.log('Error saving Data to AsyncStorage:', e);
  //   }
  // };

  return (
    <AuthHeader
      heading={t('heading')}
      title={t('continue')}
      customStyles={{ marginTop: Metrix.VerticalSize(20) }}
    >
      <View
        style={{
          marginTop: Metrix.VerticalSize(20),
        }}
      >
        {languageOptions.map((option, index) => (
          <SecondaryButton
            key={index}
            title={option.name}
            source={option.icon}
            isIcon
            icon={0}
            onPress={option.onPress}
            // onPress={option.onPress}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 50,
        }}
      >
        <CustomText.RegularText>
          {t('already_have_an_account')}
        </CustomText.RegularText>
        <TouchableOpacity
          onPress={() => {
            SignIn();
          }}
        >
          <CustomText.RegularText
            customStyle={{
              color: Utills.selectedThemeColors().Primary,
              fontSize: FontType.FontRegular,
            }}
          >
            {' '}
            {t('sign_in')}
          </CustomText.RegularText>
        </TouchableOpacity>
      </View>
    </AuthHeader>
  );
};

interface SignupScreenStyles {}
const styles = StyleSheet.create<SignupScreenStyles>({});
