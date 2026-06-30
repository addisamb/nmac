import React, {FC, ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  View,
  ImageProps,
  TextStyle,
  I18nManager,
} from 'react-native';
import {Metrix, Colors, Fonts, Images, FontType, Utills} from '../../config';
import {CustomImage, CustomText, RoundImageContainer} from '..';
import {RoundImageContainerProps} from '../RoundImageContainer';

type PrimaryButtonProps = TouchableOpacityProps &
  RoundImageContainerProps & {
    title: string;
    isLoading?: boolean;
    disabled?: boolean;
    width?: number | string;
    color?: string;
    textColor?: string;
    textStyle?: StyleProp<TextStyle>;
    customStyles?: StyleProp<ViewStyle>;
    isIcon?: boolean;
    imageConatiner?: boolean;
    icon?: ImageProps['source'];
  };

export const SecondaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  width = '100%',
  color = Utills.selectedThemeColors().Base,
  textColor = '#696969',
  textStyle,
  customStyles,
  isIcon,
  source,
  imageConatiner,
  circleWidth = 27,
  ...rest
}) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    style={[
      styles.buttonContainer,
      {
        backgroundColor: disabled
          ? Utills.selectedThemeColors().TextInputPlaceholserColor
          : color,
        width: width,
      },
      customStyles,
    ]}
    disabled={disabled || isLoading}
    {...rest}>
    {isIcon && source && imageConatiner ? (
      <RoundImageContainer
        circleWidth={circleWidth}
        source={source}
        resizeMode="contain"
        styles={{
          marginLeft: Metrix.HorizontalSize(10),
        }}
        borderColor="white"
      />
    ) : (
      <CustomImage
        customStyle={{marginLeft: Metrix.HorizontalSize(10)}}
        source={source}
      />
    )}

    {isLoading ? (
      <ActivityIndicator color={textColor} />
    ) : (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          // borderWidth: 1,
          // borderColor: 'red',
          width: '70%',
        }}>
        <CustomText.RegularText
          customStyle={[
            {
              color: textColor,
              fontSize: FontType.FontMedium,
            },
            textStyle,
          ]}>
          {title}
        </CustomText.RegularText>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonContainer: {
    height: Metrix.VerticalSize(50),
    // justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: Metrix.VerticalSize(50),
    marginVertical: Metrix.VerticalSize(10),
    borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    borderWidth: 2,

    // ...Metrix.createShadow(),
  },
  // titleText:{
  //   fontFamily: Fonts['Futura-Medium'],
  //   fontSize: Metrix.customFontSize(16),
  //   color: Utills.selectedThemeColors().Primary,
  // }
});
