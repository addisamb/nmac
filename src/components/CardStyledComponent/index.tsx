import {
  Image,
  ImageBackground,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../config';
import {CustomText, RatingComponent} from '..';
import {CourseListDataType} from '../CourseCardsHorizontalList';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import { t } from 'i18next';

type CourseDataItemType = {
  customCardContainerStyles?: ViewStyle;
} & {
  courseItem: CourseListDataType[number];
  onHeartBtnPress?: () => void;
};

export const CardStyledComponent: React.FC<CourseDataItemType> = ({
  courseItem,
  customCardContainerStyles,
  onHeartBtnPress,
}) => {
  const courseDetailData = useSelector(
    state => state?.HomeReducer?.course_Object,
  );
  const {
    // id,
    // courseImage,
    isFavourite,
    // courseTitle,
    // instructorName,
    // numOfVideos = 1,  //remain
    rating,
    numOfEnrolled = 5, //remain
    // price,
    // isFree = false, //remain
    offPrice = courseDetailData?.discountedPrice, //remain
    discountedPrice,
    // offPrice,
    // {
    _id,
    key,
    courseName,
    // avgRating,
    // categoryIDs,
    courseMedia,
    // createdAt,
    instructorName,
    // isPopular,
    // isTrending,
    name,
    paid,
    price,
    totalReviews,
    discounted,
    avgRating,
    videos,
    // }
  } = courseItem;

  // const [fav, setIsFav] = useState(isFavourite);

  return (
    <TouchableOpacity
      style={[styles.renderItemContainer, customCardContainerStyles]}
      activeOpacity={0.7}
      key={_id}
      onPress={() =>
        NavigationService.navigate(RouteNames.HomeRoutes.CourseDetails, {
          objectId: _id,
        })
      }
      >
      <ImageBackground
        source={
          courseMedia ?
         {uri: courseMedia } 
          : 
          Images.TestingImage
      }

    //   source={
    //     courseMedia?.path ?
    //    {uri: courseMedia?.path } 
    //     : 
    //     Images.TestingImage
    // }
        style={styles.courseImageContainer}
        resizeMode="cover">
        <TouchableOpacity
          onPress={() => {
            onHeartBtnPress(_id, key);
            // setIsFav(!fav)
          }}
          style={{
            margin: Metrix.VerticalSize(10),
            alignSelf: 'flex-end',
            width: Metrix.HorizontalSize(33),
            height: Metrix.VerticalSize(33),
            justifyContent: "center",
            alignItems: "center"
          }}
          activeOpacity={0.7}>
          <Image
            // source={fav ? Images.HeartFilled : Images.HeartEmpty}
            source={isFavourite ? Images.HeartFilled : Images.HeartEmpty}
            resizeMode="contain"
            style={{
              // borderWidth:1,
              // backgroundColor:"white",
              width: Metrix.HorizontalSize(25),
              height: Metrix.VerticalSize(25),
            }}
          />
        </TouchableOpacity>
      </ImageBackground>
      <View style={styles.courseDetailContainer}>
        <CustomText.LargeSemiBoldText
          ellipsizeMode="tail"
          numberOfLines={2}
          customStyle={{
            fontSize: FontType.FontRegular,
          }}>
          {name || courseName}
          {/* {courseName || ''} */}
        </CustomText.LargeSemiBoldText>
        <View style={styles.centreItem}>
          <CustomText.RegularText
            isSecondaryColor
            ellipsizeMode="tail"
            numberOfLines={1}
            customStyle={{
              fontSize: FontType.FontExtraSmall,
            }}>
            {instructorName}
          </CustomText.RegularText>
          <View style={styles.dot} />
          <CustomText.RegularText
            ellipsizeMode="tail"
            numberOfLines={1}
            isSecondaryColor
            customStyle={{
              // justifyContent: 'center',
              fontSize: FontType.FontExtraSmall,
            }}>
            {`${videos} ${t("videos")}`}
          </CustomText.RegularText>
        </View>
        <RatingComponent
          avgRating={avgRating}
          totalReviews={Math.round(avgRating * 10) / 10}
          editable={true}
        />
        <View style={styles.centreItem}>
          <CustomText.MediumText
            customStyle={{
              color: Utills.selectedThemeColors().Primary,
              fontSize: FontType.FontRegular,
            }}>
            {paid ? `${t("sar")} ${Math.floor(price - (price * discountedPrice) / 100)}` : `${t("free")}`}
          </CustomText.MediumText>
          {offPrice && (
            <CustomText.RegularText
              isSecondaryColor
              customStyle={{
                fontSize: FontType.FontSmall,
                textDecorationLine: discounted ? 'line-through' : 'none',
                marginHorizontal: Metrix.VerticalSize(5),
              }}>
              {/* {`${offPrice}`} */}
              {paid ? discounted ? `SAR ${price}` : "" : null}
            </CustomText.RegularText>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  renderItemContainer: {
    // borderWidth: 1,
    marginRight: Metrix.HorizontalSize(7),
    height: Metrix.VerticalSize(140 * 2),
    width: Metrix.HorizontalSize(150),
    justifyContent: 'space-around',
  },
  courseImageContainer: {
    flex: 1.4,
    // borderWidth: 1,
    borderRadius: Metrix.VerticalSize(10),
    overflow: 'hidden',
  },
  courseDetailContainer: {
    flex: 1,
    // borderWidth: 1,
    // borderColor: 'red',
    marginTop: Metrix.VerticalSize(10),
    justifyContent: 'space-around',
    // borderWidth: 1,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    marginHorizontal: Metrix.HorizontalSize(6),
    // marginBottom:2
  },
  centreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
});