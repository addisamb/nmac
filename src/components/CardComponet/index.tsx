import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {
  RadiusSquareContainer,
  RadiusSquareContainerProps,
} from '../RadiusSquareContainer';
import {Colors, Images, Metrix, Utills} from '../../config';
import {CustomText} from '..';
import {useThemeHook} from '../../hooks';

type CardComponetProps = TouchableOpacityProps &
  RadiusSquareContainerProps & {
    heading: string;
    subHeading?: string;
    isFavourite?: boolean;
    customMainContainerStyle?: ViewStyle;
    headingStyles?: TextStyle;
  };

export const CardComponet: React.FC<CardComponetProps> = ({
  imageSrc,
  resizeMode = 'stretch',
  customImageContainerStyle,
  subHeading,
  heading,
  isFavourite,
  customMainContainerStyle,
  headingStyles,
  onPress,
}) => {
  // const {Colors} = useThemeHook();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.container, customMainContainerStyle]}>
      <RadiusSquareContainer
        imageSrc={imageSrc}
        customImageContainerStyle={customImageContainerStyle}
        resizeMode={resizeMode}
      />
      <View
        style={[
          styles.textContainerStyle,
          {
            width: isFavourite ? '60%' : '70%',
          },
        ]}>
        <CustomText.LargeSemiBoldText
          customStyle={[styles.topTextStyle, headingStyles]}
          ellipsizeMode="tail"
          numberOfLines={1}>
          {heading}
        </CustomText.LargeSemiBoldText>
        {subHeading && (
          <CustomText.RegularText
            customStyle={{
              fontSize: Metrix.customFontSize(13),
            }}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {subHeading}
          </CustomText.RegularText>
        )}
      </View>
      {isFavourite && (
        <View style={styles.imageContainerStyle}>
          <Image
            source={Images.FavouriteHeart}
            style={styles.imageStyle}
            resizeMode="contain"
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

interface CardComponetStyles {
  container: ViewStyle;
  textContainerStyle: ViewStyle;
  topTextStyle: TextStyle;
  imageContainerStyle: ViewStyle;
  imageStyle: ImageStyle;
}
const styles = StyleSheet.create<CardComponetStyles>({
  container: {
    // borderWidth: 1,
    // borderColor: '#ffffff',
    width: '100%',
    padding: Metrix.VerticalSize(12),
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    borderRadius: Metrix.VerticalSize(7),
    backgroundColor: Utills.selectedThemeColors().TextInputBaseColor,
    marginVertical: Metrix.VerticalSize(7),
  },
  textContainerStyle: {
    // borderWidth: 1,
    // borderColor: 'yellow',
    marginLeft: Metrix.HorizontalSize(12),
  },
  topTextStyle: {
    fontSize: Metrix.customFontSize(15),
    color: Utills.selectedThemeColors().PrimaryTextColor,
    marginBottom: Metrix.VerticalSize(2),
  },
  imageContainerStyle: {
    // borderWidth: 1,
    // borderColor: 'red',
    width: '15%',
    alignItems: 'flex-end',
  },
  imageStyle: {
    width: Metrix.customImageSize(20),
    height: Metrix.customImageSize(20),
    // borderWidth: 1,
    // borderColor: '#fff',
    // alignSelf:'flex-end'
  },
});
