import notifee, {
  AndroidColor,
  AndroidImportance,
  EventType,
} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
  firebase,
} from '@react-native-firebase/messaging';
import React, {useEffect} from 'react';
import {AppState, Platform, StyleSheet} from 'react-native';
import {Colors, Images, NavigationService} from '../../config';
type PushNotificationProps = {};

export const PushNotification: React.FC<PushNotificationProps> = ({}) => {
  // const dispatch = useDispatch();

  useEffect(() => {
    // requestUserPermission();

    const unsubscribeOnMessage = messaging().onMessage(
      async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        // Handle foreground notifications
        console.log(
          'A new FCM message arrived!',
          JSON.stringify(remoteMessage),
        );
        showNotification(remoteMessage.notification);
      },
    );
    // Your app's background handler for incoming remote messages
    const background = () =>
      firebase
        .messaging()
        .setBackgroundMessageHandler(
          async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
            // Increment the count by 1
            await notifee.incrementBadgeCount();
          },
        );
        background();

   

    // Call the background function to set up background message handling
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(
        (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
          // Handle background/quit notifications
          console.log(
            'Notification caused app to open from background state:',
            JSON.stringify(remoteMessage),
          );
          handleNotificationInteraction(remoteMessage);
        },
      );

    // Check if the app was opened by a notification
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            JSON.stringify(remoteMessage),
          );
          handleNotificationInteraction(remoteMessage);
        }
      });

    const unsubscribeOnForeground = notifee.onForegroundEvent(
      ({detail}: any) => {
        let showMsgNotification = detail.notification;
        let appSituation = AppState?.currentState;
        if (
          (showMsgNotification?.ios?.foregroundPresentationOptions &&
          appSituation === 'active') || Platform.OS == 'android'
        ) {
          console.log('this conditioon is aif active and ios foreground or background so com to app with navigate to screen');
          return 
        } else {
          NavigationService.navigate('Activity');
        }

      },
    );

    // const unsubscribeOnBackground = notifee.onBackgroundEvent(
    //   ({detail}: any) => {
    //     console.log(
    //       'Notification displayed in the background:',
    //       JSON.stringify(detail.notification),
    //     );
    //     handleNotificationInteraction(detail.notification);
    //   },
    // );

    const unsubscribeOnBackground = () =>
      notifee.onBackgroundEvent(async ({type, detail}: any) => {
        // const {notification, pressAction} = detail;
        // Check if the user pressed the "Mark as read" action
        if (
          type === EventType.ACTION_PRESS &&
          detail.pressAction.id === 'mark-as-read'
        ) {
          // Remove the notification
          await notifee.cancelAllNotifications();
        }
      });
    unsubscribeOnBackground();

    return () => {
      unsubscribeOnMessage();
      // unsubscribeOnNotificationOpenedApp();
      unsubscribeOnForeground();
      unsubscribeOnBackground();
      background();
    };
  }, []);

  const showNotification = async (notification: any) => {
    const channelId = await notifee.createChannel({
      id: 'nmoacademy-25acf',
      name: 'nmoacademy-25acf',
      description: 'A channel to categorize your notifications',
      sound: 'default',
      importance: AndroidImportance.HIGH,
      vibration: true,
      vibrationPattern: [300, 500],
      lights: true,
      lightColor: AndroidColor.NAVY,
    });
    // https://nmo-bucket.s3.me-central-1.amazonaws.com/44077736-aa3b-475a-bcc4-c459dc840c2a_IMG_0006.HEIC
    // Create a notification
    const myNotification = {
      title: notification.title || 'Alert',
      body: notification.body || 'Notificaton',
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
        color: Colors.Primary,
      },
      ios: {
        foregroundPresentationOptions: {
          badge: true,
          sound: true,
          banner: true,
          list: true,
        },
      },
    };

    // Display the notification
    await notifee.displayNotification(myNotification);
    // await notifee.incrementBadgeCount();
  };

  const handleNotificationInteraction = (notification: any) => {  //only work in android foregrouind and background not work in ios

    NavigationService.navigate('Activity');

    // Add your custom logic here
    // Alert.alert(
    //   'Notification Interaction',
    //   'User interacted with the notification!',
    //   [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    // );
  };

  return null;
};

const styles = StyleSheet.create({});
