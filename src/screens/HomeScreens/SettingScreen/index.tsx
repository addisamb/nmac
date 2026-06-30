import {
  I18nManager,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {SearchProps} from '../../propTypes';
import {
  BackHeader,
  CustomModal,
  CustomText,
  MainContainer,
  PrimaryButton,
  SecondaryButton,
  ToggleComponent,
} from '../../../components';
import {SettingScreenProps} from '../../propTypes';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {t} from 'i18next';
import RNRestart from 'react-native-restart';
// import {AuthActions, HomeActions} from '../../../redux/actions';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
// import {RootState} from '../../../redux/reducers';
import {normalizeFont} from '../../../config/metrix';
import {RootState} from '../HomeScreen';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import {Store} from '../../../Redux/Store/Store';
import navigationService from '../../../config/navigationService';
import Share from 'react-native-share';
import { ChangeLanguageApi, GetProfileData, muteNotifications} from '../../../Redux/Action/HomeActions/homeActions';

export const SettingScreen: React.FC<SettingScreenProps> = ({}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [modalPostVisible, setModalPostVisible] = useState(false);

  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const handleExchangeWay = (lang: string) => {
    setSelectedButton(lang);
    setSelectedExchange(lang);
  };

  const [sound, setSound] = useState(false);
  const [muteNotification, setMuteNotification] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDrakMode = () => {
    // dispatch(HomeActions.setDarkMode());
    // setTimeout(() => RNRestart.restart(), 300);
    setDarkMode(prev => !prev);
  };

  const isContinueButtonDisabled = !selectedLanguage;
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };


  async function handleNotification() {
    const updatedUserData = {...userData};
    updatedUserData.muteNotifications = !userData.muteNotifications;

    dispatch({
      type: ActionType.GET_ME_DATA,
      payload: updatedUserData,
    });

    await dispatch(muteNotifications());
  }


  async function getMyData() {
    let res = await dispatch(GetProfileData());

    if (res?.status) {
      dispatch({
        type: ActionType.GET_ME_DATA,
        payload: res?.responseData,
      });
    }
    dispatch({type: ActionType.HOME_LOADER, payload: false});
    return res?.status
  }

  const handleContinue = async () => {

    if (selectedLanguage) {
      let body =  {
        language: selectedLanguage == 'ar' ? "arabic" : "english"
      }
      let res = await dispatch(ChangeLanguageApi(body));

      console.log('Log===>>>', res);

      if (res?.status) {
        
        getMyData()
        
      if (selectedLanguage != i18n.language) {
        i18n.changeLanguage(selectedLanguage).then(() => {
          console.log(
            'res------',
            selectedLanguage != i18n.language,
            i18n.language,
            selectedLanguage,
          );
          I18nManager.forceRTL(selectedLanguage == 'ar');
          // dispatch(AuthActions.changeRouteOnLang(true));
          setTimeout(() => RNRestart.Restart(), 300);
        });
      }
      // NavigationService.navigate(RouteNames.AuthRoutes.OnBoardingScreen);
    }
    }

  };

  const onShare = async () => {
    // const getLink = await generateLink()
    try {
      const shareOptions = {
        message: `${'https://www.nmoacademy.com'} \n\nReferral Code: ${userData?.referralCode}`, 
      };
      await Share.open(shareOptions)
        .then((res: any) => {
          console.log('respones==>', res);
        })
        .catch((err: any) => {
          console.log('respones==>', err);
        });
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
    }
  };

  const HandleNavigationHelp = () => {
    navigationService.navigate(RouteNames.HomeRoutes.SupportAgent);
  };

  const HandleNavigationPrivacyContetn = () => {
    navigationService.navigate(RouteNames.HomeRoutes.PrivacyContentScreen);
  };

  const languageOptions = [
    {name: 'العربية', icon: Images.user2, lang: 'ar'},
    {name: 'english', icon: Images.user1, lang: 'en'},
  ];
  const ToggleData = [
    // {
    //   text: t('dark_mode'),
    //   showToggle: true,
    //   value: darkMode,
    //   onValueChange: toggleDrakMode,
    // },
    {
      text: t('language'),
      showToggle: false,
      showText: true,
      iconImage: Images.ArrowChevron,
      onPress: () => setModalPostVisible(true),
    },

    {
      text: t('mute_notification'),
      showToggle: true,
      value: userData?.muteNotifications,
      onValueChange: () => handleNotification(),
    },
    // {
    //   text: t('sound'),
    //   showToggle: true,
    //   value: sound,
    //   onValueChange: () => setSound(prev => !prev),
    // },
    // {text: t('invite_friends')},
    // {text: t('privacy')},
    // {
    //   text: t('help'),
    //   onPress: () => setModalPostVisible(true),
    // },
  ];

  const renderItemArray = [
    {text: t('invite_friends'), onPress: () => onShare()},
    {text: t('privacy'), onPress: () => HandleNavigationPrivacyContetn()},
    {
      text: t('help'),
      onPress: () => HandleNavigationHelp(),
    },
  ];

  return (
    <>
      <BackHeader heading={t('setting')} />
      <View
        style={{
          // borderWidth:1,
          padding: Metrix.HorizontalSize(20),
        }}>
        {ToggleData.map((option, index) => (
          <ToggleComponent
            key={index}
            text={option.text}
            showText={option.showText}
            iconImage={option.iconImage}
            onPress={option.onPress}
            showToggle={option.showToggle}
            value={option?.value}
            onValueChange={option?.onValueChange}
          />
        ))}

        <>
          {renderItemArray.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                // borderWidth: 1,
                marginTop: Metrix.HorizontalSize(20),
              }}
              onPress={item.onPress} // Attach onPress if it exists
            >
              <CustomText.LargeSemiBoldText
                customStyle={{
                  fontSize: FontType.FontMedium,
                }}>
                {item.text}
              </CustomText.LargeSemiBoldText>
            </TouchableOpacity>
          ))}

          {/* <PrimaryButton
            onPress={() => {
              handleNotification();
            }}
            title={'button'}
          /> */}
        </>
      </View>

      <CustomModal
        onClose={() => {
          setModalPostVisible(false);
        }}
        bottomModal
        smallContainerStyles={{
          height: '42%',
        }}
        visible={modalPostVisible}>
        <CustomText.LargeBoldText customStyle={styles.modalTextStyle}>
          {t('select_language')}
        </CustomText.LargeBoldText>
        <View
          style={{
            paddingHorizontal: Metrix.HorizontalSize(25),
            marginTop: Metrix.VerticalSize(25),
          }}>
          {languageOptions.map((option, index) => (
            <SecondaryButton
              key={index}
              circleWidth={35}
              title={option.name}
              source={option.icon}
              isIcon
              onPress={() => {
                handleLanguageSelect(option.lang);
                handleExchangeWay(option.lang);
              }}
              textStyle={{
                fontSize: normalizeFont(15),
                color:
                  selectedButton === option.lang
                    ? Utills.selectedThemeColors().Primary
                    : Utills.selectedThemeColors().LightGreyText,
              }}
              customStyles={{
                borderColor:
                  selectedLanguage === option.lang
                    ? Utills.selectedThemeColors().Primary
                    : Utills.selectedThemeColors().LightGreyText,
              }}
            />
          ))}
        </View>
        <PrimaryButton
          customStyles={{
            alignSelf: 'center',
            height: Metrix.VerticalSize(32),
            width: Metrix.HorizontalSize(121),
          }}
          onPress={() => {
            handleContinue();
          }}
          disabled={isContinueButtonDisabled}
          title={t('apply')}
        />
      </CustomModal>
    </>
  );
};

interface SettingScreenStyles {}
const styles = StyleSheet.create({
  modalViewStyle: {
    alignSelf: 'center',
    borderRadius: 10,
    height: Metrix.VerticalSize(10),
    width: Metrix.HorizontalSize(140),
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
  modalTextStyle: {
    fontSize: normalizeFont(17),
    marginTop: Metrix.VerticalSize(10),
    textAlign: 'center',
  },
});
