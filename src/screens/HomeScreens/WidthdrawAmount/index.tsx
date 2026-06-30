import {FlatList, Image, ScrollView, StyleSheet, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {
  BackHeader,
  CourseCardsHorizontalList,
  CustomInput,
  CustomModal,
  CustomText,
  MainContainer,
  PlaceholderComponent,
  PrimaryButton,
  TransactionDetailsComponent,
  WalletCardComponent,
} from '../../../components';
import {WidthdrawAmountScreenProps} from '../../propTypes';

import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {t} from 'i18next';
import metrix, {normalizeFont} from '../../../config/metrix';
import {head} from 'lodash';
import {Formik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FlipInEasyX} from 'react-native-reanimated';
import { DrawRequest, changePasswordApi, showLoginPleaseModal } from '../../../Redux/Action/AuthActions/authActions';
import { useDispatch, useSelector } from 'react-redux';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import { GetProfileData } from '../../../Redux/Action/HomeActions/homeActions';

export const WidthdrawAmountScreen: React.FC<
  WidthdrawAmountScreenProps
> = ({...props}) => {

  const dispatch = useDispatch()
  
  const userData = useSelector(state => state?.HomeReducer?.userData);

  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [amount, setAmount] = useState('');

  const [modalVisible, setModalVisible] = useState(false);

  const handleOnClosePost = () => {
    setModalVisible(false);
  };

  function SendWithDrawRequest() {

    if (userData?.type == 'guest') {
      // return true
      dispatch(showLoginPleaseModal(true))
      return
    }

    setModalPostVisible(false)
    setTimeout(() => {
      Draw()    
    }, 1000);
  }


  async function Draw() {

    let payload = {
      accountNumber: props?.route?.params?.cardData?.number.replace(/-/g, ''),
      amount: parseInt(amount),
      cardType: props?.route?.params?.cardData?.cardType
    }
    let res = await dispatch(DrawRequest(payload));
    if (res.status) {
      setTimeout(() => {
        setModalVisible(true);
      }, 2000);
    }
  }


  function OpenSureModal() {

    if (amount == '') {
      Utills.showToast('Please Enter Amount', '', 'error');
      return
    }
    if (amount < 1000) {
      Utills.showToast('points Must be greater than 1000', '', 'error');
      return
    }
    else{
      setModalPostVisible(true);
    }
  }

  return (
    <>
      <BackHeader heading={t('my_wallet')} />
      <View style={styles.viewStyle}>
        <View
          style={{
            marginTop: Metrix.VerticalSize(20),
            alignSelf: 'center',
          }}>
          <CustomText.LargeSemiBoldText customStyle={styles.textStyle}>
            {t('my_balance')}
          </CustomText.LargeSemiBoldText>
          <CustomText.LargeBoldText customStyle={styles.largeTextStyle}>
            {`${Math.round(userData?.coins) * 5} ${t('sar')}`}
          </CustomText.LargeBoldText>
        </View>

        <View
          style={{
            // borderWidth: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            flex: 1,
            backgroundColor: Utills.selectedThemeColors().Base,
            marginTop: Metrix.VerticalSize(10),
            position: 'relative',
          }}>
          <MainContainer>
            <View>
              <CustomInput
                maxLength={4}
                value={amount}
                keyboardType='numeric'
                onChangeText={(e)=>{setAmount(e)}}
                heading={t('enter_amount')}
                placeholder={t('enter_your_amount')}
                customTextStyle={{
                  fontSize: FontType.FontSmall,
                }}
                customStyle={{
                  fontSize: FontType.FontRegular,
                  width: '100%'
                }}
                customtextContainerStyle={{
                  borderWidth: 0,
                  borderRadius: 0,
                  borderBottomWidth: 1,
                  // backgroundColor: "red"
                }}
              />
            </View>
            <View>
            
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                marginTop: Metrix.VerticalSize(10),
                justifyContent: 'space-between',
                paddingHorizontal: Metrix.HorizontalSize(10),
              }}>
              <CustomText.RegularText
                customStyle={{
                  textAlign: 'center',
                  fontSize: FontType.FontRegular,
                  color: Utills.selectedThemeColors().LightGrayTextColor,
                }}>
                {t('widthdraw_desc')}
              </CustomText.RegularText>
              <PrimaryButton
                onPress={() => {
                  OpenSureModal()
                }}
                title={t('continue_payment')}
              />
            </View>
          </MainContainer>
        </View>
      </View>

      <CustomModal
        smallContainerStyles={{
          height: '22%',
        }}
        onClose={() => {
          setModalPostVisible(false);
        }}
        smallModal
        visible={modalPostVisible}>
        <View
          style={{
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(20),
          }}>
          <CustomText.LargeBoldText
            customStyle={{
              color: Utills.selectedThemeColors().Primary,
            }}>
            {t('are_your_sure')}
          </CustomText.LargeBoldText>
          <CustomText.RegularText
            customStyle={{
              color: Utills.selectedThemeColors().LightGrayTextColor,
              marginTop: Metrix.VerticalSize(5),
            }}>
           {t("withdrawal_proceed")}
          </CustomText.RegularText>
        </View>
        <View
          style={{
            width: '85%',
            // borderWidth: 1,
            flexDirection: 'row',
            marginTop: Metrix.VerticalSize(10),
            justifyContent: 'space-between',
          }}>
          <PrimaryButton
            onPress={() => {
              SendWithDrawRequest()
            }}
            customStyles={[
              {
                borderWidth: 1.5,
                width: Metrix.HorizontalSize(100),
                height: Metrix.VerticalSize(32),
                borderColor: Utills.selectedThemeColors().Primary,
                backgroundColor: Utills.selectedThemeColors().Base,
              },
            ]}
            textColor={Utills.selectedThemeColors().Primary}
           
            title={t('ok')}
          />
          <PrimaryButton
            onPress={() => {
              setModalPostVisible(false);
            }}
            customStyles={{
              width: Metrix.HorizontalSize(100),
              height: Metrix.VerticalSize(32),
            }}
            textColor={Utills.selectedThemeColors().Base}
            title={t('cancel')}
          />
        </View>
      </CustomModal>

      <CustomModal onClose={handleOnClosePost} visible={modalVisible}>
        <PlaceholderComponent
          heading={t('congratulations')}
          image={Images.Wow}
          subHeading={t(`withdrawal_request_has_been_done_successfully_to_admin`)}
          title={t('go_to_home')}
          onPress={() => {
            handleOnClosePost();
            setTimeout(() => {
              NavigationService.navigate(
                RouteNames.HomeRoutes.MyWalletScreen);
            }, 1000);
          }}
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    height: Metrix.VerticalSize(150),
    justifyContent: 'space-between',
    backgroundColor: Utills.selectedThemeColors().Primary,
    flex: 1,
  },
  textStyle: {
    textAlign: 'center',
    color: Utills.selectedThemeColors().Base,
    fontSize: FontType.FontRegular,
  },

  largeTextStyle: {
    color: Utills.selectedThemeColors().Base,
    fontSize: normalizeFont(40),
  },
});