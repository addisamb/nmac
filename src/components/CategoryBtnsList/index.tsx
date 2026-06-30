import {FlatList, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CustomText} from '..';
import {FontType, Metrix, Utills} from '../../config';
import {useTranslation} from 'react-i18next';

export type TopCourseDataPropTypes = {
  heading?: string;
  isAllCoursesHeading?: boolean;
  onPressCoursesBtn?: () => void;
  onPresstoGetId?: () => void;
};

export const TopHeading: React.FC<TopCourseDataPropTypes> = ({
  heading,
  onPressCoursesBtn,
  isAllCoursesHeading = true,
}) => {
  const {t, i18n} = useTranslation();

  return heading?.length ? (
    <View style={styles.topHeadingContainer}>
      <CustomText.LargeBoldText customStyle={{fontSize: FontType.FontMedium}}>
        {heading || ''}
      </CustomText.LargeBoldText>
      {isAllCoursesHeading && (
        <TouchableOpacity onPress={onPressCoursesBtn} activeOpacity={0.7}>
          <CustomText.MediumText
            customStyle={{
              color: Utills.selectedThemeColors().Primary,
              fontSize: FontType.FontSmall,
            }}>
            {t('all_courses')}
          </CustomText.MediumText>
        </TouchableOpacity>
      )}
    </View>
  ) : (
    <></>
  );
};

type CategoryBtnsListProps = TopCourseDataPropTypes & {
  listData: {_id: string; name: string; isChecked: boolean}[];
};

export const CategoryBtnsList: React.FC<CategoryBtnsListProps> = ({
  listData,
  heading,
  onPresstoGetId,
  onPressCoursesBtn,
  isAllCoursesHeading,
}) => {
  const [categoryData, setCategoryData] = useState([]);


  useEffect(()=>{
    setCategoryData(listData)
  },[listData])

  const onPressBtn = (_id: string, type: boolean) => {
    const updatedListData = [...categoryData].map(val => {
      if (val._id == _id) {
        return {...val, isChecked: type};
      } else {
        return val;
      }
    });
    setCategoryData(updatedListData);
  };

  const renderItem = ({
    item,
  }: {
    item: {_id: string; name: string; isChecked: boolean};
  }) => {
    return (
      <View style={{ height: Metrix.VerticalSize(50), justifyContent: "center", marginTop: Metrix.VerticalSize(-5) }} >
        <TouchableOpacity
          // activeOpacity={0.7}
          style={[
            styles.renderItemContainer,
            item?.isChecked && {
              backgroundColor: Utills.selectedThemeColors().Primary,
            },
            [Platform.OS == 'ios' ? {...Metrix.createShadow} : {...Metrix.createShadowAndroid} ]
          ]}
          onPress={() =>{ onPressBtn(item?._id, !item?.isChecked), onPresstoGetId(item?._id)} }>
          <CustomText.LargeSemiBoldText
            customStyle={[
              {fontSize: FontType.FontSmall},
              item?.isChecked && {
                color: '#ffffff',
              },
            ]}
            isSecondaryColor>
            {item?.name}
          </CustomText.LargeSemiBoldText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{marginVertical: Metrix.VerticalSize(10)}}>
      <TopHeading
        heading={heading}
        onPressCoursesBtn={onPressCoursesBtn}
        isAllCoursesHeading={isAllCoursesHeading}
      />
      <View>
      <FlatList
        data={categoryData}
        renderItem={renderItem}
        style={{
          // marginTop:0,
            // borderWidth: 1,
          marginTop: Metrix.VerticalSize(10)
        }}
        horizontal
        keyExtractor={item => item?._id}
      />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  renderItemContainer: {
    // marginTop:10,
    // borderWidth: 1,
    paddingHorizontal: Metrix.HorizontalSize(17),
    paddingVertical: Metrix.VerticalSize(7),
    marginRight: Metrix.HorizontalSize(7),
    borderRadius: Metrix.VerticalSize(20),
    backgroundColor: Utills.selectedThemeColors().Base, 
  },
  topHeadingContainer: {
    // borderWidth: 1,
    // paddingHorizontal: Metrix.HorizontalSize(17),
    // paddingVertical: Metrix.VerticalSize(7),
    // marginTop: Metrix.VerticalSize(0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
