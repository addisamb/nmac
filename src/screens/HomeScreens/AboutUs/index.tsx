import {
  BackHandler,
  FlatList,
  ImageProps,
  ScrollView,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  BackHeader,
  CustomImage,
  CustomText,
  MainContainer,
} from '../../../components';
import {AboutUsScreenProps} from '../../propTypes';
import {t} from 'i18next';
import {Images, Metrix, Utills} from '../../../config';

const data: any = [
  {
    id: 1,
    img: Images.OpenTime,
    heading: t('open_time_for_education'),
    paragraphs: t('open_time_for_education_desc'),
  },
  {
    id: 2,
    img: Images.Trainee,
    heading: t('follow_up_with_the_trainee'),
    paragraphs: t('follow_up_with_the_trainee_desc'),
  },
  {
    id: 3,
    img: Images.Availablity,
    heading: t('availability'),
    paragraphs: t('availability_desc'),
  },
  {
    id: 4,
    img: Images.PointProgram,
    heading: t('point_program'),
    paragraphs: t('point_program_desc'),
  },
  {
    id: 5,
    img: Images.Certifi,
    heading: t('accredited_certificates'),
    paragraphs: t('accredited_certificates_desc'),
  },
  {
    id: 6,
    img: Images.ProfessionalExperts,
    heading: t('professional_experts'),
    paragraphs: t('professional_experts_desc'),
  },
];

type NavigationDataComponentProps = {
  heading?: string;
  paragraphs?: string[];
  img: ImageProps['source'];
};

export const NavigationDataComponent: React.FC<
  NavigationDataComponentProps
> = ({heading, paragraphs, img}) => {
  return (
    <View style={styles.cardViewStyle}>
      <CustomImage
        customStyle={{
          width: Metrix.HorizontalSize(35),
          height: Metrix.VerticalSize(35),
        }}
        source={img}
      />
      <CustomText.LargeBoldText
        customStyle={{
          textAlign: 'center',
          marginTop: Metrix.VerticalSize(10),
        }}>
        {heading || ''}
      </CustomText.LargeBoldText>
      <CustomText.RegularText
        customStyle={[
          {
            textAlign: 'center',
            marginTop: Metrix.VerticalSize(10),
            color: Utills.selectedThemeColors().LightGrayTextColor,
          },
        ]}>
        {paragraphs || ''}
      </CustomText.RegularText>
    </View>
  );
};

export const AboutUsScreen: React.FC<AboutUsScreenProps> = ({}) => {
  return (
    <>
      <BackHeader heading={t('about_us')} />
      <MainContainer isFlatList>
        <FlatList
        showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{paddingBottom: Metrix.VerticalSize(50)}}
          renderItem={({item}) => (
            <NavigationDataComponent
              img={item.img}
              heading={item.heading}
              paragraphs={item.paragraphs}
            />
          )}
        />
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  cardViewStyle: {
    // borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    ...Metrix.createShadow,
    marginTop: Metrix.VerticalSize(20),
    borderRadius: Metrix.VerticalSize(10),
    paddingVertical: Metrix.VerticalSize(45),
    paddingHorizontal: Metrix.HorizontalSize(20),
    backgroundColor: Utills.selectedThemeColors().Base,
  },
});
