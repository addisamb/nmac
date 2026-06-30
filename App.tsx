import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {JSX, PropsWithChildren} from 'react';
import {
  Alert,
  AppState,
  Dimensions,
  I18nManager,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  Utills,
} from './src/config';
import {MainStack} from './src/stacks/MainStack';
import Toast, {
  BaseToast,
  ErrorToast,
  ToastProps,
} from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import {
  CustomText,
  Loader,
  PlaceholderComponent,
  PrimaryButton,
} from './src/components';
import './src/i18n';
import {Persistor, Store} from './src/Redux/Store/Store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider, useDispatch} from 'react-redux';
import dataHandlerService from './src/services/dataHandler.service';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import {ComFunction} from './src/config/utills/notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import utills from './src/config/utills';
import {t} from 'i18next';
import {SignupModal} from './src/components/SignupModal';
import {PushNotification} from './src/containers';
// import {getApp} from '@react-native-firebase/app';

function App(): JSX.Element {
  //app
  const toastConfig = {
    info: (props: ToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: Utills.selectedThemeColors().BlueTextColor,
          width: '80%',
        }}
        text1Style={{
          fontSize: 14,
          fontWeight: '600',
          textAlign: I18nManager.forceRTL ? 'left' : 'right',
        }}
        text2Style={{
          fontSize: 12,
        }}
        text1NumberOfLines={2}
      />
    ),
    success: (props: ToastProps) => (
      <BaseToast
        {...props}
        style={{
          borderLeftColor: Utills.selectedThemeColors().Primary,
          // borderLeftColor: 'lightgreen',
          width: '80%',
          borderLeftWidth: 6,
          // ...Metrix.createShadow,
        }}
        text1Style={{
          fontSize: 14,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 12,
        }}
        text1NumberOfLines={2}
      />
    ),
    error: (props: ToastProps) => (
      <ErrorToast
        {...props}
        style={{
          borderLeftColor: '#FF0000',
          // borderLeftColor: Utills.selectedThemeColors().ErrorTextColor,
          width: '80%',
        }}
        text1Style={{
          fontSize: 13,
          fontWeight: '600',
        }}
        text2Style={{
          fontSize: 12,
        }}
      />
    ),
  };

  const changeBottomBtnBarColor = async () => {
    try {
      const response = await changeNavigationBarColor(
        Utills.selectedThemeColors().Base,
        true,
      );
      console.log(response); // {success: true}
    } catch (e) {
      console.log(e); // {success: false}
    }
  };

  useEffect(() => {
    changeBottomBtnBarColor();

    setTimeout(() => {
      SplashScreen.hide();
    }, 1500);
  }, []);

  useEffect(() => {
    requestUserPermission();
  }, []);



  
  // useEffect(() => {
  //   ComFunction.CreateChannel();
  // messaging().setBackgroundMessageHandler(async remoteMessage => {
  //   console.log('Forground Notificaitn', remoteMessage);
  // });
  // messaging().onMessage(async remoteMessage => {
  //   console.log("Asdasdas==>",remoteMessage);

  // });
  // }, []);

  // async function onMessageReceived(message) {
  //   let showMsgNotfication = message?.data?.showNotification;
  //   let AppSituation = AppState?.currentState;

  //   if (showMsgNotfication === 'msgNotification' && AppSituation == 'active') {
  //     console.log('return run');
  //     return;
  //   } else {
  //     await notifee.displayNotification({
  //       title: message.notification.title,
  //       body: message.notification.body,
  //       android: {
  //         channelId: 'digiapp-eb2eb',
  //         // smallIcon: 'notification_icon', // optional, defaults to 'ic_launcher'.s
  //         pressAction: {
  //           id: 'default',
  //         },

  //         // Reference the name created (Optional, defaults to 'ic_launcher')
  //         smallIcon: 'ic_launcher_adaptive_fore',
  //         largeIcon: require('./src/assets/images/logo.png'),

  //         // Set color of icon (Optional, defaults to white)
  //         color:"red",
  //       },
  //     });
  //   }
  // }

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     await onMessageReceived(remoteMessage);
  //   });

  //   return unsubscribe;
  // }, []);

  // async function onMessageReceived(remoteMessage) {
  //   let showMsgNotification = remoteMessage?.data?.showNotification;
  //   let appSituation = AppState?.currentState;

  //   if (
  //     showMsgNotification === 'msgNotification' &&
  //     appSituation === 'active'
  //   ) {
  //     console.log('return run');
  //     return;
  //   }
  //   try {
  //     await notifee.displayNotification({
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       android: {
  //         channelId: 'nmoacademy-25acf',
  //         pressAction: {
  //           id: 'default',
  //         },
  //         // smallIcon: 'ic_launcher_adaptive_fore',
  //         largeIcon: require('./src/assets/icons/logo.png'),
  //         color: utills.selectedThemeColors().Primary,
  //       },
  //     });
  //   } catch (error) {
  //     console.error('Error displaying notification:', error);
  //   }
  // }

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //     console.log("A new FCM message arrived!",remoteMessage);
  //   })
  //   return unsubscribe
  // })

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      const token = await messaging().getToken();
      console.log('dEVICE TOKEN', token);
      try {
        await AsyncStorage.setItem('FCM_TOKEN', JSON.stringify(token));
      } catch (error) {
        console.error('Error storing value:', error);
      }
    }
  }

  dataHandlerService.setStore(Store);

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <NavigationContainer
          ref={ref => NavigationService.setTopLevelNavigator(ref)}
          theme={{
            dark: true,
            colors: {
              background: Utills.selectedThemeColors().Base,
              primary: Utills.selectedThemeColors().Base,
              card: Utills.selectedThemeColors().Base,
              text: Utills.selectedThemeColors().Base,
              border: Utills.selectedThemeColors().Base,
              notification: Utills.selectedThemeColors().Base,
            },
          }}>
          <MainStack />
          <Toast config={toastConfig} />
          <Loader />
        </NavigationContainer>
        <PushNotification />
      </PersistGate>
    </Provider>
  );
}
//new
const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
    backgroundColor: Utills.selectedThemeColors().Base,
  },
});

export default App;
