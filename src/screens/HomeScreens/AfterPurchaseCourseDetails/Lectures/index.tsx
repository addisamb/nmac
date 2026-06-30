import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useCallback, useState } from 'react';
import {CurriculumComponent, CustomText, MainContainer} from '../../../../components';
import {curriculumCourseContentData} from '../../CourseDetails';
import { useDispatch, useSelector } from 'react-redux';
import { Metrix } from '../../../../config';
import { t } from 'i18next';
import { QuizAndAssignmentData, course_ObjectData, getCourseDetails, getCourseDetailsWithoutLoder } from '../../../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../../../Redux/Action/ActionType/actionType';

type LecturesProps = {
  active: boolean;
};

export const Lectures: React.FC<LecturesProps> = ({movetoCourseDetail}) => {

  const courseDetail = useSelector(state => state?.HomeReducer?.course_Object);
console.log("courseDetail===>",courseDetail);

  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(courseDetail?._id)
    setRefreshing(false);
  }, []);

  const fetchData = async (_id: string) => {
    let res = await dispatch(getCourseDetailsWithoutLoder(_id));
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
      vatDiscount: data?.vatTax
    };
    dispatch(course_ObjectData(object));
    return;
  };

  return (
    <MainContainer isFlatList>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ 
        // paddingBottom: 80
      }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        <View style={{marginTop: Metrix.VerticalSize(20)}}>
            {courseDetail?.sections && courseDetail?.sections?.map((item, index) => (
              <CurriculumComponent movetoCourseDetail={movetoCourseDetail} item={item} key={item?.id} index={index} />
            ))}
          </View>

      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({});
