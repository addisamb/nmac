import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AuthHeader,
  BackHeader,
  CustomInput,
  CustomModal,
  MainContainer,
  PlaceholderComponent,
  PrimaryButton,
} from '../../../components';
import {Formik} from 'formik';
import Schema from '../../../formik';
import {Images, Metrix, NavigationService, RouteNames} from '../../../config';
import {ForgotPasswordProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';

import {t} from 'i18next';
import navigationService from '../../../config/navigationService';
import {
  ForgotPasswordApi,
  ResetPasswordApi,
} from '../../../Redux/Action/AuthActions/authActions';
import {values} from 'lodash';

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [modalPostVisible, setModalPostVisible] = useState(false);

  // const [hideOldPassword, setHideOldPassword] = useState(true);
  // const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  // const [passwordChanged, setPasswordChanged] = useState(false);

  let passwordRef = useRef<TextInput>(null!);
  const dispatch = useDispatch();

  const handleOnClosePost = () => {
    setModalPostVisible(false);
  };

  // async function HandleAuthForgotPassword(data) {
  //   let res = await dispatch(ResetPasswordApi(data));
  //   if (res) {
  //     NavigationService.navigate(RouteNames.AuthRoutes.OtpScreen);
  //   }
  // }

  return (
    <>
      <Formik
        initialValues={{
          // ...(from == RouteNames.HomeRoutes.ProfileScreen && {oldPassword: ''}),
          password: '',
          confirmPassword: '',
        }}
        // onSubmit={values => {
        //   HandleAuthForgotPassword(values);
 
        // }}
        validationSchema={Schema.ResetPasswordSchema}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          setFieldTouched,
          isValid,
          handleSubmit,
        }) => (
          <>
            <AuthHeader
              heading={t('new_password')}
              // showBackHeader={true}
              title={t('confirm')}
              isBtn
              customStyles={{marginTop: Metrix.VerticalSize(20)}}
              disabled={!isValid}
              onPress={() => {
                // handleSubmit();
                // setModalPostVisible(true);
                // navigationService.navigate(RouteNames.AuthRoutes.LoginScreen)
                // dispatch(AuthActions.loginSuccess(true));
              }}>
              <CustomInput
                heading={t('new_password')}
                placeholder={t('enter_your_passowrd')}
                value={values?.password}
                onChangeText={handleChange('password')}
                onBlur={() => setFieldTouched('password')}
                error={errors?.password}
                touched={touched?.password}
                returnKeyType="next"
                secureTextEntry={hidePassword}
                hidepswdState={hidePassword}
                eye
                eyeContainerStyle={{
                  // borderWidth: 1,
                  width: Metrix.HorizontalSize(35),
                }}
                customStyle={{width: '80%'}}
                onEyePress={() => {
                  if (values?.password) {
                    setHidePassword(prev => !prev);
                  }
                }}
              />
              <CustomInput
                heading={t('confirm_password')}
                placeholder={t('confirm_new_password')}
                value={values?.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={() => setFieldTouched('confirmPassword')}
                error={errors?.confirmPassword}
                touched={touched?.confirmPassword}
                returnKeyType="next"
                secureTextEntry={hidePassword}
                hidepswdState={hidePassword}
                eye
                eyeContainerStyle={{
                  // borderWidth: 1,
                  width: Metrix.HorizontalSize(35),
                }}
                customStyle={{width: '80%'}}
                onEyePress={() => {
                  if (values?.password) {
                    setHidePassword(prev => !prev);
                  }
                }}
              />
            </AuthHeader>
          </>
        )}
      </Formik>

      <CustomModal onClose={handleOnClosePost} visible={modalPostVisible}>
        <PlaceholderComponent
          heading={t('congratulations')}
          image={Images.PasswordChange}
          subHeading={t(`your_password_has_been_reset`)}
          title={t('continue_login')}
          onPress={() => {
            navigationService.navigate(RouteNames.AuthRoutes.LoginScreen);
          }}
          mainHeading={''}
        />
      </CustomModal>
    </>
  );
};

interface ForgotPasswordStyles {}
const styles = StyleSheet.create<ForgotPasswordStyles>({});