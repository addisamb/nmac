import {
  FlatList,
  I18nManager,
  ImageProps,
  StyleSheet,
  TextInput,
  RefreshControl,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {CoursesProps} from '../../propTypes';
import {
  CustomImage,
  CustomSearchBar,
  CustomText,
  FadeInImage,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {t} from 'i18next';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {ProgressBar} from 'react-native-paper';
import {NavigationScreen} from '../NavigationScreen';
import {useDispatch, useSelector} from 'react-redux';
import {MyCourses} from '../../../Redux/Action/CourseAction/CourseAction';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import {useIsFocused} from '@react-navigation/native';
import {EmptyListComponent} from '../../../components/CourseCardsHorizontalList';
import navigationService from '../../../config/navigationService';

const inProgressCourses = [
  {
    id: '1',
    image: Images.Course1,
    heading: 'Understand what Design Thinking is all about',
    subHeading: 'Description: All can be perfect in math',
    progressInPercent: 0.1,
  },
  {
    id: '2',
    image: Images.Course1,
    heading: 'Understand what Design Thinking is all about',
    subHeading: 'Description: All can be perfect in math',
    progressInPercent: 0.5,
  },
  {
    id: '3',
    image: Images.Course1,
    heading: 'Understand what Design Thinking is all about',
    subHeading: 'Description: All can be perfect in math',
    progressInPercent: 0.9,
  },
  {
    id: '4',
    image: Images.Course1,
    heading: 'Understand what Design Thinking is all about',
    subHeading: 'Description: All can be perfect in math',
    progressInPercent: 0.7,
  },
];
const completedCourses = [
  {
    id: '1',
    image: Images.Course1,
    heading: 'Understand what Design Thinking is all about',
    subHeading: 'Description: All can be perfect in math',
    progressInPercent: 1,
  },
  {
    id: '2',
    image: Images.Course1,
    heading: 'Understand what Design Thinking is all about',
    subHeading: 'Description: All can be perfect in math',
    progressInPercent: 1,
  },
];

export type MyCoursesDataTypes = {
  // id: string;
  // image: ImageProps['source'];
  // heading: string;
  // subHeading: string;
  progressInPercent: number;
  name: string;
  intro: string;
  media: ImageProps['source'];
  progress: any;
};

export const MyCourseCard = ({item}: {item: MyCoursesDataTypes}) => {
  // export const MyCourseCard = (item) => {
  // console.log(
  //   '========?=======>>',
  //   item?.courseDetails[0]?._id
  // item?.courseDetails[0]?.media,
  // item?.courseDetails[0]?.name,
  // item?.courseDetails[0]?.intro,
  // item?.progress,
  // );

  let updatedProgress = Math.floor(item?.progress);
  let divideRes = updatedProgress / 100;

  return (
    <TouchableOpacity
      onPress={() =>
        NavigationService.navigate(RouteNames.HomeRoutes.CourseDetails, {
          objectId: item?.courseDetails[0]?._id,
        })
      }
      activeOpacity={0.7}
      style={[styles.cardContainer, styles.flexStyle]}>
      <View style={styles.cardImage}>
        <FadeInImage
          source={{uri: item?.courseDetails[0]?.media?.path}}
          customImageContainerStyle={{width: '100%', height: '100%'}}
          resizeMode="cover"
        />
      </View>
      <View style={styles.cardDetailsContainer}>
        <View
          style={[styles.flexStyle, {width: '100%', alignItems: 'flex-start'}]}>
          <View style={{width: '90%'}}>
            <CustomText.LargeBoldText
              ellipsizeMode="tail"
              numberOfLines={2}
              customStyle={[
                styles.fontStylesBlack,
                {
                  marginBottom: Metrix.VerticalSize(4),
                },
              ]}>
              {/* {name || ''} */}
              {item.courseDetails[0]?.name || ''}
            </CustomText.LargeBoldText>
            <CustomText.SmallText
              isSecondaryColor
              ellipsizeMode="tail"
              numberOfLines={1}>
              {item?.courseDetails[0]?.intro || ''}
            </CustomText.SmallText>
          </View>
          <CustomImage
            source={Images.Tick}
            style={{
              width: Metrix.HorizontalSize(15),
              height: Metrix.VerticalSize(15),
            }}
          />
        </View>
        <View style={styles.flexStyle}>
          <View
            style={{
              width: '72%',
            }}>
            <ProgressBar
              progress={divideRes || 0}
              color={Utills.selectedThemeColors().Primary}
              style={styles.progessbarStyles}
            />
          </View>
          <View>
            {I18nManager.isRTL ? (
              <CustomText.LargeSemiBoldText
                customStyle={styles.fontStylesPrimary}>
                100% /{' '}
                {isNaN(item?.progress) ? '0' : Math.floor(item?.progress)}
              </CustomText.LargeSemiBoldText>
            ) : (
              <CustomText.LargeSemiBoldText
                customStyle={styles.fontStylesPrimary}>
                {isNaN(item?.progress) ? '0' : Math.floor(item?.progress)} /
                100%
              </CustomText.LargeSemiBoldText>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const btnData = [
  {id: '1', status: t('ongoing')},
  {id: '2', status: t('completed')},
];

export const Courses: React.FC<CoursesProps> = ({}) => {
  const myCourseStatus = useSelector(state => state?.CourseReducer?.mycourses);

  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const keyboardOpen = useRef(null);

  // console.log("===>",myCourseStatus?.enrolledCourse,"\n ==>",myCourseStatus?.completedCourses);

  const [isActive, setIsActive] = useState('1');
  const [showButtons, setShowButtons] = useState(true);
  const [pageLoader, setPageLoader] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [completedCourses, setCompletedCourses] = useState([]);

  useEffect(()=>{
    setCompletedCourses(myCourseStatus?.completedCourses)
    setEnrolledCourses(myCourseStatus?.enrolledCourse)
},[myCourseStatus])

  const focusKeyboard = () => {
    keyboardOpen?.current?.focus();
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  async function fetchMyCourses() {
    let res = await dispatch(MyCourses());

    if (res?.status) {
      dispatch({
        type: ActionType.MY_COURSES,
        payload: res?.responseData,
      });
    }
  }

  const handleEnrolledCourse = text => {
    if (text) {
      const newData = myCourseStatus?.enrolledCourse?.filter(item => {
        if (
          item?.courseDetails[0]?.name
            .toLowerCase()
            ?.includes(text?.toLowerCase())
        ) {
          return item;
        }
      });
      setEnrolledCourses(newData);
    } else {
      setEnrolledCourses(myCourseStatus?.enrolledCourse);
      setShowButtons(true);
    }
    console.log('Handling enrolledCourse');
  };

  const handleCompletedCourses = text => {
    if (text) {
      const newData = myCourseStatus?.completedCourses?.filter(item => {
        if (
          item?.courseDetails[0]?.name
            .toLowerCase()
            ?.includes(text?.toLowerCase())
        ) {
          return item;
        }
      });
      setCompletedCourses(newData);
    } else {
      setCompletedCourses(myCourseStatus?.completedCourses);
      setShowButtons(true);
    }
    console.log('Handling completedCourses');
  };

  const OnActivityRefresh = () => {
    fetchMyCourses()
  };


  return (
    <MainContainer isFlatList>
      <View style={styles.flexStyle}>
        {showButtons ? (
          <>
            <CustomText.LargeBoldText
              customStyle={{fontSize: FontType.FontMedium}}>
              {t('my_courses')}
            </CustomText.LargeBoldText>
            <TouchableOpacity
              onPress={() => {
                setShowButtons(false);
                setShowSearchBar(true);
                focusKeyboard();
              }}>
              <FadeInImage
                source={Images.Search}
                customImageContainerStyle={{
                  width: Metrix.HorizontalSize(20),
                  height: Metrix.VerticalSize(20),
                }}
              />
            </TouchableOpacity>
          </>
        ) : (
          <CustomSearchBar
            showCrossIcon
            autoFocus
            onCrossBtnPress={() => {
              setShowButtons(true);
              setShowSearchBar(false);
            }}
            onChangeText={
              isActive === '1' ? handleEnrolledCourse : handleCompletedCourses
            }
          />
        )}
      </View>
      {showButtons && (
        <View
          style={[styles.flexStyle, {marginVertical: Metrix.VerticalSize(10)}]}>
          {btnData?.map((tab: {id: string; status: string}) => (
            <PrimaryButton
              title={tab.status}
              key={tab.id}
              customStyles={{
                width: '48%',
                height: Metrix.VerticalSize(30),
                backgroundColor:
                  tab?.id == isActive
                    ? Utills.selectedThemeColors().Primary
                    : Utills.selectedThemeColors().Base,
                ...Metrix.createShadow,
              }}
              textStyles={styles.fontStyles}
              textColor={
                tab?.id == isActive
                  ? Utills.selectedThemeColors().Base
                  : Utills.selectedThemeColors().SecondaryTextColor
              }
              onPress={() => setIsActive(tab?.id)}
            />
          ))}
        </View>
      )}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={pageLoader}
            onRefresh={OnActivityRefresh}
          />
        }
        data={isActive === '1' ? enrolledCourses : completedCourses}
        // data={isActive === '1' ? inProgressCourses : completedCourses}
        // ? userData.responseData.completedCourses
        // : userData.responseData.enrolledCourse
        // myCourseStatus
        renderItem={MyCourseCard}
        ListEmptyComponent={EmptyListComponent}
        keyExtractor={item => item?.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Metrix.VerticalSize(50),
        }}
      />
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // borderWidth: 1,
    height: Metrix.VerticalSize(90),
    borderRadius: Metrix.VerticalSize(20),
    // overflow: 'hidden',
    marginVertical: Metrix.VerticalSize(8),
    backgroundColor: Utills.selectedThemeColors().CourseContainerColor,
  },
  cardImage: {
    // borderWidth: 1,
    width: '25%',
    borderBottomLeftRadius: Metrix.VerticalSize(20),
    borderTopLeftRadius: Metrix.VerticalSize(20),
    overflow: 'hidden',
  },
  cardDetailsContainer: {
    // borderWidth: 1,
    height: '100%',
    width: '70%',
    paddingVertical: Metrix.VerticalSize(8),
    paddingRight: Metrix.VerticalSize(10),
    justifyContent: 'space-between',
  },
  flexStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fontStylesWhite: {
    fontSize: FontType.FontSmall,
    color: Utills.selectedThemeColors().Base,
  },
  fontStylesPrimary: {
    fontSize: FontType.FontSmall,
    color: Utills.selectedThemeColors().Primary,
  },
  fontStylesBlack: {
    fontSize: FontType.FontSmall,
    color: Utills.selectedThemeColors().Black,
  },
  progessbarStyles: {
    width: '100%',
    height: Metrix.VerticalSize(6),
    borderRadius: Metrix.VerticalSize(20),
    // borderWidth:1
  },
  fontStyles: {
    fontSize: FontType.FontSmall,
  },
});
