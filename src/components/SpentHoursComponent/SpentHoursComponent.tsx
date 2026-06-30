import {ImageProps, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {CustomImage} from '../CustomImage';
import {CustomText} from '..';
import {FontType, Images, Metrix, Utills} from '../../config';

type SpentHoursComponentProps = {
  details: {
    image?: ImageProps['source'];
    primaryTitle: string;
    primaryValue: string;
    secondaryTitle?: string;
    secondaryValue?: string;
  };
  customContainerStyles?: ViewStyle;
  customPrimaryTextViewStyles?: ViewStyle;
};

export const SpentHoursComponent: React.FC<SpentHoursComponentProps> = ({
  details,
  customContainerStyles,
  customPrimaryTextViewStyles,
}) => {
  const {image, primaryTitle, primaryValue, secondaryTitle, secondaryValue} =
    details;
  return (
    <View style={[styles.container, customContainerStyles]}>
      <View style={styles.flexBetween}>
        <CustomImage
          source={image || Images.CLockFilled}
          customStyle={{
            // tintColor: Utills.selectedThemeColors().Primary,
            width: Metrix.customImageSize(25),
            height: Metrix.customImageSize(25),
          }}
        />
        <View style={[styles.textViews, customPrimaryTextViewStyles]}>
          <CustomText.LargeSemiBoldText
            customStyle={[
              styles.textStyle,
              {fontSize: Metrix.customFontSize(15)},
            ]}>
            {primaryValue}
          </CustomText.LargeSemiBoldText>
          <CustomText.LargeSemiBoldText customStyle={styles.textStyle}>
            {primaryTitle}
          </CustomText.LargeSemiBoldText>
        </View>
        {secondaryTitle && secondaryValue && (
          <View style={styles.textViews}>
            <CustomText.LargeSemiBoldText
              customStyle={[
                styles.textStyle,
                {
                  fontSize: Metrix.customFontSize(15),
                  color: Utills.selectedThemeColors().SecondaryTextColor,
                },
              ]}>
              {secondaryValue}
            </CustomText.LargeSemiBoldText>
            <CustomText.LargeSemiBoldText
              customStyle={[
                styles.textStyle,
                {
                  color: Utills.selectedThemeColors().SecondaryTextColor,
                },
              ]}>
              {secondaryTitle}
            </CustomText.LargeSemiBoldText>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Utills.selectedThemeColors().Primary,
    padding: Metrix.VerticalSize(10),
    borderRadius: Metrix.VerticalSize(10),
    backgroundColor: Utills.selectedThemeColors().Base,
    // width: '100%',
    // height:'100%'
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // borderWidth: 1,
    height:'100%'
  },
  textStyle: {
    color: Utills.selectedThemeColors().Primary,
    fontSize: FontType.FontExtraSmall,
    alignSelf: 'center',
    textAlign: 'center',
  },
  textViews: {
    // borderWidth: 1,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // height: '100%',
  },
});