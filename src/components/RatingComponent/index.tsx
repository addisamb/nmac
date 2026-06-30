import {ImageProps, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {CustomImage, CustomText, RoundImageContainer} from '..';
import {FontType, Images, Metrix, Utills} from '../../config';
import {Rating, AirbnbRating} from 'react-native-ratings';

type RatingComponentProps = {
  rating: number;
  avgRating?: number;
  totalReviews?: number;
  numOfEnrolled?: string;
  isEnrolled?: Boolean;
  editable?: Boolean;
  enrolledUsers?: [];
  getRatting?: () => void;
};

export const RatingComponent: React.FC<RatingComponentProps> = ({
  rating,
  isEnrolled,
  numOfEnrolled,
  enrolledUsers,
  totalReviews,
  avgRating,
  editable,
  getRatting
}) => {  
  return (
    <View
      style={[
        styles.centreItem,
        {
          justifyContent:'space-between'
        }
      ]}>
      <View style={styles.centreItem}>
        <CustomText.MediumText
          customStyle={{
            color: Utills.selectedThemeColors().TertiaryTextColor,
            marginRight: 10,
          }}>
          {totalReviews || 0}
        </CustomText.MediumText>

        {/* <AirbnbRating
          count={5}
          showRating={false}
          size={12}
          defaultRating={avgRating}
          onFinishRating={rate => {
            console.log('===> rating', rate);
          }}
        /> */}

        <Rating
          imageSize={15}
          startingValue={avgRating}
          onFinishRating={getRatting}
          readonly={editable}
        />
      </View>

      <View style={styles.centreItem}>
        {enrolledUsers?.length ? (
          <View style={[styles.centreItem, styles.enrolledUserStyles]}>
            {enrolledUsers?.splice(0,4)?.map((item, index) => (      
              console.log("sdsadasdadas",item.enrolledStudentImage[0].profilePic),                      
              <RoundImageContainer
              customContainerStyle={{
                position: 'absolute',
                marginLeft: index * 14
              }}
              circleWidth={18}
              // source={
              //   item?.enrolledStudentImage[0]?.profilePic == undefined ? 
              //   Images.user2 
              //   : 
              //   {uri: item?.enrolledStudentImage[0]?.profilePic }
              // }
              source={item.enrolledStudentImage[0].profilePic == undefined ?  Images.user2 : { uri: item?.enrolledStudentImage[0]?.profilePic } }
              borderColor="#ffffff"
              borderWidth={1}
              key={item?.id}
              />
              ))}
          </View>
        ) : null}
        {isEnrolled ? (
          <CustomText.RegularText
            customStyle={{
              fontSize: FontType.FontSmall,
            }}>
            {`(${numOfEnrolled || '0'})`}
          </CustomText.RegularText>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
  enrolledUserStyles: {
    width: Metrix.HorizontalSize(55),
    height: Metrix.VerticalSize(20),
    position: 'relative',
    marginRight: Metrix.HorizontalSize(10),
    // borderWidth: 1,
  },
});
