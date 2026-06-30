import {
  Animated,
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AuthHeader,
  BackHeader,
  CustomInput,
  CustomText,
  FadeContainer,
  MainContainer,
  PlaceholderComponent,
  PrimaryButton,
} from '../../../components';
import {Formik} from 'formik';
import Schema from '../../../formik';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
} from '../../../config';
import {ChangePasswordProps} from '../../propTypes';
import {useDispatch, useSelector} from 'react-redux';
import {t} from 'i18next';
import {changePasswordApi} from '../../../Redux/Action/AuthActions/authActions';
import {useNavigation} from '@react-navigation/native';

export const ChangePassword: React.FC<ChangePasswordProps> = ({route}) => {
  const {from, data} = route?.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  // to check onBoaring response
  const onResponseCompleted = true;
  // useSelector(
  //   (state: RootState) => state.user.onResponseCompleted,
  // );
  // console.log('paramms-------', from, data, onResponseCompleted);

  const [hideOldPassword, setHideOldPassword] = useState(true);
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordChanged, setPasswordChanged] = useState(false);

  let passwordRef = useRef<TextInput>(null!);
  let confirmPasswordRef = useRef<TextInput>(null!);

  useEffect(() => {
    if (onResponseCompleted == 'Done') {
      setPasswordChanged(true);
    }
  }, [onResponseCompleted]);

  const HandleAuthChangePassword = async data => {
    let payload = {
      oldPassword: data?.oldPassword,
      password: data?.password,
      confirmPassword: data?.confirmPassword,
    };
    let res = await dispatch(changePasswordApi(payload));

    if (res) {
      navigation?.goBack();
    }
  };

  return (
    <>
      <BackHeader heading={t('change_password')} />

      <Formik
        initialValues={{
          ...(from == RouteNames.HomeRoutes.ProfileScreen && {oldPassword: ''}),
          password: '',
          confirmPassword: '',
        }}
        onSubmit={value => {
          HandleAuthChangePassword(value);
        }}
        validationSchema={Schema.ChangePasswordSchema}>
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
            {!passwordChanged ? (
              <AuthHeader
                heading={t('change_password')}
                paragraph={t(
                  'create_your_new_password_so_you_can_share_your_memories_again',
                )}
                showBackHeader={true}
                title={t('confirm')}
                isBtn
                customStyles={{marginTop: Metrix.VerticalSize(20)}}
                disabled={!isValid}
                onPress={handleSubmit}>
                <CustomInput
                  placeholder={t('enter_old_password')}
                  value={values?.oldPassword}
                  onChangeText={handleChange('oldPassword')}
                  onBlur={() => setFieldTouched('oldPassword')}
                  error={errors?.oldPassword}
                  touched={touched?.oldPassword}
                  secureTextEntry={hideOldPassword}
                  hidepswdState={hideOldPassword}
                  eye
                  eyeContainerStyle={{
                    width: Metrix.HorizontalSize(35),
                  }}
                  customStyle={{
                    width: '80%',
                  }}
                  onEyePress={() => {
                    setHideOldPassword(prev => !prev);
                  }}
                  returnKeyType="next"
                  onSubmitEditing={() => passwordRef.current.focus()}
                />

                <CustomInput
                  placeholder={t('enter_password')}
                  value={values?.password}
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
                  onEyePress={() => {
                    setHidePassword(prev => !prev);
                  }}
                  customStyle={{
                    width: '80%',
                  }}
                  inputRef={passwordRef}
                  returnKeyType="next"
                  onSubmitEditing={() => confirmPasswordRef.current.focus()}
                />
                <CustomInput
                  placeholder={t('enter_confirm_password')}
                  value={values?.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={() => setFieldTouched('confirmPassword')}
                  error={errors?.confirmPassword}
                  touched={touched?.confirmPassword}
                  secureTextEntry={hideConfirmPassword}
                  hidepswdState={hideConfirmPassword}
                  eye
                  eyeContainerStyle={{
                    width: Metrix.HorizontalSize(35),
                  }}
                  onEyePress={() => {
                    setHideConfirmPassword(prev => !prev);
                  }}
                  customStyle={{
                    width: '80%',
                  }}
                  returnKeyType="done"
                  inputRef={confirmPasswordRef}
                />
              </AuthHeader>
            ) : (
              <PlaceholderComponent
                heading={t('password_changed')}
                image={Images.PasswordChanged}
                subHeading={t(
                  `Dont_worry_well_let_you_know_if_theres_a_problem_with_your_account`,
                )}
                title={t('back_to_login')}
                onPress={() => {
                  NavigationService.navigate(RouteNames.AuthRoutes.LoginScreen);
                }}
                mainHeading={''}
              />
            )}
          </>
        )}
      </Formik>
    </>
  );
};

interface ChangePasswordStyles {
  imageStyle: ImageStyle;
  container: ViewStyle;
  textStyle: TextStyle;
}
const styles = StyleSheet.create<ChangePasswordStyles>({
  imageStyle: {
    width: '80%',
    height: Metrix.VerticalSize(200),
  },
  container: {
    // flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(100),
  },
  textStyle: {
    fontSize: FontType.FontLarge,
    textAlign: 'center',
    lineHeight: Metrix.VerticalSize(20),
    marginTop: Metrix.VerticalSize(20),
  },
});