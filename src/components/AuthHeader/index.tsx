import React, {ReactNode} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BackHeader} from '../BackHeader';
import {CustomText, MainContainer, PrimaryButton, SecondaryButton} from '..';
import {
  Colors,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../config';
import {I18nManager} from 'react-native';
import {PrimaryButtonProps} from '../PrimaryButton';
import {useThemeHook} from '../../hooks';
import {t} from 'i18next';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;

const TouchableText: React.FC<{text: string}> = ({text}) => {
  // const {Colors} = useThemeHook();
  return (
    <Pressable
      // activeOpacity={0.8}
      style={{
        justifyContent: 'flex-end',
      }}
      onPress={() => {}}>
      <CustomText.MediumText
        customStyle={{
          // borderWidth: 1,
          // marginBottom:Metrix.VerticalSize(-3),
          color: Utills.selectedThemeColors().Primary,
        }}>
        {text}
      </CustomText.MediumText>
    </Pressable>
  );
};

type AuthHeaderProps = PrimaryButtonProps & {
  heading: string;
  paragraph?: string;
  showBackHeader?: boolean;
  onBottomTextPress?: () => void;
  signUpBtnPress?: () => void;
  signUpBtn?: boolean;
  isbottomText?: boolean;
  isBtn?: boolean;
  customStyles?: ViewStyle;
  isSecondaryBtn?: boolean;
  isupperText?: boolean;
  children?: ReactNode;
  topContainerCustomStyle?: ViewStyle;
  childViewTop?: ViewStyle
};

export const AuthHeader: React.FC<AuthHeaderProps> = ({
  heading,
  paragraph,
  showBackHeader = true,
  children,
  disabled,
  title,
  onPress,
  onBottomTextPress,
  signUpBtnPress,
  signUpBtn,
  isbottomText,
  isBtn,
  customStyles,
  isSecondaryBtn,
  isupperText,
  topContainerCustomStyle,
  childViewTop
}) => {
  // const {Colors} = useThemeHook();

  return (
    <MainContainer
      customeStyle={{
        paddingHorizontal: Metrix.HorizontalSize(33),
        // borderWidth:1
      }}>
      <View style={[styles.topContainer, topContainerCustomStyle]}>
        <Image
          source={I18nManager?.isRTL ? Images.ArabicLogo : Images.NMO}
          style={ screenHeight < 380 ? 
            {
              width: Metrix.HorizontalSize(100),
              height: Metrix.VerticalSize(100),
            }
            :
            {
            width: Metrix.HorizontalSize(110),
            height: Metrix.VerticalSize(110),
            }
          }
          resizeMode="contain"
        />
      </View>

      <View style={[styles.childrenView, childViewTop]}>
        <View
          style={
            {
              // borderWidth:1,
            }
          }>
          <CustomText.ExtraLargeBoldText
            customStyle={{
              textAlign: 'center',
            }}>
            {heading}
          </CustomText.ExtraLargeBoldText>
          {children}
        </View>
        <View
          style={[
            styles.bottomContainer,
            !isBtn && {justifyContent: 'flex-end'},
          ]}>
          {isupperText && (
            <View
              style={{
                // borderWidth: 1,
                alignItems: 'center',
              }}>
              <CustomText.MediumText
                customStyle={{
                  // borderWidth:1,
                  // backgroundColor:"red",
                  textAlign: 'center',
                }}
                isSecondaryColor>
                {t('text')} <TouchableText text={t('terms')} />
                {''} {t('and')} <TouchableText text={t('conditions')} />
              </CustomText.MediumText>
            </View>
          )}

          {isBtn && (
            <PrimaryButton
              title={title}
              customStyles={customStyles}
              disabled={disabled}
              onPress={onPress}
            />
          )}
          {isSecondaryBtn && (
            <View
              style={{
                marginBottom: Metrix.VerticalSize(20),
                // borderWidth:1
              }}>
              <CustomText.RegularText
                customStyle={{
                  color: Utills.selectedThemeColors().LightGreyText,
                  textAlign: 'center',
                  lineHeight: 30,
                }}>
                {t('header_text')}
              </CustomText.RegularText>

              <SecondaryButton
                onPress={onPress}
                title={t('continue_with_google')}
                source={Images.GoogleLogo}
                isIcon
              />
            </View>
          )}

          {signUpBtn && (
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                // borderWidth:1
              }}>
              <CustomText.RegularText isSecondaryColor>
                {t('dont_have_an_account')}{' '}
              </CustomText.RegularText>
              <TouchableOpacity onPress={signUpBtnPress}>
                <CustomText.RegularText
                  customStyle={{
                    color: Utills.selectedThemeColors().Primary,
                  }}>
                  {t('sign_up')}
                </CustomText.RegularText>
              </TouchableOpacity>
            </View>
          )}

          {isbottomText && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.bottomText}
              onPress={onBottomTextPress}>
              <CustomText.MediumText isSecondaryColor>
                {t('skip_now')}
              </CustomText.MediumText>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginVertical: Metrix.VerticalSize(40),
  },
  bottomText: {
    marginTop: Metrix.VerticalSize(15),
    alignItems: 'center',
  },
  bottomContainer: {justifyContent: 'space-between'},
  childrenView: {
    marginVertical: Metrix.VerticalSize(10),
    flex: 4,
    // marginTop: screenHeight < 380 ? -20 : 0,
    // borderWidth: 1,
    justifyContent: 'space-between',
  },
  topContainer: {
    // borderWidth: 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
