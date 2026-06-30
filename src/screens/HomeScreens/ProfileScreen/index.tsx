import {
  I18nManager,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  CourseStatus,
  CustomImage,
  CustomModal,
  CustomText,
  MainContainer,
  NormalCardComponent,
  PrimaryButton,
} from '../../../components';
import { ProfileScreenProps } from '../../propTypes';
import { useDispatch, useSelector } from 'react-redux';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import RNRestart from 'react-native-restart';
import { t } from 'i18next';
import { Text } from 'react-native';
// import {NormalCardComponent} from '../../../components/NormalCard';
import { NavigationScreen } from '../NavigationScreen';
import { FlatList } from 'react-native';
import { normalizeFont } from '../../../config/metrix';
import { ProgressBar } from 'react-native-paper';
import utills from '../../../config/utills';
import {
  Logout,
  RemovefromRedis,
  isLogin,
} from '../../../Redux/Action/AuthActions/authActions';
import { RootState } from '../HomeScreen';
import { EmptyListComponent } from '../../../components/CourseCardsHorizontalList';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import { MyCourses } from '../../../Redux/Action/CourseAction/CourseAction';
import {
  deleteAccount,
  GetProfileData,
} from '../../../Redux/Action/HomeActions/homeActions';
import navigationService from '../../../config/navigationService';
import { useTranslation } from 'react-i18next';
// import {AuthActions} from '../../../redux/actions';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({}) => {
  const myCourseStatus = useSelector(state => state?.CourseReducer?.mycourses);

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const allCourses =
    userData?.type == 'guest'
      ? []
      : [
          ...myCourseStatus?.enrolledCourse,
          ...myCourseStatus?.completedCourses,
        ];

  const [modalVisible, setModalVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const dispatch = useDispatch();

  const { t, i18n } = useTranslation();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMyCourses();
    getMyData();
  }, []);

  async function fetchMyCourses() {
    let res = await dispatch(MyCourses());

    if (res?.status) {
      dispatch({
        type: ActionType.MY_COURSES,
        payload: res?.responseData,
      });
    }
    setRefreshing(false);
  }

  async function getMyData() {
    let res = await dispatch(GetProfileData());

    if (res?.status) {
      dispatch({
        type: ActionType.GET_ME_DATA,
        payload: res?.responseData,
      });
    }
    dispatch({ type: ActionType.HOME_LOADER, payload: false });
  }

  const CardData = [
    {
      image: Images.Placeholder,
      text: t('point_and_amount'),
      icon: Images.ArrowChevron,
      onPress: () => {
        navigationService.navigate(RouteNames.HomeRoutes.PointAndAmountScreen);
      },
    },
    {
      image: Images.Transactions,
      text: t('transactions_history'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.TransactionsHistory),
    },
    {
      image: Images.MyNotification,
      text: t('my_notifications'),
      icon: Images.ArrowChevron,
      onPress: () => NavigationService.navigate(RouteNames.HomeRoutes.Activity),
    },
    {
      image: Images.FavCourse,
      text: t('my_favorite_courses'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.FavoriteCourseScreen),
    },
    {
      image: Images.Exchange,
      text: t('exchange'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.ExchangeScreen),
    },
    {
      image: Images.MyWallet,
      text: t('my_wallet'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.MyWalletScreen),
    },
    {
      image: Images.ChatSupport,
      text: t('support_agent'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.SupportAgent),
    },
    {
      image: Images.MyAccount,
      text: t('my_account'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.EditProfileScreen),
    },
    {
      image: Images.Setting,
      text: t('setting'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.SettingScreen),
    },

    {
      image: Images.Setting,
      text: t('delete_aaccount'),
      icon: Images.ArrowChevron,
      onPress: () => {
        setDeleteModalVisible(true);
      },
    },
    // Check if userData?.phone is false before including the "Change Password" item
    ...(userData?.phone || (userData?.email && userData?.authType === 'social')
      ? []
      : [
          {
            image: Images.ChangePassword,
            text: t('change_password'),
            icon: Images.ArrowChevron,
            onPress: () => {
              NavigationService.navigate(RouteNames.HomeRoutes.ChangePasswrod, {
                from: RouteNames.HomeRoutes.ProfileScreen,
              });
            },
          },
        ]),
    {
      image: Images.LogoutPlaceholder,
      text: t('Logout'),
      icon: Images.ArrowChevron,
      onPress: () => {
        setModalVisible(true);
      },
      // onPress: () => dispatch(AuthActions.loginSuccess(false)),
    },
  ];

  const CardDataGuestUser = [
    {
      image: Images.Placeholder,
      text: t('point_and_amount'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.CourseStatusScreen, {
          PointAndAmount: true,
        }),
    },
    {
      image: Images.Transactions,
      text: t('transactions_history'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.TransactionsHistory),
    },
    {
      image: Images.FavCourse,
      text: t('my_favorite_courses'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.FavoriteCourseScreen),
    },
    {
      image: Images.Exchange,
      text: t('exchange'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.ExchangeScreen),
    },
    {
      image: Images.MyWallet,
      text: t('my_wallet'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.MyWalletScreen),
    },
    {
      image: Images.Setting,
      text: t('setting'),
      icon: Images.ArrowChevron,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.SettingScreen),
    },
    {
      image: Images.LogoutPlaceholder,
      text: t('Logout'),
      icon: Images.ArrowChevron,
      onPress: () => {
        setModalVisible(true);
      },
      // onPress: () => dispatch(AuthActions.loginSuccess(false)),
    },
  ];

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={EmptyListComponent}
        ListHeaderComponent={() => {
          return <CourseStatus allCourses={allCourses} />;
        }}
        // data={ userData?.type == 'guest' ? CardDataGuestUser : CardData}
        data={CardData}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(100) }}
        renderItem={({ item, index }) => (
          <NormalCardComponent
            customtouchableOpacityStyle={{
              marginHorizontal: Metrix.HorizontalSize(20),
            }}
            key={index}
            image={item.image}
            text={item.text}
            icon={item.icon}
            onPress={item.onPress}
          />
        )}
      />

      <CustomModal
        smallContainerStyles={{
          height: '25%',
        }}
        onClose={() => {
          setModalVisible(false);
        }}
        smallModal
        // bottomModal
        visible={modalVisible}
      >
        <View>
          <CustomText.LargeBoldText customStyle={styles.smallModalHeading}>
            {t('log_out')}
          </CustomText.LargeBoldText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(15),
          }}
        >
          {/* <Image
            style={{
              height: Metrix.VerticalSize(100),
              width: Metrix.HorizontalSize(100),
            }}
            source={Images.CheckConfirm}
          /> */}
          <View style={{ width: '80%' }}>
            <CustomText.RegularText style={styles.smallModalTextStyle}>
              {t('log_out_title')}
            </CustomText.RegularText>
          </View>
        </View>
        <View style={styles.modalButtonViewStyle}>
          <PrimaryButton
            onPress={() => {
              setModalVisible(false);
            }}
            customStyles={styles.samllModalButtonStyle}
            title={t('no')}
          />
          <PrimaryButton
            onPress={async () => {
              // dispatch(AuthActions.loginSuccess(false));
              setModalVisible(false);
              // NavigationService.reset_0(RouteNames.AuthRoutes.SignUpScreen);
              dispatch(isLogin('afterOnboard'));

              let res = await dispatch(RemovefromRedis());
              console.log('???=>', res);

              // dispatch(Logout());
            }}
            textColor={Utills.selectedThemeColors().Primary}
            customStyles={styles.secondaryButtonStyle}
            title={t('yes')}
          />
        </View>
      </CustomModal>

      <CustomModal
        smallContainerStyles={{
          height: '25%',
        }}
        onClose={() => {
          setDeleteModalVisible(false);
        }}
        smallModal
        // bottomModal
        visible={deleteModalVisible}
      >
        <View>
          <CustomText.LargeBoldText customStyle={styles.smallModalHeading}>
            {t('delete_aaccount')}
          </CustomText.LargeBoldText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(15),
          }}
        >
          <View style={{ width: '80%' }}>
            <CustomText.RegularText style={styles.smallModalTextStyle}>
              {t('delete_aaccount_title')}
            </CustomText.RegularText>
          </View>
        </View>
        <View style={styles.modalButtonViewStyle}>
          <PrimaryButton
            onPress={() => {
              setDeleteModalVisible(false);
            }}
            customStyles={styles.samllModalButtonStyle}
            title={t('no')}
          />
          {/* <PrimaryButton
            onPress={async () => {

              // user/permanently
              setDeleteModalVisible(false);
              dispatch(isLogin('afterOnboard'));
              let res = await dispatch(RemovefromRedis());
              console.log('???=>', res);
            }}
            textColor={Utills.selectedThemeColors().Primary}
            customStyles={styles.secondaryButtonStyle}
            title={t('yes')}
          /> */}

          <PrimaryButton
            onPress={async () => {
              let res = await dispatch(deleteAccount());
              console.log('Delete Account Response =>', res);

              setDeleteModalVisible(false);

              if (res?.sucess === true) {
                setTimeout(async () => {
                  dispatch(isLogin('afterOnboard'));

                  let res = await dispatch(RemovefromRedis());
                  console.log('???=>', res);
                }, 1000);
              }
            }}
            textColor={Utills.selectedThemeColors().Primary}
            customStyles={styles.secondaryButtonStyle}
            title={t('yes')}
          />
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  smallModalTextStyle: {
    marginTop: Metrix.VerticalSize(5),
    textAlign: 'center',
    color: Utills.selectedThemeColors().LightGrayTextColor,
  },

  samllModalButtonStyle: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(32.232),
  },
  smallModalHeading: {
    textAlign: 'center',
    fontSize: normalizeFont(22),
    color: Utills.selectedThemeColors().Primary,
  },
  modalButtonViewStyle: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrix.VerticalSize(10),
  },
  secondaryButtonStyle: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(32.232),
    backgroundColor: Utills.selectedThemeColors().Base,
    borderWidth: 1.5,
    borderColor: Utills.selectedThemeColors().Primary,
  },
});
