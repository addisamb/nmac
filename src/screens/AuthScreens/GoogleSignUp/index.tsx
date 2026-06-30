import {Schema} from 'yup';
import {
  AuthHeader,
  CustomInput,
  CustomText,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {RouteNames} from '../../../config';
import navigationService from '../../../config/navigationService';
import {GoogleSignUpProps, SelectLanguageProps} from '../../propTypes';
import {useRef} from 'react';
import {TextInput} from 'react-native';
import {Formik} from 'formik';
import {View} from 'react-native';
import {Text} from 'react-native';
import {t} from 'i18next';
import {I18nManager} from 'react-native';

export const GoogleSignUp: React.FC<GoogleSignUpProps> = ({}) => {
  let emailRef = useRef<TextInput>(null!);
  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
      }}
      onSubmit={values => {
        console.log(values, '-----');
        const {email, ...restValues} = values;
        // dispatch(
        //     AuthActions.login({
        //         email: email?.toLocaleLowerCase(),
        //         ...restValues,
        //     }),
        // );
      }}
      // validationSchema={Schema.GoogleSignUp}
    >
      {({values, errors, touched, handleChange, setFieldTouched}) => (
        <AuthHeader
          heading={t('heading')}
          isBtn
          isbottomText
          title={t('continue')}
          isupperText
          // isSecondaryBtn
          onPress={() =>
            navigationService.navigate(RouteNames.AuthRoutes.VerifyUser)
          }>
          <CustomInput
            heading={t('your_name')}
            placeholder={t('enter_your_email')}
            value={values?.name}
            error={errors?.name}
            touched={touched?.name}
            onChangeText={handleChange('name')}
            onBlur={() => setFieldTouched('name')}
            autoCapitalize="none"
            returnKeyType="next"
            onSubmitEditing={() => emailRef.current.focus()}
          />

          <CustomInput
            heading={t('your_email')}
            placeholder={t('enter_mail')}
            value={values?.email}
            error={errors?.email}
            touched={touched?.email}
            onChangeText={handleChange('email')}
            onBlur={() => setFieldTouched('email')}
            autoCapitalize="none"
            returnKeyType="next"
            inputRef={emailRef}
          />
        </AuthHeader>
      )}
    </Formik>
  );
};
