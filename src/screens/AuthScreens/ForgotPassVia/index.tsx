import {Alert, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AuthHeader,
  CustomInput,
  CustomText,
  MainContainer,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {Formik} from 'formik';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
} from '../../../config';
import Schema from '../../../formik';
import {ForgotPasswordProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';
import {t} from 'i18next';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';

export const ForgotPassVia: React.FC<ForgotPasswordProps> = ({}) => {
  const dispatch = useDispatch();
  const [hidePassword, setHidePassword] = useState(true);
  let emailRef = useRef<TextInput>(null!);
  let passwordRef = useRef<TextInput>(null!);

  const languageOptions = [
    {
      name: t('continue_via_mail'),
      icon: Images.mail,
        onPress: () =>
          NavigationService.navigate(RouteNames.AuthRoutes.RecoverPassword, { selectedOption: 'email' }),
    },
    {
      name: t('continue_via_mobile'),
      icon: Images.smartphone,
      onPress: () =>
        NavigationService.navigate(RouteNames.AuthRoutes.RecoverPassword, { selectedOption: 'mobile' }),
    },
  ];

  //   const _signIn = async () => {
  //     GoogleSignin.configure({
  //       // @ts-ignore
  //       androidClientId:
  //         '1054360665178-qpq9cql7ug5afge74i9qqa3ub2pl5kgd.apps.googleusercontent.com',
  //       profileImageSize: 150,
  //     });
  //     try {
  //       await GoogleSignin.hasPlayServices();
  //       const userInfo = await GoogleSignin.signIn();

  //       fetchGoogleLogin(
  //         userInfo.user.email,
  //         userInfo.user.id,
  //         userInfo.user.name,
  //         userInfo.user.photo,
  //       );

  //       // this.setState({ userInfo, error: undefined });
  //     } catch (error) {
  //       // setSocialLoginLoader(false);
  //       const typedError = error as NativeModuleError;

  //       switch (typedError.code) {
  //         case statusCodes.SIGN_IN_CANCELLED:
  //           // sign in was cancelled
  //           Alert.alert('cancelled');
  //           break;
  //         case statusCodes.IN_PROGRESS:
  //           // operation (eg. sign in) already in progress
  //           Alert.alert('in progress');
  //           break;
  //         case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
  //           // android only
  //           Alert.alert('play services not available or outdated');
  //           break;
  //         default:
  //           Alert.alert('Something went wrong', typedError.toString());
  //         // setState({
  //         //   error: typedError,
  //         // });
  //       }
  //     }
  //   };

  //   const fetchGoogleLogin = (gEmail: any, gid: any, name: any, avatar: any) => {
  //     console.log({
  //       email: gEmail,
  //       id: gid,
  //       name: name,
  //       avatar: avatar,
  //     });

  //     // setLoginLoader(<ActivityIndicator size="small" color="white" />);
  //     // axios
  //     //   .post(SOCIAL_LOGIN, {
  //     //     email: gEmail,
  //     //     id: gid,
  //     //     name: name,
  //     //     avatar: avatar,
  //     //   })

  //     //   .then(response => {
  //     //     setSocialLoginLoader(false);
  //     //     const data = response.data;
  //     //     if (data.status) {
  //     //       setMessage(data.message);
  //     //       dispatch(setAccessToken(data.token));
  //     //       setLoginLoader('Login');
  //     //       PutAccessTokenToAsync(response.data.token);

  //     //       // PutAccessTokenToAsync(response.data.token);
  //     //     } else {
  //     //       Alert.alert(data.message);
  //     //     }
  //     //   })
  //     //   .catch(error => {
  //     //     setLoginLoader('Sign In');
  //     //     setSocialLoginLoader(false);
  //     //     console.log('error', error);
  //     //     Alert.alert('Error', error.message);
  //     //   });
  //   };
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
          heading={t('make_selection')}
          customStyles={{ marginTop: Metrix.VerticalSize(20) }} title={''}>
      <View
        style={{
          marginTop: Metrix.VerticalSize(20),
        }}>
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
    </AuthHeader>
  );
};

interface SignupScreenStyles {}
const styles = StyleSheet.create<SignupScreenStyles>({});
