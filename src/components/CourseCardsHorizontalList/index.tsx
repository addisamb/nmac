import {
  FlatList,
  Image,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {TopCourseDataPropTypes, TopHeading} from '../CategoryBtnsList';
import {FontType, Images, Metrix, Utills} from '../../config';
import {CardStyledComponent} from '../CardStyledComponent';
import {useTranslation} from 'react-i18next';
import {CustomText} from '..';
import {t} from 'i18next';

export type CourseListDataType = {
  _id: string;
  key: string;
  courseMedia: ImageProps['source'];
  isFavourite: boolean;
  name: string;
  courseName: string;
  instructorName: string;
  videos: string;
  rating: number;
  numOfEnrolled: string;
  price?: string;
  paid?: boolean;
  offPrice?: string;
  discountedPrice?: string;
  totalReviews?: string;
  avgRating?: string;
}[];

type CourseCardsProps = TopCourseDataPropTypes & {
  courseData: CourseListDataType;
  customCardContainerStyles?: ViewStyle;
  isHorizontal?: boolean;
  customListStyle?: ViewStyle;
  onHeartBtnPress?: () => void;
};

export const EmptyListComponent = () => (
  <CustomText.MediumText style={{ alignSelf: "center", color: Utills.selectedThemeColors().Black }} >{t('no_data_found')}</CustomText.MediumText>
);

export const EmptyListChat = () => (
  <CustomText.RegularText>{t('no_chat_found')}</CustomText.RegularText>
);

export const CourseCardsHorizontalList: React.FC<CourseCardsProps> = ({
  courseData,
  heading,
  customCardContainerStyles,
  isHorizontal,
  isAllCoursesHeading,
  onPressCoursesBtn,
  customListStyle,
  onHeartBtnPress,
}) => {
  const renderItem = ({item}: {item: CourseListDataType[number]}) => {
    return (
      <CardStyledComponent
        courseItem={item}
        onHeartBtnPress={(ID: any, key: string) => onHeartBtnPress(ID, key)}
        customCardContainerStyles={customCardContainerStyles}
      />
    );
  };
  return (
    <View>
      <TopHeading
        heading={heading}
        isAllCoursesHeading={isAllCoursesHeading}
        onPressCoursesBtn={onPressCoursesBtn}
      />
      {isHorizontal ? (
        <FlatList
          data={courseData}
          renderItem={renderItem}
          style={{
            // borderWidth: 1,
            paddingVertical: Metrix.VerticalSize(10),
          }}
          contentContainerStyle={customListStyle}
          ListEmptyComponent={EmptyListComponent}
          horizontal={isHorizontal}
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item?.id}
        />
      ) : (
        <FlatList
          data={courseData}
          renderItem={renderItem}
          style={{
            // borderWidth: 1,
            paddingVertical: Metrix.VerticalSize(10),
          }}
          contentContainerStyle={customListStyle}
          ListEmptyComponent={EmptyListComponent}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          keyExtractor={item => item?.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
