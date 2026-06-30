import {useRef, useState} from 'react';
import {
  // AuthHeader,
  CustomInput,
  CustomText,
  AuthHeader,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {SignInNowProps, VerifyUserProps} from '../../propTypes';
import PhoneNumberInput from 'react-native-phone-number-input';
import {
  NavigationService,
  RouteNames,
  Metrix,
  FontType,
  Images,
  Utills,
} from '../../../config';
import {
  I18nManager,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Formik} from 'formik';
import Schema from '../../../formik';
import {t} from 'i18next';
import {useDispatch} from 'react-redux';
import {Alert} from 'react-native';
import {normalizeFont} from '../../../config/metrix';
import navigationService from '../../../config/navigationService';
import {LoginApi, LoginAsGuest, isLogin} from '../../../Redux/Action/AuthActions/authActions';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import { GUEST_USER_PAYLOAD } from '../../../APICall/constants';

export const SignIn: React.FC<SignInNowProps> = ({}) => {
  const dispatch = useDispatch();
  let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  let passwordRef = useRef<TextInput>(null!);

  function Nav() {
    // if (params == 'signin') {
    //   HandleAuthEmai(data);
    // } else if (params == 'phone') {
    NavigationService.navigate(RouteNames.AuthRoutes.PhoneSignin);
    // }
  }

  async function HandleAuthEmai(data) {
    if (regEmail.test(data?.email) === false) {
      // Utills.showToast(t('enter_valid_email_address'), '', 'error');
      Utills.showToast(t('Enter Valid Email Address'), '', 'error');
    } else if (data?.password == '') {
      // Utills.showToast(t('enter_password'), '', 'error');
      Utills.showToast(t('Enter Password'), '', 'error');
    } else {
      let paylod = {
        email: data?.email,
        password: data?.password,
      };
      let res = await dispatch(LoginApi(paylod));

      if (res == "navigate_verification") {  

        Alert.alert(`${t('user_not_verified')}`, t('Account_already_exist_sign_in_please'));
  
        NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen, {
          nav: {
            condition: 'emaillogin',
            value: data?.email,
            key: 'verify_account',
          },
        });
        return
      }
      
 
      if (res?.accessToken?.length > 10) {
        dispatch({type: ActionType.TOKEN, payload: res?.accessToken});
        dispatch(isLogin('homescreen'));
      } else {
        Utills.showToast('User not exist', '', 'error');
      }
    }
  }

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
        email: '',
        password: '',
      }}
      onSubmit={values => {
        HandleAuthEmai(values);
      }}
      validationSchema={Schema.LoginSchema}>
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
          topContainerCustomStyle={{
            // borderWidth:1,
            flex: 1,
          }}
          heading={t('Lets_sign_in')}
          title={t('sign_in')}
          customStyles={{marginTop: Metrix.VerticalSize(20)}}
          // isBtn
          //   signUpBtn
          signUpBtnPress={() => {
            // NavigationService.navigate(RouteNames.AuthRoutes.SignIn);
          }}
          onPress={() => {
            handleSubmit();
          }}
          isbottomText
          onBottomTextPress={() => {
            LoginGuest()            
          }}>
          <View
            style={{
              marginTop: Metrix.VerticalSize(30),
            }}>
            <CustomInput
              heading={t('continue_with_mail')}
              placeholder={t('enter_mail')}
              customStyle={{width: '100%'}}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              value={values?.email}
              error={errors?.email}
              touched={touched?.email}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              onSubmitEditing={() => passwordRef.current.focus()}
            />

            <CustomInput
              heading={t('password')}
              placeholder={t('enter_your_password')}
              value={values?.password}
              customStyle={{width: '80%'}}
              onChangeText={handleChange('password')}
              onBlur={() => setFieldTouched('password')}
              error={errors?.password}
              touched={touched?.password}
              secureTextEntry={hidePassword}
              hidepswdState={hidePassword}
              eye
              eyeContainerStyle={{
                width: Metrix.HorizontalSize(35),
              }}
              // customStyle={{
              //   width: '80%',
              // }}
              onEyePress={() => {
                if (values?.password) {
                  setHidePassword(prev => !prev);
                }
              }}
              returnKeyType="done"
              inputRef={passwordRef}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              NavigationService.navigate(RouteNames.AuthRoutes.RecoverPassword);
            }}>
            <CustomText.RegularText
              customStyle={{
                fontSize: FontType.FontSmall,
                textAlign: 'right',
              }}>
              {t('forgot_password')}
            </CustomText.RegularText>
          </TouchableOpacity>
          <PrimaryButton
            title={t('sign_in')}
            customStyles={{marginTop: Metrix.VerticalSize(20)}}
            disabled={false}
            onPress={() => {
              handleSubmit(values);
              // Nav('signin', values);
            }}
          />

          <CustomText.MediumText customStyle={styles.styleText}>
            {t('or')}
          </CustomText.MediumText>

          <SecondaryButton
            title={t('continue_with_mobile')}
            source={Images.smartphone}
            isIcon
            icon={0}
            onPress={() => {
              Nav('phone');
            }}
          />
        </AuthHeader>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  styleText: {
    marginTop: Metrix.VerticalSize(10),
    textAlign: 'center',
    fontSize: normalizeFont(17),
    color: Utills.selectedThemeColors().SecondaryTextColor,
  },
});