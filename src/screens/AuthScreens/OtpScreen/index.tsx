import {
  Image,
  StyleSheet,
  Text,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  AuthHeader,
  CustomModal,
  CustomText,
  MainContainer,
  PlaceholderComponent,
} from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import {OtpScreenProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';

import {t} from 'i18next';
import navigationService from '../../../config/navigationService';
import {useNavigation, useRoute} from '@react-navigation/native';
import { LoginViaPhone, ResendOtp, ShowPhoneOtp, SignAfterVerfyOtp, VerifyForgotPasswordOtp, VerifyOtp, VerifyPhone, isLogin } from '../../../Redux/Action/AuthActions/authActions';
import { Alert } from 'react-native';
import ActionType from '../../../Redux/Action/ActionType/actionType';

export const OtpScreen: React.FC<OtpScreenProps> = ({route}) => {

  const routing = route?.params?.nav
 
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // const otptoken = useSelector((state) => state?.AuthReducer?.loginres?.responseData?.token);
  // const phoneToken = useSelector((state) => state?.AuthReducer?.phoneToken);
  
  const email = useSelector((state) => state?.AuthReducer?.loginres?.responseData?.doc?.email);
  const ss = useSelector((state) => state?.AuthReducer?.loginres);

  console.log("---------oooo-----email",email,"whole==>",ss);
  

  // const {email, from} = route?.params;
  const [code, setCode] = useState();
  const [modalPostVisible, setModalPostVisible] = useState(false);


  const verifyEmail = async () => {

    if (code?.length != 4) {
      Utills.showToast(t('Enter Valid OTP code'), '', 'error');
    }
    else {
      let payload = {
        email: email,
        token: parseInt(code)
      }

    let res = await dispatch(VerifyOtp(payload)) 
    if (res?.status) {
      setTimeout(()=>{
        dispatch({type: ActionType.TOKEN, payload: res?.responseData?.accessToken});
        setModalPostVisible(true)
      },2000)
    }

    }
  };

  const verifyPhone = async () => {

    if (code?.length != 4) {
      Utills.showToast(t('Enter Valid OTP code'), '', 'error');
    }
    else {
      let payload = {
        phone: routing?.value,
        token: parseInt(code)
      }

    let res = await dispatch(VerifyPhone(payload)) 
    if (res?.status) {
        dispatch({type: ActionType.TOKEN, payload: res?.responseData?.accessToken});
      setTimeout(()=>{
        setModalPostVisible(true)
      },2000)
    }

    }
  };

  console.log("routing",routing?.condition);
  
  
  const LoginPhone = async () => {

    if (code?.length != 4) {
      Utills.showToast(t('Enter Valid OTP code'), '', 'error');
    }
    else {
      let payload = {
        phone: routing?.value,
        token: parseInt(code)
      }
      console.log("payload==>",payload);
      
    let res = await dispatch(SignAfterVerfyOtp(payload)) 
    if (res?.status) {
      dispatch({type: ActionType.TOKEN, payload: res?.responseData?.accessToken});
      dispatch(isLogin("homescreen"));
    }

    }
  };


  const verifyForgetPass = async () => {
    if (code?.length != 4) {
      Utills.showToast(t('Enter Valid OTP code'), '', 'error');
    } else {
      let payload = {
        token: parseInt(code),
        email: routing?.value
      };
      let res = await dispatch(VerifyForgotPasswordOtp(payload));
      if (res?.status) {
        NavigationService.navigate(RouteNames.AuthRoutes.ResetPassword,{ value: routing?.value });
      }
    }
  };

  const handleOnClosePost = () => {
    setModalPostVisible(false);
  };

  const resendOtpFunction = async (key) => {
    let payload = {
      email: routing?.value,
      type: key,
    };
    let res = await dispatch(ResendOtp(payload));
    if (res) {
      setTimeout(() => {
        setModalPostVisible(true);
      }, 2000);
    }
  };

  const resendOtpPhoneNumn = async () => {
    let data = {
      phone: routing?.value
    };
    await dispatch(ShowPhoneOtp(data)) 
  };

  return (
    <>
      <AuthHeader
        heading={t('enter_otp_code')}
        title={t('confirm')}
        customStyles={{marginTop: Metrix.VerticalSize(20)}}
        isBtn
        onPress={() => {
          routing?.condition == 'phone' 
          ?
          verifyPhone()
          :
          routing?.condition == 'forgetFlow'
          ? 
          verifyForgetPass()
          :
          routing?.condition == 'phonelogin'
          ?
          LoginPhone()
          :
          routing?.condition == 'emaillogin'
          ?
          verifyEmail()
          :
          console.log("no confdition found");
          
        }
        }>
        {/* // source === 'recover'
            //   ? // Show the modal content or any other custom content
            //     NavigationService.navigate(
            //       RouteNames.AuthRoutes.ForgotPasswordScreen,
            //     )
            //   : // Show the default OTP screen content
            //     setModalPostVisible(true);
          
          // NavigationService.navigate(RouteNames.AuthRoutes.VerifyUser);
          // handleOtp;
          // setModalPostVisible(true);
          // setTimeout(() => setModalPostVisible(true), 50);

          // onTextPress={() => { */}
        {/* //   const body = { */}
        {/* //     email,
          //     purpose:
          //       from == 'forgotPswd' ? 'FORGOT_PASSWORD' : 'EMAIL_VERIFICATION',
          //   };
          //   dispatch(AuthActions.setResendPassword(body));
          //   setTextDisable(true);
          //   setTimeout(() => setTextDisable(false), 5000);
          // }} */}

        <View style={styles.container}>
          <CustomText.SmallText customStyle={{textAlign: 'center'}}>
            {t('otp_text')}
          </CustomText.SmallText>
         
          <View style={{ marginLeft: 10 }} >
          <OTPInputView
            style={{
              height: Metrix.VerticalSize(50),
              marginVertical: Metrix.VerticalSize(40),
              marginHorizontal: Metrix.VerticalSize(40)
            }}
            pinCount={4}
            code={code}
            onCodeChanged={code => setCode(code)}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            selectionColor={Utills.selectedThemeColors().Primary}
          />
          </View>

          <View
            style={{
              flexDirection: 'row',
            }}>
            <CustomText.SmallText>{t('didnt_get_otp')}</CustomText.SmallText>

            <TouchableOpacity onPress={()=>
              routing?.key == "verify_account" ?
              resendOtpFunction("verify_account")
              :
              routing?.key == "forgot_password" ?
              resendOtpFunction("forgot_password")
              :
              routing?.key == "phoneNumberOtp" ?
              resendOtpPhoneNumn()
              :
              console.log("condition remaining")
              }>
              <CustomText.SmallText
                customStyle={{
                  color: Utills.selectedThemeColors().Primary,
                }}>
                {t('resend')}
              </CustomText.SmallText>
            </TouchableOpacity>
          </View>
        </View>
      </AuthHeader>
      <CustomModal onClose={handleOnClosePost} visible={modalPostVisible}>
        <PlaceholderComponent
          heading={t('congratulations')}
          image={Images.Wow}
          subHeading={t(`account_registered`)}
          title={t('go_to_courses')}
          onPress={() => {

            dispatch(isLogin("homescreen"));
            

            // handleOnClosePost();
            // setTimeout(()=> dispatch(AuthActions.loginSuccess(true)),300)
            // dispatch(AuthActions.loginSuccess(true));
          }}
          mainHeading={''}
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  underlineStyleBase: {
    width: Metrix.HorizontalSize(40),
    height: Metrix.VerticalSize(45),
    borderWidth: 0,
    borderBottomWidth: Metrix.HorizontalSize(2),
    borderColor: '#DFDFDF',
    fontSize: FontType.FontExtraLarge,
    color: Utills.selectedThemeColors().Primary,
    padding: 0,
  },
  underlineStyleHighLighted: {
    borderColor: Utills.selectedThemeColors().Primary,
  },
});
