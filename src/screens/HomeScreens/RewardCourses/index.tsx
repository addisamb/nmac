import { Image, ScrollView, StyleSheet, Text } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  BackHeader,
  CourseCardsHorizontalList,
  CustomCarousel,
  MainContainer,
} from '../../../components';
import { RewardCoursesScreenProps } from '../../propTypes';
import { BackHandler } from 'react-native';
import { Images, Metrix, RouteNames } from '../../../config';
import { t } from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../HomeScreen';
import { View } from 'react-native';
import { likeAndUnlikeCourse, toggleFavorite } from '../../../Redux/Action/HomeActions/homeActions';
import navigationService from '../../../config/navigationService';

export interface SectionRoot {
  promoCourses?: [];
  trendingCourses?: [];
  popularCourses?: [];
  newCourses?: []
  recommendedCourses?: [];
}

export const RewardCoursesScreen: React.FC<RewardCoursesScreenProps> = ({ }) => {

  const dispatch = useDispatch();

  const courseList = useSelector(
    (state: RootState) => state?.HomeReducer?.courseList,
  );


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

  return (
    <MainContainer isFlatList >
      <BackHeader heading={t("reward_courses")} isPrimary={false} />
        <ScrollView style={{ flex: 1 }}  >
            
            {courseList &&
              courseList?.map((section: SectionRoot, index: number) => (
                <>
                  <View>
                    {section?.trendingCourses && (
                      <CourseCardsHorizontalList
                        onHeartBtnPress={courselikeAndUnlike}
                        courseData={section?.trendingCourses}
                        heading={t('trending_course')}
                        onPressCoursesBtn={() => {
                          navigationService.navigate(
                            RouteNames.HomeRoutes.AllCourseScreen,
                            {
                              screenName: t('trending_course'), // Pass the heading dynamically
                              trendingCourses: section.trendingCourses,
                              key: 'trending'
                            },
                          );
                        }}
                        isHorizontal
                      />
                    )}
                  </View>

                  <View>
                    {section?.popularCourses && (
                      <CourseCardsHorizontalList
                        onHeartBtnPress={courselikeAndUnlike}
                        courseData={section?.popularCourses}
                        heading={t('popular_course')}
                        onPressCoursesBtn={() => {
                          navigationService.navigate(
                            RouteNames.HomeRoutes.AllCourseScreen,
                            {
                              screenName: t('popular_course'), // Pass the heading dynamically
                              popularCourses: section.popularCourses,
                              key: 'popular'
                            },
                          );
                        }}
                        isHorizontal
                      />
                    )}

                    {section?.newCourses && (
                      <CourseCardsHorizontalList
                        onHeartBtnPress={courselikeAndUnlike}
                        courseData={section?.newCourses}
                        heading={t('new_courses')}
                        onPressCoursesBtn={() => {
                          navigationService.navigate(
                            RouteNames.HomeRoutes.AllCourseScreen,
                            {
                              screenName: t('new_courses'), // Pass the heading dynamically
                              trendingCourses: section.newCourses,
                              key: 'newCourses'
                            },
                          );
                        }}
                        isHorizontal
                      />
                    )}

                    {section?.recommendedCourses && (
                      <CourseCardsHorizontalList
                        onHeartBtnPress={courselikeAndUnlike}
                        courseData={section?.recommendedCourses}
                        heading={t('participants_view_also')}
                        isAllCoursesHeading={false}
                        customCardContainerStyles={{
                          width: '49%',
                          marginBottom: Metrix.HorizontalSize(10),
                        }}
                      />
                    )}
                  </View>
                </>
              ))}
        </ScrollView>
    </MainContainer>
  );
};

interface ProfileScreenStyles { }
const styles = StyleSheet.create<ProfileScreenStyles>({});