import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  ImageProps,
  ViewStyle,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {CustomImage, CustomText} from '..';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../config';
import {t} from 'i18next';
import {
  HandleNavigationAndroid,
  HandleNavigationIOS,
  getExtensionName,
  getMediaIcon,
} from '../../config/utills/imagesIconHandler';
import utills from '../../config/utills';
import {Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ActionType from '../../Redux/Action/ActionType/actionType';
// type CurriculumCourseContentDataTypes = {
//   id?: string;
//   title: string;
//   // video?: {path?: string; duration?: string};
//   // pdf?: {path?: string; pages?: string};
//   video?: any;
//   pdf?: any;
//   time: string;
// };

type contentsTypes = {
  id?: string;
  title: string;
  media: any;
  length: string;
};

type CurriculumComponentProps = {
  // id?: string;
  // title: string;
  // totalVideos: string;
  // totalTime?: string;
  // curriculumCourseContentData: CurriculumCourseContentDataTypes[];

  _id?: string;
  showtitleDescription?: boolean;
  totalVideos?: string; //remain backendside
  totalTime?: string; //remain backendside
  title: string;
  length: string;
  contents: contentsTypes[];
};

export const ContainerComp: React.FC<
  Omit<CurriculumComponentProps, 'curriculumCourseContentData'> & {
    onPress?: () => void;
    showtitleDescription?: Boolean;
    image?: ImageProps['source'];
    customMainContainerStyles?: ViewStyle;
    imageStyle?: ImageProps['style'];
  }
> = ({
  title,
  length,
  totalVideos,
  totalTime,
  onPress,
  showtitleDescription,
  image,
  customMainContainerStyles,
  imageStyle,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.mainContainer, customMainContainerStyles]}
      onPress={onPress}>
      <View
        style={{
          width: '90%',
        }}>
        <View style={styles.spaceBetweenStyles}>
          <CustomText.LargeBoldText
            ellipsizeMode="tail"
            numberOfLines={2}
            customStyle={{
              fontSize: Metrix.customFontSize(14),
              marginBottom: Metrix.VerticalSize(4),
            }}>
            {title}
          </CustomText.LargeBoldText>
        </View>
        <View style={styles.subHeadingContainer}>
          <CustomText.RegularText
            isSecondaryColor
            ellipsizeMode="tail"
            numberOfLines={1}
            customStyle={{
              fontSize: FontType.FontExtraSmall,
            }}>
            {totalVideos}
          </CustomText.RegularText>

          {totalVideos === 'Pdf' || totalVideos === 'docx' ? (
            // Code to execute or component to render if totalTime is 'Pdf'
            <>
              {/* <View style={styles.dot} /> */}
              <CustomText.RegularText
                ellipsizeMode="tail"
                numberOfLines={1}
                isSecondaryColor
                customStyle={{
                  // justifyContent: 'center',
                  fontSize: FontType.FontExtraSmall,
                }}>
                {' '}
              </CustomText.RegularText>
            </>
          ) : (
            // Code to execute or component to render if totalTime is NOT 'Pdf'
            <>
              {totalTime && (
                <>
                  <View style={styles.dot} />
                  <CustomText.RegularText
                    ellipsizeMode="tail"
                    numberOfLines={1}
                    isSecondaryColor
                    customStyle={{
                      // justifyContent: 'center',
                      fontSize: FontType.FontExtraSmall,
                    }}>
                    {totalTime && totalTime !== 'null Seconds'
                      ? `${totalTime} `
                      : ''}
                  </CustomText.RegularText>
                </>
              )}
            </>
          )}
        </View>
      </View>

      {image && <CustomImage source={image} customStyle={imageStyle} />}
    </TouchableOpacity>
  );
};

export const CurriculumComponent: React.FC<{
  item: CurriculumComponentProps;
  index?: string | number;
  movetoCourseDetail?: boolean;
}> = ({item, index, movetoCourseDetail}) => {
  const {_id, title, contents} = item;

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const [videoDurations, setVideoDurations] = useState({});
  const animationHeight = React.useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const toggleExpansion = contents => {
    if (contents.length) {
      setIsExpanded(prev => !prev);
      if (!isExpanded) {
        Animated.timing(animationHeight, {
          duration: 200,
          toValue: 1, // Expand to full height
          useNativeDriver: false,
          easing: Easing.linear,
        }).start();
      } else {
        Animated.timing(animationHeight, {
          duration: 200,
          toValue: 0, // Collapse to zero height
          useNativeDriver: false,
          easing: Easing.linear,
        }).start();
      }
    } else {
      Utills.showToast(t('noVideoInSection'), '', 'info');
    }
  };

  function ShowContent(data) {
    console.log('contents=====>>>', data?.media);

    if (userData?.type == 'guest') {
      dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
      return;
    }

    // if (data?.media?.path?.toLowerCase()?.split('.').pop() == 'mov' || data?.media?.path?.toLowerCase()?.split('.').pop() == 'mp4') {
    //   NavigationService.navigate(RouteNames.HomeRoutes.VideoPlayerScreen,{
    //     name: data?.title,
    //     description: "this is description",
    //     title: data?.title,
    //     videourl: data?.media?.path,
    //     id: data?._id
    //   })
    // }
    // else{
    if (Platform.OS == 'android') {
      const extension = data?.media?.path?.toLowerCase()?.split('.').pop();
      if (extension == 'vtt') {
        Linking.openURL(data?.media?.path);
        return;
      }

      let FormatedUrl = HandleNavigationAndroid(data?.media?.path);
      NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen, {
        url: FormatedUrl,
        movetoCourseDetail: movetoCourseDetail,
        movetoIndex: 0,
        documentTitle: data?.media?.name,
        contentId: contents[0]._id,
      });
    } else if (Platform.OS == 'ios') {
      console.log('contents[0]', contents[0]._id);
      let FormatedUrl = HandleNavigationIOS(data?.media?.path);
      NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen, {
        url: FormatedUrl,
        movetoCourseDetail: movetoCourseDetail,
        movetoIndex: 0,
        documentTitle: data?.media?.name,
        contentId: contents[0]._id,
      });
    }
    // }
  }

  return (
    <>
      <ContainerComp
        title={`${t('section')} ${Number(index) + 1} : ${title || ''}`}
        totalVideos={`${contents?.length} ${t('files')}`}
        onPress={() => toggleExpansion(contents)}
        image={isExpanded ? Images.CaretCircleUp : Images.CaretCircleDown}
      />
      <Animated.View
        style={[
          styles.itemsContainer,
          {
            height: animationHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 70 * contents?.length], // Expand to auto height
            }),
          },
        ]}>
        {contents &&
          contents?.map((item, index) => {

            const getDuration = (contents, index) => {
              const meta = contents[index]?.media?.meta;
              console.log('Meta Object:', meta);

              if (!meta) return null;

              if (meta.duration) {
                console.log('Direct duration found:', meta.duration);
                return meta.duration;
              }

              for (const key in meta) {
                console.log('Checking key:', key, 'Value:', meta[key]);
                if (key.toLowerCase() === 'duration') {
                  console.log('Found duration dynamically:', meta[key]);
                  return meta[key];
                }
              }

              return null;
            };

            // Example usage
            const duration = getDuration(contents, index);
            console.log('Extracted Duration:', duration);

            const convertedDuration = `${
              duration > 60 ? (duration / 60).toFixed(2) : duration
            } ${t(duration > 60 ? t('Minutes') : t('seconds'))}`;

            console.log('convertedDuration', convertedDuration);

            console.log("===========>>>>>", item?.media?.path)

            return (
              <ContainerComp
                key={index}
                onPress={() => {
                  ShowContent(item);
                }}
                title={`${Number(index) + 1} : ${item?.title || ''}`}
                totalVideos={getExtensionName(item?.media?.path)}
                totalTime={item?.media?.path?.endsWith('.mp4') ? convertedDuration : ''}

                // onPress={toggleExpansion}
                image={getMediaIcon(item?.media?.path)}
                customMainContainerStyles={{
                  backgroundColor: Utills.selectedThemeColors().Base,
                  borderBottomWidth: 1,
                  borderColor: '#C8C8C8',
                  marginBottom: Metrix.VerticalSize(10),
                }}
                imageStyle={{
                  width: Metrix.customImageSize(20),
                  height: Metrix.customImageSize(20),
                }}
              />
            );
          })}
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  itemsContainer: {
    marginTop: 10, // Adjust the spacing between the TouchableOpacity and items
    overflow: 'hidden', // Hide content that overflows the container
  },
  mainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    paddingHorizontal: Metrix.HorizontalSize(8),
    // paddingVertical: Metrix.VerticalSize(10),
    backgroundColor: Utills.selectedThemeColors().CourseContainerColor,
  },
  likeBtn: {
    // borderWidth: 1,
    borderRadius: Metrix.VerticalSize(50),
    backgroundColor: Utills.selectedThemeColors().Primary,
    height: Metrix.VerticalSize(25),
    width: Metrix.HorizontalSize(25),
  },
  spaceBetweenStyles: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: '#D9D9D9',
    borderRadius: 50,
    marginHorizontal: Metrix.HorizontalSize(6),
    // marginBottom:2
  },
  subHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
});
