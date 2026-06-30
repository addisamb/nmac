import {
  ActivityIndicator,
  BackHandler,
  ImageProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {WebView} from 'react-native-webview';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {BackHeader} from '../BackHeader';
import {t} from 'i18next';
import {RouteNames, Utills} from '../../config';
import navigationService from '../../config/navigationService';
import {RootState} from '../../screens/HomeScreens/HomeScreen';
import {useDispatch, useSelector} from 'react-redux';
import {showLoginPleaseModal} from '../../Redux/Action/AuthActions/authActions';
import {getProgressReport, onCompleteVideo} from '../../Redux/Action/HomeActions/homeActions';


const WebViewComp = ({route}) => {
  const {url, movetoCourseDetail, movetoIndex, documentTitle, contentId} =
    route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  console.log('=========>>>>>>', route.params);

  const webViewRef = useRef(null); // Create a ref for the WebView component

  function handleBackButtonClick() {
    console.log('onBack');
    //i only bass bac from coursedetail screen becouse poor work navigation inside the component so if didn't do this so after prevew document from course detail if goBack so i come to afterpurchase course screen so this why i do this

    if (movetoCourseDetail == 'back') {
      navigationService.goBack();
      return;
    } else {
      navigationService.navigate(
        RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
        {
          movetoIndex: movetoIndex,
          movetoCourseDetail: movetoCourseDetail,
        },
      );
      return;
    }
  }
  async function onVideoEnd() {
    if (userData?.type == 'guest') {
      dispatch(showLoginPleaseModal(true));
      return;
    }
  
    let payload = {
      contentId,
    };
  
    const response = await dispatch(onCompleteVideo(payload));
  
    if (response) {
      await dispatch(getProgressReport(userData?.id));
    }
  }
  

  function handleBackButtonClickk() {
    onVideoEnd();

    if (movetoCourseDetail == 'back') {
      navigationService.goBack();
      return true;
    } else {
      navigationService.navigate(
        RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
        {
          movetoIndex: movetoIndex,
          movetoCourseDetail: movetoCourseDetail,
        },
      );
      return true;
    }
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClickk);
    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClickk,
      );
    };
  }, []);

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

  // Unmount WebView when screen is not focused
  useEffect(() => {
    if (!isFocused && webViewRef.current) {
      return () => {
        renderView();
        webViewRef.current = null;
      };
    }
  }, [isFocused]);

  const injectedJavaScript = `
        document.addEventListener('DOMContentLoaded', function() {
          var video = document.querySelector('video');
          if (video) {
            video.addEventListener('ended', function() {
              window.ReactNativeWebView.postMessage("videoEnded");
            });
          }
        });
      `;

  //   function renderView() {
  //     //   const injectedJavaScript = `
  //     //   document.addEventListener('DOMContentLoaded', function() {
  //     //     var video = document.querySelector('video');
  //     //     if (video) {
  //     //       video.addEventListener('ended', function() {
  //     //         window.ReactNativeWebView.postMessage("videoEnded");
  //     //       });
  //     //     }
  //     //   });
  //     // `;
  //     const injectedJavaScript = `
  //   setTimeout(() => {
  //     var video = document.querySelector('video');
  //     if (video) {
  //       console.log("Video element found!");
  //       window.ReactNativeWebView.postMessage("Video element found");
  //     } else {
  //       console.log("No video element found!");
  //       window.ReactNativeWebView.postMessage("No video element found");
  //     }
  //   }, 3000);
  // `;
  //     return (
  //       <>
  //         <VideoPlayer
  //           onEnd={onVideoEnd}
  //           source={{uri: url}}
  //           onBack={handleBackButtonClick}
  //           // paused={isPaused}
  //         />
  //       </>
  //       //   <WebView
  //       //   ref={webViewRef} // Pass the ref to WebView component
  //       //   allowsInlineMediaPlayback
  //       //   javaScriptEnabled
  //       //   // domStorageEnabled
  //       //   // startInLoadingState={true}
  //       //   originWhitelist={['*']}
  //       //   renderLoading={renderLoadingView}
  //       //   // scalesPageToFit={true}
  //       //   goBack={() => navigation.goBack()}
  //       //   source={{ uri: url }}
  //       //   onCloseWindow={() => {
  //       //     console.log('onCloseWindow');
  //       //   }}
  //       //   style={{ flex: 1, zIndex: 999999 }}
  //       //   injectedJavaScript={injectedJavaScript}
  //       //   onMessage={(event) => {
  //       //     if (event.nativeEvent.data === "videoEnded") {
  //       //       onVideoEnd(); // Call API when video ends
  //       //     }
  //       //   }}
  //       // />
  //     );
  //   }

  function renderView() {
    const isVideo = url?.toLowerCase().endsWith('.mp4') || documentTitle?.toLowerCase().endsWith('.mp4');
    const isValidFile = /\.(pdf|xlsx|xls|xlsm|docx)$/i.test(documentTitle) || /\.(pdf|xlsx|xls|xlsm|docx)$/i.test(url);
    const injectedJavaScriptForVideo = `
  document.body.innerHTML = '<video width="100%" height="100%" controls autoplay><source src="${url}" type="video/mp4"></video>';
`;


if (isVideo) {
  return (
    <WebView
      ref={webViewRef}
      allowsInlineMediaPlayback
      javaScriptEnabled
      originWhitelist={['*']}
      renderLoading={renderLoadingView}
      source={{ uri: url }}
      onCloseWindow={() => {
        console.log('onCloseWindow');
      }}
      style={{ flex: 1, zIndex: 999999 }}
      injectedJavaScript={injectedJavaScriptForVideo} 
      onMessage={event => {
        if (event.nativeEvent.data === 'videoEnded') {
          onVideoEnd(); // Call API when video ends
        }
      }}
    />
  );
}

    else if (isValidFile) {
      return (
        <WebView
        ref={webViewRef}
        allowsInlineMediaPlayback
        javaScriptEnabled
        originWhitelist={['*']}
        renderLoading={renderLoadingView}
        source={{uri: url}}
        style={{flex: 1, zIndex: 999999}}
      />
      );
    }
    
     else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Unsupported file format</Text>
        </View>
      );
    }
  }

  return (
    <View style={{flex: 1}}>
      <BackHeader
        heading={documentTitle}
        backFunction={handleBackButtonClickk}
      />
      {isFocused && renderView()}
    </View>
  );
};

const styles = StyleSheet.create({});

export default WebViewComp;
