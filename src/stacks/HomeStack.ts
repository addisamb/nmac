import WebViewComp from '../components/webView';
import WebViewPayment from '../components/webViewPayment';
import {RouteNames} from '../config';
import {
  AfterPurchaseCourseDetails,
  ChangePassword,
  CommonQuestions,
  CourseDetails,
  EditProfile,
  ExchangeScreen,
  FavoriteCourseScreen,
  InvitationRewards,
  InviteFriend,
  MyAccountScreen,
  MyWalletScreen,
  NavigationScreen,
  PaymentScreen,
  PointAndAmountScreen,
  RewardCoursesScreen,
  SettingScreen,
  SupportAgent,
  TransactionsDetails,
  TransactionsHistory,
  WidthdrawAmountScreen,
  BestPointsProgram,
  AboutUsScreen,
  AllCourseScreen,
  ShareToChat,
  VideoPlayerScreen,
  QuestionChatFlow,
  SupportAgentChat,
  ViewCertificate,
  CourseStatusScreen,
  CourseRating,
  PrivacyContentScreen,
  Activity,
} from '../screens';
import { Withdrawdetail } from '../screens/HomeScreens/Withdrawdetail';
import {
  ChangePasswordProps,
  EditProfileProps,
  ProfileScreenProps,
  NavigationScreenProps,
  CourseDetailsProps,
  TransactionsHistoryProps,
  MyNotificationScreenProps,
  FavoriteCourseScreenProps,
  MyWalletScreenProps,
  MyAccountScreenProps,
  SettingScreenProps,
  TransactionsDetailsProps,
  SupportAgentProps,
  PointAndAmountScreenProps,
  PaymentScreenProps,
  RewardCoursesScreenProps,
  InviteFriendProps,
  CourseRatingProps,
  InvitationRewardsProps,
  WidthdrawAmountScreenProps,
  AfterPurchaseCourseDetailsProps,
  WebViewProps,
  ShareToChatProps,
  VideoPlayerScreenProps,
  QuestionChatFlowProps,
  ViewCertificateProps,
  CommonQuestionsProps,
  SupportAgentChatProps,
  BestPointsProgramProps,
  CourseStatusScreenProps,
  AboutUsScreenProps,
  AllCourseScreenProps,
  ActivityProps,
  PrivacyContentScreenProps
} from '../screens/propTypes';
import {DrawerStack} from './DrawerStack';

type HomeScreenStacksTypes = {
  name: string;
  component:
    | React.FC<EditProfileProps>
    | React.FC<ProfileScreenProps>
    | React.FC<ChangePasswordProps>
    | React.FC<CourseDetailsProps>
    | React.FC<PointAndAmountScreenProps>
    | React.FC<AllCourseScreenProps>
    | React.FC<ActivityProps>
    | React.FC<TransactionsHistoryProps>
    | React.FC<MyNotificationScreenProps>
    | React.FC<FavoriteCourseScreenProps>
    | React.FC<MyWalletScreenProps>
    | React.FC<MyAccountScreenProps>
    | React.FC<SettingScreenProps>
    | React.FC<ShareToChatProps>
    | React.FC<SupportAgentProps>
    | React.FC<RewardCoursesScreenProps>
    | React.FC<TransactionsDetailsProps>
    | React.FC<PaymentScreenProps>
    | React.FC<InviteFriendProps>
    | React.FC<InvitationRewardsProps>
    | React.FC<BestPointsProgramProps>
    | React.FC<WidthdrawAmountScreenProps>
    | React.FC<AfterPurchaseCourseDetailsProps>
    | React.FC<WebViewProps>
    | React.FC<VideoPlayerScreenProps>
    | React.FC<QuestionChatFlowProps>
    | React.FC<ViewCertificateProps>
    | React.FC<SupportAgentChatProps>
    | React.FC<CommonQuestionsProps>
    | React.FC<AboutUsScreenProps>
    | React.FC<NavigationScreenProps>;
  key: string;
  options?: { gestureEnabled?: boolean };
}[];

export const HomeStack: HomeScreenStacksTypes = [
  {
    name: RouteNames.HomeRoutes.DrawerStack,
    component: DrawerStack,
    key: RouteNames.HomeRoutes.DrawerStack,
  },
  {
    name: RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
    component: AfterPurchaseCourseDetails,
    options: { gestureEnabled: false },
    key: RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
  },
  {
    name: RouteNames.HomeRoutes.WebViewScreen,
    component: WebViewComp,
    options: { gestureEnabled: false },
    key: RouteNames.HomeRoutes.WebViewScreen,
  },
  {
    name: RouteNames.HomeRoutes.WebViewPayment,
    component: WebViewPayment,
    key: RouteNames.HomeRoutes.WebViewPayment,
  },

  // {
  //   name: RouteNames.HomeRoutes.Activity,
  //   component: Activity,
  //   key: RouteNames.HomeRoutes.Activity,
  // },
  {
    name: RouteNames.HomeRoutes.VideoPlayerScreen,
    component: VideoPlayerScreen,
    options: { gestureEnabled: false },
    key: RouteNames.HomeRoutes.VideoPlayerScreen,
  },
  {
    name: RouteNames.HomeRoutes.QuestionChatFlow,
    component: QuestionChatFlow,
    key: RouteNames.HomeRoutes.QuestionChatFlow,
  },
  {
    name: RouteNames.HomeRoutes.ViewCertificate,
    component: ViewCertificate,
    key: RouteNames.HomeRoutes.ViewCertificate,
  },
  {
    name: RouteNames.HomeRoutes.NavigationScreen,
    component: NavigationScreen,
    key: RouteNames.HomeRoutes.NavigationScreen,
  },
  {
    name: RouteNames.HomeRoutes.EditProfileScreen,
    component: EditProfile,
    key: RouteNames.HomeRoutes.EditProfileScreen,
  },
  {
    name: RouteNames.HomeRoutes.ChangePasswrod,
    component: ChangePassword,
    key: RouteNames.HomeRoutes.ChangePasswrod,
  },
  {
    name: RouteNames.HomeRoutes.CourseDetails,
    component: CourseDetails,
    key: RouteNames.HomeRoutes.CourseDetails,
  },

  {
    name: RouteNames.HomeRoutes.TransactionsHistory,
    component: TransactionsHistory,
    key: RouteNames.HomeRoutes.TransactionsHistory,
  },

  {
    name: RouteNames.HomeRoutes.PointAndAmountScreen,
    component: PointAndAmountScreen,
    key: RouteNames.HomeRoutes.PointAndAmountScreen,
  },

  {
    name: RouteNames.HomeRoutes.FavoriteCourseScreen,
    component: FavoriteCourseScreen,
    key: RouteNames.HomeRoutes.FavoriteCourseScreen,
  },
  {
    name: RouteNames.HomeRoutes.MyWalletScreen,
    component: MyWalletScreen,
    key: RouteNames.HomeRoutes.MyWalletScreen,
  },
  {
    name: RouteNames.HomeRoutes.Withdrawdetail,
    component: Withdrawdetail,
    key: RouteNames.HomeRoutes.Withdrawdetail,
  },
  {
    name: RouteNames.HomeRoutes.RewardCoursesScreen,
    component: RewardCoursesScreen,
    key: RouteNames.HomeRoutes.RewardCoursesScreen,
  },

  {
    name: RouteNames.HomeRoutes.ExchangeScreen,
    component: ExchangeScreen,
    key: RouteNames.HomeRoutes.ExchangeScreen,
  },

  {
    name: RouteNames.HomeRoutes.MyAccountScreen,
    component: MyAccountScreen,
    key: RouteNames.HomeRoutes.MyAccountScreen,
  },

  {
    name: RouteNames.HomeRoutes.SettingScreen,
    component: SettingScreen,
    key: RouteNames.HomeRoutes.SettingScreen,
  },

  {
    name: RouteNames.HomeRoutes.TransactionsDetails,
    component: TransactionsDetails,
    key: RouteNames.HomeRoutes.TransactionsDetails,
  },

  {
    name: RouteNames.HomeRoutes.SupportAgent,
    component: SupportAgent,
    key: RouteNames.HomeRoutes.SupportAgent,
  },
  {
    name: RouteNames.HomeRoutes.PaymentScreen,
    component: PaymentScreen,
    key: RouteNames.HomeRoutes.PaymentScreen,
  },

  {
    name: RouteNames.HomeRoutes.InviteFriend,
    component: InviteFriend,
    key: RouteNames.HomeRoutes.InviteFriend,
  },

  {
    name: RouteNames.HomeRoutes.InvitationRewards,
    component: InvitationRewards,
    key: RouteNames.HomeRoutes.InvitationRewards,
  },

  {
    name: RouteNames.HomeRoutes.ShareToChat,
    component: ShareToChat,
    key: RouteNames.HomeRoutes.ShareToChat,
  },

  {
    name: RouteNames.HomeRoutes.WidthdrawAmountScreen,
    component: WidthdrawAmountScreen,
    key: RouteNames.HomeRoutes.WidthdrawAmountScreen,
  },

  {
    name: RouteNames.HomeRoutes.CommonQuestions,
    component: CommonQuestions,
    key: RouteNames.HomeRoutes.CommonQuestions,
  },
  {
    name: RouteNames.HomeRoutes.BestPointsProgram,
    component: BestPointsProgram,
    key: RouteNames.HomeRoutes.BestPointsProgram,
  },

  {
    name: RouteNames.HomeRoutes.AboutUsScreen,
    component: AboutUsScreen,
    key: RouteNames.HomeRoutes.AboutUsScreen,
  },

  {
    name: RouteNames.HomeRoutes.SupportAgentChat,
    component: SupportAgentChat,
    key: RouteNames.HomeRoutes.SupportAgentChat,
  },

  {
    name: RouteNames.HomeRoutes.AllCourseScreen,
    component: AllCourseScreen,
    key: RouteNames.HomeRoutes.AllCourseScreen,
  },

  {
    name: RouteNames.HomeRoutes.CourseRating,
    component: CourseRating,
    key: RouteNames.HomeRoutes.CourseRating,
  },
  {
    name: RouteNames.HomeRoutes.CourseStatusScreen,
    component: CourseStatusScreen,
    key: RouteNames.HomeRoutes.CourseStatusScreen,
  },

  {
    name: RouteNames.HomeRoutes.PrivacyContentScreen,
    component: PrivacyContentScreen,
    key: RouteNames.HomeRoutes.PrivacyContentScreen,
  },
];