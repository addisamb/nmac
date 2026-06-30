import React, {FC} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
  ImageProps,
  Text,
} from 'react-native';
import {Colors, Images, Metrix, Utills} from '../../config';
import {FadeInImage, FadeInImageProps} from '../FadeInImage';
import {CustomImage} from '../CustomImage';

export type RoundImageContainerProps = FadeInImageProps & {
  circleWidth?: number;
  backgroundColor?: string;
  borderRadius?: number | null;
  borderColor?: string;
  borderWidth?: number;
  styles?: ViewStyle;
  customContainerStyle?: ViewStyle;
  roundContainerStyle?: ViewStyle;
  customImageStyles?: ViewStyle;
  imageStyle?: ImageStyle;
  defaultSource?: any;
  isEdit?: boolean;
  PressPencil?: () => void;
  onPress?: any;
  children?: any;
};

export const RoundImageContainer: FC<RoundImageContainerProps> = ({
  source,
  circleWidth = 100,
  backgroundColor = Utills.selectedThemeColors().Base,
  borderRadius = null,
  borderColor = Utills.selectedThemeColors().Primary,
  borderWidth = StyleSheet.hairlineWidth,
  styles = {},
  onPress,
  customContainerStyle = {},
  roundContainerStyle = {},
  customImageStyles,
  imageStyle,
  defaultSource,
  isEdit = false,
  PressPencil,
  resizeMode = 'cover',
  children,
}) => {
  return (
    <View
      style={[
        {alignItems: 'center', position: 'relative'},
        customContainerStyle,
      ]}>
      <View
        style={[
          {
            width: Metrix.HorizontalSize(circleWidth),
            backgroundColor: backgroundColor,
            height: Metrix.HorizontalSize(circleWidth),
            borderRadius: borderRadius
              ? Metrix.HorizontalSize(borderRadius)
              : Metrix.HorizontalSize(circleWidth / 2),
            borderColor: borderColor,
            borderWidth: borderWidth,
            overflow: 'hidden',
            ...styles,
          },
          roundContainerStyle,
        ]}>
        <FadeInImage
          source={source}
          resizeMode={resizeMode}
          customImageContainerStyle={{width: '100%', height: '100%'}}
          imageStyles={imageStyle}
        />
      </View>
      {children}
      {isEdit && (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={{
          position: 'absolute',
          top: 75,
          left: 110,
        }}>
        <CustomImage
          source={Images.CameraCircle}
          customStyle={{
            borderRadius: Metrix.HorizontalSize(15),
          }}
        />
      </TouchableOpacity>
      )}
      {/* {isEdit && (
        <TouchableOpacity
          style={{
            position: 'absolute',
            top: 8,
            right: 0,
            width: Metrix.VerticalSize(25),
            height: Metrix.VerticalSize(25),
            backgroundColor: '#ffffff',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: Metrix.HorizontalSize(circleWidth / 2),
          }}
          onPress={PressPencil}>
          <Image
            source={Images.Pencil}
            style={{
              tintColor: Utills.selectedThemeColors().Primary,
              width: '60%',
              height: '60%',
            }}
          />
        </TouchableOpacity>
      )} */}
    </View>
  );
};
