import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import {
  BackHeader,
  CustomImage,
  CustomInput,
  CustomText,
  MainContainer,
  PrimaryButton,
  ProfileHeader,
} from '../../../components';
import {FontType, Images, Metrix, Utills} from '../../../config';
import {CourseRatingProps, EditProfileProps} from '../../propTypes';
import _ from 'lodash';
import {t} from 'i18next';
import {CourseDescriptionComp} from '../../../components/CourseDescriptionComp';
import {useSelector} from 'react-redux';
import utills from '../../../config/utills';
export const CourseRating: React.FC<CourseRatingProps> = ({}) => {
  const courseDetailData = useSelector(
    state => state?.HomeReducer?.course_Object,
  );
  // course_Object
  return (
    <View>
      <BackHeader heading={t('course_review')} />
      <View
        style={{
          paddingHorizontal: Metrix.HorizontalSize(20),
          marginBottom: Metrix.VerticalSize(50),
          paddingBottom: Metrix.HorizontalSize(200),
        }}>
        <FlatList
       showsVerticalScrollIndicator={false}
          data={courseDetailData?.courseReviews}
          // keyExtractor={(item) => item?.id.toString()} // Assuming id is a string or number
          renderItem={({item}) => (
            <CourseDescriptionComp
              key={item?.id}
              heading={item?.studentName}
              subHeading={item?.description}
              date={utills.timeHumanize(item?.createdAt)}
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
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  studentFeedbackContainer: {
    // borderWidth: 1,
    marginTop: Metrix.VerticalSize(10),
    marginBottom: Metrix.VerticalSize(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
