import {
  FlatList,
  Image,
  ImageProps,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {FontType, Images, Metrix, Utills} from '../../config';
import {CustomText} from '..';
import {normalizeFont} from '../../config/metrix';

type TransactionDetailsProps = {
  heading?: string;
  bottomHeadingTitle?: string;
  bottomHeadingValue?: string;
  text?: string;
  subtext?: string;
  status?: string;
  statusPosition?: string;
  items: {id: string; title: string; value: string}[];
  item1txt?: string,
  item1value?: string,
  item2txt?: string,
  item2value?: string,
  item3txt?: string,
  item3value?: string,
  showPromoCode?: boolean,
  item4txt?: string,
  item4value?: string
  customStyle?: StyleProp<ViewStyle>,
};

export const TransactionDetailsComponent: React.FC<TransactionDetailsProps> = ({
  heading,
  text,
  subtext,
  status,
  statusPosition,
  bottomHeadingTitle,
  bottomHeadingValue,
  items,
  item1txt,
  item1value,
  item2txt,
  item2value,
  item3txt,
  item3value,
  showPromoCode,
  item4txt,
  item4value,
  customStyle,
}) => {
  return (
    <View style={[styles.mainContainerStyle, customStyle]}>

      <View
        style={{
          alignItems: 'center',
        }}>
        <CustomText.LargeBoldText customStyle={styles.headingTextStyle}>
          {heading}
        </CustomText.LargeBoldText>
      </View>

      {/* {items?.map(item => {
        const {title, value, id} = item;
        return (
          <View style={styles.viewStyle} key={id}>
            <CustomText.MediumText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
              }}>
              {title}
            </CustomText.MediumText>
            <CustomText.LargeBoldText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
                fontSize: FontType.FontRegular,
              }}>
              {value}
            </CustomText.LargeBoldText>
          </View>
        );
      })} */}

          <View style={styles.viewStyle}>
            <CustomText.MediumText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
              }}>
              {item1txt}
            </CustomText.MediumText>
            <CustomText.LargeBoldText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
                fontSize: FontType.FontRegular,
              }}>
              {item1value}
            </CustomText.LargeBoldText>
          </View>

          <View style={styles.viewStyle}>
            <CustomText.MediumText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
              }}>
              {item2txt}
            </CustomText.MediumText>
            <CustomText.LargeBoldText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
                fontSize: FontType.FontRegular,
              }}>
              {item2value}
            </CustomText.LargeBoldText>
          </View>

          <View style={styles.viewStyle}>
            <CustomText.MediumText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
              }}>
              {item3txt}
            </CustomText.MediumText>
            <CustomText.LargeBoldText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
                fontSize: FontType.FontRegular,
              }}>
              {item3value}
            </CustomText.LargeBoldText>
          </View>

          {showPromoCode ?
            <View style={styles.viewStyle}>
            <CustomText.MediumText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
              }}>
              {item4txt}
            </CustomText.MediumText>
            <CustomText.LargeBoldText
              customStyle={{
                color: Utills.selectedThemeColors().Base,
                fontSize: FontType.FontRegular,
              }}>
              {item4value}
            </CustomText.LargeBoldText>
          </View> : null}

      <View
        style={{
          borderColor: Utills.selectedThemeColors().Base,
          marginTop: Metrix.VerticalSize(10),
          borderWidth: 0.6,
        }}></View>

      <View style={styles.viewStyle}>
        <CustomText.LargeSemiBoldText
          customStyle={{
            color: Utills.selectedThemeColors().Base,
            fontSize: normalizeFont(18),
          }}>
          {bottomHeadingTitle}
        </CustomText.LargeSemiBoldText>
        <CustomText.LargeSemiBoldText
          customStyle={{
            color: Utills.selectedThemeColors().Base,
            fontSize: normalizeFont(18),
          }}>
          {bottomHeadingValue}
        </CustomText.LargeSemiBoldText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  viewStyle: {
    marginTop: Metrix.VerticalSize(10),
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainContainerStyle: {
    // borderWidth: 1,
    backgroundColor: Utills.selectedThemeColors().Primary,
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingVertical: Metrix.VerticalSize(10),
    borderRadius: 10,
  },
  headingTextStyle: {
    color: Utills.selectedThemeColors().Base,
    fontSize: FontType.FontRegular,
  },
});