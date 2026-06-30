import {
  I18nManager,
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
import {Colors, FontType, Images, Metrix, Utills} from '../../config';
import {CustomText, FadeContainer} from '..';

type NormalCardComponentProps = {
  text?: string;
  subtext?: string;
  // icon?:IconProps['source'];
  image: ImageProps['source'];
  icon: ImageProps['source'];
  imageStyle?: ImageProps['style'];
  onPress?: () => void;
  customtouchableOpacityStyle?: ViewStyle;
};

export const NormalCardComponent: React.FC<NormalCardComponentProps> = ({
  text,
  image,
  icon,
  onPress,
  customtouchableOpacityStyle,
}) => {
  return (
    // <MainContainer>s
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={[styles.touchableOpacityStyle, customtouchableOpacityStyle]}>
      <Image
        source={image}
        style={{
          //  borderWidth:1,
          height: Metrix.VerticalSize(34),
          width: Metrix.HorizontalSize(35),
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
        }}
        resizeMode="contain"
      />
      <CustomText.LargeBoldText customStyle={styles.textStyle}>
        {text}
      </CustomText.LargeBoldText>
      <Image
        source={icon}
        style={{
          height: Metrix.VerticalSize(24),
          width: Metrix.HorizontalSize(24),
          transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
        }}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    // borderWidth:1,
    width: '70%',
    fontSize: FontType.FontRegular,
    textAlign: I18nManager.forceRTL ? 'left' : 'right',
  },
  container: {
    // flex: 1,
    // alignItems: 'center',
    justifyContent: 'flex-end',
  },
  touchableOpacityStyle: {
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(10),
    borderRadius: Metrix.VerticalSize(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Metrix.HorizontalSize(10),
    backgroundColor: Utills.selectedThemeColors().Base,
    ...Metrix.createShadow,
  },
});
