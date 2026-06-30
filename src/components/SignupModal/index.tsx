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
  Dimensions,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../config';
import {CustomImage, CustomModal, CustomText, FadeContainer, PrimaryButton} from '..';
import {t} from 'i18next';
import navigationService from '../../config/navigationService';
import {useDispatch} from 'react-redux';
import {Logout, showLoginPleaseModal} from '../../Redux/Action/AuthActions/authActions';

type SignupModalProps = {
  onPress?: () => void;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').width;
const dispatch = useDispatch();

export const SignupModal: React.FC<SignupModalProps> = ({onPress}) => {
  return (
    <TouchableOpacity activeOpacity={1} onPress={() =>{ dispatch(showLoginPleaseModal(false))}}  style={styles.container}>
      <TouchableWithoutFeedback>
      <View style={styles.nestedCont}>
        <CustomText.LargeBoldText
          customStyle={{
            fontSize: FontType.FontRegular,
            color: Utills.selectedThemeColors().Primary,
          }}>
          {t('signup_message')}
        </CustomText.LargeBoldText>

        <PrimaryButton
           title={t('sign_up_now')}
          customStyles={{
            width: Metrix.HorizontalSize(157),
            height: Metrix.VerticalSize(35),
            marginTop: Metrix.VerticalSize(25),
          }}
          onPress={onPress}
        />
      </View>
      </TouchableWithoutFeedback>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:1,
    backgroundColor: 'rgba(255, 255, 255, 0.47)',
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nestedCont: {
    // borderWidth:1,
    width: screenWidth - 84,
    height: 160,
    shadowColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderColor: '#000',
    borderRadius: 10,
  },
});
