import {
  ActivityIndicator,
  ImageProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';
import { BackHeader } from '../BackHeader';
import { t } from 'i18next';
import { FontType, Images, Metrix, NavigationService, RouteNames, Utills } from '../../config';
import { CustomModal } from '../CustomModal/CustomModal';
import RBSheet from 'react-native-raw-bottom-sheet';
import { PlaceholderComponent } from '../PlaceholderCompnent';
import { useDispatch, useSelector } from 'react-redux';
import { CheckPaymentStatus, GetAssiignment, QuizAndAssignmentData, getBonusMaterial, getProgressReport, userEnrolled } from '../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../Redux/Action/ActionType/actionType';
import { PrimaryButton } from '../PrimaryButton';
import { normalizeFont } from '../../config/metrix';
import navigationService from '../../config/navigationService';
import { CustomText } from '..';
import { MyCourses } from '../../Redux/Action/CourseAction/CourseAction';
import { RootState } from '../../screens/HomeScreens/HomeScreen';

const WebViewPayment = ({ route }) => {

  const { url } = route.params
  const course = useSelector(state => state?.HomeReducer?.course_Object);
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const WebViewRef = useRef(null)
  const refRBSheet = useRef()
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [gotoCourseBtnLoader, setgotoCourseBtnLoader] = useState(false);

  function renderLoadingView() {
    return (
      <ActivityIndicator
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 4000000,
      }}
      size="large"
      color={Utills.selectedThemeColors().Black}
    />
    );
}

async function getQuizes() {
  let res = await dispatch(QuizAndAssignmentData(course?._id));

  console.log("res==>",res);

  if (res?.status) {
    dispatch({
      type: ActionType.QUIZ_AND_ASSIGNMET_DATA,
      payload: res?.responseData,
    });
  }
  return res.status
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
  return res.status
}

async function bonusMaterialData() {
  let res = await dispatch(getBonusMaterial(course?._id));

  if (res?.status) {
    dispatch({
      type: ActionType.GET_BONUS,
      payload: res?.responseData,
    });
  }
  return res.status
}

async function ProgressReportData() {
  let res = await dispatch(getProgressReport(course?._id));
  if (res?.staus) {
    dispatch({
      type: ActionType.PROGRESS_REPORT,
      payload: res?.data,
    });
  }
  return res.staus
}


async function fetchMyCourses() {
  let res = await dispatch(MyCourses());

  if (res?.status) {
    dispatch({
      type: ActionType.MY_COURSES,
      payload: res?.responseData,
    });
  }
  return res.status
}

  const handleOnClosePost = async () => {
    setgotoCourseBtnLoader(true)
    try {
      // dispatch({type: ActionType.HOME_LOADER, payload: true});
      const promise1 = getQuizes();
      const promise2 = getAssignment();
      const promise3 = bonusMaterialData();
      const promise4 = ProgressReportData();
      const promise5 = fetchMyCourses()
      await Promise.all([promise1, promise2, promise3, promise4,promise5]).then((res) => {    
            
        if (res.every((element) => element === true)) {       
          // dispatch({type: ActionType.HOME_LOADER, payload: false});   
          setModalVisible(false);
          NavigationService.navigate(
            RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
            {
              movetoIndex: 0,
              movetoCourseDetail: true,
            },
            );
          setgotoCourseBtnLoader(false)
        } else {
          // dispatch({type: ActionType.HOME_LOADER, payload: false});
          setgotoCourseBtnLoader(false)
          Utills.showToast('Server Error', '', 'error');
        }
      });
    } catch (error) {
      setgotoCourseBtnLoader(false)
      dispatch({type: ActionType.HOME_LOADER, payload: false});
      Utills.showToast(error, '', 'error');
    }
  };

 async function CheckPaymentIsSuccess() {
    let res = await dispatch(CheckPaymentStatus(course?._id));

    console.log("CheckPaymentIsSuccess==>",res);
    
    if (res?.status) {
      userEnrolledInToCourse()
      setLoading(false)
    } else if (res?.status == false && res?.message == "Enter Correct Credentials") {
      WrongCredientials()
      setModalVisible(false)
      setLoading(false)
    } 
    else{
      WrongCredientials()
      setModalVisible(false)
      setLoading(false)
    }   
  }

async function userEnrolledInToCourse() {
  
  if (userData?.type == 'guest') {
    // return true
    dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
    return
  }
  
  let res = await dispatch(userEnrolled(course?._id));
  if (res?.status) {
    setTimeout(() => {
      setModalVisible(true);
    }, 1000);
  }
}

function WrongCredientials(){
  refRBSheet?.current?.open()
}

function goBack() {
  refRBSheet?.current?.close()
  setTimeout(() => {
    NavigationService.goBack()
  }, 600);
}


  return (
      <View style={{ flex: 1 }} >
        <BackHeader heading='Payment' />
        <WebView 
          ref={WebViewRef}
          allowsInlineMediaPlayback
          javaScriptEnabled
          // domStorageEnabled
          // startInLoadingState={true}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          originWhitelist={['*']} 
          renderLoading={renderLoadingView}
          // scalesPageToFit={true}
          goBack={() => navigation.goBack()} 
          source={{ uri: url }} 
          style={{ flex: 1, zIndex: 999999 }} 
          injectedJavaScript={`
          // Intercept XMLHttpRequest to monitor API calls
          var open = XMLHttpRequest.prototype.open;
          XMLHttpRequest.prototype.open = function() {
            this.addEventListener('load', function() {
              // Send a message to React Native with API response
              window.ReactNativeWebView.postMessage(JSON.stringify({
                type: 'apiResponse',
                data: JSON.parse(this.responseText)
              }));
            });
            open.apply(this, arguments);
          };
          // Additional code if needed
        `}
        onMessage={(event) => {
          const message = JSON.parse(event.nativeEvent.data);

          setLoading(true)
          console.log("response===>",message);

          if(Array.isArray(message.data)){
            setLoading(false)
          }
          if (message.data?.error == false) {
            setTimeout(() => {
              CheckPaymentIsSuccess()
            }, 4000);
          }
          
        }}
        />

      <CustomModal onClose={handleOnClosePost} visible={modalVisible}>
        <PlaceholderComponent
          heading={t('congratulations')}
          image={Images.Wow}
          subHeading={t(`conversation_champion`)}
          title={t('go_to_courses')}
          BtnLoader={gotoCourseBtnLoader}
          onPress={() => {
            handleOnClosePost();
          }}
        />
      </CustomModal>

      {loading && (
        <ActivityIndicator
          style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
          size="large"
        />
      )}


        <RBSheet
          ref={refRBSheet}
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
          
          <CustomText.LargeSemiBoldText style={{ color: Utills.selectedThemeColors().Danger, fontSize: FontType.FontLarge, marginTop: Metrix.VerticalSize(15) }} >
            Transaction Error!
          </CustomText.LargeSemiBoldText>

          <CustomText.MediumText style={{ color: Utills.selectedThemeColors().Danger, marginTop: Metrix.VerticalSize(10) }} >
            Please Enter Correct Credentials
          </CustomText.MediumText>
          
          <PrimaryButton width={'90%'} onPress={goBack} title={t('pay_again')} />  

        </RBSheet>

      </View>
  )
}

const styles = StyleSheet.create({
  btnStyle: {
    marginHorizontal: Metrix.HorizontalSize(20),

  },


});

export default WebViewPayment
