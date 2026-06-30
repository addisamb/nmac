import 'react-native-gesture-handler';
import {
  FlatList,
  I18nManager,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {HomeScreenProps} from '../../propTypes';
import {
  AuthHeader,
  BackHeader,
  CustomImage,
  CustomText,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {NavigationScreenProps} from '../../propTypes';
import {FontType, Images, Metrix} from '../../../config';
import {t} from 'i18next';
import { useNavigation } from '@react-navigation/native';

const dataArray = [
  {
    title: [t('parties')],
    content: [t('termsCondition_Description')],
  },
  {
    title: [t('agreementStatus')],
    content: [t('agreementStatus_desc')],
  },
  {
    title: [t('age_or_category_requirement')],
    content: [t('age_or_category_requirement_desc')],
  },
  {
    title: [t('privacy')],
    content: [t('privacy_desc')],
  },
  {
    title: [t('the_use')],
    content: [t('the_use_desc')],
  },
  {
    title: [t('nmo_academy_services')],
    content: [t('nmo_academy_services_desc')],
  },
  {
    title: [t('disclaimer')],
    content: [t('disclaimer_desc')],
  },
  {
    title: [t('Amendments_to_your')],
    content: [t('Amendments_to_your_desc')],
  },
  {
    title: [t('paying_off')],
    content: [t('paying_off_desc')],
  },
];

type NavigationDataComponentProps = {
  heading?: string;
  paragraphs?: string[];
  duration?: string;
  headingStyle?: TextStyle;
  paragraphStyle?: TextStyle;
  containerStyle?: ViewStyle;
  submission?: string;
};

export const NavigationDataComponent: React.FC<
  NavigationDataComponentProps
> = ({
  heading,
  paragraphs,
  headingStyle,
  paragraphStyle,
  containerStyle,
  duration,
  submission,
}) => {
  return (
    <View
      key={heading}
      style={[
        {
          marginTop: Metrix.VerticalSize(25),
        },
        containerStyle,
      ]}>
      <CustomText.LargeBoldText customStyle={headingStyle}>
        {heading || ''}
      </CustomText.LargeBoldText>
      <View>
        {paragraphs?.map((item, index) => (
          <CustomText.RegularText
            isSecondaryColor
            key={index}
            customStyle={[
              {
                marginTop: Metrix.VerticalSize(15),
              },
              paragraphStyle,
            ]}>
            {item}
          </CustomText.RegularText>
        ))}
        {duration && (
          <View style={styles.clockVewStyle}>
            <CustomImage
              source={Images.Clock}
              customStyle={{
                width: Metrix.HorizontalSize(20),
                height: Metrix.VerticalSize(20),
                marginRight: Metrix.VerticalSize(10),
              }}
            />
            <CustomText.RegularText isSecondaryColor>
              {duration || ''}
            </CustomText.RegularText>
          </View>
        )}
        {submission && (
          <View style={styles.clockVewStyle}>
            <CustomImage
              source={Images.Clock}
              customStyle={{
                width: Metrix.HorizontalSize(20),
                height: Metrix.VerticalSize(20),
                marginRight: Metrix.VerticalSize(10),
              }}
            />
            <CustomText.RegularText isSecondaryColor>
              {submission || ''}
            </CustomText.RegularText>
          </View>
        )}
      </View>
    </View>
  );
};

const renderItem = ({item}) => (
  <View style={{marginTop: 10}}>
    <CustomText.LargeBoldText>{item.title}</CustomText.LargeBoldText>
    {item.content.map((contentItem, index) => (
      <CustomText.RegularText
        isSecondaryColor
        key={index}
        style={{
          marginTop: 5,
          // borderWidth:1,
          textAlign: I18nManager.forceRTL ? 'left' : 'right',
        }}>
        {contentItem}
      </CustomText.RegularText>
    ))}
  </View>
);
export const NavigationScreen: React.FC<NavigationScreenProps> = ({route}) => {

  const navigation = useNavigation()
  const temp = route.params.from;
  const dynamicHeading =
    temp == 'termsAndconditions' ? t('terms_conditions') : 'Default Heading';

  return (
    <>
      <BackHeader heading={dynamicHeading} />
      <ScrollView
        contentContainerStyle={styles.scrollViewStyle}
        style={{
          marginBottom: Metrix.VerticalSize(40),
        }}>

          <TouchableOpacity
            onPress={()=>{
              navigation.reset({
                index: 0,
                routes: [{ name: 'DrawerStack' }]
              })
            }}
          >
        <Image
          source={I18nManager?.isRTL ? Images.ArabicLogo : Images.NMO}
          style={styles.imageStyle}
          />
          </TouchableOpacity>

        <FlatList
          data={dataArray}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewStyle: {
    paddingHorizontal: Metrix.HorizontalSize(15),
    paddingTop: Metrix.VerticalSize(25),
  },
  imageStyle: {
    // borderWidth: 1,
    width: Metrix.HorizontalSize(52),
    height: Metrix.VerticalSize(50),
  },
  textStyle: {
    lineHeight: 18,
    fontSize: Metrix.customFontSize(11),
    marginTop: Metrix.VerticalSize(11),
  },
  clockVewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(10),
  },
});
