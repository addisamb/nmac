import {RouteNames} from '../config';
import {
  ChangePassword,
  ForgotPassword,
  LoginScreen,
  OnBoarding,
  OtpScreen,
  SelectLanguage,
  SignupScreen,
  GoogleSignUp,
  VerifyUser,
  SignIn,
  ResetPassword,
  ForgotPassVia,
  PhoneSignin,
  RecoverPassword,
} from '../screens';
import {
  ChangePasswordProps,
  ForgotPasswordProps,
  GoogleSignUpProps,
  LoginScreenProps,
  OnBoardingProps,
  OtpScreenProps,
  SelectLanguageProps,
  SignupScreenProps,
  SignInNowProps,
  VerifyUserProps,
  ResetPasswordProps,
  ForgotPassViaProps,
  PhoneSigninProps,
  RecoverPasswordProps,
} from '../screens/propTypes';

type AuthScreenStacksTypes = {
  name: string;
  component:
    | React.FC<SignupScreenProps>
    | React.FC<LoginScreenProps>
    | React.FC<OnBoardingProps>
    | React.FC<ForgotPassViaProps>
    | React.FC<ForgotPasswordProps>
    | React.FC<RecoverPasswordProps>
    | React.FC<OtpScreenProps>
    | React.FC<SelectLanguageProps>
    | React.FC<ChangePasswordProps>
    | React.FC<SignInNowProps>
    | React.FC<PhoneSigninProps>
    | React.FC<ResetPasswordProps>
    | React.FC<GoogleSignUpProps>
    | React.FC<VerifyUserProps>;

  key: string;
}[];

export const AfterOnboard: AuthScreenStacksTypes = [
//   {
//     name: RouteNames.AuthRoutes.SelectLanguage,
//     component: SelectLanguage,
//     key: RouteNames.AuthRoutes.SelectLanguage,
//   },
//   {
//     name: RouteNames.AuthRoutes.OnBoardingScreen,
//     component: OnBoarding,
//     key: RouteNames.AuthRoutes.OnBoardingScreen,
//   },
  {
    name: RouteNames.AuthRoutes.SignUpScreen,
    component: SignupScreen,
    key: RouteNames.AuthRoutes.SignUpScreen,
  },
  {
    name: RouteNames.AuthRoutes.GoogleSignUp,
    component: GoogleSignUp,
    key: RouteNames.AuthRoutes.GoogleSignUp,
  },

  {
    name: RouteNames.AuthRoutes.LoginScreen,
    component: LoginScreen,
    key: RouteNames.AuthRoutes.LoginScreen,
  },

  {
    name: RouteNames.AuthRoutes.SignIn,
    component: SignIn,
    key: RouteNames.AuthRoutes.SignIn,
  },

  {
    name: RouteNames.AuthRoutes.VerifyUser,
    component: VerifyUser,
    key: RouteNames.AuthRoutes.VerifyUser,
  },

  {
    name: RouteNames.AuthRoutes.ForgotPassVia,
    component: ForgotPassVia,
    key: RouteNames.AuthRoutes.ForgotPassVia,
  },

  {
    name: RouteNames.AuthRoutes.RecoverPassword,
    component: RecoverPassword,
    key: RouteNames.AuthRoutes.RecoverPassword,
  },

  {
    name: RouteNames.AuthRoutes.ForgotPasswordScreen,
    component: ForgotPassword,
    key: RouteNames.AuthRoutes.ForgotPasswordScreen,
  },

  {
    name: RouteNames.AuthRoutes.ResetPassword,
    component: ResetPassword,
    key: RouteNames.AuthRoutes.ResetPassword,
  },

  {
    name: RouteNames.AuthRoutes.ChangePasswrod,
    component: ChangePassword,
    key: RouteNames.AuthRoutes.ChangePasswrod,
  },
  {
    name: RouteNames.AuthRoutes.OtpScreen,
    component: OtpScreen,
    key: RouteNames.AuthRoutes.OtpScreen,
  },

  {
    name: RouteNames.AuthRoutes.PhoneSignin,
    component: PhoneSignin,
    key: RouteNames.AuthRoutes.PhoneSignin,
  },
];
