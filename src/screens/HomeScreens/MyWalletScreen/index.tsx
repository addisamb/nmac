import { useIsFocused } from '@react-navigation/native';
import { Formik } from 'formik';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import { TransactionHistory, sendWithdrawOtp } from '../../../Redux/Action/HomeActions/homeActions';
import { validateOtp } from '../../../Redux/Action/ProfileActions/profileActions';
import {
  BackHeader,
  CustomInput,
  CustomModal,
  CustomText,
  PrimaryButton,
  RoundBorderCardComponent,
  WalletCardComponent
} from '../../../components';
import { EmptyListComponent } from '../../../components/CourseCardsHorizontalList';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import { normalizeFont } from '../../../config/metrix';
import navigationService from '../../../config/navigationService';
import utills from '../../../config/utills';
import { MyWalletScreenProps } from '../../propTypes';

export const MyWalletScreen: React.FC<MyWalletScreenProps> = ({}) => {

  const userData = useSelector(state => state?.HomeReducer?.userData);

  const dispatch = useDispatch()
  const Focus = useIsFocused()  

  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState([]);
  
  console.log("asdxas==>",userData);
  

  useEffect(() => {
    // if (Focus) {
      getTransactionHistoryData();
    // }
  }, []);
  
  const getTransactionHistoryData = async () => {
    try {
      let res = await dispatch(TransactionHistory());
      if (res?.status) {
        const allTransactions = [
          ...res?.data?.receivedPoints,
          ...res?.data?.sentPoints
        ];
        setTransactionHistory(allTransactions);
    }

    } catch (error) {
      console.error('Error fetching transaction history:', error);
    }
  };

  const TransactionsData = [
    {
      text: t('money_withdraw'),
      subtext: '20 april 2023',
      amount: t('sar'),
      image: Images.BuyCourse,
      onPress: () =>
        NavigationService.navigate(RouteNames.HomeRoutes.TransactionsDetails),
    },
    {
      text: t('buy_course'),
      subtext: '20 april 2023',
      amount: t('sar'),
      image: Images.BuyCourse,
    },
  ];

  async function VerifyAuthenticUser(data) {

    let payload_email_And_Auth_password = {
      userId:  userData?._id,
      otp: data?.otp
    }


    let res = await dispatch(validateOtp(payload_email_And_Auth_password));
    if (res.status) {
      setModalPostVisible(false);
      setTimeout(() => {
        NavigationService.navigate(
          RouteNames.HomeRoutes.Withdrawdetail,
        );
      }, 1000);
    } 
  }
  
function buyNow() {
  NavigationService.navigate(
    RouteNames.HomeRoutes.RewardCoursesScreen,
  );
}

async function sendOtp() {

  let payload_email_And_Auth = {
    userId:  userData?._id,
    email: userData?.email
  }

  let payload_Phone = {
    userId:  userData?._id,
    phone: userData?.phone
    // "phone": 50
  }

  let response = await dispatch(sendWithdrawOtp(userData?.email == undefined ? payload_Phone : payload_email_And_Auth));

  if (response.status) {
    //  Utills.showToast(JSON.stringify(response.token), '', 'success');
     setTimeout(() => {
       setModalPostVisible(true)
     }, 1000);
  }
}

  return (
    <>
      <BackHeader heading={t('my_wallet')} />
      <View style={styles.viewStyle}>
        <View
          style={{
            marginTop: Metrix.VerticalSize(30),
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
            marginTop: Metrix.VerticalSize(60),
            position: 'relative',
          }}>
          <View
            style={{
              // borderWidth: 1,
              alignItems: 'center',
              position: 'absolute',
              top: -40,
              width: '100%',
            }}>
            <WalletCardComponent
              onPress1={() =>{
                if (userData?.type == 'guest') {
                  dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
                  return
                }
                // if (userData?.coins == 0) {
                //   Utills.showToast("You Balance is 0 SAR, Can't Buy Course", '', 'error'); 
                //   return
                // }
                
                buyNow() 
              }}
              onPress={() =>{
                if (userData?.type == 'guest') {
                  dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
                  return
                }
              
                sendOtp()

                // setModalPostVisible(true)
              }}
              customStyle={{width: '90%'}}
            />
          </View>

          <View
            style={{
              marginTop: Metrix.VerticalSize(90),
              alignSelf: 'center',
            }}>
            <CustomText.LargeBoldText
              customStyle={{
                fontSize: FontType.FontMedium,
              }}>
              {t('transaction_details')}
            </CustomText.LargeBoldText>
          </View>
          <View
            style={{
              paddingHorizontal: Metrix.HorizontalSize(15),
            }}>

            <FlatList
            data={transactionHistory}
            ListEmptyComponent={EmptyListComponent}
            ListFooterComponent={<View style={{ height: 140 }} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <RoundBorderCardComponent
                touchableOpacityCustomStyle={{
                  justifyContent: 'space-between',
                }}
                key={index}
                image={
                  item?.type === 'Course'
                    ? Images.ReceivedPoints
                    : Images.BuyCourse
                }
                text={
                  userData?._id == item.toUserId
                    ? t('received_rewards')
                    : userData?._id == item.fromUserId
                    ? t('sended_rewards')
                    : t('buy_course')
                }
                subtext={utills.timeHumanize(item.createdAt)}
                amount={`${Math.floor(item?.coins * 100) / 100} ${t('coins')}`}
                onPress={() => {
                  navigationService.navigate(
                    RouteNames.HomeRoutes.TransactionsDetails,
                    {
                      selectedItem: item,
                    },
                  );
                }}
              />
            )}
            />

          </View>
        </View>
      </View>

      <Formik
        initialValues={{
          otp: ''
        }}
        onSubmit={values => {
          console.log(values, '-----');
          // const {email, ...restValues} = values;
          //   dispatch(AuthActions.loginSuccess(true));
          //   dispatch(
          //     AuthActions.login({
          //       email: email?.toLocaleLowerCase(),
          //       ...restValues,
          //     }),
          //   );
        }}
        // validationSchema={Schema.LoginSchema}
      >
        {({values, errors, touched, handleChange, setFieldTouched}) => (
          <CustomModal
            onClose={() => {
              setModalPostVisible(false);
            }}
            smallModal
            crossIcon
            visible={modalPostVisible}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <CustomText.LargeBoldText
                customStyle={{
                  fontSize: normalizeFont(17),
                  color: Utills.selectedThemeColors().Primary,
                }}>
                {t('please_verify')}
              </CustomText.LargeBoldText>
              
              <CustomText.LargeBoldText
                customStyle={{
                  fontSize: normalizeFont(14),
                  marginTop: 5,
                  color: Utills.selectedThemeColors().Primary,
                  textAlign: "center"
                }}>
                {`${t('Please_enter_your_otp_send_to_your')} ${ userData.email == undefined ? `${t('phone_number')} ${userData.phone}` : `${t('email')} ${userData.email}` }`}
              </CustomText.LargeBoldText>

            </View>
            <View style={{width: '100%', marginTop: Metrix.VerticalSize(5)}}>


              <CustomInput
              heading={t('otp')}
              placeholder={t('enter_your_otp')}
                value={values?.otp}
                onChangeText={handleChange('otp')}
                // onBlur={() => setFieldTouched('password')}
                error={errors?.otp}
                touched={touched?.otp}
                customStyle={{width: '100%'}}
                maxLength={4}
                returnKeyType="done"
                keyboardType="phone-pad"
              />
        


            </View>
            <PrimaryButton
              onPress={() => {
                VerifyAuthenticUser(values)
              }}
              customStyles={{
                marginTop: Metrix.VerticalSize(0),
                width: Metrix.HorizontalSize(125),
                height: Metrix.VerticalSize(40),
              }}
              title={t('continue_widthdraw')}
            />
          </CustomModal>
        )}
      </Formik>
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