import {t} from 'i18next';
import React, {useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  I18nManager,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  BackHeader,
  CustomImage,
  CustomModal,
  CustomText,
  MainContainer,
  PlaceholderComponent,
  PrimaryButton,
  TransactionDetailsComponent,
} from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import {
  ValidatePromoCode,
  sendPayloadDataToBackend,
  showLoginPleaseModal,
} from '../../../Redux/Action/AuthActions/authActions';
import {
  GetAssiignment,
  GetProfileData,
  QuizAndAssignmentData,
  enrollAndDetuctAmount,
  getBonusMaterial,
  getProgressReport,
  userEnrolled,
} from '../../../Redux/Action/HomeActions/homeActions';
import {PaymentScreenProps} from '../../propTypes';
import {TagsComp, tagsData} from '../CourseDetails';
// import {RNPaymentSDKLibrary, PaymentSDKConfiguration, PaymentSDKBillingDetails, PaymentSDKTheme, PaymentSDKConstants, PaymentSDKSavedCardInfo} from '@paytabs/react-native-paytabs';
import {
  PaymentSDKConfiguration,
  PaymentSDKShippingDetails,
  PaymentSDKTheme,
  RNPaymentSDKLibrary,
} from '@paytabs/react-native-paytabs';
import {Alert} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  CALL_BACK_URL,
  PAYTABS_AUTHERIZATION_KEY,
  PAYTABS_BASE_URL,
} from '../../../APICall/constants';
import {MyCourses} from '../../../Redux/Action/CourseAction/CourseAction';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const imageData = [
  {id: 1, source: Images.MasterImg},
  {id: 2, source: Images.paypal},
  {id: 3, source: Images.applepay},
  {id: 4, source: Images.tamara},
];

export const PaymentScreen: React.FC<PaymentScreenProps> = ({...props}) => {
  const refRBSheett = useRef();
  const refRBSheet2 = useRef();
  const course = useSelector(state => state?.HomeReducer?.course_Object);
  const courseData = props?.route?.params?.courseData;

  let courseVatDiscount = course?.vatDiscount;
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const [modalVisible, setModalVisible] = useState(false);
  const [btnLoader, setbtnLoader] = useState(false);
  const [errorDetail, seterrorDetail] = useState('');
  const [PromoCode, setPromoCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [ShowPromoCode, setshowPromoCode] = useState({
    show: false,
    discountPercentage: 0,
    promotxtaftergetDiscount: '',
  });

  const dispatch = useDispatch();

  const transactionData = [
    {id: '1', title: t('original_price'), value: t('cost')},
    {id: '2', title: t('tax_General_vat'), value: t('cost')},
    {id: '3', title: t('discounts'), value: t('cost')},
  ];

  async function getQuizes() {
    let res = await dispatch(QuizAndAssignmentData(course?._id));

    console.log('res===>', res);

    if (res?.status) {
      dispatch({
        type: ActionType.QUIZ_AND_ASSIGNMET_DATA,
        payload: res?.responseData,
      });
    }
    return res.status;
  }

  async function getAssignment() {
    let res = await dispatch(GetAssiignment(course?._id));
    console.log('getAssignment ====>>>', res?.data);

    if (res?.status) {
      dispatch({
        type: ActionType.ASSIGNMENT_DATA,
        payload: res?.data,
      });
    }
    return res.status;
  }

  async function bonusMaterialData() {
    let res = await dispatch(getBonusMaterial(course?._id));

    if (res?.status) {
      dispatch({
        type: ActionType.GET_BONUS,
        payload: res?.responseData,
      });
    }
    return res.status;
  }

  async function ProgressReportData() {
    let res = await dispatch(getProgressReport(course?._id));
    if (res?.staus) {
      dispatch({
        type: ActionType.PROGRESS_REPORT,
        payload: res?.data,
      });
    }
    return res.staus;
  }

  const handleOnClosePost = async () => {
    try {
      setbtnLoader(true);
      const promise1 = getQuizes();
      const promise2 = getAssignment();
      const promise3 = bonusMaterialData();
      const promise4 = ProgressReportData();
      const promise5 = fetchMyCourses();
      const promise6 = getMyDataupdateCoin();
      await Promise.all([
        promise1,
        promise2,
        promise3,
        promise4,
        promise5,
        promise6,
      ]).then(res => {
        console.log('pppp', res);
        if (res.every(element => element === true)) {
          setbtnLoader(false);
          setModalVisible(false);
          NavigationService.navigate(
            RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
            {
              movetoIndex: 0,
              movetoCourseDetail: true,
            },
          );
        } else {
          Utills.showToast('Server Error', '', 'error');
        }
      });
    } catch (error) {
      setbtnLoader(false);
      console.error('An error occurred:', error);
    }
  };

  async function fetchMyCourses() {
    let res = await dispatch(MyCourses());

    if (res?.status) {
      dispatch({
        type: ActionType.MY_COURSES,
        payload: res?.responseData,
      });
    }
    return res.status;
  }

  async function getMyDataupdateCoin() {
    let res = await dispatch(GetProfileData());

    if (res?.status) {
      dispatch({
        type: ActionType.GET_ME_DATA,
        payload: res?.responseData,
      });
    }
    dispatch({type: ActionType.HOME_LOADER, payload: false});
    return res?.status;
  }

  async function getMyData() {
    let res = await dispatch(GetProfileData());
    if (res?.status) {
      dispatch({
        type: ActionType.GET_ME_DATA,
        payload: res?.responseData,
      });
      return res;
    } else {
      Utills.showToast(t('something_went_wrong_server_error'), '', t('error'));
      return;
    }
  }

  async function paymentProceed(condition: Boolean, coin: number) {
    setbtnLoader(true);

    let courseActualPrice = ShowPromoCode.discountPercentage
      ? Math.round(
          (course?.price - (course?.price * course?.discountedPrice) / 100) *
            100,
        ) /
          100 -
        (Math.round(
          (course?.price - (course?.price * course?.discountedPrice) / 100) *
            100,
        ) /
          100) *
          (ShowPromoCode.discountPercentage / 100)
      : Math.round(
          (course?.price - (course?.price * course?.discountedPrice) / 100) *
            100,
        ) / 100;

    let configurationForApi = {
      profile_id: 97611,
      tran_type: 'sale',
      tran_class: 'ecom',
      cart_id: `${Math.floor(Math.random() * 10000)}`,
      cart_currency: 'sar',
      //this price condition is if value in in negative so it say error means (how paytabs detuce -5 sar) for this i do this work
      cart_amount: condition
        ? coin > courseActualPrice
          ? `${coin - courseActualPrice}`
          : `${courseActualPrice - coin}`
        : `${courseActualPrice}`,
      cart_description: `Purchase Course ID: ${course?._id}`,
      paypage_lang: I18nManager.isRTL ? 'ar' : 'en',
      hide_billing: true,
      customer_details: {
        name: `${userData?.name}`,
        email: '',
        phone: '',
        street1: '',
        city: '',
        state: '',
        country: '',
        zip: '',
      },
      hide_shipping: true,
      callback: CALL_BACK_URL,
      return: '',
      user_defined: {
        udf1: `${userData?._id}`,
        udf2: `${course?._id}`,
        udf3: `${course?.instructorID}`,
        udf4: `${ShowPromoCode.promotxtaftergetDiscount}`,
        udf5: 'UDF5 Test',
        udf6: 'UDF6 Test',
        udf7: 'UDF7 Test',
        udf8: 'UDF8 Test',
        udf9: 'UDF9 Test',
      },
    };

    try {
      // Assuming you're using fetch API to make the request
      const response = await fetch(PAYTABS_BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: PAYTABS_AUTHERIZATION_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(configurationForApi),
      });

      const data = await response.json();

      console.log(data?.redirect_url, '----'); // Handle response data accordingly
      setbtnLoader(false);

      if (data?.redirect_url?.length) {
        NavigationService.navigate(RouteNames.HomeRoutes.WebViewPayment, {
          url: data?.redirect_url?.toString(),
        });
      } else if (response.status == 409) {
        Utills.showToast('Too much request, Wait and try again', '', 'error');
      } else {
        Utills.showToast('Something Went Wrong', '', 'error');
      }
    } catch (error) {
      setbtnLoader(false);
      Utills.showToast(JSON.stringify(error), '', 'error');
    }
  }

  async function enrollandNavigate() {
    let response = await dispatch(enrollAndDetuctAmount(course?._id));
    if (response?.status) {
      setModalVisible(true);
    } else {
      // Utills.showToast(t('something_went_wrong_server_error'), '', t('error'));
      Utills.showToast(t('something went wrong server error'), '', t('error'));
    }
  }

  async function continuePayment() {
    if (userData?.type == 'guest') {
      // return true
      dispatch(showLoginPleaseModal(true));
      return;
    } else {
      setbtnLoader(true);

      getMyData()
        .then(sar => {
          setbtnLoader(false);
          let my_coin = Math.round(sar?.responseData?.coins * 5);
          let courseActualPrice = bottomHeadingValuecalculation();

          if (my_coin >= courseActualPrice) {
            Alert.alert(
              t(`use_coins_to_buy`),
              `${t(`new_price_after_coins`)} ${my_coin} `,
              [
                {
                  text: t('no'),
                  onPress: () =>
                    paymentProceedSDK(courseActualPrice, false, my_coin),
                  style: 'cancel',
                },
                {text: t('yes'), onPress: () => enrollandNavigate()},
              ],
            );
          } else if (my_coin > 0 && my_coin < courseActualPrice) {
            Alert.alert(
              t('alert_use_coins_title', {my_coin}),
              t('alert_use_coins_message', {
                price: Math.round(courseActualPrice - my_coin),
              }),
              [
                {
                  text: t('no'),
                  onPress: () =>
                    paymentProceedSDK(courseActualPrice, false, my_coin),
                  style: 'cancel',
                },
                {
                  text: t('yes'),
                  onPress: () =>
                    paymentProceedSDK(courseActualPrice, true, my_coin),
                },
              ],
            );
          } else {
            paymentProceedSDK(courseActualPrice, false, my_coin);
          }
        })
        .catch(error => {
          setbtnLoader(false);
          // Utills.showToast(t('something_went_wrong_server_error'), '', t('error'));
          Utills.showToast(
            t('something went wrong server error'),
            '',
            t('error'),
          );
        });
    }
  }

  function HandleChange(e: Text) {
    setPromoCode(e);
  }

  async function Apply() {
    if (userData?.type == 'guest') {
      dispatch(showLoginPleaseModal(true));
      return;
    } else {
      let payload = {
        courseId: course?._id,
        promoCode: PromoCode,
      };

      let res = await dispatch(ValidatePromoCode(payload));
      if (res?.status) {
        Utills.showToast(res?.message, '', 'success');
        Keyboard.dismiss();
        setTimeout(() => {
          refRBSheett?.current?.open();
        }, 500);
        setshowPromoCode({
          ...ShowPromoCode,
          show: true,
          discountPercentage: res?.data?.discount,
          promotxtaftergetDiscount: PromoCode,
        });
      }
    }
  }

  function paymentProceedSDK(
    ActualPrice: number,
    condition: Boolean,
    coin: number,
  ) {
    let courseActualPrice = ActualPrice;

    console.log(
      'courseActualPrice===>',
      typeof `${ActualPrice}`,
      'condition==>',
      condition,
    );

    let theme = new PaymentSDKTheme();

    // theme.backgroundColor = "ffffff"
    // theme.primaryColor = "ffffff"

    // Set the merchant logo
    const merchantLogo = require('../../../assets/icons/ArabicLogo.png');
    const resolveAssetSource = require('react-native/Libraries/Image/resolveAssetSource');
    const resolvedMerchantLogo = resolveAssetSource(merchantLogo);
    // theme.merchantLogo = resolvedMerchantLogo;
    // theme.logoImage = merchantLogo;
    theme.primaryColor = '#329967';
    theme.primaryFontColor = '#329966';
    // theme.primaryFont = "#f4f4f3";
    theme.secondaryColor = '#329966';
    theme.secondaryFontColor = '#f4f4f4'; //u
    // theme.secondaryFont = secondaryFont;
    theme.strokeColor = '#f4f4f4'; //u
    // theme.strokeThinckness = strokeThickness;
    // theme.inputsCornerRadius =  "#f4f4f4";
    theme.buttonColor = '#329967';
    // theme.buttonFontColor = "#f4f4f4";
    // theme.buttonFont = buttonFont;
    // theme.titleFontColor = titleFontColor;
    // theme.titleFont = titleFont;
    theme.backgroundColor = '#f4f4f4';
    theme.placeholderColor = '#cbcbcbcb';

    let shippingDetails = new PaymentSDKShippingDetails(
      //TESTING
      // name = "tester yy",
      // email = "tester1@gmail.com",
      // phone = "+923322731662", // Saudi Arabia phone number format = +9665xxxxxxxx
      // addressLine = "sac ascdas asca",
      // city = " asd asd asd",
      // state = " as asd asd",
      // countryCode = "sa", // ISO alpha 2 for Saudi Arabia
      // zip = "12345" // Postal code format varies, but this is a common format

      (name = ''),
      (email = ''),
      (phone = ''), // Saudi Arabia phone number format = +9665xxxxxxxx
      (addressLine = ''),
      (city = ''),
      (state = ''),
      (countryCode = ''), // ISO alpha 2 for Saudi Arabia
      (zip = ''), // Postal code format varies, but this is a common format
    );

    let configuration = new PaymentSDKConfiguration();
    configuration.profileID = '97611';
    configuration.serverKey = 'S6JNGDLDKN-J6BHNMWBND-LWZRTLZTWW';
    configuration.clientKey = 'CHKMNQ-TMDN6G-2HQNV2-KRBP29';
    (configuration.cartID = `${Math.floor(Math.random() * 10000)}`),
      (configuration.currency = 'sar');
    configuration.cartDescription = 'payment for course name test anas';
    configuration.merchantCountryCode = 'sa';
    configuration.merchantName = 'Flowers Store';
    configuration.amount = condition
      ? coin > courseActualPrice
        ? coin - courseActualPrice
        : courseActualPrice - coin
      : courseActualPrice;
    configuration.screenTitle = 'Pay with Card';
    configuration.merchantIdentifier = 'merchant.com.bundleID';
    configuration.billingDetails = shippingDetails;
    configuration.showBillingInfo = true;
    configuration.theme = theme;

    RNPaymentSDKLibrary.startCardPayment(JSON.stringify(configuration)).then(
      async result => {
        if (result['PaymentDetails'] != null) {
          let paymentDetails = result['PaymentDetails'];
          if (
            paymentDetails.paymentResult.responseMessage == 'Authorised' &&
            paymentDetails.paymentResult.responseStatus == 'A'
          ) {
            let payload = {
              cart_amount: condition
                ? coin > courseActualPrice
                  ? coin - courseActualPrice
                  : courseActualPrice - coin
                : courseActualPrice,
              tran_ref: paymentDetails.transactionReference,
              cart_id: `${Math.floor(Math.random() * 10000)}`,
              payment_result: {
                response_message:
                  paymentDetails?.paymentResult?.responseMessage,
                response_status: paymentDetails?.paymentResult?.responseStatus,
              },
              user_defined: {
                udf1: `${userData?._id}`,
                udf2: `${course?._id}`,
                udf3: `${course?.instructorID}`,
                udf4: `${ShowPromoCode.promotxtaftergetDiscount}`,
              },
            };
            let res = await dispatch(sendPayloadDataToBackend(payload));

            if (res?.status && res.data.status == 'A') {
              userEnrolledInToCourse();
              setLoading(false);
            } else {
              alert('payment successfull, but not enrolled in the course');
            }
          } else {
            WrongCredientials(paymentDetails.paymentResult.responseMessage);
            Utills.showToast(
              paymentDetails.paymentResult.responseMessage,
              '',
              'error',
            );
          }
        } else if (result['Event'] == 'CancelPayment') {
          // Handle events
          console.log('Cancel Payment Event');
        }
      },
    );
  }

  async function userEnrolledInToCourse() {
    if (userData?.type == 'guest') {
      // return true
      dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
      return;
    }

    let res = await dispatch(userEnrolled(course?._id));
    if (res?.status) {
      setTimeout(() => {
        setModalVisible(true);
      }, 1000);
    }
  }

  function WrongCredientials(txt: string) {
    seterrorDetail(txt);
    refRBSheet2?.current?.open();
  }

  function payAgain(params: type) {
    refRBSheet2.current.close();
    // setTimeout(() => {
    //   continuePayment()
    // }, 500);
  }

  // console.log("(course?.price) ===>", (course?.price) ,"=====", (course?.discountedPrice / 100 * course?.price) ,"=====", (course?.discountedPrice == 0 ? (courseVatDiscount / 100 * course.price) : (courseVatDiscount / 100 *  ( course?.price - (course?.price * course?.discountedPrice / 100) ) ) ) ,"=====", ((ShowPromoCode.discountPercentage / 100) * ( course?.discountedPrice == 0 ? course?.price : (course?.discountedPrice / 100 * course?.price) ))  );

  function bottomHeadingValuecalculation() {
    return Math.round(
      course?.price -
        (course?.discountedPrice / 100) * course?.price +
        (course?.discountedPrice == 0
          ? (courseVatDiscount / 100) * course.price
          : (courseVatDiscount / 100) *
            (course?.price - (course?.price * course?.discountedPrice) / 100)) -
        (ShowPromoCode.discountPercentage / 100) *
          (course?.discountedPrice == 0
            ? course?.price
            : course?.price - (course?.price * course?.discountedPrice) / 100),
    );
  }

  function item2valuecalculation() {
    return Math.round(
      ((course?.discountedPrice / 100) * course?.price * 100) / 100,
    );
  }

  function item3valuecalculation() {
    return Math.round(
      course?.discountedPrice == 0
        ? course?.price * (courseVatDiscount / 100)
        : (course?.price - (course?.price * course?.discountedPrice) / 100) *
            (courseVatDiscount / 100),
    );
  }

  function item4valuecalculation() {
    return Math.round(
      course?.discountedPrice == 0
        ? course?.price * (ShowPromoCode.discountPercentage / 100)
        : (course?.price - (course?.price * course?.discountedPrice) / 100) *
            (ShowPromoCode.discountPercentage / 100),
    );
  }

  return (
    <>
      <BackHeader
        heading={t('checkout')}
        isPrimary={false}
        // btnImage={Images.ThreeDots}
      />
      <MainContainer
        customeStyle={{
          justifyContent: 'space-between',
          paddingVertical: Metrix.VerticalSize(0),
        }}>
        <View>
          <View style={styles.flexStyle}>
            <View style={{width: '13%'}}>
              <CustomImage
                source={Images.PaymentCardImage}
                customStyle={{
                  width: '100%',
                  height: Metrix.VerticalSize(40),
                }}
              />
            </View>
            <View
              style={{width: '85%', justifyContent: 'center', marginTop: 5}}>
              <CustomText.LargeSemiBoldText
                numberOfLines={2}
                ellipsizeMode="tail">
                {course?.name}
              </CustomText.LargeSemiBoldText>
              <View style={styles.tagsContainer}>
                {courseData?.map(item => (
                  <TagsComp
                    customrenderItemContainer={{
                      paddingHorizontal: Metrix.HorizontalSize(10),
                    }}
                    item={item}
                    key={item?.id}
                  />
                ))}
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: screenWidth - 28,
              marginVertical: Metrix.HorizontalSize(10),
            }}>
            <View
              style={{width: '65%', flexDirection: 'row', borderRadius: 15}}>
              <TextInput
                returnKeyType={'done'}
                onChangeText={HandleChange}
                value={PromoCode}
                onSubmitEditing={() => {
                  console.log('done');
                }}
                selectionColor={Utills.selectedThemeColors().Primary}
                style={{
                  height: 46,
                  width: '85%',
                  backgroundColor: '#F3FBFE',
                  paddingLeft: 20,
                  borderBottomLeftRadius: 15,
                  borderTopLeftRadius: 15,
                  fontSize: FontType.FontMedium,
                }}
                placeholder={t('coupon')}
                placeholderTextColor={Utills.selectedThemeColors().greenLike}
              />
              <View
                style={{
                  width: '20%',
                  justifyContent: 'center',
                  backgroundColor: '#F3FBFE',
                  borderBottomRightRadius: 15,
                  borderTopEndRadius: 15,
                }}>
                <CustomImage
                  source={Images.Tag}
                  customStyle={{
                    width: Metrix.HorizontalSize(22),
                    height: Metrix.VerticalSize(22),
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={Apply}
              style={{
                width: '25%',
                height: 46,
                backgroundColor: Utills.selectedThemeColors().Primary,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}>
              <CustomText.MediumText
                numberOfLines={2}
                ellipsizeMode="tail"
                style={{
                  color: Utills.selectedThemeColors().Base,
                  fontSize: FontType.FontMedium,
                }}>
                {t('apply')}
              </CustomText.MediumText>
            </TouchableOpacity>
            <View></View>
          </View>

          <TransactionDetailsComponent
            customStyle={{}}
            heading={t('summary')}
            items={transactionData}
            bottomHeadingTitle={t('total')}
            bottomHeadingValue={`$ ${bottomHeadingValuecalculation()}`}
            item1txt={t('original_price')}
            item1value={`$ ${course?.price}`}
            item3txt={`${t('tax_General_vat')} ${`, (${courseVatDiscount}%)`}`}
            item3value={`$ ${item3valuecalculation()} `}
            item2txt={`${t('discounts')}`}
            item2value={`$ ${item2valuecalculation()}`}
            showPromoCode={ShowPromoCode.show}
            item4txt={`${t('Promo_code_discounts')} ${`, (${Math.round(
              ShowPromoCode.discountPercentage,
            )}%)`}`}
            item4value={`$ ${item4valuecalculation()} `} //discounted price ma sa promo code discount
            // ${ShowPromoCode.discountPercentage / 100 * course?.price}
          />
          <View style={{marginTop: Metrix.VerticalSize(10)}}>
            <CustomText.LargeBoldText
              style={{
                textAlign: 'center',
                fontSize: Metrix.customFontSize(14),
              }}>
              {t('payment_method')}
            </CustomText.LargeBoldText>
          </View>

          <View>
            <CustomImage
              source={Images.paytabsLogo}
              customStyle={{
                // borderWidth: 1,
                width: Metrix.HorizontalSize(200),
                height: Metrix.VerticalSize(80),
                alignSelf: 'center',
              }}
            />
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          {/* Top Row with 3 Images */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              // borderWidth: 1,
              width: '90%',
            }}>
            {imageData.slice(0, 3).map((item, index) => (
              <View
                key={item.id}
                style={{
                  // borderWidth: 1,
                  // paddingVertical: Metrix.VerticalSize(12),
                  height: Metrix.VerticalSize(40),
                  width: Metrix.HorizontalSize(80),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: Metrix.VerticalSize(10),
                  marginHorizontal: 5, // Horizontal spacing
                  borderColor: Utills.selectedThemeColors().Primary,
                  backgroundColor:"#fbfbfb"
                }}>
                <CustomImage
                  source={item.source}
                  resizeMode="cover"
                  customStyle={{
                    width: Metrix.HorizontalSize(40),
                  }}
                />
              </View>
            ))}
          </View>

          {/* Bottom Image in Center */}
          <View
            style={{
              // borderWidth: 1,
              paddingVertical: Metrix.VerticalSize(12),
              height: Metrix.VerticalSize(40),
              width: Metrix.HorizontalSize(80),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: Metrix.VerticalSize(10),
              marginTop: 10, // Space from top row
              borderColor: Utills.selectedThemeColors().Primary,
               backgroundColor:"#fbfbfb"
            }}>
            <CustomImage
              source={imageData[3].source}
              customStyle={{
                width: Metrix.HorizontalSize(40),
              }}
            />
          </View>
        </View>

        <PrimaryButton
          isLoading={btnLoader}
          title={t('continue_payment')}
          onPress={() => continuePayment()}
        />

        <RBSheet
          ref={refRBSheett}
          animationType="slide"
          height={Metrix.VerticalSize(350)}
          openDuration={100}
          closeOnPressMask={true}
          customStyles={{
            container: {
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}>
          <CustomImage
            source={Images.Wow}
            customStyle={{
              width: Metrix.HorizontalSize(200),
              height: Metrix.VerticalSize(150),
              marginTop: Metrix.VerticalSize(20),
              alignSelf: 'center',
            }}
          />

          <CustomText.LargeBoldText
            customStyle={[{fontSize: FontType.FontMedium, marginTop: 10}]}
            ellipsizeMode="tail"
            numberOfLines={2}>
            {t('congratulations')}
          </CustomText.LargeBoldText>

          <CustomText.MediumText
            style={{
              color: Utills.selectedThemeColors().DotGrey,
              marginTop: Metrix.VerticalSize(10),
            }}>
            {t('you_have_avail')} {ShowPromoCode.discountPercentage}%{' '}
            {t('discounts')}
          </CustomText.MediumText>

          <PrimaryButton
            customStyles={{marginTop: Metrix.VerticalSize(40)}}
            width={'90%'}
            onPress={() => refRBSheett.current.close()}
            title={t('ok')}
          />
        </RBSheet>

        <RBSheet
          ref={refRBSheet2}
          animationType="slide"
          height={200}
          openDuration={100}
          closeOnPressMask={true}
          customStyles={{
            container: {
              alignItems: 'center',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            },
          }}>
          <CustomText.LargeSemiBoldText
            style={{
              color: Utills.selectedThemeColors().Danger,
              fontSize: FontType.FontLarge,
              marginTop: Metrix.VerticalSize(15),
            }}>
            Transaction Error!
          </CustomText.LargeSemiBoldText>

          <CustomText.MediumText
            style={{
              color: Utills.selectedThemeColors().Danger,
              marginTop: Metrix.VerticalSize(10),
            }}>
            {errorDetail}
          </CustomText.MediumText>

          <PrimaryButton
            width={'90%'}
            onPress={() => {
              payAgain();
            }}
            title={t('ok')}
          />
        </RBSheet>

        {loading && (
          <ActivityIndicator
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            size="large"
          />
        )}
      </MainContainer>
      <CustomModal onClose={handleOnClosePost} visible={modalVisible}>
        <PlaceholderComponent
          heading={t('congratulations')}
          image={Images.Wow}
          subHeading={t(`conversation_champion`)}
          title={t('go_to_courses')}
          BtnLoader={btnLoader}
          onPress={() => {
            handleOnClosePost();
          }}
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  flexStyle: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Metrix.VerticalSize(10),
  },
  tagsContainer: {
    marginTop: Metrix.VerticalSize(7),
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    // borderWidth:1,
    alignItems: 'center',
  },
});
