import {
  Alert,
  I18nManager,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
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

import PhoneNumberInput from 'react-native-phone-number-input';
import {useDispatch, useSelector} from 'react-redux';
import {t} from 'i18next';
import {
  GoogleSignin,
  GoogleSigninButton,
  NativeModuleError,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import {ForgotPasswordApi} from '../../../Redux/Action/AuthActions/authActions';

export const RecoverPassword: React.FC<RecoverPasswordProps> = ({route}) => {
 
  const dispatch = useDispatch();

  async function HandleAuthForgotPassword(data) {
    try {
      let res = await dispatch(ForgotPasswordApi(data))    
      if (res) {
        NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen,{ nav: { condition: "forgetFlow", value: data?.email, key: "forgot_password"  }});
      }
    } catch (error) {
      console.error('Forgot password API error:', error);
    }
  }

  return (
    <Formik
      initialValues={{
        email: '',
      }}
      onSubmit={value => {
        HandleAuthForgotPassword(value);
      }}
      validationSchema={Schema.ForgotPasswordSchema}>
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
          heading={t('email_verification')}
          customStyles={{marginTop: Metrix.VerticalSize(20)}}
          isBtn
          onPress={() => {
            handleSubmit();
          }}
          title={t('send_verification_code')}>
          <View
            style={{
              marginTop: Metrix.VerticalSize(40),
            }}>
            {/* {selectedOption === 'email' && ( */}
            <CustomInput
              heading={t('email')}
              placeholder={t('enter_mail')}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              value={values?.email}
              error={errors?.email}
              customStyle={{width: '100%'
            }}
              touched={touched?.email}
              autoCapitalize="none"
              returnKeyType="next"
              keyboardType="email-address"
              // onSubmitEditing={() => passwordRef.current.focus()}
            />
            {/* )} */}
            {/* {selectedOption === 'mobile' && ( */}
            {/* <View>
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
                  placeholder={t('phone_number')}
                  containerStyle={{
                    borderRadius: 50,
                    borderWidth: 2,
                    borderColor: '#9292927D',
                  }}
                  textContainerStyle={{
                    backgroundColor: '#FFF',
                    borderRadius: 50,
                  }}
                  defaultCode="SA"
                />
              </View> */}
            {/* )} */}
          </View>
        </AuthHeader>
      )}
    </Formik>
  );
};

interface SignupScreenStyles {}
const styles = StyleSheet.create<SignupScreenStyles>({});