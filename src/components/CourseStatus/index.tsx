import {
  Dimensions,
  FlatList,
  I18nManager,
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FontType, Images, Metrix, RouteNames, Utills} from '../../config';
import {CustomImage, CustomText, RatingComponent} from '..';
import {ProgressBar, customText} from 'react-native-paper';
import {normalizeFont} from '../../config/metrix';
import utills from '../../config/utills';
import CircularProgress from 'react-native-circular-progress-indicator';
import {color} from 'react-native-reanimated';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../screens/HomeScreens/HomeScreen';
import navigationService from '../../config/navigationService';
import {AirbnbRating, Rating} from 'react-native-ratings';
import {EmptyListComponent} from '../CourseCardsHorizontalList';

type CourseStatus = {
  heading?: string;
  subheading?: string;
  onPress?: () => void;
};

type CourseStatusItem = {
  courseName: string;
  image: string;
  remaining: string;
  authorName: string;
  level: string;
  rewardPoints: string;
  points: string;
  likeStar: string;
  halfStar: string;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;

export const CourseStatus: React.FC<CourseStatusProps> = ({allCourses}) => {
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const myCourseStatus = useSelector(state => state?.CourseReducer?.mycourses);

  console.log('myCourseStatus???', myCourseStatus);

  // console.log(
  //   'overallPointProgress=======>>',
  //   myCourseStatus?.overallPointProgress,
  // );

  // {item?.courseDetails[0]?.name}
  // const CourseStatus = [
  //   {
  //     courseName: 'Computer Science',
  //     image: Images.PadLock,
  //     remaning: '80 days remaining',
  //     authorName: 'By Sarah Adam',
  //     level: 'Science',
  //     rewardspoints: t('rewards_points'),
  //     points: '35 SAR',
  //     likestar: Images.LikeStar,
  //     halfstar: Images.HalfStar,
  //   },
  //   {
  //     courseName: 'Computer Science',
  //     image: Images.PadLock,
  //     remaning: '80 days remaining',
  //     authorName: 'By Sarah Adam',
  //     level: 'Science',
  //     rewardspoints: t('rewards_points'),
  //     points: '35 SAR',
  //     likestar: Images.LikeStar,
  //     halfstar: Images.HalfStar,
  //   },
  // ];

  const renderItem = ({item}) => (
    // const pointsEarnedValue = Math.ceil((item?.pointsEarned / 100) * 5);
    // console.log('render item===========>>>>>>>', item),
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
          <View style={{flexDirection: 'row',}}>
            <CustomText.MediumText
              numberOfLines={1}
              ellipsizeMode="tail"
              customStyle={{
                fontSize: FontType.FontRegular,
                width: screenWidth - Metrix.HorizontalSize(200),
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
          <View
          style={{
            // borderWidth:1,
            // paddingHorizontal: Metrix.HorizontalSize(5),
          }}
          >
            <CustomText.MediumText
              customStyle={{
                fontSize: FontType.FontExtraSmall,
              }}>
              {item?.remainingDays
                ? `${item?.remainingDays} ${t('ramaning_days')}`
                : null}
              {/* {item.remaning} */}
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
        {/* <View style={{flexDirection: 'row'}}>
          <View style={styles.progressBarViewStyle}>
            <ProgressBar
              style={styles.progressBarStyle}
              progress={0.5}
              color={Utills.selectedThemeColors().Primary}
            />
            <View style={{flexDirection: 'row'}}>
              <CustomText.LargeSemiBoldText
                customStyle={{
                  fontSize: FontType.FontExtraSmall,
                }}>
                10 /
              </CustomText.LargeSemiBoldText>
              <CustomText.LargeSemiBoldText
                customStyle={{
                  fontSize: FontType.FontExtraSmall,
                }}>
                <CustomText.LargeSemiBoldText
                  customStyle={{
                    color: Utills.selectedThemeColors().Primary,
                    fontSize: FontType.FontExtraSmall,
                  }}>
                  100%
                </CustomText.LargeSemiBoldText>
              </CustomText.LargeSemiBoldText>
            </View>
          </View>
        </View> */}
        <View style={styles.progressBarViewStyle}>
          <ProgressBar
            style={styles.progressBarStyle}
            progress={parseFloat(item?.progress) / 100 || 0}
            color={Utills.selectedThemeColors().Primary}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
            }}>
            {I18nManager.isRTL ? (
              <CustomText.LargeSemiBoldText customStyle={styles.fontStyles}>
                100% /{' '}
                {isNaN(item?.progress) ? '0' : Math.floor(item?.progress)}
              </CustomText.LargeSemiBoldText>
            ) : (
              <CustomText.LargeSemiBoldText customStyle={styles.fontStyles}>
                {isNaN(item?.progress) ? '0' : Math.floor(item?.progress)} /
                100%
              </CustomText.LargeSemiBoldText>
            )}
            {/* <CustomText.LargeSemiBoldText
                customStyle={{
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  fontSize: FontType.FontExtraSmall,
                  color: Utills.selectedThemeColors().Primary,
                }}>
                {Math.floor(item?.progress)} /
              </CustomText.LargeSemiBoldText>
              <CustomText.LargeSemiBoldText
                customStyle={{
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  fontSize: FontType.FontExtraSmall,
                  color: Utills.selectedThemeColors().Primary,
                }}>
                100 %
              </CustomText.LargeSemiBoldText> */}
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
              </CustomText.MediumText>
            </View>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            {/* <AirbnbRating
              count={1}
              showRating={false}
              size={15}
              isDisabled={true}
              // defaultRating={(item?.pointsEarned / 100) * 100}
              // defaultRating={30}
            /> */}

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

            {/* <RatingComponent
              editable={true}
              rating={0} 
              // avgRating={courseDetailData?.avgRating}
              // totalReviews={courseDetailData?.totalReviews}
              // numOfEnrolled={` ${courseDetailData?.totalStudents} ${t(
              //   'enroll'
              // )} `}
              // enrolledUsers={courseDetailData?.enrolledStudents}
              // isEnrolled={true}
              // rating={false}
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
  );

  return (
    <View style={styles.backgroundPrimaryView}>
      <View>
        <CustomText.LargeBoldText customStyle={styles.mainHeadingStyle}>
          {userData?.name}
        </CustomText.LargeBoldText>
        <View
          style={{
            // borderWidth:1,
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(10),
          }}>
          <CircularProgress
            // value={86}
            value={myCourseStatus?.overallPointProgress || 0}
            radius={30}
            inActiveStrokeColor={Utills.selectedThemeColors().Base}
            activeStrokeColor={Utills.selectedThemeColors().TertiaryTextColor}
            activeStrokeWidth={Metrix.VerticalSize(2)}
            inActiveStrokeWidth={Metrix.VerticalSize(2)}
            inActiveStrokeOpacity={0.2}
            progressValueColor={Utills.selectedThemeColors().Base}
            progressValueStyle={{
              color: Utills.selectedThemeColors().TertiaryTextColor,
            }}
            valueSuffix={'%'}
          />
          <CustomText.MediumText
            customStyle={{
              fontSize: FontType.FontSmall,
              marginTop: Metrix.VerticalSize(5),
              color: Utills.selectedThemeColors().Base,
            }}>
            {t('point_progress')}
          </CustomText.MediumText>
        </View>

        <View style={styles.courseStatusStyle}>
          <View style={styles.courseViewStyle}>
            <CustomText.LargeBoldText customStyle={styles.courseHeadingStyle}>
              {t('course_status')}
            </CustomText.LargeBoldText>

            <View>
              <CustomImage
                customStyle={styles.alertImageStyle}
                source={Images.Alert}
              />
            </View>
          </View>
          <FlatList
            ListEmptyComponent={EmptyListComponent}
            data={allCourses.slice(0, 2)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />

          {allCourses.length ? (
            <TouchableOpacity
              onPress={() => {
                navigationService.navigate(
                  RouteNames.HomeRoutes.CourseStatusScreen,
                  {PointAndAmount: false},
                );
              }}
              activeOpacity={0.6}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: Metrix.VerticalSize(10),
              }}>
              <CustomText.MediumText
                style={{
                  color: Utills.selectedThemeColors().Primary,
                }}>
                {t('show_more')}
              </CustomText.MediumText>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundPrimaryView: {
    justifyContent: 'space-between',
    paddingVertical: Metrix.VerticalSize(15),
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
  mainHeadingStyle: {
    textAlign: 'center',
    color: Utills.selectedThemeColors().Base,
  },
  courseStatusStyle: {
    // borderWidth: 1,
    width: '90%',
    borderRadius: 13,
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(10),
    paddingBottom: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(10),
    backgroundColor: Utills.selectedThemeColors().Base,
  },
  courseViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(5),
  },
  courseHeadingStyle: {
    textAlign: 'center',
    width: '95%',
    color: Utills.selectedThemeColors().Primary,
  },
  alertImageStyle: {
    width: 16,
    height: 16,
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
    // borderWidth:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  levelStyle: {
    //   borderWidth:1,
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
  progressBarStyle: {
    borderRadius: 10,
    width: Metrix.HorizontalSize(205.883),
    height: Metrix.VerticalSize(9.12),
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
  halfStarImageStyle: {
    width: Metrix.HorizontalSize(18),
    height: Metrix.VerticalSize(16),
  },
  courseItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    // borderWidth: 1,
  },
  fontStyles: {
    fontSize: FontType.FontExtraSmall,
    color: Utills.selectedThemeColors().Primary,
  },
});
