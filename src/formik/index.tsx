import {t} from 'i18next';
import * as Yup from 'yup';

const emailRegex =
  /^[A-Za-z0-9._%+-]*[A-Za-z][A-Za-z0-9._%+-]*@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
// const fullNameRegex = /^[a-zA-Z]+$/;

const fullNameRegex = /^[a-zA-Z0-9\u0600-\u06FF\s]+$/;


// /^[A-Za-z\s]+$/;

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    // .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .matches(fullNameRegex, t('invalid_name'))
    .required(t('please_enter_your_name')),
  email: Yup.string()
    .matches(emailRegex, t('invalid_email'))
    .required(t('please_enter_your_email_address')),
  password: Yup.string()
    .min(8, t('password_must_be_at_least_8_characters'))
    .required(t('please_enter_your_password')),
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //   'Please enter a valid password that contains at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., Password@123).',
  // ),
});

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, t('invalid_name'))
    .required(t('please_enter_your_email_address')),
  password: Yup.string().required(t('please_enter_your_password')),
});

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, t('invalid_name'))
    .required(t('please_enter_your_email_address')),
});

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, t('password_must_be_at_least_8_characters'))
    .required(t('please_enter_your_password')),
  // .matches(
  //   /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //   'Please enter a valid password that contains at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., Password@123).',
  // ),
  confirmPassword: Yup.string()
    .min(8, t('password_must_be_at_least_8_characters'))
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(t('please_enter_your_password')),
});

const verifyMobileSchema = Yup.object().shape({
  name: Yup.string().required(t('please_enter_your_name')),
  phone: Yup.number()
    .typeError(t('that_doesnt_look_like_a_phone_number'))
    .positive(t('a_phone_number_cant_start_with_a_minus'))
    .integer(t('a_phone_number_cant_include_a_decimal_point'))
    .min(8, t('password_must_be_at_least_8_characters'))
    .required(t('a_phone_number_is_required')),
});

const GoogleSignUpSchema = Yup.object().shape({
  name: Yup.string().required(t('please_enter_your_email_address')),
  email: Yup.string()
    .matches(emailRegex, t('invalid_name'))
    .required(t('please_enter_your_email_address')),
  // password: Yup.string().required('Please enter your password.'),
});

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    // .min(8, 'Old Password must be atleast 8 characters long.')
    .required(t('please_enter_your_old_password')),
  password: Yup.string()
    .min(8, t('password_must_be_at_least_8_characters'))
    .required(t('please_enter_your_password')),
  //   .matches(
  //     /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
  //     'Please enter a valid password that contains at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character (e.g., Password@123).',
  //   ),
  confirmPassword: Yup.string()
    .min(8, t('password_must_be_at_least_8_characters'))
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(t('please_enter_your_password')),
});

export default {
  SignupSchema,
  LoginSchema,
  ForgotPasswordSchema,
  ChangePasswordSchema,
  ResetPasswordSchema,
  GoogleSignUpSchema,
  verifyMobileSchema,
};
