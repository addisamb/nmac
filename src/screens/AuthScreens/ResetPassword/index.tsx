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
import {ResetPasswordProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';
// import {AuthActions} from '../../../redux/actions';
// import {RootState} from '../../../redux/reducers';
import {t} from 'i18next';
import {
  ResetPasswordApi,
  isLogin,
} from '../../../Redux/Action/AuthActions/authActions';
import navigationService from '../../../config/navigationService';

export const ResetPassword: React.FC<ResetPasswordProps> = ({route}) => {
  const onResponseCompleted = useSelector(
    state => state?.user?.onResponseCompleted,
  );

  console.log('====>', route);

  const restToken = useSelector(state => state?.AuthReducer?.restTok);

  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [modalPostVisible, setModalPostVisible] = useState(false);

  let passwordRef = useRef<TextInput>(null!);
  let confirmPasswordRef = useRef<TextInput>(null!);

  useEffect(() => {
    if (onResponseCompleted == 'Done') {
      setPasswordChanged(true);
    }
  }, [onResponseCompleted]);
  const dispatch = useDispatch();

  const HandleAuthForgotPassword = async data => {
    let payload = {
      email: route?.params?.value,
      token: restToken,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
    };
    let res = await dispatch(ResetPasswordApi(payload));
    if (res) {
      setTimeout(() => {
        setModalPostVisible(true);
      }, 2000);
    }
  };
  const handleOnClosePost = () => {
    setModalPostVisible(false);
  };

  return (
    <>
      <Formik
        initialValues={{
          password: '',
          confirmPassword: '',
        }}
        onSubmit={value => {
          HandleAuthForgotPassword(value);
        }}
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
              heading={t('reset_password')}
              showBackHeader={true}
              title={t('next')}
              isBtn
              customStyles={{marginTop: Metrix.VerticalSize(20)}}
              disabled={!isValid}
              onPress={() => {
                handleSubmit();
              }}>
              <View
                style={{
                  marginTop: Metrix.VerticalSize(40),
                }}>
                <CustomInput
                  heading={t('enter_new_password')}
                  placeholder={t('enter_your_password')}
                  value={values?.password}
                  onChangeText={handleChange('password')}
                  onBlur={() => setFieldTouched('password')}
                  error={errors?.password}
                  touched={touched?.password}
                  secureTextEntry={hidePassword}
                  hidepswdState={hidePassword}
                  inputRef={passwordRef}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current.focus()}
                  eye
                  eyeContainerStyle={{
                    width: Metrix.HorizontalSize(35),
                  }}
                  onEyePress={() => {
                    if (values?.password) {
                      setHidePassword(prev => !prev);
                    }
                  }}
                  customStyle={{
                    width: '80%',
                  }}
                />

                <CustomInput
                  heading={t('confirm_password')}
                  placeholder={t('confirm_your_password')}
                  value={values?.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  error={errors?.confirmPassword}
                  touched={touched?.confirmPassword}
                  secureTextEntry={hideConfirmPassword}
                  hidepswdState={hideConfirmPassword}
                  inputRef={confirmPasswordRef}
                  returnKeyType="next"
                  // onSubmitEditing={() => confirmPasswordRef.current.focus()}
                  eye
                  eyeContainerStyle={{
                    // borderWidth: 1,
                    width: Metrix.HorizontalSize(35),
                  }}
                  onEyePress={() => {
                    if (values?.password) {
                      setHideConfirmPassword(prev => !prev);
                    }
                  }}
                  customStyle={{
                    width: '80%',
                  }}
                />
              </View>
            </AuthHeader>

            <CustomModal onClose={handleOnClosePost} visible={modalPostVisible}>
              <PlaceholderComponent
                heading={t('congratulations')}
                image={Images.PasswordChange}
                subHeading={t(`your_password_has_been_reset`)}
                title={t('continue_login')}
                onPress={() => {
                  navigationService.navigate(RouteNames.AuthRoutes.SignIn);
                }}
                mainHeading={''}
              />
            </CustomModal>
          </>
        )}
      </Formik>
    </>
  );
};

interface ForgotPasswordStyles {}
const styles = StyleSheet.create<ForgotPasswordStyles>({});
function dispatch(arg0: {type: string; payload: any}) {
  throw new Error('Function not implemented.');
}