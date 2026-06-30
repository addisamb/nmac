import React, {FC, ReactNode} from 'react';
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  View,
  FlatList,
  I18nManager,
} from 'react-native';
import {
  Metrix,
  Colors,
  Fonts,
  Images,
  FontType,
  Utills,
  RouteNames,
} from '../../config';
import {CustomImage, CustomText, MainContainer, PrimaryButton} from '..';
import {HorizontalSize, normalizeFont} from '../../config/metrix';
import {ProgressBar} from 'react-native-paper';
import {t} from 'i18next';
import {useSelector} from 'react-redux';
import navigationService from '../../config/navigationService';

export type PointCardProps = TouchableOpacityProps & {
  pointAndData?: any;
};

export const PointCard: FC<PointCardProps> = ({pointAndData}) => {
  // const receivedPoint = pointAndData?.data?.moneyExchagedPoint || 0;
  // const totalPoint = pointAndData?.data?.moneyExchangeTotalPoint || 1; // to avoid division by zero
  // const progressRatio = receivedPoint / totalPoint;

  // const coursePoint = pointAndData?.data?.totalCourseAvailableSpendPoint || 0;
  // const coursePointPoint = pointAndData?.data?.totalCourseAvailablePoint || 1; // to avoid division by zero
  const progressCourseRatio = 0;


  console.log("datadatadatadatadata====>",pointAndData?.data);
  


  return (
    <>
      <View
        style={{
          alignSelf: 'center',
          width: Metrix.HorizontalSize(310),
          paddingVertical: Metrix.VerticalSize(10),
          borderRadius: Metrix.HorizontalSize(20),
          backgroundColor: Utills.selectedThemeColors().Base,
          ...Metrix.createShadow,
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: Metrix.VerticalSize(15),
              width: Metrix.HorizontalSize(35),
            }}
            source={Images.GroupStar}
          />
          {/* <CustomText.LargeSemiBoldText customStyle={styles.primaryColorText}>
            {pointAndData?.data?.progressBarPercentage < 1
              ? t('level')
              : `${t('level2')} `}
          </CustomText.LargeSemiBoldText> */}
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            paddingHorizontal: Metrix.HorizontalSize(35),
          }}>
          <View
            style={{
              // borderTopWidth: 1,
              alignItems: 'center',
            }}>
            <CustomText.LargeSemiBoldText customStyle={styles.primaryColorText}>
              {`${pointAndData?.data?.totalpoints} ${t('sar')}`}
            </CustomText.LargeSemiBoldText>
            <CustomText.LargeSemiBoldText customStyle={styles.blackColorText}>
              {t('total_points')}
            </CustomText.LargeSemiBoldText>
          </View>
          <View
            style={{
              alignItems: 'center',
            }}>
            <CustomText.LargeSemiBoldText customStyle={styles.primaryColorText}>
              {`${pointAndData?.data?.totalSpend} ${t('sar')}`}
            </CustomText.LargeSemiBoldText>
            <CustomText.LargeSemiBoldText customStyle={styles.blackColorText}>
              {t('totalSpend')}
            </CustomText.LargeSemiBoldText>
          </View>
        </View>
      </View>
      <View
        style={{
          paddingHorizontal: Metrix.HorizontalSize(20),
          justifyContent: 'space-between',
          marginTop: Metrix.VerticalSize(40),
          // borderWidth: 1,
          flexDirection: 'row',
        }}>
        <View style={styles.backGroundImageViewStyle}>
          <CustomImage
            source={Images.BackgroundCard}
            resizeMode="stretch"
            customStyle={styles.backGroundImageStyle}
          />
          <View style={styles.imageViewStyle}>
            <View
              style={{
                // borderWidth: 1,
                position: 'absolute',
                alignItems: 'center',
              }}>
              <Image
                style={styles.groupStarImageStyle}
                source={Images.GroupStar}
              />

              <CustomText.MediumText
                customStyle={{
                  color: Utills.selectedThemeColors().Base,
                  fontSize: FontType.FontSmall,
                }}>
                {t('level')}
              </CustomText.MediumText>

              <CustomText.MediumText
                customStyle={{
                  color: Utills.selectedThemeColors().Base,
                  fontSize: FontType.FontSmall,
                }}>
                {/* {` ${t('reward')} ${pointAndData?.data?.minLevelPoint}`} */}
                {` ${t('points')} ${pointAndData?.data?.totalpoints}`}
              </CustomText.MediumText>
            </View>
          </View>
        </View>

        <View style={styles.backGroundImageViewStyle}>
          <CustomImage
            source={Images.BackgroundCardRevert}
            resizeMode="stretch"
            customStyle={styles.backGroundImageStyle}
          />
          <View style={styles.imageViewStyle}>
            <Image
              style={styles.groupStarImageStyle}
              source={Images.GroupStar}
            />
            <CustomText.MediumText
              customStyle={{
                fontSize: FontType.FontSmall,
              }}>
              {t('level2')}
            </CustomText.MediumText>
            <CustomText.MediumText
              customStyle={{
                fontSize: normalizeFont(12),
              }}>
              {/* {t('reward')} */}
              {` ${t('points')} ${pointAndData?.data?.maxLevelPoint}`}
            </CustomText.MediumText>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <ProgressBar
          // progress={pointAndData?.data?.progressBarPercentage / 100}
          // progress={82 / 100}
          progress={(Math.round(pointAndData?.data?.progressBarPercentage) / 100) || 0}
          color={Utills.selectedThemeColors().TertiaryTextColor}
          style={styles.progressBar}
        />
        <View style={styles.ProgressBarTextStyle}>
          <CustomImage
            source={Images.WhiteStar}
            customStyle={{
              paddingHorizontal: Metrix.VerticalSize(10),
              width: 10,
              height: 10,
            }}
          />
          <CustomText.LargeSemiBoldText
            customStyle={{
              color: Utills.selectedThemeColors().Base,
              fontSize: FontType.FontSmall,
            }}>
            {`${pointAndData?.data?.pointRemaining} ${t('points_remaining')}`}
          </CustomText.LargeSemiBoldText>
        </View>
      </View>
      <View
        style={{
          marginTop: 20,
          borderColor: Utills.selectedThemeColors().stroke,
          borderWidth: 1,
        }}></View>
      <View
        style={{
          marginTop: Metrix.VerticalSize(15),
          // borderWidth: 1,
        }}>
        <CustomText.LargeBoldText
          customStyle={{
            fontSize: FontType.FontMedium,
            textAlign: 'center',
          }}>
          {t('points_spending_details')}
        </CustomText.LargeBoldText>

        <>
          <View
            style={{
              // ...borderBottomStyle,
              paddingBottom: Metrix.VerticalSize(5),
              marginTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <CustomImage
                source={Images.LikeStar}
                customStyle={{
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  width: Metrix.HorizontalSize(32),
                  height: Metrix.VerticalSize(32),
                  paddingHorizontal: Metrix.HorizontalSize(23),
                }}
              />
            </View>

            <View style={{width: '60%'}}>
              <View>
                <CustomText.LargeBoldText
                  customStyle={{
                    fontSize: normalizeFont(15),
                  }}>
                  {t('money_exchange')}
                </CustomText.LargeBoldText>
                <View style={{ height: Metrix.VerticalSize(5) }} />
                {/* <CustomText.RegularText customStyle={styles.textDesc}>
                  {`${pointAndData?.data?.moneyExchagedPoint} ${t('SAR convert')} ${
                    pointAndData?.data?.moneyExchagedPoint * 5} ${'Riyal'}`}
                </CustomText.RegularText> */}
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginVertical: 7,
                }}>
                <ProgressBar
                    progress={(Math.round(pointAndData?.data?.progressBarPercentage) / 100) || 0}
                  // progress={parseFloat(pointAndData?.data?.moneyExchageRecievedPoint)}
                  color={Utills.selectedThemeColors().TertiaryTextColor}
                  style={styles.secondaryprogressBar}
                />
                <View style={styles.secondaryprogressBarStyle}>
                  <CustomImage
                    source={Images.WhiteStar}
                    customStyle={{
                      width: 12,
                      height: 12,
                    }}
                  />
                  <CustomText.LargeSemiBoldText
                    customStyle={{
                      color: Utills.selectedThemeColors().Base,
                      fontSize: FontType.FontSmall,
                      // borderWidth:1,
                    }}>
                    {''}
                    {pointAndData?.data?.totalpoints} /{' '}
                    {pointAndData?.data?.moneyExchangeTotalPoint}
                  </CustomText.LargeSemiBoldText>
                </View>
              </View>
            </View>

            <View>
              <PrimaryButton
                customStyles={styles.btnStyle}
                textStyles={{
                  fontFamily: Fonts['Medium'],
                  fontSize: normalizeFont(12.5),
                }}
                title={t('claim_now')}
                onPress={() => {
                  navigationService.navigate(
                    RouteNames.HomeRoutes.MyWalletScreen,
                  );
                }}
                disabled={
                  pointAndData?.data?.totalpoints >= 1000 
                    ? false
                    : true
                }
              />
            </View>
          </View>

          <View
            style={{
              // ...borderBottomStyle,
              paddingBottom: Metrix.VerticalSize(5),
              marginTop: Metrix.VerticalSize(5),
              paddingVertical: Metrix.VerticalSize(5),
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <CustomImage
                source={Images.LikeStar}
                customStyle={{
                  transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  width: Metrix.HorizontalSize(32),
                  height: Metrix.VerticalSize(32),
                  paddingHorizontal: Metrix.HorizontalSize(23),
                }}
              />
            </View>

            <View style={{width: '60%'}}>
              <View>
                <CustomText.LargeBoldText
                  customStyle={{
                    fontSize: normalizeFont(15),
                  }}>
                  {t('courses_available')}
                </CustomText.LargeBoldText>
                <CustomText.RegularText customStyle={styles.textDesc}>
                  {t('course_enrolled')}
                </CustomText.RegularText>
              </View>
              <View
                style={{
                  justifyContent: 'center',
                  marginVertical: 7,
                }}>
                <ProgressBar
                  progress={(pointAndData?.data?.totalpoints / 1000) * 4 || 0}
                  // progress={parseFloat(pointAndData?.data?.moneyExchageRecievedPoint)}
                  color={Utills.selectedThemeColors().TertiaryTextColor}
                  style={styles.secondaryprogressBar}
                />
                <View style={styles.secondaryprogressBarStyle}>
                  <CustomImage
                    source={Images.WhiteStar}
                    customStyle={{
                      width: 12,
                      height: 12,
                    }}
                  />
                  <CustomText.LargeSemiBoldText
                    customStyle={{
                      color: Utills.selectedThemeColors().Base,
                      fontSize: FontType.FontSmall,
                      // borderWidth:1,
                    }}>
                    {pointAndData?.data?.totalpoints} /{' '}
                    250
                  </CustomText.LargeSemiBoldText>
                </View>
              </View>
            </View>

            <View>
              <PrimaryButton
                customStyles={styles.btnStyle}
                textStyles={{
                  fontFamily: Fonts['Medium'],
                  fontSize: normalizeFont(12.5),
                }}
                // title={t('replace')}
                title={t('claim_now')}
                onPress={() => {
                  navigationService.navigate(RouteNames.HomeRoutes.Search);
                }}
                disabled={
                  pointAndData?.data?.totalpoints >= 250 // 80%
                    ? false
                    : true
                }
              />
            </View>
          </View>
        </>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // borderWidth:1,
    marginTop: Metrix.HorizontalSize(15),
    alignItems: 'center',
  },
  progressBar: {
    borderRadius: 10,
    position: 'relative',
    width: Metrix.HorizontalSize(300),
    height: Metrix.VerticalSize(20),
  },

  secondaryprogressBar: {
    // borderWidth:1,
    // width: '40%',
    borderRadius: 10,
    position: 'relative',
    height: Metrix.VerticalSize(17),
  },
  primaryColorText: {
    color: Utills.selectedThemeColors().Primary,
    fontSize: FontType.FontSmall,
  },
  blackColorText: {
    fontSize: normalizeFont(13),
  },
  backGroundImageStyle: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(75),
  },
  backGroundImageViewStyle: {
    // borderWidth:1,
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(65),
    justifyContent: 'center',
    position: 'relative',
    alignItems: 'center',
  },
  imageViewStyle: {
    // marginTop: Metrix.VerticalSize(4),
    justifyContent: 'center',
    position: 'absolute',
    alignItems: 'center',
    // borderWidth:1,
  },
  groupStarImageStyle: {
    height: Metrix.VerticalSize(15),
    width: Metrix.HorizontalSize(35),
  },
  btnStyle: {
    width: Metrix.HorizontalSize(80),
    height: Metrix.VerticalSize(27),
  },
  textDesc: {
    fontSize: normalizeFont(11),
    marginTop: Metrix.VerticalSize(3),
    color: Utills.selectedThemeColors().InActiveTabBar,
  },
  ProgressBarTextStyle: {
    // borderWidth: 1,
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '40%',
    height: Metrix.VerticalSize(20),
  },
  secondaryprogressBarStyle: {
    // borderWidth: 1,
    alignSelf: 'center',
    position: 'absolute',
    alignItems: 'center',
    flexDirection: 'row',
    width: '43%',
    // marginTop:Metrix.VerticalSize(2),
    justifyContent: 'space-between',
  },
});
