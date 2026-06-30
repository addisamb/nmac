import {
  Alert,
  Dimensions,
  I18nManager,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Colors,
  FontType,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {AuthHeader, CustomInput, CustomText} from '../../../components';
import {Formik} from 'formik';
import Schema from '../../../formik';
import {LoginScreenProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';
import {t} from 'i18next';
import {
  GoogleSignin,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { userSignup } from "../../../services/auth/index";
import {LoginApi, LoginAsGuest, isLogin} from '../../../Redux/Action/AuthActions/authActions';
import {useNavigation} from '@react-navigation/native';
import {object} from 'yup';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import { GUEST_USER_PAYLOAD } from '../../../APICall/constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;


export const LoginScreen: React.FC<LoginScreenProps> = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState(true);

  let emailRef = useRef<TextInput>(null);
  let passwordRef = useRef<TextInput>(null);
  let refCodeRef = useRef<TextInput>(null);

  const _signIn = async () => {
    GoogleSignin.configure({
      // @ts-ignore
      androidClientId:
        '1054360665178-qpq9cql7ug5afge74i9qqa3ub2pl5kgd.apps.googleusercontent.com',
      profileImageSize: 150,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      fetchGoogleLogin(
        userInfo.user.email,
        userInfo.user.id,
        userInfo.user.name,
        userInfo.user.photo,
      );

      // this.setState({ userInfo, error: undefined });
    } catch (error) {
      // setSocialLoginLoader(false);
      const typedError = error as NativeModuleError;

      switch (typedError.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          // sign in was cancelled
          Alert.alert('cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          // operation (eg. sign in) already in progress
          Alert.alert('in progress');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          // android only
          Alert.alert('play services not available or outdated');
          break;
        default:
          Alert.alert('Something went wrong', typedError.toString());
        // setState({
        //   error: typedError,
        // });
      }
    }
  };

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

  async function HandleAuthEmai(data) {
    let res = await dispatch(LoginApi(data));

    if (res == "navigate_verification") {  

      Alert.alert(`${t('user_not_verified')}`, `${t('please_resend_your_otp_and_verify_its_you')}`);

      NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen, {
        nav: {
          condition: 'emaillogin',
          value: data?.email,
          key: 'verify_account',
        },
      });
      return
    }

    if (res?.doc?.verified == false) {
      setTimeout(() => {
        Utills.showToast(JSON.stringify(res?.token), '', 'success');
      }, 2000);
      NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen, {
        nav: {
          condition: 'emaillogin',
          value: data?.email,
          key: 'verify_account',
        },
      });
    } else if (res?.accessToken?.length > 10) {
      // Utills.showToast(t('Account_already_exist_sign_in_please'));
      Utills.showToast(t('Account Already Exist Sign In Please'));
    }
  }

  // Saving data
  // const saveLoginData = async (loginData) => {
  //   try {
  //     await AsyncStorage.setItem(
  //       "loginData",
  //       JSON.stringify({
  //         email: loginData.email.trim().toLowerCase(),
  //         password: loginData.password,
  //       })
  //     );
  //     console.log("Login data saved successfully");
  //   } catch (error) {
  //     console.error("Error saving login data:", error);
  //   }
  // };

  async function LoginGuest() {
    let paylod = GUEST_USER_PAYLOAD;
    let res = await dispatch(LoginAsGuest(paylod));

    if (res?.responseData?.accessToken?.length > 10) {
      dispatch({type: ActionType.TOKEN, payload: res?.responseData?.accessToken});
      dispatch(isLogin('homescreen'));
    } else {
      Utills.showToast('Something Went Wrong', '', 'error');
    }
}

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
        refCode: '',
      }}
      onSubmit={values => {
        HandleAuthEmai(values);
      }}
      validationSchema={Schema.SignupSchema}>
      {({
        values,
        errors,
        touched,
        handleChange,
        setFieldTouched,
        isValid,
        handleSubmit,
      }) => (
        <AuthHeader
          heading={t('register_now')}
          title={t('register')}
          childViewTop={{ marginTop: screenHeight < 380 ? Metrix.VerticalSize(-20) :  Metrix.VerticalSize(0) }}
          topContainerCustomStyle={{ marginTop: Metrix.VerticalSize(-10) }}
          customStyles={{marginTop: Metrix.VerticalSize(15)}}
          isBtn
          onPress={() => {
            handleSubmit();
            // NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen, {
            //   from: 'Loginflow',
            // });
          }}
          isbottomText
          onBottomTextPress={() => {
            LoginGuest()     
          }}>
          <View
            style={{
              marginTop: Metrix.VerticalSize(10),
            }}>
            <CustomInput
              heading={t('your_name')}
              placeholder={t('enter_your_name')}
              onChangeText={handleChange('name')}
              value={values?.name}
              error={errors?.name}
              touched={touched?.name}
              autoCapitalize="none"
              returnKeyType="next"
              customStyle={{width: '100%'}}
              onSubmitEditing={() => emailRef.current?.focus()}
            />
            <CustomInput
              heading={t('e_mail')}
              placeholder={t('enter_mail')}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              value={values?.email}
              error={errors?.email}
              touched={touched?.email}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              customStyle={{width: '100%'}}
              inputRef={emailRef}
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <CustomInput
              heading={t('password')}
              placeholder={t('enter_your_password')}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              value={values?.password}
              error={errors?.password}
              touched={touched?.password}
              secureTextEntry={hidePassword}
              hidepswdState={hidePassword}
              eye
              eyeContainerStyle={{
                width: Metrix.HorizontalSize(35),
                // backgroundColor: "red"
              }}
              onEyePress={() => {
                if (values?.password) {
                  setHidePassword(prev => !prev);
                }
              }}
              onSubmitEditing={() => refCodeRef.current?.focus()}
              returnKeyType="next"
              inputRef={passwordRef}
              customStyle={{
                width: '80%',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                // borderWidth:1,
              }}
            />
            <CustomInput
              heading={t('referral_code')}
              placeholder={t('referral_code')}
              onChangeText={handleChange('refCode')}
              onBlur={() => setFieldTouched('refCode')}
              value={values?.refCode}
              maxLength={4}
              error={errors?.refCode}
              touched={touched?.refCode}
              keyboardType='numeric'
              // returnKeyType="done"
              inputRef={refCodeRef}
              customStyle={{
                width: '80%',
                textAlign: I18nManager.isRTL ? 'right' : 'left',
                // borderWidth:1,
              }}
            />


          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              NavigationService.navigate(RouteNames.AuthRoutes.ForgotPassVia);
            }}></TouchableOpacity>
        </AuthHeader>
      )}
    </Formik>
  );
};
