import {
  Image,
  ImageProps,
  ImageStyle,
  Platform,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FontType, Images, Metrix, Utills} from '../../config';
import {CustomImage, CustomText, RoundImageContainer} from '..';
import { t } from 'i18next';

export type RoundBorderCardProps = {
  amount?: string;
  text?: string;
  subtext?: string;
  image: ImageProps['source'];
  imageStyle?: ImageStyle;
  customTextContainerStyle?: ViewStyle;
  customTextStyle?: TextStyle;
  subTextCustomStyle?: TextStyle;
  touchableOpacityCustomStyle?: ViewStyle;
  amountViewStyle?: ViewStyle;
  customDurationTextStyle?: TextStyle;
  amountStyle?: TextStyle;
  duration?: string;
  greenText?: 'Document file' | 'Video' | string;
  onPress?: () => void;
  isSecondaryButton?: Boolean;
  customViewStyle?:ViewStyle;
};

export const RoundBorderCardComponent: React.FC<RoundBorderCardProps> = ({
  text,
  subtext,
  image,
  amount,
  onPress,
  imageStyle,
  customTextContainerStyle,
  touchableOpacityCustomStyle,
  customTextStyle,
  subTextCustomStyle,
  duration,
  customDurationTextStyle,
  greenText,
  amountStyle,
  amountViewStyle,
  isSecondaryButton = false,
  customViewStyle,
}) => {  

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.touchableOpacityStyle,
        touchableOpacityCustomStyle,
        !isSecondaryButton && Platform.OS == 'ios' ? {...Metrix.createShadow} : null,
        isSecondaryButton
          ? {
              justifyContent: 'space-between',
              marginTop: Metrix.VerticalSize(5),
              backgroundColor: Utills.selectedThemeColors().Base,
            }
          : {},
      ]}
      onPress={onPress}>
      <View
      style={[{
        // borderWidth:1,
        flexDirection:"row"
      }, customViewStyle]}
      >
        <View>
          {isSecondaryButton ? (
            <RoundImageContainer
              source={image}
              customContainerStyle={styles.roundImageContainerStyles}
              imageStyle={styles.roundImageContainerStyles}
              roundContainerStyle={styles.roundImageContainerStyles}
            />
          ) : (
            <CustomImage
              source={
                image
              }
              customStyle={[styles.imageStyle, imageStyle]}
            />
          )}
        </View>
        <View style={[styles.textContainer, customTextContainerStyle]}>
          <View
          >
            <CustomText.LargeBoldText
              ellipsizeMode="tail"
              numberOfLines={2}
              customStyle={[
                styles.textStyle,
                customTextStyle,
                isSecondaryButton
                  ? {
                      color: Utills.selectedThemeColors().BlueTextColor,
                    }
                  : {},
              ]}>
              {text}
            </CustomText.LargeBoldText>
            <CustomText.ExtraSmallText
              // ellipsizeMode="tail"
              // numberOfLines={1}
              isSecondaryColor
              customStyle={[
                styles.textStyle,
                subTextCustomStyle,
                isSecondaryButton
                  ? {
                      color: Utills.selectedThemeColors().GrayTextColor,
                    }
                  : {},
              ]}>
              {subtext}
            </CustomText.ExtraSmallText>
          </View>
          {duration && (
            <View style={styles.clockVewStyle}>
              <CustomImage
                source={Images.Clock}
                customStyle={{
                  width: Metrix.HorizontalSize(15),
                  height: Metrix.VerticalSize(15),
                  marginRight: Metrix.VerticalSize(5),
                }}
              />
              <CustomText.SmallText
                isSecondaryColor
                customStyle={customDurationTextStyle}>
                {`${duration}   ${t('Minutes')}` || ''}
              
              </CustomText.SmallText>
            </View>
          )}
          {greenText && (
            <CustomText.MediumText
              ellipsizeMode="tail"
              numberOfLines={1}
              customStyle={[
                styles.textStyle,
                {
                  color: Utills.selectedThemeColors().Primary,
                },
              ]}>
              {greenText || ''}
            </CustomText.MediumText>
          )}
        </View>
      </View>
      <View>
        {isSecondaryButton ? (
          <View style={styles.amountViewStyle}>
            <CustomText.RegularText
              customStyle={[
                {
                  textAlign: 'center',
                  fontSize: FontType.FontSmall,
                  color: Utills.selectedThemeColors().Base,
                },
                amountStyle,
              ]}>
              {amount}
            </CustomText.RegularText>
          </View>
        ) : (
          <CustomText.LargeBoldText
            customStyle={[
              {
                color: Utills.selectedThemeColors().Primary,
                fontSize: FontType.FontSmall,
              },
              amountStyle,
            ]}>
            {amount}
          </CustomText.LargeBoldText>
        )}
      </View>

      {/* {amount && (
        <View style={[amountViewStyle]}>
          <CustomText.LargeBoldText
            customStyle={[
              {
                color: Utills.selectedThemeColors().Primary,
                fontSize: FontType.FontSmall,
              },
              amountStyle,
            ]}>
            {amount}
          </CustomText.LargeBoldText>
        </View>
      )} */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchableOpacityStyle: {
    // borderWidth: 1,
    // height: Metrix.VerticalSize(70),
    marginTop: Metrix.VerticalSize(15),
    alignItems: 'center',
    borderRadius: Metrix.VerticalSize(10),
    flexDirection: 'row',
    padding: Metrix.HorizontalSize(10),
    backgroundColor: Utills.selectedThemeColors().CardColor,
    // ...Metrix.createShadow,
  },
  imageStyle: {
    // borderWidth: 1,
    width: Metrix.HorizontalSize(40),
    height: Metrix.VerticalSize(40),
    marginRight: Metrix.HorizontalSize(10),
  },
  textContainer: {
    // borderWidth: 1,
    // width: Metrix.HorizontalSize(200),
  },
  textStyle: {
    // borderWidth: 1,
    fontSize: FontType.FontSmall,
    lineHeight: 20,
  },
  clockVewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(10),
    // borderWidth:1
  },
  roundImageContainerStyles: {
    width: Metrix.HorizontalSize(40),
    height: Metrix.VerticalSize(40),
  },
  amountViewStyle: {
    // borderWidth:1,
    paddingVertical: Metrix.VerticalSize(2),
    width: Metrix.HorizontalSize(65),
    borderRadius: Metrix.VerticalSize(8),
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
});