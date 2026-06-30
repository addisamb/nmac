import {
  Image,
  ImageProps,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FontType, Metrix, Utills} from '../../config';
import {CustomText} from '..';
import {customText} from 'react-native-paper';
import {color} from 'react-native-reanimated';
// import {  } from '../../config/metrix';

type ChipButtonComponentProps = {
  text?: string;
  customtStyle?: ViewStyle;
  customFontStyle?: TextStyle;
  onPress?: () => void;
};

export const ChipButtonComponent: React.FC<ChipButtonComponentProps> = ({
  text,
  customFontStyle,
  customtStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.TouchableOpacityStyle, customtStyle]}>
      <CustomText.LargeSemiBoldText style={[styles.fontStyle, customFontStyle]}>
        {text}
      </CustomText.LargeSemiBoldText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  TouchableOpacityStyle: {
    // borderWidth: 1,
    backgroundColor: Utills.selectedThemeColors().Primary,
    paddingHorizontal: Metrix.HorizontalSize(17),
    paddingVertical: Metrix.VerticalSize(8),
    marginRight: Metrix.HorizontalSize(7),
    marginVertical: Metrix.HorizontalSize(7),
    borderRadius: Metrix.VerticalSize(20),
  },
  fontStyle: {
    fontSize: FontType.FontSmall,
    color: Utills.selectedThemeColors().Base,
  },
});
