import {RefreshControl, ScrollView, StyleSheet, Switch, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {FavoriteCourseScreenProps} from '../../propTypes';
import {
  BackHeader,
  CourseCardsHorizontalList,
  MainContainer,
} from '../../../components';
import {FontType, Images, Metrix} from '../../../config';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import {GetFavouriteCourses, likeAndUnlikeCourse, toggleFavorite} from '../../../Redux/Action/HomeActions/homeActions';
import { useIsFocused } from '@react-navigation/native';
export const FavoriteCourseScreen: React.FC<
  FavoriteCourseScreenProps
> = ({}) => {
  const dispatch = useDispatch();
  const FOCUS = useIsFocused()
  const favCourseData = useSelector(state => state?.HomeReducer?.getFavouriteCourse);

  const [refreshing, setRefreshing] = useState(false);
  

  useEffect(() => {
    if (FOCUS) {
      getFavCourseData();
    }
  }, [FOCUS]);

  async function getFavCourseData() {
    let res = await dispatch(GetFavouriteCourses());
    if (res?.status) {
      let added = res?.responseData.map(obj => ({ ...obj, isFavourite: true }));

      dispatch({
        type: ActionType.GET_FAVOURITE_COURSE,
        payload: added,
      });
    }
  }

  async function handleLike(IDD: any) {    
    let payload = {
      courseID: IDD
    }
    let res = await dispatch(likeAndUnlikeCourse(payload));
    if (res?.status) {
      let removeLikeObject = favCourseData?.filter(obj => obj._id !== IDD);
      dispatch({
        type: ActionType.GET_FAVOURITE_COURSE,
        payload: removeLikeObject,
      });      

      dispatch(toggleFavorite('popularCourses', IDD));
      dispatch(toggleFavorite('trendingCourses', IDD));
      dispatch(toggleFavorite('recommendedCourses', IDD));
      dispatch(toggleFavorite('newCourses', IDD));

    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate a fetch operation (replace this with your actual data fetching logic)
    setTimeout(() => {
      getFavCourseData();
      setRefreshing(false); // Set refreshing to false when done
    }, 1000);
  }, []);


  console.log("=====>",favCourseData);
  return (
    <View style={{ flex: 1}} >
      <BackHeader heading={t('my_favorite_courses')} isPrimary={false} />
      <ScrollView         
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
         contentContainerStyle={{paddingBottom: 100}} 
      >
      <CourseCardsHorizontalList
        onHeartBtnPress={handleLike}
        courseData={favCourseData}
        isAllCoursesHeading={false}
        // isHorizontal={false}
        // customListStyle={{ alignItems: "center" }}
        customCardContainerStyles={{
          // width: '47%',
          marginHorizontal:  Metrix.HorizontalSize(15),
          // backgroundColor: "red",
          marginBottom: Metrix.HorizontalSize(10),
        }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create<FavoriteCourseScreenProps>({});