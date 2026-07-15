import {useEffect, useRef, useState} from 'react';
import {
  AuthHeader,
  CustomInput,
  CustomModal,
  CustomText,
  PlaceholderComponent,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {SelectLanguageProps, VerifyUserProps} from '../../propTypes';
import PhoneNumberInput from 'react-native-phone-number-input';
import {
  NavigationService,
  RouteNames,
  Metrix,
  Images,
  Utills,
  FontType,
} from '../../../config';
import {Alert, Dimensions, I18nManager, Platform, View} from 'react-native';
import {Formik} from 'formik';
import Schema from '../../../formik';
import * as Yup from 'yup';
import {t} from 'i18next';
// import {AuthActions} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import navigationService from '../../../config/navigationService';
import {from} from 'seamless-immutable';
import {
  LoginAsGuest,
  LoginPhone,
  isLogin,
} from '../../../Redux/Action/AuthActions/authActions';
import PhoneInput from 'react-native-phone-number-input';
import {VerticalSize, normalizeFont} from '../../../config/metrix';
import { GUEST_USER_PAYLOAD } from '../../../APICall/constants';
import ActionType from '../../../Redux/Action/ActionType/actionType';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;


export const VerifyUser: React.FC<VerifyUserProps> = ({route}) => {
  const dispatch = useDispatch();
  const phoneInput = useRef<PhoneInput>(null);
  const [modalPostVisible, setModalPostVisible] = useState(false);

  const [name, setName] = useState('');
  const [PhNo, setPhNo] = useState('');

  useEffect(() => {
    if (route.params?.fromOtpScreen) {
      setModalPostVisible(true);
    }
  }, [route.params]);

  const handleOnClosePost = () => {
    setModalPostVisible(false);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('enter_your_name')),
    phone: Yup.string().required(t('enter_phone_number')),
  });

  //signupFlow
  //otpscreen

  async function LoginApiCall(data, num) {
    let res = await dispatch(LoginPhone(data));

    if (res == "navigate_login") {
      Alert.alert(t('account_already_existed'), t('please_login'));
      NavigationService.navigate(RouteNames.AuthRoutes.PhoneSignin);
      return
    }
    
    if (res) {
      NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen, {
        nav: {condition: 'phone', value: num, key: 'phoneNumberOtp'},
      });
    }
  }

  // #ok
  // const handleForgetPassword = async () => {
  //   if (!name) {
  //     Utills.showToast(t('enter_your_name'), '', 'success');
  //     return;
  //   } else if (!PhNo) {
  //     Utills.showToast(t('enter_phone_number'), '', 'success');
  //     return;
  //   } else {
  //     const countryCode = phoneInput.current?.getCallingCode(PhNo);
  //     const body = {
  //       name: name,
  //       phone: `${countryCode}${PhNo}`,
  //     };
  //     LoginApiCall(body, body?.phone);
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
      initialValues={{name: '', phone: '', refCode: '', }}
      validationSchema={Schema.verifyMobileSchema}
      onSubmit={values => {
        const countryCode = phoneInput.current?.getCallingCode(values.phone);
        const body = {
          name: values.name,
          phone: `${countryCode}${values.phone}`,
          refCode: values?.refCode
        };
        LoginApiCall(body, body?.phone);
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <>
          <AuthHeader
            heading={t('enter_mobile_number')}
            isBtn
            onPress={handleSubmit}
            childViewTop={{ marginTop: screenHeight < 380 ? Metrix.VerticalSize(-20) :  Metrix.VerticalSize(0) }}
            title={t('send_verification_code')}
            isbottomText
            onBottomTextPress={() => {
              LoginGuest()     
            }}>
            <View style={{marginTop: Metrix.VerticalSize(20)}}>
              <CustomInput
                heading={t('your_name')}
                placeholder={t('enter_your_name')}
                onChangeText={handleChange('name')}
                value={values?.name}
                error={errors?.name}
                touched={touched?.name}
                customStyle={{width: '100%'
              }}
                autoCapitalize="none"
                returnKeyType="next"
              />
              <CustomText.RegularText
                customStyle={{
                  textAlign: I18nManager.isRTL ? 'left' : 'right',
                  marginBottom: Metrix.VerticalSize(10),
                  marginLeft: Metrix.HorizontalSize(10),
                  fontSize: Metrix.customFontSize(15),
                }}>
                {t('enter_your_phone_number')}
              </CustomText.RegularText>
              <PhoneNumberInput
                ref={phoneInput}
                textInputProps={{
                  maxLength: 10,
                }}
                value={values?.phone}
                placeholder={t('phone_number')}
                codeTextStyle={{
                  // backgroundColor: "yellow",
                  height: 25,
                  marginTop: Platform.OS =='ios' ? 4 : 3
                }}
                containerStyle={{
                  borderRadius: 50,
                  borderWidth: 2,
                  borderColor: '#9292927D',
                  // backgroundColor: "red",
                  height: 50,
                }}
                textInputStyle={{
                  // backgroundColor: "yellow",
                  height: 50,
                }}
                textContainerStyle={{
                  // backgroundColor: 'blue',
                  height: 45,
                  borderRadius: 50,
                }}
                defaultCode="SA"
                onChangeText={text => {
                  let temp = text;
                  temp = temp.replace(/\s+/g, '');
                  handleChange('phone')(temp);
                }}
              />

              <CustomInput
              containerStyle={{marginTop:  Metrix.VerticalSize(10) }}
                heading={t('referral_code')}
                maxLength={4}
                placeholder={t('referral_code')}
                onChangeText={handleChange('refCode')}
                value={values?.refCode}
                error={errors?.refCode}
                touched={touched?.refCode}
                customStyle={{width: '100%'
              }}
                autoCapitalize="none"
                // returnKeyType="done"
                keyboardType='numeric'
              />
              
              <View
                style={{
                  // borderWidth:1,
                  paddingLeft: 12,
                  marginTop: VerticalSize(10),
                }}>
                {errors.phone && touched.phone && (
                  <CustomText.ExtraSmallText
                    style={{
                      color: 'red',
                      fontSize: normalizeFont(12),
                      fontWeight: '200', // Add this line for thin font
                      textAlign: I18nManager.isRTL ? 'left' : 'right',
                    }}
                    >
                    {errors.phone}
                  </CustomText.ExtraSmallText>
                )}
              </View>
            </View>
          </AuthHeader>
        </>
      )}
    </Formik>
  );
};