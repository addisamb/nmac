import 'react-native-gesture-handler';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Text,
  RefreshControl,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { HomeScreenProps } from '../../propTypes';
import {
  CategoryBtnsList,
  CourseCardsHorizontalList,
  // CustomCarousel,
  CustomImage,
  CustomSearchBar,
  CustomText,
  MainContainer,
  MultipleHeadingComponent,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetProfileData,
  GetCourse,
  likeAndUnlikeCourse,
  getCategories,
  toggleFavorite,
  storeFcm,
  getNotification,
  ChangeLanguageApi,
} from '../../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import navigationService from '../../../config/navigationService';
import { useNavigation } from '@react-navigation/native';
import { SearchBarView } from '../../../components/SearchBarView';
import {
  GetCourseByIdSectionWise,
  GetCourseBySearch,
} from '../../../Redux/Action/SearchActions/SearchActions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MyCourses } from '../../../Redux/Action/CourseAction/CourseAction';
import { showLoginPleaseModal } from '../../../Redux/Action/AuthActions/authActions';
import {
  getKeyName,
  getListName,
} from '../../../config/utills/imagesIconHandler';
import { useTranslation } from 'react-i18next';
import { CustomCarousel } from '../../../components/CustomCarousel';
// import { v4 as uuidv4 } from 'uuid';

export interface SectionRoot {
  promoCourses?: [];
  trendingCourses?: [];
  popularCourses?: [];
  newCourses?: [];
  recommendedCourses?: [];
}

interface HomeReducerState {
  courseList?: [];
  categoryList?: [];
  userData?: {
    name?: string;
  };
  // Add other properties if needed
}

export interface RootState {
  HomeReducer?: HomeReducerState;
  AuthReducer?: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({}) => {
  const { t, i18n } = useTranslation();

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const courseList = useSelector(
    (state: RootState) => state?.HomeReducer?.courseList,
  );

  // console.log('====--------->>>>>', courseList);

  const categoryarray = useSelector(
    (state: RootState) => state?.HomeReducer?.categoryList,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [refreshing, setRefreshing] = useState(false);
  const [arr, setarr] = useState([]);

  useEffect(() => {
    ApiCall();
    UpdateNotificationLanguage();
  }, []);

  async function UpdateNotificationLanguage() {
    let body = {
      language: i18n.language == 'ar' ? 'arabic' : 'english',
    };
    let res = await dispatch(ChangeLanguageApi(body));

    if (res.status) {
      setTimeout(() => {
        getMyData();
      }, 1000);
    }
  }

  useEffect(() => {
    if (!arr.length) {
      getCourseList();
    }
  }, [arr]);

  async function getMyData() {
    let res = await dispatch(GetProfileData());

    if (res?.status) {
      dispatch({
        type: ActionType.GET_ME_DATA,
        payload: res?.responseData,
      });
    }
    dispatch({ type: ActionType.HOME_LOADER, payload: false });
    return res?.status;
  }

  async function getCourseList() {
    await dispatch(GetCourse());
  }

  // console.log("hello world====>>>>",userData);

  async function courselikeAndUnlike(ID: any) {
    let payload = {
      courseID: ID,
    };
    let res = await dispatch(likeAndUnlikeCourse(payload));
    if (res?.status) {
      dispatch(toggleFavorite('popularCourses', ID));
      dispatch(toggleFavorite('trendingCourses', ID));
      dispatch(toggleFavorite('newCourses', ID));
      dispatch(toggleFavorite('recommendedCourses', ID));
    }
  }

  async function getCategoryList() {
    let res = await dispatch(getCategories());
    return res.status;
  }

  async function getNotificationsList() {
    let res = await dispatch(getNotification());
    return res.status;
  }

  async function fetchMyCourses() {
    let res = await dispatch(MyCourses());

    if (res?.status) {
      dispatch({
        type: ActionType.MY_COURSES,
        payload: res?.responseData,
      });
    }
    return res.status;
  }

  async function storeFcmToken() {
    if (userData?.type == 'guest') {
      return true;
    }

    try {
      const value = await AsyncStorage.getItem('FCM_TOKEN');
      let payload = {
        FcmToken: JSON.parse(value) || 'abc',
      };
      if (value !== null) {
        await dispatch(storeFcm(payload));
      } else {
        await dispatch(storeFcm(payload));
        console.log(`No value found for key .`);
      }
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
      return true;
    } catch (error) {
      console.error('Error retrieving value:', error);
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
      return true;
    }
  }

  const ApiCall = async () => {
    try {
      const promise2 = storeFcmToken();
      const promise3 = getCategoryList();
      const promise4 = fetchMyCourses();
      const promise5 = getNotificationsList();
      // Wait for all promises to resolve
      await Promise.all([promise2, promise3, promise4, promise5]).then(res => {
        console.log('res==>  s', res);

        if (res.every(element => element === true)) {
          dispatch(showLoginPleaseModal(false));
          dispatch({ type: ActionType.HOME_LOADER, payload: false });
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        } else {
          dispatch(showLoginPleaseModal(false));
          dispatch({ type: ActionType.HOME_LOADER, payload: false });
          dispatch({ type: ActionType.AUTH_LOADER, payload: false });
        }
      });
    } catch (error) {
      console.error('An error occurred:', error);
      dispatch(showLoginPleaseModal(false));
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
      dispatch({ type: ActionType.AUTH_LOADER, payload: false });
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a fetch operation (replace this with your actual data fetching logic)
    setTimeout(() => {
      getCourseList();
      getCategoryList();
      getMyData();
      setRefreshing(false); // Set refreshing to false when done
    }, 1000);
  }, []);

  useEffect(() => {
    Filtering();
  }, [arr]);

  async function Filtering() {
    if (arr?.length) {
      let payload = {
        categoryIDs: JSON.stringify(arr),
      };

      let response = await dispatch(GetCourseByIdSectionWise(payload));

      dispatch({
        type: ActionType.COURSE_LIST,
        payload: response?.responseData,
      });
    }
  }

  async function handleIDs(id: string) {
    if (arr.includes(id)) {
      let removeid = arr.filter(item => item !== id);
      setarr(removeid);
    } else {
      setarr([...arr, id]);
    }
  }

  return (
    <MainContainer
      isFlatList
      customeStyle={{
        paddingVertical: 0,
      }}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.userInfoSection}>
          <MultipleHeadingComponent
            top={10}
            heading={`${t('hi_user')} ${
              userData?.name === undefined
                ? ''
                : userData?.name === 'Guest'
                ? t('guest')
                : userData?.name
            }`}
            // heading={`${t('hi_user')} ${

            //     "Guest"
            // }`}
            // subHeading={t('find_course')}
          />
          <TouchableOpacity
            onPress={() => {
              navigationService.navigate(RouteNames.HomeRoutes.MyWalletScreen);
            }}
            activeOpacity={0.7}
            style={[styles.userInfoSection, styles.walletBtn]}
          >
            <CustomImage
              source={Images.WalletIcon}
              customStyle={{
                width: Metrix.customFontSize(15),
                height: Metrix.customFontSize(15),
                marginRight: Metrix.HorizontalSize(6),
              }}
            />
            <CustomText.LargeSemiBoldText
              customStyle={{
                fontSize: FontType.FontSmall,
                color: Utills.selectedThemeColors().Base,
              }}
            >
              {Math.round(userData?.coins * 5)} {t('current_amount')}
            </CustomText.LargeSemiBoldText>
          </TouchableOpacity>
        </View>

        <SearchBarView
          activeOpacity={0.4}
          onPress={() => {
            navigationService.navigate(
              RouteNames.HomeRoutes.Search,
              //   , {
              //   randomKey: Math.floor(Math.random() * 100),
              // }
            );
          }}
          // customStyle={{
          //   width: '90%',
          // }}
          editable={false}
        />

        <CategoryBtnsList
          listData={categoryarray}
          onPresstoGetId={id => handleIDs(id)}
          heading={t('top_categories')}
          isAllCoursesHeading={false}
          // onPressCoursesBtn={() => {
          //   navigationService.navigate(RouteNames.HomeRoutes.AllCourseScreen, {
          //     screenName: t('top_categories'),
          //   });
          // }}
        />

        {courseList &&
          courseList?.map((section: SectionRoot, index: number) => {
            let AfterPromoindex1 = Object.keys(section)[1];
            let AfterPromoindex2 = Object.keys(section)[2];
            let AfterPromoindex3 = Object.keys(section)[3];
            let AfterPromoindex4 = Object.keys(section)[4];

            return (
              <>
                {arr.length == 0 ? null : (
                  <CustomCarousel
                    carouselData={section[Object.keys(section)[0]]}
                  />
                  // <></>
                )}

                <View>
                  {section?.trendingCourses && (
                    <CourseCardsHorizontalList
                      onHeartBtnPress={courselikeAndUnlike}
                      courseData={section[AfterPromoindex1]}
                      heading={getListName(AfterPromoindex1)}
                      onPressCoursesBtn={() => {
                        navigationService.navigate(
                          RouteNames.HomeRoutes.AllCourseScreen,
                          {
                            screenName: getListName(AfterPromoindex1), // Pass the heading dynamically
                            trendingCourses: section[AfterPromoindex1],
                            key: getKeyName(AfterPromoindex1),
                          },
                        );
                      }}
                      isHorizontal
                    />
                  )}
                </View>

                <View>
                  <CourseCardsHorizontalList
                    onHeartBtnPress={courselikeAndUnlike}
                    courseData={section[AfterPromoindex2]}
                    heading={getListName(AfterPromoindex2)}
                    onPressCoursesBtn={() => {
                      navigationService.navigate(
                        RouteNames.HomeRoutes.AllCourseScreen,
                        {
                          screenName: getListName(AfterPromoindex2), // Pass the heading dynamically
                          popularCourses: section[AfterPromoindex2],
                          key: getKeyName(AfterPromoindex2),
                        },
                      );
                    }}
                    isHorizontal
                  />

                  <CourseCardsHorizontalList
                    onHeartBtnPress={courselikeAndUnlike}
                    courseData={section[AfterPromoindex3]}
                    heading={getListName(AfterPromoindex3)}
                    // customCardContainerStyles={{
                    //   width: '49%',
                    //   marginBottom: Metrix.HorizontalSize(10),
                    // }}
                    onPressCoursesBtn={() => {
                      navigationService.navigate(
                        RouteNames.HomeRoutes.AllCourseScreen,
                        {
                          screenName: getListName(AfterPromoindex3), // Pass the heading dynamically
                          trendingCourses: section[AfterPromoindex3],
                          key: getKeyName(AfterPromoindex3),
                        },
                      );
                    }}
                    isHorizontal
                  />

                  <CourseCardsHorizontalList
                    onHeartBtnPress={courselikeAndUnlike}
                    courseData={section[AfterPromoindex4]}
                    heading={getListName(AfterPromoindex4)}
                    // isAllCoursesHeading={false}
                    // customCardContainerStyles={{
                    //   width: '49%',
                    //   marginBottom: Metrix.HorizontalSize(10),
                    // }}
                    onPressCoursesBtn={() => {
                      navigationService.navigate(
                        RouteNames.HomeRoutes.AllCourseScreen,
                        {
                          screenName: getListName(AfterPromoindex4), // Pass the heading dynamically
                          trendingCourses: section[AfterPromoindex4],
                          key: getKeyName(AfterPromoindex4),
                        },
                      );
                    }}
                  />
                </View>
              </>
            );
          })}
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  walletBtn: {
    backgroundColor: Utills.selectedThemeColors().Primary,
    paddingVertical: Metrix.VerticalSize(6),
    paddingHorizontal: Metrix.HorizontalSize(17),
    borderRadius: Metrix.VerticalSize(20),
    marginVertical: Metrix.VerticalSize(15),
  },
});
