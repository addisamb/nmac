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
  TextStyle,
} from 'react-native';
import {Metrix, Colors, Fonts, Images, FontType, Utills} from '../../config';
import {CustomText} from '..';

export type PrimaryButtonProps = TouchableOpacityProps & {
  title: string;
  isLoading?: boolean;
  disabled?: boolean;
  width?: number | string;
  color?: string;
  fontSize?: number;
  textColor?: string;
  customStyles?: StyleProp<ViewStyle>;
  textStyles?: TextStyle;
  secondaryBtn?: boolean;
};

export const PrimaryButton: FC<PrimaryButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  width = '100%',
  color = Utills.selectedThemeColors().Primary,
  textColor = '#fff',
  fontSize = FontType.FontMedium,
  // textColor = 'red',
  customStyles,
  textStyles,
  secondaryBtn,
  ...rest
}) => {
  // console.log('curreennntntntntnt', Utills.selectedThemeColors());
  // console.log('curreennntntntntnt', textColor);
  return (
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
        secondaryBtn && styles.secondaryBtnStyles,
        customStyles,
      ]}
      disabled={disabled || isLoading}
      {...rest}>
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : (
        <CustomText.RegularText
          customStyle={[
            {color: textColor, fontSize: FontType.FontMedium},
            secondaryBtn && {color: Utills.selectedThemeColors().Primary},
            textStyles,
          ]}>
          {title}
        </CustomText.RegularText>
        // <Text style={{ color: textColor }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

// console.log('dadadadadada', );
const styles = StyleSheet.create({
  buttonContainer: {
    // borderWidth:1,
    height: Metrix.VerticalSize(45),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Metrix.VerticalSize(50),
    marginVertical: Metrix.VerticalSize(10),
    // backgroundColor: selectedTheme(Utills.currentThemeColors()).Primary,
    // backgroundColor: Utills.selectedThemeColors().Primary,
    // ...Metrix.createShadow(),
  },
  // titleText:{
  //   fontFamily: Fonts['Futura-Medium'],
  //   fontSize: Metrix.customFontSize(16),
  //   color: Utills.selectedThemeColors().Primary,
  // }
  secondaryBtnStyles: {
    backgroundColor: Utills.selectedThemeColors().Base,
    borderColor: Utills.selectedThemeColors().Primary,
    borderWidth: 1,
  },
});
