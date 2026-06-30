import {
  Animated,
  Image,
  ImageProps,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState, useTransition} from 'react';
import {CustomText, FadeContainer, PrimaryButton} from '../../../components';
import {
  Colors,
  FontType,
  Fonts,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {OnBoardingProps} from '../../propTypes';
import Onboarding from 'react-native-onboarding-swiper';
import {t} from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import { isLogin } from '../../../Redux/Action/AuthActions/authActions';



const Square: React.FC<{isLight: any; selected: any}> = ({
  isLight,
  selected,
}) => {
  const opacity = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: selected ? 1 : 0.2,
      duration: 3000, // Adjust the duration as needed
      useNativeDriver: true, // Enable native driver for performance
    }).start();
  }, [selected]);
  // let backgroundColor;
  // if (isLight) {
  //   backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';
  // } else {
  //   backgroundColor = selected ? 'red' : 'blue';
  // }
  return (
    <Animated.View
      style={{
        width: Metrix.HorizontalSize(selected ? 16 : 8),
        height: Metrix.VerticalSize(8),
        borderRadius: Metrix.VerticalSize(50),
        marginHorizontal: 10,
        backgroundColor: selected
          ? Utills.selectedThemeColors().Primary
          : Utills.selectedThemeColors().DotGrey,
        opacity: opacity, // Use the animated opacity value
      }}
    />
  );
};

const Skip: React.FC<{isLight: any; skipLabel: any}> = ({
  isLight,
  skipLabel,
  ...props
}) => {
  const dispatch = useDispatch()
  const handleOnSkipAndDone = () => {
    dispatch(isLogin("afterOnboard"));
    NavigationService.navigate(RouteNames.AuthRoutes.SignUpScreen);
    return
  };

  const check = useSelector((state)=>state?.AuthReducer?.check)
  console.log("check===>",check);
  

  return (
    <FadeContainer
      mainViewStyle={{
        justifyContent: 'center',
        // borderWidth: 1,
        width: Metrix.VerticalSize(50),
      }}>
      <TouchableOpacity onPress={handleOnSkipAndDone}>
        <CustomText.RegularText isSecondaryColor>
          {t('skip')}
        </CustomText.RegularText>
      </TouchableOpacity>
    </FadeContainer>
  );
};

export const Next: React.FC<{isLight: any}> = ({isLight, ...props}) => {
  return (
    <PrimaryButton
      title={t('next')}
      customStyles={{width: Metrix.HorizontalSize(100)}}
      {...props}
    />
  );
};

const ImageComp: React.FC<{source: ImageProps['source']}> = ({source}) => (
  <View
    style={{
      // borderWidth: 1,
      width: '80%',
      height: '70%',
    }}>
    <Image
      source={source}
      resizeMode="contain"
      style={{width: '100%', height: '100%'}}
    />
  </View>
);

export const OnBoarding: React.FC<OnBoardingProps> = () => {
  const dispatch = useDispatch()
  const handleOnSkipAndDone = () => {
    dispatch(isLogin("afterOnboard"));
    NavigationService.reset_0(RouteNames.AuthRoutes.SignUpScreen);
    return
  };
  const Done = () => (
    <PrimaryButton
      title={t('next')}
      customStyles={{width: Metrix.HorizontalSize(100)}}
      onPress={handleOnSkipAndDone}
    />
  );

  return (
    <View style={{flex: 1}}>
      <Onboarding
        DotComponent={Square}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        bottomBarHighlight={false}
        showPagination
        // containerStyles={{
        //   borderWidth:2,
        //   borderColor:'red'
        // }}
        // titleStyles={{color: 'blue',borderWidth:1}} // set default color for the title

        pages={[
          {
            backgroundColor: '#DEE9FF',
            image: <ImageComp source={Images.OnBoard1} />,
            title: t('Onboarding_heading1'),
            subtitle: t('Onboarding_text1'),
            titleStyles: {color: 'red'}, // overwrite default color
          },
          {
            backgroundColor: '#DFE',
            image: <ImageComp source={Images.OnBoard2} />,
            title: t('Onboarding_heading2'),
            subtitle: t('Onboarding_text2'),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderWidth: 1,
    borderRadius: Metrix.VerticalSize(10),
    height: Metrix.VerticalSize(45),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: Metrix.VerticalSize(10),
    backgroundColor: Utills.selectedThemeColors().TextInputBaseColor,
    borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    paddingHorizontal: Metrix.VerticalSize(10),
  },
  loaderStyles: {
    // borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
