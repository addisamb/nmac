import React, {FC, useState, Ref} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
  ImageProps,
  ViewStyle,
  I18nManager,
} from 'react-native';
import {Colors, Fonts, Metrix, Images, FontType, Utills} from '../../config';
import {useTranslation} from 'react-i18next';
import { CustomText } from '..';

type SearchBarViewProps = TextInputProps & {
  customStyle?: TextInputProps['style'];
  isIcon?: boolean;
  showCrossIcon?: boolean;
  iconImage?: ImageProps['source'];
  onCrossBtnPress?: () => void;
  onBtnPress?: () => void;
  onPress?: () => void;
  activeOpacity?: any;
  iconStyle?: ImageProps['style'];
  inputRef?: Ref<TextInput>;
};

export const SearchBarView: FC<SearchBarViewProps> = ({
  customStyle,
  isIcon,
  onCrossBtnPress,
  iconImage,
  onBtnPress,
  iconStyle = {},
  inputRef,
  onPress,
  activeOpacity,
  showCrossIcon,
  ...rest
}) => {
  const {t, i18n} = useTranslation();
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      onPress={onPress}
      style={[
        styles.textContainer,
        {paddingHorizontal: Metrix.VerticalSize(10)},
      ]}>
      <View
        style={[
          styles.textContainer,
          {
            ...Metrix.createShadow,
          },
        ]}>
        <Image
          source={Images.Search}
          style={{
            width: 24,
            height: 24,
            marginLeft: Metrix.HorizontalSize(10),
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
          }}
          resizeMode="contain"
        />
        <View
          style={[styles.textInput, customStyle]}
        >
          <CustomText.RegularText
            isSecondaryColor
            ellipsizeMode="tail"
            numberOfLines={1}
            customStyle={{
              fontSize: FontType.FontExtraSmall,
            }}>
              {t('search_course')}
          </CustomText.RegularText>

        </View>
        {showCrossIcon && (
          <TouchableOpacity
            style={{
              // borderWidth:1,
              paddingLeft: Metrix.VerticalSize(10),
            }}
            activeOpacity={0.5}
            onPress={onCrossBtnPress}>
            <Image
              source={Images.GrayCross}
              style={{
                width: 24,
                height: 24,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    // borderWidth: 1,
    borderRadius: Metrix.VerticalSize(50),
    height: Metrix.VerticalSize(50),
    width: '100%',
    flexDirection: 'row',
    //   justifyContent: 'space-between',
    // borderWidth: 1,
    marginVertical: Metrix.VerticalSize(10),
    backgroundColor: Utills.selectedThemeColors().Base,
    borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    alignItems: 'center',
    // overflow: 'hidden',
  },
  textInput: {
    // borderWidth: 1,
    color: Utills.selectedThemeColors().PrimaryTextColor,
    fontSize: Metrix.customFontSize(12),
    padding: Metrix.VerticalSize(12),
    fontFamily: Fonts['Regular'],
    backgroundColor: Utills.selectedThemeColors().Base,
    // textAlign: I18nManager.isRTL ? 'right' : 'left',
    // height: '100%',
    // width: '75%',
  },
});
