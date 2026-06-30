import React, {useEffect, useState} from 'react';
import {View, I18nManager} from 'react-native';
import {
  AuthHeader,
  CustomText,
  PrimaryButton,
  SecondaryButton,
} from '../../../components';
import {SelectLanguageProps} from '../../propTypes';
import {Images, NavigationService, RouteNames, Utills} from '../../../config';
import {useTranslation} from 'react-i18next';
import RNRestart from 'react-native-restart';
import {ISO_8601} from 'moment';
import {useDispatch, useSelector} from 'react-redux';
// import {AuthActions} from '../../../redux/actions';
// import {RootState} from '../../../redux/reducers';
import navigationService from '../../../config/navigationService';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SelectLanguage: React.FC<SelectLanguageProps> = ({}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();
  // const boardingStatus = useSelector(
  //   (state: RootState) => state?.user.onboardingstatus,
  // );
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(
    i18n.language || null,
  );


  // useEffect(() => {
  //   checkFirstLaunch();
  // }, []);
  // const checkFirstLaunch = async () => {
  //   try {
  //     const isFirstLaunch = await AsyncStorage.getItem('firstLaunch');

  //     if (isFirstLaunch === null) {
  //       // App is launching for the first time
  //       await AsyncStorage.setItem('firstLaunch', 'false');
  //       console.log('This is the first launch!');
  //     } else {
  //       navigationService.reset_0(RouteNames.AuthRoutes.SignUpScreen)
  //       // App has been launched before
  //       console.log('Welcome back!');
  //     }
  //   } catch (error) {
  //     console.error('Error checking first launch:', error);
  //   }
  // };

  
  const isContinueButtonDisabled = !selectedLanguage;

  const handleLanguageSelect = (language: string) => {
    // setSelectedLanguage(language);
    setSelectedLanguage(language);
    handleContinue(language);
  };

  const handleContinue = (lang: string) => {
    if (lang) {
      console.log('Log===>>>', i18n.language, lang);
      if (lang != i18n.language) {
        i18n.changeLanguage(lang).then(() => {
          console.log('res------', lang != i18n.language, i18n.language, lang);
          I18nManager.forceRTL(lang == 'ar');
          // dispatch(AuthActions.changeRouteOnLang(true));
          setTimeout(() => RNRestart.Restart(), 300);
        });
      }
      // if (boardingStatus == true) {
      //   NavigationService.navigate(RouteNames.AuthRoutes.SignUpScreen);
      // } else {
      //   NavigationService.navigate(RouteNames.AuthRoutes.OnBoardingScreen);
      // }
    }
  };



  const languageOptions = [
    {name: t('arabic'), icon: Images.user2, lang: 'ar'},
    {name: t('english'), icon: Images.user1, lang: 'en'},
  ];

  return (
    <AuthHeader
      heading={t('select_language')}
      isBtn
      title={t('continue')}
      onPress={() => {
        // handleContinue()
        // dispatch({
        //   type: ActionType.CHECK,
        //   payload: "hemlo2",
        // });

        NavigationService.reset_0(RouteNames.AuthRoutes.OnBoardingScreen);
      }}
      disabled={isContinueButtonDisabled}>
      {languageOptions.map((option, index) => (
        <SecondaryButton
          key={index}
          circleWidth={35}
          title={option.name}
          source={option.icon}
          isIcon
          onPress={() => {
            // handleContinue();
            handleLanguageSelect(option.lang);
          }}
          customStyles={{
            borderColor:
              selectedLanguage === option.lang
                ? Utills.selectedThemeColors().Primary
                : Utills.selectedThemeColors().LightGreyText,
          }}
        />
      ))}
    </AuthHeader>
  );
};
