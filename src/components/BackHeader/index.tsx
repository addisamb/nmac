import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
  SafeAreaView,
  I18nManager,
} from 'react-native';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  Utills,
} from '../../config';
import {CustomImage, CustomText} from '..';

type BackHeaderProps = {
  heading?: string;
  customeStyle?: StyleProp<ViewStyle>;
  btnImage?: ImageSourcePropType;
  backArrow?: boolean;
  backFunction?: () => void;
  btnImageStyle?: ImageStyle;
  backBtnImageStyle?: ImageStyle;
  btnFunction?: () => void;
  isPrimary?: boolean;
};

export const BackHeader: React.FC<BackHeaderProps> = ({
  heading = '',
  customeStyle,
  backArrow = true,
  backFunction = () => NavigationService.goBack(),
  backBtnImageStyle,
  btnImage,
  btnImageStyle,
  btnFunction,
  isPrimary = true,
}) => {
  return (
    <SafeAreaView
      style={[
        // styles.container,
        {
          backgroundColor: isPrimary
            ? Utills.selectedThemeColors().Primary
            : Utills.selectedThemeColors().Base,
        },
      ]}>
      <View style={[styles.container, customeStyle]}>
        {backArrow ? (
          <TouchableOpacity style={styles.backButton} onPress={backFunction}>
            <CustomImage
              source={Images.Arrow}
              customStyle={[
                styles.backImage,
                !isPrimary && {tintColor: Utills.selectedThemeColors().Primary},
                backBtnImageStyle,
              ]}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.backButton} />
        )}
        <View style={styles.headingContainer}>
          <CustomText.LargeBoldText
            customStyle={{
              fontSize: FontType.FontRegular,
              color: isPrimary
                ? Utills.selectedThemeColors().Base
                : Utills.selectedThemeColors().PrimaryTextColor,
            }}>
            {heading}
          </CustomText.LargeBoldText>
        </View>
        {btnImage && (
          <TouchableOpacity
            style={[styles.backButton, {alignItems: 'flex-end'}]}
            onPress={btnFunction}>
            <CustomImage
              source={btnImage}
              customStyle={[styles.backImage, btnImageStyle]}
            />
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    paddingVertical: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.VerticalSize(10),
    // borderWidth: 1,
  },
  backButton: {
    width: '8%',
    // transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
    // justifyContent:"flex-start",
    // borderWidth: 1,
    // borderColor:'white'
  },
  backImage: {
    // marginRight: Metrix.HorizontalSize(12),
    width: Metrix.HorizontalSize(30),
    height: Metrix.VerticalSize(29),
    // borderWidth: 1,
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  headingContainer: {
    // paddingVertical:5,
    width: '84%',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign:'center'
  },
});


