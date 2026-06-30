import {StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {AllCourseScreenProps} from '../../propTypes';
import {
  BackHeader,
  CourseCardsHorizontalList,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {FontType, Images, Metrix} from '../../../config';
import {t} from 'i18next';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  NewCoursesData,
  PopularCoursesData,
  TrendingCoursesData,
  likeAndUnlikeCourse,
  recommendedCoursesData,
  toggleFavorite,
} from '../../../Redux/Action/HomeActions/homeActions';
import {EmptyListComponent} from '../../../components/CourseCardsHorizontalList';
import ActionType from '../../../Redux/Action/ActionType/actionType';
export const AllCourseScreen: React.FC<AllCourseScreenProps> = ({}) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const FOCUS = useIsFocused();

  const key = route.params?.key;
  const heading = route.params?.screenName || t('default_heading');
  const {courseDetailData} = route.params;

  const trendingCourseData = useSelector(
    state => state?.HomeReducer.trending_course_data,
  );

  const popularCourseData = useSelector(
    state => state?.HomeReducer.popular_course_data,
  );

  const newCourseData = useSelector(
    state => state?.HomeReducer.new_course_data,
  );

  const recomandedCourseData = useSelector(
    state => state?.HomeReducer.recomanded_Course_data,
  );


  useEffect(() => {
    if (FOCUS) {
      if (key === 'trending') {
        getTrendingCoursesData();
      } else if (key === 'popular') {
        getPopularCoursesData();
      } else if (key === 'newCourses') {
        getNewCoursesData();
      } else if (key === 'recommended') {
        getrecommendedCoursesData()
      }
    }
  }, [FOCUS]);
  

  const getTrendingCoursesData = async () => {
    await dispatch(TrendingCoursesData());
  };

  const getPopularCoursesData = async () => {
    await dispatch(PopularCoursesData());
  };

const getNewCoursesData = async () => {
    await dispatch(NewCoursesData());
  };

  const getrecommendedCoursesData = async () => {
    await dispatch(recommendedCoursesData());
  };


  // async function courselikeAndUnlike(ID: any) {
  //   try {
  //     let payload = {
  //       courseID: ID,
  //     };
  //     let res = await dispatch(likeAndUnlikeCourse(payload));

  //     if (res?.status) {

  //       dispatch(toggleFavorite('popularCourses', ID));
  //       dispatch(toggleFavorite('trendingCourses', ID));
  //       dispatch(toggleFavorite('recommendedCourses', ID));
  //     }
  //   } catch (error) {
  //     console.error('Error in courselikeAndUnlike:', error);
  //   }
  // }

  async function courselikeAndUnlike(ID: any) {
    try {
      let payload = {
        courseID: ID,
      };

      let res = await dispatch(likeAndUnlikeCourse(payload));

      if (res?.status) {
        const updatedCourseData = trendingCourseData.map(course => {
          if (course._id === ID) {
            return {
              ...course,
              isFavourite: !course.isFavourite,
            };
          }
          return course;
        });

        dispatch({
          type: ActionType.TRENDING_COURSES_DATA,
          payload: updatedCourseData,
        });

        const updatedPopularCourseData = popularCourseData.map(course => {
          if (course._id === ID) {
            return {
              ...course,
              isFavourite: !course.isFavourite,
            };
          }
          return course;
        });

        dispatch({
          type: ActionType.POPULAR_COURSES_DATA,
          payload: updatedPopularCourseData,
        });


        const updatedNewCourseData = newCourseData.map(course => {
          if (course?._id === ID) {
            return {
              ...course,
              isFavourite: !course.isFavourite,
            };
          }
          return course;
        });

        dispatch({
          type: ActionType.NEW_COURSES_DATA,
          payload: updatedNewCourseData,
        });

        const updatedrecommendedCoursesData = recomandedCourseData.map(course => {
          if (course?._id === ID) {
            return {
              ...course,
              isFavourite: !course.isFavourite,
            };
          }
          return course;
        });

        dispatch({
          type: ActionType.RECOMANDED_COURSE_DATA,
          payload: updatedrecommendedCoursesData,
        });


        dispatch(toggleFavorite('popularCourses', ID));
        dispatch(toggleFavorite('trendingCourses', ID));
        dispatch(toggleFavorite('recommendedCourses', ID));
        dispatch(toggleFavorite('newCourses', ID));
      }
    } catch (error) {
      console.error('Error in courselikeAndUnlike:', error);
    }
  }

  // const courseData =
  //   key === 'trending' ? trendingCourseData : popularCourseData;

  // let courseData;

  // if (key === 'trending') {
  //   courseData = trendingCourseData;
  // } else if (key === 'popular') {
  //   courseData = popularCourseData;
  // } else if (key === 'recommended' && courseDetailData) {
  //   courseData = courseDetailData.recommendedCourses;
  // }
  
  const courseData =
  key === 'trending' ? trendingCourseData :
  key === 'popular' ? popularCourseData :
  key === 'recommended' ? recomandedCourseData :  //as it will nt go to detail screen definatly not create any problem
  // key === 'recommended' && courseDetailData ? courseDetailData.recommendedCourses :
  key === 'newCourses' ? newCourseData :
  null; 
 

  return (
    <>
    {/* checkeing */}
      <BackHeader heading={heading} isPrimary={false} />

      <MainContainer>
        <CourseCardsHorizontalList
          courseData={courseData}
          onHeartBtnPress={courselikeAndUnlike}
          isAllCoursesHeading={false}
          customCardContainerStyles={{
            width: '49%',
            marginBottom: Metrix.HorizontalSize(10),
          }}
        />
        
      </MainContainer>
    </>
  );
};


const styles = StyleSheet.create<AllCourseScreenProps>({});