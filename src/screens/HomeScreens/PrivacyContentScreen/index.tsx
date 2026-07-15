import {
  FlatList,
  I18nManager,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {PrivacyContentScreenProps, SearchProps} from '../../propTypes';
import {
  BackHeader,
  CustomModal,
  CustomText,
  MainContainer,
  PrimaryButton,
  SecondaryButton,
  ToggleComponent,
} from '../../../components';
import {t} from 'i18next';

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
    title: [t('nomu_academy_services')],
    content: [t('nomu_academy_services_desc')],
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

const renderItem = ({item}) => (
  <View style={{marginTop: 10, paddingHorizontal: 20}}>
    <CustomText.LargeBoldText>{item.title}</CustomText.LargeBoldText>
    {item.content.map((contentItem, index) => (
      <CustomText.RegularText
        isSecondaryColor
        key={index}
        style={{
          marginTop: 5,
          // borderWidth:1,
          textAlign: I18nManager.isRTL ? 'left' : 'right',
        }}>
        {contentItem}
      </CustomText.RegularText>
    ))}
  </View>
);

export const PrivacyContentScreen: React.FC<
  PrivacyContentScreenProps
> = ({}) => {
  return (
    <>
      <BackHeader heading={t('privacy')} />
      <FlatList
        data={dataArray}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </>
  );
};

const styles = StyleSheet.create({});
