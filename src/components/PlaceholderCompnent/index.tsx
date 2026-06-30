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
import {MainContainer} from '../MainContainer';
import {PrimaryButton, PrimaryButtonProps} from '../PrimaryButton';
import {Colors, Metrix, Utills} from '../../config';
import {CustomText, FadeContainer} from '..';
import {MultipleHeadingComponentProps} from '../MultipleHeadingComponent';

type PlaceholderComponentProps = PrimaryButtonProps &
  MultipleHeadingComponentProps & {
    image: ImageProps['source'];
    imageStyle?: ImageProps['style'];
    bottomBtnText?: string;
    buttonViewStyle?: ViewStyle;
    containerStyle?: ViewStyle;
    onBottombtnPress?: () => void;
  };

export const PlaceholderComponent: React.FC<PlaceholderComponentProps> = ({
  mainHeading,
  heading,
  subHeading,
  image,
  title,
  BtnLoader,
  onPress,
  containerStyle,
  imageStyle,
  bottomBtnText,
  buttonViewStyle,
  onBottombtnPress,
}) => {
  return (
    <FadeContainer>
      <MainContainer>
        <View style={[styles.container, containerStyle]}>
          <CustomText.LargeBoldText
            customStyle={[
              styles.textStyle,
              {
                // marginTop: Metrix.VerticalSize(70),
                color: Utills.selectedThemeColors().Primary,
              },
            ]}>
            {mainHeading}
          </CustomText.LargeBoldText>
          <Image
            source={image}
            style={[styles.placeholderStyle, imageStyle]}
            resizeMode="contain"
          />
          <CustomText.LargeBoldText
            customStyle={[
              styles.textStyle,
              {
                marginTop: Metrix.VerticalSize(50),
                color: Utills.selectedThemeColors().Primary,
              },
            ]}>
            {heading}
          </CustomText.LargeBoldText>
          <CustomText.RegularText
            isSecondaryColor
            customStyle={[
              styles.textStyle,
              {
                lineHeight: Metrix.VerticalSize(20),
                marginTop: Metrix.VerticalSize(5),
              },
            ]}>
            {subHeading}
          </CustomText.RegularText>
        </View>
        <View
          style={[
            {
              flex: 1,
              justifyContent: 'flex-end',
            },
            buttonViewStyle,
          ]}>
          <PrimaryButton isLoading={BtnLoader} onPress={onPress} title={title} />
          <TouchableOpacity activeOpacity={0.7} onPress={onBottombtnPress}>
            {bottomBtnText && (
              <CustomText.MediumText
                customStyle={{
                  textAlign: 'center',
                  color: Utills.selectedThemeColors().Primary,
                  marginTop: Metrix.VerticalSize(20),
                }}>
                {bottomBtnText}
              </CustomText.MediumText>
            )}
          </TouchableOpacity>
        </View>
      </MainContainer>
    </FadeContainer>
  );
};

interface PlaceholderComponentStyles {
  textStyle: TextStyle;
  container: ViewStyle;
  placeholderStyle: ImageStyle;
}
const styles = StyleSheet.create<PlaceholderComponentStyles>({
  textStyle: {textAlign: 'center'},
  container: {
    flex: 1,
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#ffffff',
    justifyContent: 'flex-end',
  },
  placeholderStyle: {width: '80%', height: Metrix.VerticalSize(158)},
});
