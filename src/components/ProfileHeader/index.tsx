import {
  Image,
  ImageStyle,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from 'react-native';
import React, {Children} from 'react';
import {
  RoundImageContainer,
  RoundImageContainerProps,
} from '../RoundImageContainer';
import {Colors, FontType, Images, Metrix, Utills} from '../../config';
import {CustomImage, CustomText, FadeContainer} from '..';
import {TouchableOpacity} from 'react-native-gesture-handler';

type ProfileHeaderProps = RoundImageContainerProps & {
  onChangePhoto?: () => void;
  btnText?: string;
  headingText?: string;
  subHeadingText?: string;
  customMainContainerStyle?: ViewStyle;
  uploadPhotoIcons?: boolean;
  onPressCheck?: () => void;
  onPressCancel?: () => void;
};

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  onChangePhoto,
  source,
  customMainContainerStyle,
  uploadPhotoIcons,
  onPressCancel,
  onPressCheck,
}) => {
  return (
    <View style={customMainContainerStyle}>
      <RoundImageContainer
      isEdit
      onPress={onChangePhoto}
        source={source || Images.user2}
        roundContainerStyle={{
          position: 'relative',
          // borderWidth: 1,
        }}
      />
    </View>
  );
};

interface ProfileHeaderStyles {
  textStyle: TextStyle;
  iconBtnsStyle: ViewStyle;
  iconBtnsImageStyle: ImageStyle;
  iconsMainContainer: ViewStyle;
}
const styles = StyleSheet.create<ProfileHeaderStyles>({
  textStyle: {
    textAlign: 'center',
    letterSpacing: 0.2,
    lineHeight: 25,
  },
  iconBtnsImageStyle: {width: '100%', height: '100%'},
  iconBtnsStyle: {
    width: Metrix.HorizontalSize(25),
    height: Metrix.VerticalSize(25),
  },
  iconsMainContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    // borderColor: 'red',
    height: Metrix.VerticalSize(30),
    width: '30%',
    alignSelf: 'center',
  },
});
{
  /* 
<TouchableOpacity
        activeOpacity={0.5}
        onPress={onChangePhoto}
        style={{
          borderWidth: 1,
          backgroundColor: 'yellow',
          bottom: '100%',
          // zIndex: 1000,
          left: '20%',
          position: 'absolute',
          height: Metrix.VerticalSize(30),
          width: Metrix.HorizontalSize(30),
          borderRadius: Metrix.HorizontalSize(15),
        }}>
        <CustomImage
          source={Images.CameraCircle}
          customStyle={{
            borderWidth: 1,
            // width: Metrix.HorizontalSize(30),
            borderRadius: Metrix.HorizontalSize(15),
          }}
        />
      </TouchableOpacity> */
}
