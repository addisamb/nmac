import {
  ImageProps,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {CustomImage, CustomText} from '..';
import {FontType, Metrix, Utills} from '../../config';

type CourseDescriptionCompProps = {
  heading?: string;
  subHeading?: string | React.ReactNode;
  image?: ImageProps['source'];
  date?: Date;
  mainContainerStyle?: ViewStyle;
  textContainerStyle?: ViewStyle;
  headingStyles?: TextStyle;
  subHeadingStyles?: TextStyle;
  imageStyles?: TextStyle;
  onPress?: () => void;
};

export const CourseDescriptionComp: React.FC<CourseDescriptionCompProps> = ({
  heading,
  subHeading,
  image,
  date,
  headingStyles,
  subHeadingStyles,
  textContainerStyle,
  mainContainerStyle,
  imageStyles,
  onPress,
}) => {

  return (
    <View style={[styles.centredItem, mainContainerStyle]}>
      <View
        style={[
          {
            width: '90%',
            // borderWidth: 1,
          },
          textContainerStyle,
        ]}>
        <View style={styles.spaceBetweenStyles}>
          <CustomText.LargeBoldText
            ellipsizeMode="tail"
            numberOfLines={2}
            customStyle={[
              {
                fontSize: Metrix.customFontSize(18),
                marginBottom: Metrix.VerticalSize(7),
              },
              headingStyles,
            ]}>
            {heading || ''}
          </CustomText.LargeBoldText>
          {date && (
            <CustomText.MediumText customStyle={{fontSize: FontType.FontSmall}}>
              {date?.toString()}
            </CustomText.MediumText>
          )}
        </View>
        <CustomText.ExtraSmallText
          customStyle={[
            {
              lineHeight: 18,
            },
            subHeadingStyles,
          ]}>
          {subHeading || ''}
        </CustomText.ExtraSmallText>
      </View>
      {image && (
        <TouchableOpacity
          style={[styles.imageStyle, imageStyles]}
          onPress={onPress}>
          <CustomImage
            source={image}
            customStyle={{
              width: '100%',
              height: '100%',
            }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centredItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  imageStyle: {
    // borderWidth: 1,
    // borderRadius: Metrix.VerticalSize(50),
    // backgroundColor: Utills.selectedThemeColors().Primary,
    height: Metrix.VerticalSize(25),
    width: Metrix.HorizontalSize(25),
  },

  spaceBetweenStyles: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
