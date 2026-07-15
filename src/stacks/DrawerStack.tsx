// import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
// import React, { useState } from 'react';
// import {
//   I18nManager,
//   Image,
//   ImageProps,
//   Platform,
//   SafeAreaView,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { Title } from 'react-native-paper';
// import { useDispatch, useSelector } from 'react-redux';
// import { CustomModal, CustomText, PrimaryButton } from '../components';
// import { Images, Metrix, NavigationService, RouteNames, Utills } from '../config';
// import { TabStack } from './TabStack';
// // import {AuthActions} from '../redux/actions';
// import { t } from 'i18next';
// import { normalizeFont } from '../config/metrix';
// import navigationService from '../config/navigationService';
// import { isLogin } from '../Redux/Action/AuthActions/authActions';
// import { RootState } from '../screens/HomeScreens/HomeScreen';

// const Drawer = createDrawerNavigator();

// const DrawerContent: React.FC = () => {
//   const userData = useSelector(
//     (state: RootState) => state?.HomeReducer?.userData,
//   );
//   const userprofilePic = useSelector(
//     state => state?.HomeReducer?.userData?.profilePic,
//   );

//   const dispatch = useDispatch();
//   const [modalVisible, setModalVisible] = useState(false);
//   const DrawerElement =
//     userData?.type == 'guest'
//       ? [
//           {
//             label: t('about_us'),
//             icon: Images.About,
//             onPress: () => {
//               NavigationService.navigate(RouteNames.HomeRoutes.AboutUsScreen, {
//                 /// For param passing conditonaly
//                 from: 'about',
//               });
//             },
//           },
//           {
//             label: t('common_question'),
//             icon: Images.Common,
//             onPress: () => {
//               NavigationService.navigate(
//                 RouteNames.HomeRoutes.CommonQuestions,
//                 {
//                   // from: 'common',
//                 },
//               );
//             },
//           },
//           {
//             label: t('terms_conditions'),
//             icon: Images.TermCondition,
//             onPress: () => {
//               NavigationService.navigate(
//                 RouteNames.HomeRoutes.NavigationScreen,
//                 {
//                   from: 'termsAndconditions',
//                 },
//               );
//             },
//           },
//           {
//             label: t('log_out'),
//             icon: Images.LogOut,
//             onPress: () => {
//               setModalVisible(true);
//             },
//             // onPress: () => dispatch(AuthActions.loginSuccess(false)),
//           },
//         ]
//       : [
//           {
//             label: t('about_us'),
//             icon: Images.About,
//             onPress: () => {
//               NavigationService.navigate(RouteNames.HomeRoutes.AboutUsScreen, {
//                 /// For param passing conditonaly
//                 from: 'about',
//               });
//             },
//           },
//           {
//             label: t('best_points_program_members'),
//             icon: Images.Coins,
//             onPress: () => {
//               NavigationService.navigate(
//                 RouteNames.HomeRoutes.BestPointsProgram,
//                 {
//                   // from: 'points',
//                 },
//               );
//             },
//           },
//           {
//             label: t('invitation'),
//             icon: Images.Invitation,
//             onPress: () => {
//               NavigationService.navigate(RouteNames.HomeRoutes.InviteFriend, {
//                 // from: 'common',
//               });
//             },
//           },
//           {
//             label: t('invitation_rewards'),
//             icon: Images.Certificate,
//             onPress: () => {
//               NavigationService.navigate(
//                 RouteNames.HomeRoutes.InvitationRewards,
//                 {
//                   // from: 'common',
//                 },
//               );
//             },
//           },
//           {
//             label: t('common_question'),
//             icon: Images.Common,
//             onPress: () => {
//               NavigationService.navigate(
//                 RouteNames.HomeRoutes.CommonQuestions,
//                 {
//                   // from: 'common',
//                 },
//               );
//             },
//           },
//           {
//             label: t('terms_conditions'),
//             icon: Images.TermCondition,
//             onPress: () => {
//               NavigationService.navigate(
//                 RouteNames.HomeRoutes.NavigationScreen,
//                 {
//                   from: 'termsAndconditions',
//                 },
//               );
//             },
//           },
//           {
//             label: t('log_out'),
//             icon: Images.LogOut,
//             onPress: () => {
//               setModalVisible(true);
//             },
//             // onPress: () => dispatch(AuthActions.loginSuccess(false)),
//           },
//         ];

//   return (
//     <>
//       <View style={styles.userInfoSection}>
//         <View
//           style={{
//             // borderWidth:1,
//             paddingLeft: 25,
//             paddingVertical: 5,
//           }}>
//           <Image
//             source={
//               userData?.profilePic
//                 ? {
//                     uri: userData.profilePic,
//                   }
//                 : Images.user2
//             }
//             style={{
//               width: Metrix.HorizontalSize(75),
//               height: Metrix.VerticalSize(75),
//               borderRadius: 200,
//             }}
//           />
//           <Title style={styles.title}>{userData?.name}</Title>
//         </View>

//         <View style={styles.drawerSection}>
//           {DrawerElement.map((option, index) => (
//             <TouchableOpacity
//               activeOpacity={0.6}
//               key={index}
//               style={{
//                 // borderWidth:1,
//                 width: '100%',
//                 flexDirection: 'row',
//                 alignItems: 'center',
//                 justifyContent: 'space-around',
//                 paddingRight: Metrix.HorizontalSize(20),
//               }}>
//               <DrawerItem
              
//                 icon={({color, size}) => (
//                   <Image
//                     key={index}
//                     source={option.icon}
//                     style={{
//                       width: Metrix.HorizontalSize(17),
//                       height: Metrix.VerticalSize(17),
//                       tintColor: Utills.selectedThemeColors().Primary,
//                       transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
//                     }}
//                     resizeMode="contain"
//                   />
//                 )}
//                 label={option.label}
//                 labelStyle={{
//                   fontSize: 14,
//                   color: Utills.selectedThemeColors().PrimaryTextColor,
//                   textAlign: I18nManager.isRTL ? 'left' : 'right',
//                 }}
//                 onPress={option.onPress}
//                 style={{width: '80%'}}
//               />
//               <Image
//                 key={index}
//                 source={Images.Stroke}
//                 style={{
//                   // borderWidth:1,
//                   width: Metrix.HorizontalSize(10),
//                   height: Metrix.VerticalSize(10),
//                   tintColor: Utills.selectedThemeColors().Primary,
//                   transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
//                 }}
//                 resizeMode="contain"
//               />
//             </TouchableOpacity>
//           ))}
//         </View>
//       </View>
//       <CustomModal
//         smallContainerStyles={{
//           height: '27%',
//         }}
//         onClose={() => {
//           setModalVisible(false);
//         }}
//         smallModal
//         visible={modalVisible}>
//         <View>
//           <CustomText.LargeBoldText customStyle={styles.smallModalHeading}>
//             {t('log_out')}
//           </CustomText.LargeBoldText>
//         </View>
//         <View
//           style={{
//             alignItems: 'center',
//             marginTop: Metrix.VerticalSize(15),
//           }}>
//           {/* <Image
//        style={{
//          height: Metrix.VerticalSize(100),
//          width: Metrix.HorizontalSize(100),
//        }}
//        source={Images.CheckConfirm}
//      /> */}
//           <View style={{width: '80%'}}>
//             <CustomText.RegularText style={styles.smallModalTextStyle}>
//               {t('log_out_title')}
//             </CustomText.RegularText>
//           </View>
//         </View>
//         <View style={styles.modalButtonViewStyle}>
//           <PrimaryButton
//             onPress={() => {
//               setModalVisible(false);
//               // dispatch(AuthActions.loginSuccess(false));
//             }}
//             customStyles={styles.samllModalButtonStyle}
//             title={t('no')}
//           />
//           <PrimaryButton
//             onPress={() => {
//               setModalVisible(false);
//               dispatch(isLogin('afterOnboard'));
//               // dispatch(Logout());
//               // dispatch(AuthActions.loginSuccess(false));
//             }}
//             textColor={Utills.selectedThemeColors().Primary}
//             customStyles={styles.secondaryButtonStyle}
//             title={t('yes')}
//           />
//         </View>
//       </CustomModal>
//     </>
//   );
// };

// const HeaderIconsComponent: React.FC<{
//   icon: ImageProps['source'];
//   onPress: () => void;
//   size?: number;
// }> = ({icon, onPress, size}) => (
//   <TouchableOpacity onPress={onPress}>
//     <Image
//       source={icon}
//       resizeMode="contain"
//       style={{
//         // borderWidth:1,
//         // transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
//         width: Metrix.HorizontalSize(size || 30),
//         height: Metrix.VerticalSize(size || 30),
//       }}
//     />
//   </TouchableOpacity>
// );

// const CustomHeader = ({navigation}: {navigation: any}) => {
//   //   const navigation = useNavigation();

//   const headerIconsData = [
//     {
//       id: '1',
//       icon: Images.Drawer,
//       onPress: () => navigation?.openDrawer(),
//     },
//     {
//       id: '2',
//       icon: I18nManager?.isRTL ? Images.ArabicLogo : Images.NMO,
//       onPress: () => {
//         //HomeScreens //drawerstack
//         navigation.reset({
//           index: 0,
//           routes: [{name: 'DrawerStack'}],
//         });
//       },
//       size: 80,
//     },
//     {
//       id: '3',
//       icon: Images.BellActive,
//       onPress: () => {
//         navigationService.navigate(RouteNames.HomeRoutes.Activity);
//       },
//       size: 20,
//     },
//   ];
//   return (
//     <SafeAreaView>
//       <View
//         style={{
//           flexDirection: 'row',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           paddingHorizontal: Metrix.HorizontalSize(10),
//           marginTop:
//             Platform.OS == 'ios'
//               ? Metrix.VerticalSize(0)
//               : Metrix.VerticalSize(10),
//         }}>
//         {headerIconsData?.map(item => (
//           <View key={item.id}>
//             {item.id === '2' && I18nManager.isRTL ? (
//               <TouchableOpacity onPress={item.onPress}>
//                 <View>
//                   <HeaderIconsComponent
//                     onPress={item.onPress}
//                     icon={item.icon}
//                     size={item.size}
//                   />
//                 </View>
//               </TouchableOpacity>
//             ) : (
//               <TouchableOpacity onPress={item.onPress}>
//                 <View>
//                   <Image
//                     source={item.icon}
//                     resizeMode="contain"
//                     style={{
//                       transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
//                       width: Metrix.HorizontalSize(item.size || 30),
//                       height: Metrix.VerticalSize(item.size || 30),
//                     }}
//                   />
//                 </View>
//               </TouchableOpacity>
//             )}
//           </View>
//         ))}
//       </View>
//     </SafeAreaView>
//   );
// };

// export const DrawerStack: React.FC = () => {
//   return (
//     <Drawer.Navigator
//       // initialRouteName={RouteNames.HomeRoutes.TabStack}
//       useLegacyImplementation={false}
//       screenOptions={{
//         header: ({navigation, route, options}) => {
//           return <CustomHeader navigation={navigation} />;
//         },
//       }}
//       drawerContent={() => <DrawerContent />}>
//       {/* <DrawerContent /> */}
//       <Drawer.Screen
//         name={RouteNames.HomeRoutes.TabStack}
//         component={TabStack}
//       />
//     </Drawer.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   drawerContent: {
//     position: 'absolute',
//     zIndex: 999,
//     flex: 1,
//   },
//   userInfoSection: {
//     marginTop: 50,
//   },
//   title: {
//     marginTop: 20,
//     fontWeight: 'bold',
//     color: Utills.selectedThemeColors().PrimaryTextColor,
//   },
//   caption: {
//     fontSize: 14,
//     lineHeight: 14,
//   },
//   row: {
//     marginTop: 20,
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   section: {
//     borderWidth: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 15,
//   },
//   paragraph: {
//     fontWeight: 'bold',
//     marginRight: 3,
//   },
//   drawerSection: {
//     paddingTop: 25,
//     borderTopWidth: 1,
//     borderColor: Utills.selectedThemeColors().InActiveTabBar,
//     marginTop: 25,
//   },
//   preference: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//   },

//   smallModalTextStyle: {
//     marginTop: Metrix.VerticalSize(5),
//     textAlign: 'center',
//     color: Utills.selectedThemeColors().LightGrayTextColor,
//   },

//   samllModalButtonStyle: {
//     width: Metrix.HorizontalSize(100),
//     height: Metrix.VerticalSize(32.232),
//   },
//   smallModalHeading: {
//     textAlign: 'center',
//     fontSize: normalizeFont(22),
//     color: Utills.selectedThemeColors().Primary,
//   },
//   modalButtonViewStyle: {
//     width: '85%',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: Metrix.VerticalSize(10),
//   },
//   secondaryButtonStyle: {
//     width: Metrix.HorizontalSize(100),
//     height: Metrix.VerticalSize(32.232),
//     backgroundColor: Utills.selectedThemeColors().Base,
//     borderWidth: 1.5,
//     borderColor: Utills.selectedThemeColors().Primary,
//   },
// });



import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {
  I18nManager,
  Image,
  ImageProps,
  Platform,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
} from 'react-native';
import {Title} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {CustomModal, CustomText, PrimaryButton} from '../components';
import {
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../config';
import {TabStack} from './TabStack';
import {t} from 'i18next';
import {normalizeFont} from '../config/metrix';
import navigationService from '../config/navigationService';
import {isLogin} from '../Redux/Action/AuthActions/authActions';
import {RootState} from '../screens/HomeScreens/HomeScreen';

const Drawer = createDrawerNavigator();

const DrawerContent: React.FC = () => {
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const DrawerElement =
    userData?.type == 'guest'
      ? [
          {
            label: t('about_us'),
            icon: Images.About,
            onPress: () =>
              NavigationService.navigate(RouteNames.HomeRoutes.AboutUsScreen, {
                from: 'about',
              }),
          },
          {
            label: t('common_question'),
            icon: Images.Common,
            onPress: () =>
              NavigationService.navigate(
                RouteNames.HomeRoutes.CommonQuestions,
                {},
              ),
          },
          {
            label: t('terms_conditions'),
            icon: Images.TermCondition,
            onPress: () =>
              NavigationService.navigate(
                RouteNames.HomeRoutes.NavigationScreen,
                {
                  from: 'termsAndconditions',
                },
              ),
          },
          {
            label: t('log_out'),
            icon: Images.LogOut,
            onPress: () => setModalVisible(true),
          },
        ]
      : [
          {
            label: t('about_us'),
            icon: Images.About,
            onPress: () =>
              NavigationService.navigate(RouteNames.HomeRoutes.AboutUsScreen, {
                from: 'about',
              }),
          },
          {
            label: t('best_points_program_members'),
            icon: Images.Coins,
            onPress: () =>
              NavigationService.navigate(
                RouteNames.HomeRoutes.BestPointsProgram,
                {},
              ),
          },
          {
            label: t('invitation'),
            icon: Images.Invitation,
            onPress: () =>
              NavigationService.navigate(RouteNames.HomeRoutes.InviteFriend, {}),
          },
          {
            label: t('invitation_rewards'),
            icon: Images.Certificate,
            onPress: () =>
              NavigationService.navigate(
                RouteNames.HomeRoutes.InvitationRewards,
                {},
              ),
          },
          {
            label: t('common_question'),
            icon: Images.Common,
            onPress: () =>
              NavigationService.navigate(
                RouteNames.HomeRoutes.CommonQuestions,
                {},
              ),
          },
          {
            label: t('terms_conditions'),
            icon: Images.TermCondition,
            onPress: () =>
              NavigationService.navigate(
                RouteNames.HomeRoutes.NavigationScreen,
                {
                  from: 'termsAndconditions',
                },
              ),
          },
          {
            label: t('log_out'),
            icon: Images.LogOut,
            onPress: () => setModalVisible(true),
          },
        ];

  return (
    <>
      <DrawerContentScrollView>
        {/* User Info */}
        <View style={styles.userInfoSection}>
          <Image
            source={
              userData?.profilePic
                ? {uri: userData.profilePic}
                : Images.user2
            }
            style={{
              width: Metrix.HorizontalSize(75),
              height: Metrix.VerticalSize(75),
              borderRadius: 200,
            }}
          />
          <Title style={styles.title}>{userData?.name}</Title>
        </View>

        {/* Drawer Items */}
        <View style={styles.drawerSection}>
          {DrawerElement.map((option, index) => (
            <DrawerItem
              key={index}
              icon={() => (
                <Image
                  source={option.icon}
                  style={{
                    width: Metrix.HorizontalSize(17),
                    height: Metrix.VerticalSize(17),
                    tintColor: Utills.selectedThemeColors().Primary,
                    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                  }}
                  resizeMode="contain"
                />
              )}
              label={() => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <CustomText.RegularText
                    style={{
                      fontSize: 14,
                      color: Utills.selectedThemeColors().PrimaryTextColor,
                      textAlign: I18nManager.isRTL ? 'left' : 'right',
                    }}>
                    {option.label}
                  </CustomText.RegularText>
                  <Image
                    source={Images.Stroke}
                    style={{
                      width: Metrix.HorizontalSize(10),
                      height: Metrix.VerticalSize(10),
                      tintColor: Utills.selectedThemeColors().Primary,
                    }}
                    resizeMode="contain"
                  />
                </View>
              )}
              onPress={option.onPress}
            />
          ))}
        </View>
      </DrawerContentScrollView>

      {/* Logout Modal */}
      <CustomModal
        smallContainerStyles={{height: '27%'}}
        onClose={() => setModalVisible(false)}
        smallModal
        visible={modalVisible}>
        <View>
          <CustomText.LargeBoldText customStyle={styles.smallModalHeading}>
            {t('log_out')}
          </CustomText.LargeBoldText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(15),
          }}>
          <View style={{width: '80%'}}>
            <CustomText.RegularText style={styles.smallModalTextStyle}>
              {t('log_out_title')}
            </CustomText.RegularText>
          </View>
        </View>
        <View style={styles.modalButtonViewStyle}>
          <PrimaryButton
            onPress={() => setModalVisible(false)}
            customStyles={styles.samllModalButtonStyle}
            title={t('no')}
          />
          <PrimaryButton
            onPress={() => {
              setModalVisible(false);
              dispatch(isLogin('afterOnboard'));
            }}
            textColor={Utills.selectedThemeColors().Primary}
            customStyles={styles.secondaryButtonStyle}
            title={t('yes')}
          />
        </View>
      </CustomModal>
    </>
  );
};

const HeaderIconsComponent: React.FC<{
  icon: ImageProps['source'];
  onPress: () => void;
  size?: number;
}> = ({icon, onPress, size}) => (
  <TouchableOpacity onPress={onPress}>
    <Image
      source={icon}
      resizeMode="contain"
      style={{
        width: Metrix.HorizontalSize(size || 30),
        height: Metrix.VerticalSize(size || 30),
      }}
    />
  </TouchableOpacity>
);

const CustomHeader = ({navigation}: {navigation: any}) => {
  const headerIconsData = [
    {
      id: '1',
      icon: Images.Drawer,
      onPress: () => navigation?.openDrawer(),
    },
    {
      id: '2',
      icon: I18nManager?.isRTL ? Images.ArabicLogo : Images.NMO,
      onPress: () =>
        navigation.reset({
          index: 0,
          routes: [{name: 'DrawerStack'}],
        }),
      size: 80,
    },
    {
      id: '3',
      icon: Images.BellActive,
      onPress: () =>
        navigationService.navigate(RouteNames.HomeRoutes.Activity),
      size: 20,
    },
  ];
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: Metrix.HorizontalSize(10),
          marginTop:
            Platform.OS == 'ios'
              ? Metrix.VerticalSize(0)
              : Metrix.VerticalSize(10),
        }}>
        {headerIconsData?.map(item => (
          <View key={item.id}>
            {item.id === '2' && I18nManager.isRTL ? (
              <HeaderIconsComponent
                onPress={item.onPress}
                icon={item.icon}
                size={item.size}
              />
            ) : (
              <TouchableOpacity onPress={item.onPress}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{
                    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                    width: Metrix.HorizontalSize(item.size || 30),
                    height: Metrix.VerticalSize(item.size || 30),
                  }}
                />
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
};

export const DrawerStack: React.FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({navigation}) => <CustomHeader navigation={navigation} />,
      }}
      drawerContent={() => <DrawerContent />}>
      <Drawer.Screen
        name={RouteNames.HomeRoutes.TabStack}
        component={TabStack}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  userInfoSection: {
    marginTop: 50,
    paddingLeft: 25,
    paddingVertical: 5,
  },
  title: {
    marginTop: 20,
    fontWeight: 'bold',
    color: Utills.selectedThemeColors().PrimaryTextColor,
  },
  drawerSection: {
    paddingTop: 25,
    borderTopWidth: 1,
    borderColor: Utills.selectedThemeColors().InActiveTabBar,
    marginTop: 25,
  },
  smallModalTextStyle: {
    marginTop: Metrix.VerticalSize(5),
    textAlign: 'center',
    color: Utills.selectedThemeColors().LightGrayTextColor,
  },
  samllModalButtonStyle: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(32.232),
  },
  smallModalHeading: {
    textAlign: 'center',
    fontSize: normalizeFont(22),
    color: Utills.selectedThemeColors().Primary,
  },
  modalButtonViewStyle: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Metrix.VerticalSize(10),
  },
  secondaryButtonStyle: {
    width: Metrix.HorizontalSize(100),
    height: Metrix.VerticalSize(32.232),
    backgroundColor: Utills.selectedThemeColors().Base,
    borderWidth: 1.5,
    borderColor: Utills.selectedThemeColors().Primary,
  },
});
