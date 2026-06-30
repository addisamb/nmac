import { StyleSheet, Switch, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { InviteFriendProps } from '../../propTypes';
import { t } from 'i18next';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {
  BackHeader,
  CustomImage,
  CustomInput,
  CustomText,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import { normalizeFont } from '../../../config/metrix';
import { Item } from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import { ScrollView } from 'react-native-gesture-handler';
import Share from 'react-native-share';
import { Alert } from 'react-native';
import { RootState } from '../HomeScreen';
import { useSelector } from 'react-redux';
// import dynamicLinks from '@react-native-firebase/dynamic-links';


export const InviteFriend: React.FC<InviteFriendProps> = ({ }) => {

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const imageSources = [
    {
      img: Images.Facebook,
    },
    {
      img: Images.Messages,
    },
    {
      img: Images.Instagram,
    },
    {
      img: Images.linkedin,
    },
  ];
  const inviteData = [
    {
      img: Images.Star,
      heading: t('invite_your_friends'),
      subHeading: t('invite_desc'),
    },
  ];

  const onShare = async () => {

    try {
      const shareOptions = {
        message: `${'https://www.nmoacademy.com'} \n\nReferral Code: ${userData?.referralCode}`, 
      };
      await Share.open(shareOptions)
      .then((res)=>{
        console.log("respones==>",res);
      }).catch((err)=>{
        console.log("respones==>",err);
      })
    } catch (error) {
      console.error('Error sharing to Instagram:', error);
    }
  };


  return (
    <>
      <BackHeader heading={t('invite_friends')} />

      <View style={styles.mainViewStyle}>
        <View>
          <CustomImage
            customStyle={styles.imageStyle}
            source={Images.InviteFriends}
          />
          <CustomText.LargeBoldText customStyle={styles.textStyle}>
            {t('points_program')}
          </CustomText.LargeBoldText>
        </View>
      </View>
      <MainContainer mainContainerStyle={{ marginTop: Metrix.VerticalSize(10), }}>
        {inviteData.map((item, index) => (
          <View
            key={index}
            style={{
              // borderWidth:1,
              flexDirection: 'row',
              marginTop: Metrix.VerticalSize(10),
            }}>
            <CustomImage
              customStyle={{
                // borderWidth:1,
                width: Metrix.HorizontalSize(20),
                height: Metrix.VerticalSize(20),
              }}
              source={item.img}
            />
            <View style={{ paddingLeft: Metrix.HorizontalSize(12), }}>
              <CustomText.LargeBoldText customStyle={styles.headingTextStyle}>
                {item.heading}
              </CustomText.LargeBoldText>
              <CustomText.RegularText customStyle={styles.subHeadingTextStyle}>
                {item.subHeading}
              </CustomText.RegularText>
            </View>
          </View>
        ))}
        <View
          style={{
            // borderWidth:1,
            marginTop: Metrix.VerticalSize(30),
          }}>
          <CustomInput
            onEyePress={onShare}
            placeholder="Appname.com/username-invite-link"
            heading={t('invite_link')}
            icon={Images.Copy}
            value={`${'www.nmoacademy.com'}/${userData?.referralCode}`}
            eye
            eyeContainerStyle={{
              // borderWidth: 1,
              width: Metrix.HorizontalSize(35),
            }}
            editable={false}
          />
          <CustomText.MediumText customStyle={styles.styleText}>
            {t('or')}
          </CustomText.MediumText>
          <View style={styles.iconStyle}>
            {imageSources.map((item, index) => (
              <TouchableOpacity
                onPress={onShare}
                key={index}
                style={{
                  alignItems: 'center',
                  width: '15%',
                }}>
                <CustomImage source={item.img} />
              </TouchableOpacity>
            ))}
          </View>
          <PrimaryButton
            onPress={() => {
              NavigationService.navigate(
                RouteNames.HomeRoutes.InvitationRewards,
              );
            }}
            customStyles={{
              width: '90%',
              alignSelf: 'center',
              marginTop: Metrix.VerticalSize(30),
            }}
            title={t('my_invited_rewards')}
          />
        </View>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    alignItems: 'center',
  },
  imageStyle: {
    // borderWidth:1,
    width: Metrix.HorizontalSize(200),
    height: Metrix.VerticalSize(160),
  },
  textStyle: {
    fontSize: FontType.FontLarge,
    color: Utills.selectedThemeColors().Primary,
    textAlign: 'center',
  },
  headingTextStyle: {
    // lineHeight: 20,
    fontSize: normalizeFont(15),
  },
  subHeadingTextStyle: {
    lineHeight: 18,
    fontSize: normalizeFont(11),
  },
  iconStyle: {
    marginTop: Metrix.VerticalSize(20),
    alignSelf: 'center',
    flexDirection: 'row',
  },
  styleText: {
    marginTop: Metrix.VerticalSize(10),
    textAlign: 'center',
    fontSize: normalizeFont(17),
  },
});
