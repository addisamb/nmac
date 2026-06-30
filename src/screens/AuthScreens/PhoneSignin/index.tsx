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
import {PhoneSigninProps} from '../../propTypes';
import PhoneNumberInput from 'react-native-phone-number-input';
import {
  NavigationService,
  RouteNames,
  Metrix,
  Images,
  Utills,
} from '../../../config';
import {I18nManager, Platform, View} from 'react-native';
import {Formik} from 'formik';
import {Schema} from 'yup';
import {t} from 'i18next';
// import {AuthActions} from '../../../redux/actions';
import {useDispatch} from 'react-redux';
import navigationService from '../../../config/navigationService';
import {from} from 'seamless-immutable';
// import {
//   LoginPhone,
//   isLogin,
// } from '../../../Redux/Action/AuthActions/authActions';
import { LoginPhone, LoginViaPhone, isLogin } from '../../../Redux/Action/AuthActions/authActions';
import PhoneInput from 'react-native-phone-number-input';
import { normalizeFont } from '../../../config/metrix';

export const PhoneSignin: React.FC<PhoneSigninProps> = ({route}) => {
  const dispatch = useDispatch();
  const phoneInput = useRef<PhoneInput>(null);
  const [showFormikError, setshowFormikError] = useState(false);
  const [PhNo, setPhNo] = useState('');


  useEffect(()=>{
    if (PhNo.length < 10 && PhNo !== '') {
      setshowFormikError(true)
    } else {
      setshowFormikError(false)
    }
  },[PhNo])

// #ok
  async function VerifyOTP() {
    if (!PhNo) {
      // Utills.showToast(t("phone_number_is_empty"));
      Utills.showToast(t("Phone Number is empty"));
    }
    else{
      const countryCode = phoneInput.current?.getCallingCode(PhNo);
      const body = {
        phone: `${countryCode}${PhNo}`
      };
      let res = await dispatch(LoginViaPhone(body))    
      if (res) {
        NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen,{ nav: { condition: 'phonelogin', value: body?.phone, key: "phoneNumberOtp"   }});
      }
    }

  }


  
  return (
    <AuthHeader
      heading={t('enter_mobile_number')}
      isBtn
      onPress={() => {
        VerifyOTP();
      }}
      title={t('send_verification_code')}>
      <View style={{ marginTop: Metrix.VerticalSize(10) }} >
        <PhoneNumberInput
          ref={phoneInput}
          textInputProps={{
            maxLength: 10,
          }}
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
            setPhNo(temp);
          }}
        />
      </View>
      {showFormikError && (
          <CustomText.ExtraSmallText
            style={{
              // borderWidth:1,
              color: 'red',
              fontSize: normalizeFont(10),
              marginTop: Metrix.VerticalSize(10),
              paddingHorizontal: Metrix.HorizontalSize(10),
              textAlign: I18nManager.isRTL ? 'right' : 'left',
            }}>
            Enter valid phone number 
          </CustomText.ExtraSmallText>
        )}
    </AuthHeader>
  );
};
