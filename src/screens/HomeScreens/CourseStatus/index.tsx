import {
  Dimensions,
  FlatList,
  I18nManager,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {CourseStatusScreenProps, SearchProps} from '../../propTypes';
import {
  BackHeader,
  CustomImage,
  CustomModal,
  CustomText,
  MainContainer,
  PrimaryButton,
  RatingComponent,
  SecondaryButton,
  ToggleComponent,
} from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {t} from 'i18next';
import RNRestart from 'react-native-restart';
// import {AuthActions, HomeActions} from '../../../redux/actions';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../../../redux/reducers';
import {normalizeFont} from '../../../config/metrix';
import {ProgressBar} from 'react-native-paper';
import navigationService from '../../../config/navigationService';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {EmptyListComponent} from '../../../components/CourseCardsHorizontalList';
import {RootState} from '../HomeScreen';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;

export const CourseStatusScreen: React.FC<CourseStatusScreenProps> = ({
  route,
}) => {
  const myCourseStatus = useSelector(state => state?.CourseReducer?.mycourses);
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const {PointAndAmount} = route.params;
  console.log('PointAndAmount+++++++>>>', PointAndAmount);

  // const allCourses = myCourseStatus.enrolledCourse.concat(
  //   myCourseStatus.completedCourses,
  // );

  const allCourses =
    userData?.type == 'guest'
      ? []
      : [
          ...myCourseStatus?.enrolledCourse,
          ...myCourseStatus?.completedCourses,
        ];

console.log("allCourses=====>>>", allCourses);

        
  const renderItem = ({item, index}) => {
    console.log('Current item:', item?.courseDetails[0]?._id);
    const pointsEarnedValue = Math.ceil((item?.pointsEarned / 100) * 5);
    return (
      <View key={index}>
        <TouchableOpacity
          activeOpacity={PointAndAmount ? 0.5 : 0.5}
          onPress={() => {
            if (PointAndAmount == true) {
              navigationService.navigate(
                RouteNames.HomeRoutes.PointAndAmountScreen,
                {
                  ID: item?.courseId,
                },
              );
            } else {
              NavigationService.navigate(RouteNames.HomeRoutes.CourseDetails, {
                objectId:  item?.courseDetails[0]?._id,
              });
              console.log('PointAndAmount is false');
            }
          }}

          // onPress={() => {
          //   if (PointAndAmount == true) {
          //     navigationService.navigate(
          //       RouteNames.HomeRoutes.PointAndAmountScreen,
          //       {
          //         ID: item?.courseId,
          //       },
          //     );
          //   }
          // }}
        >
          <View style={styles.courseItemContainer}>
            <View style={styles.dotViewStyle}>
              <View>
                <CustomImage
                  customStyle={styles.dotImageStyle}
                  source={Images.GrayDot}
                />
              </View>
            </View>

            <View style={{width: screenWidth - Metrix.HorizontalSize(75)}}>
              <View style={styles.courseNameViewStyle}>
                <View style={{flexDirection: 'row'}}>
                  <CustomText.MediumText
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    customStyle={{
                      fontSize: FontType.FontRegular,
                      width: screenWidth - Metrix.HorizontalSize(185),
                    }}>
                    {item?.courseDetails[0]?.name}
                  </CustomText.MediumText>

                  {item?.isLocked ? (
                    <CustomImage
                      customStyle={styles.padlock}
                      source={Images.PadLock}
                    />
                  ) : (
                    <CustomImage
                      customStyle={styles.padlock}
                      source={Images.padunlock}
                    />
                  )}
                </View>
                <View>
                  <CustomText.MediumText
                    customStyle={{
                      fontSize: FontType.FontExtraSmall,
                    }}>
                    {item?.remainingDays
                      ? `${item?.remainingDays} ${t('ramaning_days')}`
                      : null}
                  </CustomText.MediumText>
                </View>
              </View>
              <View style={styles.authorViewStyle}>
                <CustomText.RegularText
                  customStyle={{
                    color: Utills.selectedThemeColors().LightGrayTextColor,
                    fontSize: normalizeFont(11),
                  }}>
                  {item?.instructorName}
                </CustomText.RegularText>
                <CustomText.MediumText customStyle={styles.levelStyle}>
                  {item?.courseDetails[0]?.category[0].name}
                </CustomText.MediumText>
              </View>
              <View style={styles.progressBarViewStyle}>
                <ProgressBar
                  style={styles.progressBarStyle}
                  progress={parseFloat(item?.progress) / 100 || 0}
                  color={Utills.selectedThemeColors().Primary}
                />
                {/* <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <CustomText.LargeSemiBoldText
                    customStyle={{
                      fontSize: FontType.FontExtraSmall,
                      color: Utills.selectedThemeColors().Primary,
                    }}>
                    {Math.floor(item?.progress)} /
                  </CustomText.LargeSemiBoldText>
                  <CustomText.LargeSemiBoldText
                    customStyle={{
                      fontSize: FontType.FontExtraSmall,
                      color: Utills.selectedThemeColors().Primary,
                    }}>
                    100%
                  </CustomText.LargeSemiBoldText>
                </View> */}
                <View>
                  {I18nManager.isRTL ? (
                    <CustomText.LargeSemiBoldText
                      customStyle={styles.fontStyles}>
                      100% /{' '}
                      {isNaN(item?.progress) ? '0' : Math.floor(item?.progress)}
                    </CustomText.LargeSemiBoldText>
                  ) : (
                    <CustomText.LargeSemiBoldText
                      customStyle={styles.fontStyles}>
                      {isNaN(item?.progress) ? '0' : Math.floor(item?.progress)}{' '}
                      / 100%
                    </CustomText.LargeSemiBoldText>
                  )}
                </View>
              </View>

              <View style={styles.rewardsPointsViewStyles}>
                <View style={{flexDirection: 'row'}}>
                  <CustomImage
                    customStyle={styles.likeStarImageStyle}
                    source={Images.LikeStar}
                  />
                  <View
                    style={{
                      paddingLeft: Metrix.HorizontalSize(7),
                      justifyContent: 'flex-end',
                    }}>
                    <CustomText.MediumText
                      style={{
                        fontSize: normalizeFont(13),
                      }}>
                      {t('reward_point')}
                      {/* {item?.pointsEarned} */}
                    </CustomText.MediumText>
                  </View>
                </View>

                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    // borderWidth: 1,
                  }}>
                  <Rating
                    ratingCount={1}
                    imageSize={17}
                    showReadOnlyText={false}
                    startingValue={
                      item?.pointsEarned?.length > 1
                        ? item?.pointsEarned / 100
                        : item?.pointsEarned / 10
                    }
                    readonly={true}
                  />
                  {/* <AirbnbRating
                    count={1}
                    showRating={false}
                    size={12}
                    isDisabled={true}
                    defaultRating={pointsEarnedValue}
                    // defaultRating={item?.pointsEarned}
                  /> */}
                  {/* <CustomImage
                    customStyle={styles.halfStarImageStyle}
                    source={Images.HalfStar}
                  /> */}

                  <CustomText.LargeSemiBoldText
                    customStyle={{
                      fontSize: FontType.FontSmall,
                      color: Utills.selectedThemeColors().Primary,
                    }}>
                    {item?.pointsEarned}
                  </CustomText.LargeSemiBoldText>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <BackHeader heading={t('course_status')} />
      <MainContainer>
        <FlatList
          data={allCourses}
          ListEmptyComponent={EmptyListComponent}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </MainContainer>
    </>
  );
};

interface SettingScreenStyles {}
const styles = StyleSheet.create({
  fontStyles: {
    fontSize: FontType.FontExtraSmall,
    color: Utills.selectedThemeColors().Primary,
  },
  dotViewStyle: {
    width: '5%',
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(18),
  },
  dotImageStyle: {
    width: 5,
    height: 5,
  },
  courseNameViewStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  levelStyle: {
    // borderWidth:1,
    marginTop: Metrix.VerticalSize(7),
    justifyContent: 'flex-end',
    color: Utills.selectedThemeColors().Primary,
    fontSize: FontType.FontExtraSmall,
  },
  progressBarViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '95%',
    justifyContent: 'space-between',
  },
  courseItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    // borderWidth:1,
    marginTop: Metrix.VerticalSize(10),
  },
  rewardsPointsViewStyles: {
    width: Metrix.HorizontalSize(190),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  likeStarImageStyle: {
    // borderWidth:1,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
    width: Metrix.HorizontalSize(30),
    height: Metrix.VerticalSize(30),
  },
  modalViewStyle: {
    alignSelf: 'center',
    borderRadius: 10,
    height: Metrix.VerticalSize(10),
    width: Metrix.HorizontalSize(140),
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
  modalTextStyle: {
    fontSize: normalizeFont(17),
    marginTop: Metrix.VerticalSize(10),
    textAlign: 'center',
  },
  padlock: {
    marginLeft: Metrix.HorizontalSize(10),
    width: Metrix.HorizontalSize(10),
    height: Metrix.VerticalSize(13),
  },
  authorViewStyle: {
    width: Metrix.HorizontalSize(200),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfStarImageStyle: {
    width: Metrix.HorizontalSize(18),
    height: Metrix.VerticalSize(16),
  },
  progressBarStyle: {
    borderRadius: 10,
    width: Metrix.HorizontalSize(205.883),
    height: Metrix.VerticalSize(9.12),
  },
});
