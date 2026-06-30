import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

// params Object
type AuthParamList = {
  ChangePassword: {from?: string; data?: object};
  OtpScreen: {email: string; from?: string; token?: any};
  VideoScreen: {courseId?: string};
};

/// For param passing
type HomeParamList = {
  NavigationScreen: {from?: string};
};
// Auth Screens Types
export type LoginScreenProps = {};

export type OtpScreenProps = {
  navigation: StackNavigationProp<AuthParamList, 'OtpScreen'>;
  route: RouteProp<AuthParamList, 'OtpScreen'>;
};

export type QuestionChatFlowProps = {}

export type ViewCertificateProps = {};

export type SignupScreenProps = {};

export type PhoneSigninProps = {};

export type ForgotPasswordProps = {};

export type ForgotPassViaProps = {};

export type RecoverPasswordProps = {};

export type SelectLanguageProps = {};

export type GoogleSignUpProps = {};

export type SignInNowProps = {};

export type VerifyUserProps = {};

export type ResetPasswordProps = {};

export type OnBoardingProps = {};

export type ChangePasswordProps = {
  navigation: StackNavigationProp<AuthParamList, 'ChangePassword'>;
  route: RouteProp<AuthParamList, 'ChangePassword'>;
};

// Home Screen Types

export type HomeScreenProps = {};

export type NavigationScreenProps = {
  navigation: StackNavigationProp<HomeParamList, 'NavigationScreen'>;
  /// For param passing
  route: RouteProp<HomeParamList, 'NavigationScreen'>;
};

export type AfterPurchaseCourseDetailsProps = {};

export type WebViewProps = {}

export type CommonQuestionsProps = {};

export type PaymentScreenProps = {};

export type CoursesProps = {};

export type SearchProps = {};

export type ActivityProps = {};

export type AllCourseScreenProps = {};

export type ProfileScreenProps = {};

export type CourseStatusScreenProps = {};

export type PointAndAmountScreenProps = {};

export type TransactionsHistoryProps = {};

export type SettingScreenProps = {};

export type MyNotificationScreenProps = {};

export type FavoriteCourseScreenProps = {};

export type CourseRatingProps = {};

export type MyWalletScreenProps = {};

export type WithdrawdetailProps = {};

export type ExchangetScreenProps = {};

export type RewardCoursesScreenProps = {};

export type ShareToChatProps = {}; 

export type MyAccountScreenProps = {};

export type TransactionsDetailsProps = {};

export type SupportAgentProps = {};

export type SupportAgentChatProps = {};

export type VideoPlayerProps = {};

export type EditProfileProps = {};

export type CourseDetailsProps = {};

export type InviteFriendProps = {};

export type InvitationRewardsProps = {};

export type WidthdrawAmountScreenProps = {};

export type PrivacyContentScreenProps = {};

export type BestPointsProgramProps = {};

export type AboutUsScreenProps = {};
