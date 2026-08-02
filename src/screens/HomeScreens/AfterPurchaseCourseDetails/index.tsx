import {
  BackHandler,
  FlatList,
  I18nManager,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BackHeader,
  CustomText,
  MainContainer,
  RoundImageContainer,
} from '../../../components';
import {
  FontType,
  Fonts,
  Images,
  Metrix,
  RouteNames,
  Utills,
} from '../../../config';
import {t} from 'i18next';
import {AfterPurchaseCourseDetailsProps} from '../../propTypes';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Lectures} from './Lectures';
import {Chat} from './Chat';
import {QuizAndAssigmnets} from './QuizAndAssigmnets';
import {BonusMaterial} from './BonusMaterial';
import {ProgressReport} from './ProgressReport';
import {CourseFeedback} from './CourseFeedback';
import {useSelector} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {Assigmnets} from './Assignment';
import navigationService from '../../../config/navigationService';
import {RootState} from '../HomeScreen';
import {handleArabicNavigation} from '../../../config/utills/handleAndroidNavigation';
import {Platform} from 'react-native';

const IMAGE_SIZE = 80;
const SPACING = 10;

type CustomTabBarProps = {
  id: string;
  title: string;
  renderScreen?: () => React.ReactNode;
};

export const AfterPurchaseCourseDetails: React.FC<
  AfterPurchaseCourseDetailsProps
> = ({route}) => {
  const {movetoIndex, movetoCourseDetail} = route.params || {};

  const navigation = useNavigation();
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const courseDetail = useSelector(state => state?.HomeReducer?.course_Object);

  const [activeIndex, setActiveIndex] = useState(0);

  const {width, height} = useWindowDimensions();

  const topFlatlistRef = useRef<FlatList | null>(null);
  const thumbFlatlistRef = useRef<FlatList | null>(null);
  const FOCUS = useIsFocused();

  // Deferred initial scroll. This 500ms timer used to be uncancellable: tapping a
  // tab within that window let the timer fire afterwards and snap the user back
  // to movetoIndex (the "tab flicks back to the previous one" bug). Keep a handle
  // so a user tap — or leaving the screen — cancels it.
  const initialScrollTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (FOCUS && movetoIndex >= 0) {
      initialScrollTimer.current = setTimeout(() => {
        //condition becouse screen index count start from left in android and arabic mode only so for this i implement this condition
        if (Platform.OS == 'android' && I18nManager.isRTL) {
          scrollToActiveIndex(handleArabicNavigation(movetoIndex));
          setActiveIndex(movetoIndex);
        } else {
          scrollToActiveIndex(movetoIndex);
          setActiveIndex(movetoIndex);
        }
        initialScrollTimer.current = null;
      }, 500);
    }

    return () => {
      if (initialScrollTimer.current) {
        clearTimeout(initialScrollTimer.current);
        initialScrollTimer.current = null;
      }
    };
  }, [FOCUS]);

  function handleBackButtonClick() {
    if (movetoCourseDetail) {
      navigationService.navigate(RouteNames.HomeRoutes.CourseDetails, {
        objectId: courseDetail?._id,
      });
    } else {
      navigationService.navigate(RouteNames.HomeRoutes.Activity);
    }
    return true;
  }

  useEffect(() => {
    // RN 0.81 removed BackHandler.removeEventListener — calling it threw on
    // unmount (crashing the screen). addEventListener returns a subscription.
    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => subscription.remove();
  }, []);

  const scrollToActiveIndex = (index: number) => {
    setActiveIndex(index);
    topFlatlistRef.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });

    const scrollOffset =
      index * (IMAGE_SIZE + SPACING) - (width / 2 - IMAGE_SIZE / 2);
    thumbFlatlistRef.current?.scrollToOffset({
      offset: scrollOffset > 0 ? scrollOffset : 0,
      animated: true,
    });
  };

  const scrollToActiveIndexonPress = (index: number) => {
    // The user made an explicit choice — cancel any pending initial auto-scroll
    // so it can't override the tab they just picked.
    if (initialScrollTimer.current) {
      clearTimeout(initialScrollTimer.current);
      initialScrollTimer.current = null;
    }
    setActiveIndex(index);
    //condition becouse screen index count start from left in android and arabic mode only so for this i implement this condition
    let androidNavigationCondition = handleArabicNavigation(index);

    topFlatlistRef.current?.scrollToOffset({
      offset: androidNavigationCondition * width,
      animated: true,
    });

    const scrollOffset =
      androidNavigationCondition * (IMAGE_SIZE + SPACING) -
      (width / 2 - IMAGE_SIZE / 2);
    thumbFlatlistRef.current?.scrollToOffset({
      offset: scrollOffset > 0 ? scrollOffset : 0,
      animated: true,
    });
  };

  function hndleNavigation(index) {
    // Cancel the pending initial auto-scroll here, at the single user-tap entry
    // point. Only the Android+RTL branch below used to do this, so on every
    // other device tapping a tab within the first 500ms let the timer fire
    // afterwards and yank the user back to movetoIndex — the tab appeared to
    // open and then immediately flick back to the previous one.
    if (initialScrollTimer.current) {
      clearTimeout(initialScrollTimer.current);
      initialScrollTimer.current = null;
    }

    if (Platform.OS == 'android' && I18nManager.isRTL) {
      scrollToActiveIndexonPress(index);
    } else {
      scrollToActiveIndex(index);
    }
  }

  const renderFullScreenItem = ({item}: {item: CustomTabBarProps}) => (
    <View style={{width, height: '100%'}}>
      {/* <CustomText.ExtraLargeBoldText>
        {item?.title}
      </CustomText.ExtraLargeBoldText> */}
      {item.renderScreen && item.renderScreen()}
    </View>
  );

  const renderThumbnailItem = ({
    item,
    index,
  }: {
    item: {id: string; title: string};
    index: number;
  }) => (
    //condition becouse screen index count start from left in android and arabic mode only so for this i implement this condition
    <TouchableOpacity onPress={() => hndleNavigation(index)}>
      <View
        style={{
          marginHorizontal: 10,
          paddingVertical: Metrix.VerticalSize(10),
          borderBottomColor:
            activeIndex === index
              ? Utills.selectedThemeColors().Primary
              : // ? "red"
                'transparent',
          borderBottomWidth: 2,
          // borderRadius: Metrix.VerticalSize(10),
        }}>
        <CustomText.MediumText
          customStyle={{
            fontSize: FontType.FontRegular,
            color:
              activeIndex === index
                ? Utills.selectedThemeColors().Primary
                : Utills.selectedThemeColors().TextInputPlaceholserColor,
          }}>
          {item?.title}
        </CustomText.MediumText>
      </View>
    </TouchableOpacity>
  );

  const data = [
    {
      id: '1',
      title: t('lectures'),
      renderScreen: () => (
        <Lectures
          movetoCourseDetail={movetoCourseDetail}
          active={activeIndex == 0 ? true : false}
        />
      ),
    },
    {
      id: '2',
      title: t('chat'),
      renderScreen: () => (
        <Chat
          movetoCourseDetail={movetoCourseDetail}
          active={activeIndex == 1 ? true : false}
        />
      ),
    },
    {
      id: '3',
      title: t('quiz'),
      renderScreen: () => (
        <QuizAndAssigmnets
          movetoCourseDetail={movetoCourseDetail}
          isActive={activeIndex == 2 ? true : false}
        />
      ),
    },
    {
      id: '4',
      title: t('assignments'),
      renderScreen: () => (
        <Assigmnets movetoCourseDetail={movetoCourseDetail} />
      ),
    },
    {
      id: '5',
      title: t('bonus_material'),
      renderScreen: () => (
        <BonusMaterial movetoCourseDetail={movetoCourseDetail} />
      ),
    },
    {
      id: '6',
      title: t('progress_report'),
      renderScreen: () => (
        <ProgressReport movetoCourseDetail={movetoCourseDetail} />
      ),
    },
    {
      id: '7',
      title: t('course_feedback'),
      renderScreen: () => (
        <CourseFeedback movetoCourseDetail={movetoCourseDetail} />
      ),
    },
  ];

  const dataGuest = [
    {
      id: '1',
      title: t('lectures'),
      renderScreen: () => <Lectures active={activeIndex == 0 ? true : false} />,
    },
    {
      id: '3',
      title: t('quiz'),
      renderScreen: () => (
        <QuizAndAssigmnets isActive={activeIndex == 2 ? true : false} />
      ),
    },
    {
      id: '4',
      title: t('assignments'),
      renderScreen: () => <Assigmnets />,
    },
    {
      id: '5',
      title: t('bonus_material'),
      renderScreen: () => <BonusMaterial />,
    },
    {
      id: '6',
      title: t('progress_report'),
      renderScreen: () => <ProgressReport />,
    },
    {
      id: '7',
      title: t('course_feedback'),
      renderScreen: () => <CourseFeedback />,
    },
  ];

  function guestView() {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: Metrix.HorizontalSize(20),
          justifyContent: 'space-between',
        }}>
        <View>
          <View>
            <CustomText.SmallText customStyle={{color: '#ffffff'}}>
              {t('student')}
            </CustomText.SmallText>

            <View
              style={{flexDirection: 'row', marginLeft: 5, marginVertical: 2}}>
              {courseDetail?.enrolledStudents
                ?.slice(0, 4)
                ?.map((item: object, index: number) => (
                  <Image
                    style={{
                      width: Metrix.HorizontalSize(20),
                      height: Metrix.HorizontalSize(20),
                      backgroundColor: 'red',
                      borderRadius: 50,
                      marginLeft: -5,
                      borderColor: '#fff',
                      borderWidth: 1,
                    }}
                    source={
                      item?.enrolledStudentImage?.[0]?.profilePic == undefined
                        ? Images.user2
                        : {uri: item?.enrolledStudentImage?.[0]?.profilePic}
                    }
                  />
                ))}
            </View>

            <View>
              <CustomText.RegularText
                customStyle={{
                  fontSize: FontType.FontMedium,
                  color: '#fff',
                }}>
                {`(${courseDetail?.totalStudents || '0'} ${t('enroll')} )`}
              </CustomText.RegularText>
            </View>
          </View>
        </View>

        <View>
          <CustomText.LargeSemiBoldText
            customStyle={{fontSize: FontType.FontSmall, color: '#fff'}}>
            {t('instructor')}
          </CustomText.LargeSemiBoldText>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 5,
            }}>
            <RoundImageContainer
              source={
                courseDetail?.instructorDetails?.profilePic == undefined
                  ? Images.user2
                  : {uri: courseDetail?.instructorDetails?.profilePic}
              }
              circleWidth={40}
            />
            <View style={{marginLeft: Metrix.VerticalSize(5)}}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: FontType.FontRegular,
                  color: '#ffffff',
                  width: Metrix.HorizontalSize(120),
                }}>
                {courseDetail?.instructorDetails?.name}
              </Text>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={{
                  fontSize: FontType.FontRegular,
                  color: '#ffffff',
                  width: Metrix.HorizontalSize(120),
                }}>
                {courseDetail?.instructorDetails?.expertise}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <>
      <BackHeader
        customeStyle={{marginTop: -3}}
        backFunction={handleBackButtonClick}
        heading={t('course_detail')}
      />
      <View
        style={{
          height:
            userData?.type == 'guest'
              ? Metrix.VerticalSize(80)
              : Metrix.VerticalSize(50),
          backgroundColor: Utills.selectedThemeColors().Primary,
        }}>
        <CustomText.LargeSemiBoldText
          customStyle={{
            color: '#ffffff',
            paddingHorizontal: Metrix.HorizontalSize(20),
            marginTop: -5,
            textAlign: I18nManager.isRTL ? 'right' : 'left',
          }}>
          {courseDetail?.name}
        </CustomText.LargeSemiBoldText>

        {userData?.type == 'guest' ? guestView() : null}
      </View>
      <View style={{flex: 1}}>
        <View
          style={{
            backgroundColor: '#f4f4f4',
          }}>
          <FlatList
            ref={thumbFlatlistRef}
            // data={userData?.type == 'guest' ? dataGuest : data}
            data={data}
            horizontal
            pagingEnabled
            bounces={false}
            showsHorizontalScrollIndicator={false}
            // contentContainerStyle={styles.thumbnailContentContainer}
            renderItem={renderThumbnailItem}
            keyExtractor={item => item.id.toString()}
          />
        </View>

        <View style={{flex: 1}}>
          <FlatList
            ref={topFlatlistRef}
            // data={userData?.type == 'guest' ? dataGuest : data}
            data={ data}
            horizontal
            scrollEnabled={false}
            // pagingEnabled
            bounces={false}
            // style={{borderWidth: 2, borderColor: 'blue'}}
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={({nativeEvent}) => {
              // Math.floor was wrong here. Screen width in dp is usually
              // fractional (1080px / 2.625 = 411.4285…), so after scrolling to
              // tab N the reported offset lands a hair BELOW N * width and
              // floor() rounded it down to N-1. This handler then scrolled back
              // to N-1 — the tab opened and immediately snapped to the previous
              // one, and whether it did depended on how the float error landed,
              // which is why only some tabs appeared to work.
              const landed = Math.round(nativeEvent.contentOffset.x / width);
              const clamped = Math.min(Math.max(landed, 0), data.length - 1);
              // Only react to a genuine change; re-issuing the same index
              // triggers another animated scroll and another momentum event.
              if (clamped !== activeIndex) {
                setActiveIndex(clamped);
              }
            }}
            renderItem={renderFullScreenItem}
            keyExtractor={item => item.id.toString()}
            // Every tab is exactly one screen wide, so declare the geometry
            // instead of letting the list measure it. Without this, scrolling to
            // a tab that had not been laid out yet clamped to the current
            // content width and stopped short of the requested tab.
            getItemLayout={(_d, i) => ({
              length: width,
              offset: width * i,
              index: i,
            })}
            // Only 7 tabs — keep them all mounted so switching is instant and
            // offsets stay correct.
            initialNumToRender={data.length}
            maxToRenderPerBatch={data.length}
            windowSize={data.length}
            removeClippedSubviews={false}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  fullScreenImage: {
    ...StyleSheet.absoluteFillObject,
  },
  thumbnailContentContainer: {
    paddingHorizontal: SPACING,
  },
  centreItem: {
    // borderWidth: 1,
  },
  enrolledUserStyles: {
    width: Metrix.HorizontalSize(55),
    height: Metrix.VerticalSize(20),
    position: 'relative',
    marginRight: Metrix.HorizontalSize(10),
    // borderWidth: 1,
  },
});
