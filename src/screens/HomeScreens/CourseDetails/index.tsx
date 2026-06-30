import {
  Alert,
  I18nManager,
  ImageProps,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, { use, useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHeader,
  CourseCardsHorizontalList,
  CurriculumComponent,
  CustomImage,
  CustomText,
  DescriptionList,
  MainContainer,
  TxtDiscription,
  PrimaryButton,
  RatingComponent,
  RoundImageContainer,
  ScrollableContainer,
} from '../../../components';
import { CourseDetailsProps } from '../../propTypes';
import {
  FontType,
  Fonts,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import { t } from 'i18next';
import { CourseDescriptionComp } from '../../../components/CourseDescriptionComp';
import { useDispatch, useSelector } from 'react-redux';
import {
  GetAssiignment,
  QuizAndAssignmentData,
  course_ObjectData,
  getBonusMaterial,
  getCourseDetails,
  getCourseDetailsWithoutLoder,
  getProgressReport,
  likeAndUnlikeCourse,
  toggleFavorite,
  userEnrolled,
} from '../../../Redux/Action/HomeActions/homeActions';
import Share from 'react-native-share';
import navigationService from '../../../config/navigationService';
import WebView from 'react-native-webview';
import HTML, { Element } from 'react-native-render-html';
import utills from '../../../config/utills';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import { MyCourses } from '../../../Redux/Action/CourseAction/CourseAction';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { RootState } from '../HomeScreen';
import { showLoginPleaseModal } from '../../../Redux/Action/AuthActions/authActions';
import { useTranslation } from 'react-i18next';

const courseIcludesData = [
  // {
  //   id: '1',
  //   text: t('total_hours'),
  //   image: Images.VideoContent,
  // },
  {
    id: '2',
    text: t('supported_files'),
    image: Images.PageFileIcon,
  },
  {
    id: '3',
    text: t('full_time_access'),
    image: Images.InfinityIcon,
  },
  {
    id: '4',
    text: t('access_on_mobile_desktop'),
    image: Images.CrossPlatformIcon,
  },
  {
    id: '5',
    text: t('certificate_of_completion'),
    image: Images.CertificateIcon,
  },
];

export const TagsComp = ({
  item,
  customrenderItemContainer,
}: {
  item: { id: string; name: string };
  customrenderItemContainer?: ViewStyle;
}) => {
  return (
    <View style={[styles.renderItemContainer, customrenderItemContainer]}>
      <CustomText.ExtraSmallText
        customStyle={[
          {
            color: Utills.selectedThemeColors().Primary,
          },
        ]}
        isSecondaryColor
      >
        {item?.name}
      </CustomText.ExtraSmallText>
    </View>
  );
};

export type InstructDetailType = {
  name?: string;
  price?: number;
  paid?: boolean;
  profilePic?: string;
  expertise?: string;
  education?: string;
};

interface MyData {
  courseMedia?: string;
  intro?: string;
  name?: string;
  courseCategory: [];
  avgRating: number;
  rating: number;
  totalReviews: number;
  numOfEnrolled: number;
  isFavourite: boolean;
  totalStudents: number;
  instructorDetails: InstructDetailType;
  objectives: [];
  courseReviews: [];
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ ...props }) => {
  const scrollRef = useRef(null);
  const dispatch = useDispatch();
  const FOCUS = useIsFocused();
  const { t, i18n } = useTranslation();
  const currentLanguage = { t, i18n };
  const isArabic = currentLanguage?.i18n?.language;

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const courseList = useSelector(state => state?.HomeReducer?.courseList);
  const ID = props?.route?.params?.objectId;

  const [courseDetailData, setCourseDetailData] = useState({});
  // console.log("========>>>>>", courseDetailData?.courseCategory)

  const [loading, setloading] = useState(false);

  useEffect(() => {
    if (FOCUS) {
      fetchData(ID);
    }
  }, [FOCUS]);
  const htmlContent = courseDetailData?.description;

  const fetchData = async (_id: string) => {
    let res = await dispatch(getCourseDetails(_id));
    // console.log('ASDasdadd', res?.responseData?.enrolledStudents);
    let data = res?.responseData;
    let object = {
      discountedPrice: JSON.stringify(data?.discountedPrice),
      name: data?.name,
      price: data?.price,
      _id: data?._id,
      sections: data?.sections,
      courseReviews: data?.courseReviews,
      media: data?.media,
      instructorID: data?.instructorID,
      totalReviews: data?.totalReviews,
      totalStudents: data?.totalStudents,
      enrolledStudents: data?.enrolledStudents,
      instructorDetails: data?.instructorDetails,
      vatDiscount: data?.vatTax,
    };
    dispatch(course_ObjectData(object));
    setCourseDetailData(res?.responseData);
    return;
  };

  const fetchDatawithoutLoader = async (_id: string) => {
    let res = await dispatch(getCourseDetailsWithoutLoder(_id));
    console.log('ASDasdadd', res);
    let data = res?.responseData;
    let object = {
      discountedPrice: JSON.stringify(data?.discountedPrice),
      name: data?.name,
      price: data?.price,
      _id: data?._id,
      sections: data?.sections,
      courseReviews: data?.courseReviews,
      media: data?.media,
      instructorID: data?.instructorID,
      totalReviews: data?.totalReviews,
      totalStudents: data?.totalStudents,
      enrolledStudents: data?.enrolledStudents,
      instructorDetails: data?.instructorDetails,
      vatDiscount: data?.vatTax,
    };
    dispatch(course_ObjectData(object));
    setCourseDetailData(res?.responseData);
    return;
  };

  async function getQuizes() {
    let res = await dispatch(QuizAndAssignmentData(ID));

    if (res?.status) {
      dispatch({
        type: ActionType.QUIZ_AND_ASSIGNMET_DATA,
        payload: res?.responseData,
      });
    }
    return res.status;
  }

  async function getAssignment() {
    let res = await dispatch(GetAssiignment(ID));

    if (res?.status) {
      dispatch({
        type: ActionType.ASSIGNMENT_DATA,
        payload: res?.data,
      });
    }
    return res.status;
  }

  async function bonusMaterialData() {
    let res = await dispatch(getBonusMaterial(ID));

    if (res?.status) {
      dispatch({
        type: ActionType.GET_BONUS,
        payload: res?.responseData,
      });
    }
    return res.status;
  }

  async function ProgressReportData() {
    let res = await dispatch(getProgressReport(ID));
    if (res?.staus) {
      dispatch({
        type: ActionType.PROGRESS_REPORT,
        payload: res?.data,
      });
    }
    return res.staus;
  }

  async function fetchMyCourses() {
    if (userData?.type == 'guest') {
      //guest user not enrolled directly see the course
      return true;
    }

    let res = await dispatch(MyCourses());

    if (res?.status) {
      dispatch({
        type: ActionType.MY_COURSES,
        payload: res?.responseData,
      });
    }
    return res.status;
  }

  const NavigateToCourseDetail = async () => {
    if (courseDetailData?.locked) {
      Alert.alert(
        'Course Access Denied', // New heading
        'You cannot access this course because the time duration has been completed.',
      );
      return;
    }

    try {
      setloading(true);
      dispatch({ type: ActionType.HOME_LOADER, payload: true });
      const promise1 = getQuizes();
      const promise2 = getAssignment();
      const promise3 = bonusMaterialData();
      const promise4 = ProgressReportData();
      const promise5 = fetchMyCourses();

      await Promise.all([
        promise1,
        promise2,
        promise3,
        promise4,
        promise5,
      ]).then(res => {
        dispatch({ type: ActionType.HOME_LOADER, payload: false });
        if (res.every(element => element === true)) {
          NavigationService.navigate(
            RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
            {
              movetoIndex: 0,
              movetoCourseDetail: true,
            },
          );
          setloading(false);
        } else {
          setloading(false);
          Utills.showToast('Server Error', '', 'error');
        }
      });
    } catch (error) {
      dispatch({ type: ActionType.HOME_LOADER, payload: false });
      setloading(false);
      Utills.showToast(error, '', 'error');
    }
  };

  async function userEnrolledInToCourse() {
    if (userData?.type == 'guest') {
      //guest user not enrolled directly see the course
      NavigateToCourseDetail();
      return;
    }

    let res = await dispatch(userEnrolled(courseDetailData?._id));
    if (res?.status) {
      NavigateToCourseDetail();
    }
  }

  const handlePurcahse = () => {
    console.log('userData');
    // return
    if (courseDetailData?.isEnrolled) {
      //if enrolled so course detail
      NavigateToCourseDetail();
    } else if (!courseDetailData?.isEnrolled && courseDetailData?.price != 0) {
      //if not enrolled so do payment
      NavigationService.navigate(RouteNames.HomeRoutes.PaymentScreen, {
        courseData: courseDetailData?.courseCategory,
      });
    } else if (courseDetailData?.price == 0 && !courseDetailData?.isEnrolled) {
      //if free course so enrolled and navigate to course detail
      userEnrolledInToCourse();
    }
  };

  function education(txt: string, top: number, image: any) {
    return (
      <View style={[styles.centredItem, { marginTop: top }]}>
        <CustomImage
          // source={Images.CircleCheck}
          source={image}
          customStyle={{ width: 20, height: 20 }}
        />
        <CustomText.RegularText
          customStyle={{
            width: '94%',
            marginLeft: Metrix.VerticalSize(5),
            marginTop: Metrix.VerticalSize(4),
          }}
        >
          {txt}
        </CustomText.RegularText>
      </View>
    );
  }

  function renderUpdatedDate(img, txt) {
    return (
      <View style={[styles.centredItem]}>
        <CustomImage source={img} customStyle={[{ width: '5%' }]} />
        <CustomText.RegularText
          customStyle={[
            {
              width: '94%',
              marginLeft: Metrix.VerticalSize(5),
              marginTop: Metrix.VerticalSize(4),
            },
          ]}
        >
          {txt}
        </CustomText.RegularText>
      </View>
    );
  }

  async function courselikeAndUnlike(ID_course: any) {
    let payload = {
      courseID: ID_course,
    };
    // setcourseDetailDataLikeStatus(!courseDetailDataLikeStatus);
    let res = await dispatch(likeAndUnlikeCourse(payload));
    if (res?.status) {
      dispatch(toggleFavorite('popularCourses', ID_course));
      dispatch(toggleFavorite('trendingCourses', ID_course));
      dispatch(toggleFavorite('newCourses', ID_course));
      dispatch(toggleFavorite('recommendedCourses', ID_course));
      fetchDatawithoutLoader(ID);
    }
  }

  const MyComponent = ({ someData }) => {
    // Your component logic using someData

    const date = utills?.timeHumanize(courseDetailData?.updatedAt);
    console.log('==>>date', courseDetailData?.language);

    return (
      <View>
        {/* For Tags */}
        <View style={styles.tagsContainer}>
          {someData?.courseCategory &&
            someData?.courseCategory?.map(item => (
              <TagsComp item={item} key={item?.id} />
            ))}
        </View>
        {/* For Rating */}
        <RatingComponent
          // rating={3}
          editable={true}
          avgRating={someData?.avgRating}
          totalReviews={someData?.totalReviews}
          numOfEnrolled={` ${someData?.totalStudents} ${t('enroll')} `}
          enrolledUsers={someData?.enrolledStudentsWithProfilePic}
          isEnrolled={true}
        />

        {renderUpdatedDate(
          Images.InfoIcon,
          t('last_updated') +
            ` ${utills?.timeHumanize(courseDetailData?.updatedAt)}`,
        )}
        {renderUpdatedDate(Images.WorldIcon, courseDetailData?.language)}
        {renderUpdatedDate(
          Images.CaptionIcon,
          courseDetailData?.subtitles ? `English, Arabic` : `English`,
        )}
      </View>
    );
  };

  const memoizedComponent = useMemo(
    () => <MyComponent someData={courseDetailData} />,
    [courseDetailData?.totalStudents],
  );

  const navigate = useNavigation();

  return (
    <View style={{ flex: 1, position: 'relative' }}>
      <BackHeader
        heading={t('course_detail')}
        backFunction={() => {
          NavigationService.replace(RouteNames.HomeRoutes.DrawerStack);
        }}
      />
      <ScrollView
        ref={scrollRef.current?.scrollTo({ y: 0, animated: true })}
        barBg={Utills.selectedThemeColors().Primary}
        customeStyle={{
          marginVertical: 0,
          // marginTop: Metrix.VerticalSize(10),
          paddingHorizontal: 0,
        }}
        barStyle="light-content"
      >
        {/* Course Video Section */}
        <View style={{ height: Metrix.VerticalSize(170) }}>
          <CustomImage
            source={{ uri: courseDetailData?.courseMedia }}
            customStyle={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        </View>
        <View
          style={{
            paddingHorizontal: Metrix.HorizontalSize(20),
            marginTop: Metrix.VerticalSize(10),
            // borderWidth:1
          }}
        >
          {/* Top Details Course Section */}
          <View>
            <CourseDescriptionComp
              // heading="Basic of UI/UX Designer"
              heading={courseDetailData?.name}
              onPress={() => {
                courselikeAndUnlike(courseDetailData?._id);
              }}
              subHeading={courseDetailData?.intro}
              // image={Images.CardHeartImage}
              image={
                courseDetailData?.isFavourite
                  ? Images.CardHeartImage
                  : Images.HeartEmpty
              }
            />
            {memoizedComponent}
          </View>

          {/* Course Price Section */}
          <View
            style={{
              marginTop: Metrix.VerticalSize(10),
            }}
          >
            {courseDetailData?.price ? (
              courseDetailData?.isEnrolled ? (
                <PrimaryButton
                  isLoading={loading}
                  title={t('go_to_course')}
                  onPress={handlePurcahse}
                />
              ) : (
                <>
                  <View
                    style={[
                      styles.spaceBetweenStyles,
                      { alignItems: 'flex-end', justifyContent: 'flex-start' },
                    ]}
                  >
                    <CustomText.LargeBoldText
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      customStyle={{
                        color: Utills.selectedThemeColors().Primary,
                        fontSize: Metrix.customFontSize(24),
                        maxWidth: '70%',
                      }}
                    >
                      {isArabic
                        ? `${
                            Math.round(
                              (courseDetailData?.price -
                                (courseDetailData?.price *
                                  courseDetailData?.discountedPrice) /
                                  100) *
                                10,
                            ) / 10
                          } ${t('sar')}`
                        : `${t('sar')} ${
                            Math.round(
                              (courseDetailData?.price -
                                (courseDetailData?.price *
                                  courseDetailData?.discountedPrice) /
                                  100) *
                                10,
                            ) / 10
                          }`}
                    </CustomText.LargeBoldText>
                    {courseDetailData?.discounted ? (
                      <CustomText.SmallText
                        isSecondaryColor
                        ellipsizeMode="tail"
                        numberOfLines={1}
                        customStyle={{
                          textDecorationLine: 'line-through',
                          alignSelf: 'flex-end',
                          marginLeft: Metrix.HorizontalSize(5),
                          maxWidth: '30%',
                        }}
                      >
                        {courseDetailData?.price}
                      </CustomText.SmallText>
                    ) : null}
                  </View>
                  <PrimaryButton
                    title={t('buy_now')}
                    onPress={handlePurcahse}
                  />
                </>
              )
            ) : (
              <>
                {courseDetailData?.price ? null : (
                  <>
                    {courseDetailData?.isEnrolled ? (
                      <PrimaryButton
                        title={t('go_to_course')}
                        onPress={handlePurcahse}
                      />
                    ) : null}
                  </>
                )}
              </>
            )}
          </View>

          {/* What will user learn section */}
          <TxtDiscription
            heading={t('What_youll_learn')}
            listData={courseDetailData?.objectives}
          />

          {/* What will be includes in course section */}
          <DescriptionList
            heading={t('this_course_includes')}
            listData={courseIcludesData}
            listTextStyle={{
              fontSize: FontType.FontSmall,
              marginTop: 0,
              marginLeft: Metrix.HorizontalSize(7),
            }}
            listContainerStyle={{
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(8),
            }}
            imageStyle={{
              height: Metrix.VerticalSize(14),
            }}
          />
          {/* Descrition Section */}
          <CourseDescriptionComp
            heading={t('description')}
            // subHeading={<HTML source={{html: htmlContent}} />}
            subHeading={courseDetailData?.alt_description}
            headingStyles={{
              fontSize: FontType.FontRegular,
              fontFamily: Fonts['Semi-Bold'],
            }}
            textContainerStyle={{
              // borderWidth:1,
              marginTop: Metrix.VerticalSize(20),
            }}
          />
          {/* Course  Curriculum  Section*/}
          {/* {userData?.type == 'guest' || courseDetailData?.paid  ? null : */}

          {courseDetailData?.isEnrolled ? (
            <View style={{ marginTop: Metrix.VerticalSize(20) }}>
              <CustomText.LargeSemiBoldText
                customStyle={{
                  fontSize: Metrix.customFontSize(14),
                  marginBottom: Metrix.VerticalSize(10),
                }}
              >
                {t('curriculum')}
              </CustomText.LargeSemiBoldText>
              {courseDetailData?.sections &&
                courseDetailData?.sections?.map((item, index) => (
                  <CurriculumComponent
                    movetoCourseDetail={'back'}
                    item={item}
                    key={item?.id}
                    index={index}
                  />
                ))}
            </View>
          ) : null}

          {courseDetailData?.recommendedCourses && (
            <View style={{ marginTop: Metrix.VerticalSize(20) }}>
              <CourseCardsHorizontalList
                onHeartBtnPress={courselikeAndUnlike}
                courseData={courseDetailData?.recommendedCourses}
                heading={t('recommended_courses')}
                onPressCoursesBtn={() => {
                  NavigationService.navigate(
                    RouteNames.HomeRoutes.AllCourseScreen,
                    {
                      screenName: t('recommended_courses'), // Pass the heading dynamically
                      key: 'recommended',
                      courseDetailData: courseDetailData, // Pass the courseDetailData object
                    },
                  );
                }}
                isHorizontal={false}
              />
            </View>
          )}

          {/* Instructor Details Section */}
          <View>
            <CustomText.LargeSemiBoldText
              customStyle={{ fontSize: FontType.FontRegular }}
            >
              {t('instructor')}
            </CustomText.LargeSemiBoldText>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: Metrix.VerticalSize(10),
              }}
            >
              <RoundImageContainer
                source={{
                  uri: courseDetailData?.instructorDetails?.profilePic,
                }}
                circleWidth={50}
              />
              <View style={{ marginLeft: Metrix.VerticalSize(10) }}>
                <CustomText.LargeBoldText
                  customStyle={{
                    fontSize: FontType.FontRegular,
                    color: Utills.selectedThemeColors().Primary,
                  }}
                >
                  {courseDetailData?.instructorDetails?.name}
                </CustomText.LargeBoldText>
                <CustomText.ExtraSmallText>
                  {courseDetailData?.instructorDetails?.expertise}
                </CustomText.ExtraSmallText>
              </View>
            </View>
            <CustomText.RegularText>
              {courseDetailData?.instructorDetails?.description}
              {/* {<HTML source={{html: htmlContent}} />} */}
            </CustomText.RegularText>

            {education(
              courseDetailData?.instructorDetails?.education,
              20,
              Images.gradhat,
            )}

            {/* {courseDetailData?.instructorDetails?.awardWinner
              ? education(t('award_winner'), 15, Images.AwardIcon)
              : null} */}
          </View>
          {/* Student Feedback Section  */}
          <View style={{ marginTop: Metrix.VerticalSize(20) }}>
            {/* <CustomText.LargeSemiBoldText
              customStyle={{fontSize: FontType.FontRegular}}>
              {t('student_feedback')}
            </CustomText.LargeSemiBoldText> */}
            <View style={styles.studentFeedbackContainer}>
              <CustomImage
                source={Images.ThreeStars}
                customStyle={{
                  height: Metrix.VerticalSize(25),
                  width: Metrix.HorizontalSize(50),
                }}
              />
              <CustomText.LargeSemiBoldText
                customStyle={{ fontSize: FontType.FontRegular }}
              >
                {`${Math.round(courseDetailData?.avgRating)} ${t(
                  'course_rating',
                )}`}
              </CustomText.LargeSemiBoldText>
              {courseDetailData?.courseReviews &&
                courseDetailData?.courseReviews?.slice(0, 4)?.map(item => (
                  // {studentFeedbackData && studentFeedbackData?.map(item => (
                  <CourseDescriptionComp
                    key={item?.id}
                    heading={item?.studentName}
                    subHeading={item?.description}
                    date={utills?.timeHumanize(item?.createdAt)}
                    textContainerStyle={{
                      width: '100%',
                    }}
                    headingStyles={{
                      fontSize: FontType.FontSmall,
                      color: Utills.selectedThemeColors().Primary,
                    }}
                    mainContainerStyle={{
                      marginTop: Metrix.VerticalSize(20),
                    }}
                  />
                ))}

              {courseDetailData?.courseReviews?.length ? (
                <TouchableOpacity
                  onPress={() =>
                    navigationService.navigate(
                      RouteNames.HomeRoutes.CourseRating,
                    )
                  }
                  activeOpacity={0.5}
                  style={{
                    marginTop: Metrix.VerticalSize(10),
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <CustomText.LargeSemiBoldText
                    customStyle={{
                      fontSize: FontType.FontSmall,
                      color: Utills.selectedThemeColors().Primary,
                      marginRight: Metrix.VerticalSize(10),
                    }}
                  >
                    {t('read_more')}
                  </CustomText.LargeSemiBoldText>
                  <CustomImage
                    source={Images.ArrowDown}
                    customStyle={{
                      tintColor: Utills.selectedThemeColors().Primary,
                      width: Metrix.customImageSize(14),
                      height: Metrix.customImageSize(14),
                    }}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Buy Course section */}

      {/* {!courseDetailData?.isEnrolled && (
  <View style={[styles.spaceBetweenStyles, styles.buyCourseContainerStyle]}>
    <View style={{height: '100%'}}>
      <CustomText.RegularText isSecondaryColor>
        {t('price')}
      </CustomText.RegularText>
      <View
        style={[
          styles.spaceBetweenStyles,
          { alignItems: 'flex-end' },
        ]}
      >
        <CustomText.LargeBoldText
          customStyle={{
            color: Utills.selectedThemeColors().Primary,
            fontSize: Metrix.customFontSize(24),
          }}
        >
          {courseDetailData?.price
            ? `${t('sar')} ${courseDetailData?.discountedPrice}`
            : `${t('free')}`}
        </CustomText.LargeBoldText>
      </View>
    </View>
    <PrimaryButton
      title={t('register')}
      customStyles={{ width: '25%' }}
      onPress={handlePurcahse}
    />
  </View>
)} */}

      {courseDetailData?.isEnrolled ? null : (
        <View
          style={[styles.spaceBetweenStyles, styles.buyCourseContainerStyle]}
        >
          <View style={{ height: '100%' }}>
            <CustomText.RegularText isSecondaryColor>
              {t('prise')}
            </CustomText.RegularText>
            {courseDetailData?.price ? (
              <View
                style={[
                  styles.spaceBetweenStyles,
                  {
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <CustomText.LargeBoldText
                  customStyle={{
                    color: Utills.selectedThemeColors().Primary,
                    fontSize: Metrix.customFontSize(24),
                  }}
                >
                  {isArabic
                    ? `${
                        Math.round(
                          (courseDetailData?.price -
                            (courseDetailData?.price *
                              courseDetailData?.discountedPrice) /
                              100) *
                            10,
                        ) / 10
                      } ${t('sar')}`
                    : `${t('sar')} ${
                        Math.round(
                          (courseDetailData?.price -
                            (courseDetailData?.price *
                              courseDetailData?.discountedPrice) /
                              100) *
                            10,
                        ) / 10
                      }`}
                </CustomText.LargeBoldText>

                {courseDetailData?.discounted ? (
                  <CustomText.SmallText
                    isSecondaryColor
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    customStyle={{
                      textDecorationLine: 'line-through',
                      alignSelf: 'flex-end',
                      marginLeft: Metrix.HorizontalSize(5),
                      maxWidth: '30%',
                    }}
                  >
                    {courseDetailData?.price}
                  </CustomText.SmallText>
                ) : null}
              </View>
            ) : (
              <View
                style={[
                  styles.spaceBetweenStyles,
                  {
                    alignItems: 'flex-end',
                  },
                ]}
              >
                <CustomText.LargeBoldText
                  customStyle={{
                    color: Utills.selectedThemeColors().Primary,
                    fontSize: Metrix.customFontSize(24),
                  }}
                >
                  {`${t('sar')} ${'0'} `}
                </CustomText.LargeBoldText>
              </View>
            )}
          </View>
          <PrimaryButton
            title={courseDetailData?.price ? t('register') : t('go_to_course')}
            customStyles={{ width: courseDetailData?.price ? '25%' : '60%' }}
            onPress={handlePurcahse}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centredItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  likeBtn: {
    // borderWidth: 1,
    borderRadius: Metrix.VerticalSize(50),
    backgroundColor: Utills.selectedThemeColors().Primary,
    height: Metrix.VerticalSize(25),
    width: Metrix.HorizontalSize(25),
  },
  renderItemContainer: {
    // borderWidth: 1,
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingVertical: Metrix.VerticalSize(7),
    marginRight: Metrix.HorizontalSize(7),
    marginBottom: Metrix.HorizontalSize(7),
    borderRadius: Metrix.VerticalSize(20),
    backgroundColor: '#F3FBFE',
  },
  tagsContainer: {
    // borderWidth: 1,
    marginTop: Metrix.VerticalSize(7),
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
  },
  studentFeedbackContainer: {
    // borderWidth: 1,
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
  spaceBetweenStyles: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buyCourseContainerStyle: {
    // position: 'absolute',
    // bottom: 0,
    width: '100%',
    paddingVertical: Metrix.VerticalSize(10),
    paddingHorizontal: Metrix.HorizontalSize(25),
    backgroundColor: Utills.selectedThemeColors().Base,
    ...Metrix.createShadow,
  },
});
