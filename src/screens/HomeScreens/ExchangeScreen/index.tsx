import React, {useState, useEffect, useRef} from 'react';
import {
  BackHandler,
  Button,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  TextInput,
  I18nManager, // Added for the loader
} from 'react-native';
import {
  BackHeader,
  CategoryBtnsList,
  ChipButtonComponent,
  CustomImage,
  CustomInput,
  CustomModal,
  CustomText,
  MainContainer,
  PlaceholderComponent,
  PointCard,
  PrimaryButton,
  SecondaryButton,
  TransactionDetailsComponent,
  UserTransactionInfo,
} from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {RoundBorderCardComponent} from '../../../components/RoundBorderCardComponent';
import {ExchangetScreenProps} from '../../propTypes';
import {
  HorizontalSize,
  VerticalSize,
  normalizeFont,
} from '../../../config/metrix';
import {ProgressBar, MD3Colors} from 'react-native-paper';
import utills from '../../../config/utills';
import metroConfig from '../../../../metro.config';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import {merge} from 'lodash';
import {t} from 'i18next';
import { useSelector } from 'react-redux';
import { RootState } from '../HomeScreen';
// import React from 'react';

export const ExchangeScreen: React.FC<ExchangetScreenProps> = ({}) => {

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const [selectedExchange, setSelectedExchange] = useState<string | null>(null);
  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isContinue, setIsContinue] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState<string | null>(null);
  const handleExchangeWay = (lang: string) => {
    setSelectedButton(lang);
    setSelectedExchange(lang);
  };

  let passwordRef = useRef<TextInput>(null!);

  // const handleOnClosePost = () => {
  //   setModalVisible(false);
  // };

  // const handleLanguageSelect = (language: string) => {
  //   setSelectedExchange(language);
  // };

  const handleContinue = () => {
    if (selectedExchange) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setIsContinue(true);
      }, 2000);
    }
  };

  const ExchangeData = [
    {
      name: t('exchange_with_money'),
      icon: Images.ExchangeWallet,
      lang: 'byMoney',
    },
    {
      name: t('exchange_with_courses'),
      icon: Images.OnlineEducation,
      lang: 'byCourses',
    },
  ];

  return (
    <>
      <BackHeader heading={t('exchange')} isPrimary={false} />

      <MainContainer>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
          }}>
          <View>
            <CustomImage
              customStyle={{
                alignSelf: 'center',
                marginTop: VerticalSize(80),
                width: Metrix.customImageSize(210),
                height: Metrix.customImageSize(170),
              }}
              source={Images.GroupExchange}
            />

            <View
              style={{
                marginTop: 30,
              }}>
              <View
                style={{
                  alignItems: 'center',
                }}>
                <CustomImage source={Images.GroupStar}
                customStyle={{
                  width: Metrix.customImageSize(52),
                height: Metrix.customImageSize(23),
                }}
                />
              </View>

              <View
                style={{
                  // borderWidth:1,
                  // width: Metrix.HorizontalSize(110),
                  alignSelf: 'center',
                  flexDirection: 'row',
                  marginTop: Metrix.customImageSize(15)
                  // justifyContent: 'space-between',
                }}>
                <CustomText.LargeSemiBoldText
                  customStyle={{
                    fontSize: normalizeFont(14),
                  }}>
                    {`${t('number_of_points')} ${Math.round(userData?.coins)}`}
                </CustomText.LargeSemiBoldText>

                {/* <CustomText.LargeBoldText
                  customStyle={{
                    fontSize: normalizeFont(20),
                    color: Utills.selectedThemeColors().Primary,
                  }}>
                   {t('point')}
                </CustomText.LargeBoldText> */}
              </View>
            </View>
          </View>
          <View>
            <PrimaryButton
              onPress={() => setModalPostVisible(true)}
              title={t('get_exchange')}
            />
          </View>
        </View>
      </MainContainer>
      <CustomModal
        onClose={() => {
          setModalPostVisible(false);
        }}
        smallModal
        crossIcon
        visible={modalPostVisible}>
        <View style={{flex: 1, width: '100%'}}>
          {loading ? (
            <ActivityIndicator
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 4000000,
                // backgroundColor: 'rgba(0,0,0,0.5)',
              }}
              size="large"
              color={Utills.selectedThemeColors().Primary}
            />
          ) : isContinue ? (
            <View>
              <CustomText.LargeSemiBoldText
                customStyle={{
                  textAlign: 'center',
                  color: Utills.selectedThemeColors().Primary,
                  fontSize: normalizeFont(17),
                }}>
                {t('points')}
              </CustomText.LargeSemiBoldText>

              {selectedExchange === 'byMoney' ? (
                <View
                  style={{
                    marginTop: Metrix.VerticalSize(45),
                    alignItems: 'center',
                    // borderWidth: 1,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={styles.likeStarImageStyle}
                      source={Images.LikeStar}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <CustomText.MediumText
                        customStyle={styles.exchangeItemSmallModal}>
                        {t('exchange_with_money')}
                      </CustomText.MediumText>
                      <Image
                        style={styles.greenArrowStyle}
                        source={Images.RightArrow}
                        resizeMode="contain"
                      />
                    </View>
                    <Image
                      style={styles.likeStarImageStyle}
                      source={Images.ExchangeWallet}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      // borderWidth: 1,
                      marginTop: Metrix.VerticalSize(20),
                    }}>
                    <CustomText.LargeSemiBoldText
                      customStyle={{
                        fontSize: FontType.FontSmall,
                        color: Utills.selectedThemeColors().Primary,
                      }}>
                      {t('sar')}
                    </CustomText.LargeSemiBoldText>
                    <CustomText.MediumText
                      style={{
                        fontSize: normalizeFont(13),
                      }}>
                      {t('total_points')}: {Math.round(userData?.coins)}
                    </CustomText.MediumText>

                    <PrimaryButton
                      onPress={() => {
                        setModalPostVisible(false);
                        setIsContinue(false);
                        setTimeout(() => {
                          NavigationService.navigate(RouteNames.HomeRoutes.MyWalletScreen);
                        }, 500);
                      }}
                      customStyles={styles.claimNowButtonStyle}
                      title={t('claim_now')}
                    />
                  </View>
                </View>
              ) : selectedExchange === 'byCourses' ? (
                <View
                  style={{
                    marginTop: Metrix.VerticalSize(45),
                    alignItems: 'center',
                    // borderWidth: 1,
                  }}>
                  <View
                    style={{
                      width: '100%',
                      // borderWidth: 1,
                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      // alignItems:"center"
                    }}>
                    <Image
                      style={styles.likeStarImageStyle}
                      source={Images.LikeStar}
                      resizeMode="contain"
                    />
                    <View
                      style={{
                        alignItems: 'center',
                      }}>
                      <CustomText.MediumText
                        customStyle={{
                          color: Utills.selectedThemeColors().stroke,
                          fontSize: normalizeFont(13),
                          textAlign: 'center',
                        }}>
                        {t('exchange_with_courses')}
                      </CustomText.MediumText>
                      <Image
                        style={styles.greenArrowStyle}
                        source={Images.RightArrow}
                        resizeMode="contain"
                      />
                    </View>
                    <Image
                      style={styles.likeStarImageStyle}
                      source={Images.OnlineEducation}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      // borderWidth: 1,
                      marginTop: Metrix.VerticalSize(20),
                    }}>
                    <PrimaryButton
                      onPress={() => {
                        setModalPostVisible(false);
                        setIsContinue(false);
                        NavigationService.navigate(
                          RouteNames.HomeRoutes.RewardCoursesScreen,
                        );
                      }}
                      customStyles={{
                        marginTop: Metrix.VerticalSize(40),
                        width: Metrix.HorizontalSize(150),
                        height: Metrix.VerticalSize(40),
                      }}
                      title={t('claim_now')}
                    />
                  </View>
                </View>
              ) : null}
            </View>
          ) : (
            <>
              <CustomText.LargeSemiBoldText
                customStyle={{
                  textAlign: 'center',
                  color: Utills.selectedThemeColors().Primary,
                  fontSize: normalizeFont(17),
                }}>
                {t('select_exchange_way')}
              </CustomText.LargeSemiBoldText>

              <View
                style={{
                  marginTop: Metrix.VerticalSize(20),
                }}>
                {ExchangeData.map((option, index) => (
                  <SecondaryButton
                    key={index}
                    // circleWidth={25}
                    title={option.name}
                    source={option.icon}
                    imageConatiner
                    onPress={() => {
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
                        selectedExchange === option.lang
                          ? Utills.selectedThemeColors().Primary
                          : Utills.selectedThemeColors().LightGreyText,
                    }}
                  />
                ))}
              </View>
              <PrimaryButton
                onPress={handleContinue}
                customStyles={{
                  alignSelf: 'center',
                  width: Metrix.HorizontalSize(180),
                }}
                disabled={selectedExchange == null ? true : false}
                title={t('continue')}
              />
            </>
          )}
        </View>
      </CustomModal>

      {/* <CustomModal
        childrenViewStyle={{}}
        onClose={handleOnClosePost}
        visible={modalVisible}>
        <PlaceholderComponent
          containerStyle={{marginTop: Metrix.VerticalSize(48)}}
          mainHeading={t("congratulations")}
          heading={t(`sar`)}
          image={Images.CoinBox}
          imageStyle={styles.imageStyle}
          buttonViewStyle={{
            justifyContent: 'space-around',
          }}
          subHeading={t(`SAR_now_in_your_mobile_wallet`)}
          title={t('go_to_wallet')}
          onPress={() => {
            handleOnClosePost();
            NavigationService.navigate(RouteNames.HomeRoutes.MyWalletScreen);
          }}
        />
      </CustomModal> */}
    </>
  );
};

const styles = StyleSheet.create({
  btnImageStyle: {
    width: Metrix.HorizontalSize(24),
    height: Metrix.HorizontalSize(24),
    tintColor: utills.selectedThemeColors().PrimaryTextColor,
  },
  headerCustomStyle: {
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingTop: Metrix.VerticalSize(45),
    alignItems: 'center',
  },
  likeStarImageStyle: {
    width: Metrix.HorizontalSize(55),
    height: Metrix.VerticalSize(55),
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
  },
  greenArrowStyle: {
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
    width: Metrix.HorizontalSize(40),
    height: Metrix.VerticalSize(40),
  },
  exchangeItemSmallModal: {
    color: Utills.selectedThemeColors().stroke,
    fontSize: normalizeFont(13),
    textAlign: 'center',
  },
  claimNowButtonStyle: {
    marginTop: Metrix.VerticalSize(15),
    width: Metrix.HorizontalSize(150),
    height: Metrix.VerticalSize(40),
  },
  imageStyle: {
    // borderWidth: 1,
    width: '50%',
    height: '50%',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(30),
  },
});