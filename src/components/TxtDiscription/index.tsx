import {
  ImageProps,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {CustomImage, CustomText} from '..';
import {FontType, Images, Metrix, Utills} from '../../config';
// TxtDiscription
type TxtDiscriptionProps = {
  heading?: string;
  listData: string;
  headingStyle?: TextStyle;
  listTextStyle?: TextStyle;
  primaryColorHeading?: string;
  listContainerStyle?: ViewStyle;
  imageStyle?: ImageProps['style'];
  mainContainerStyle?: ViewStyle;
};

const TxtDiscriptionComp = ({
  item,
  listTextStyle,
  listContainerStyle,
  imageStyle,
}: {
  item: string;
  listTextStyle?: TextStyle;
  listContainerStyle?: ViewStyle;
  imageStyle?: ImageProps['style'];
}) => (
  <View style={[styles.centredItem, listContainerStyle]}>
    <CustomImage
      source={Images.CircleCheck}
      customStyle={[{width: '5%'}, imageStyle]}
    />
    <CustomText.RegularText
      customStyle={[
        {
          width: '94%',
          marginLeft: Metrix.VerticalSize(5),
          marginTop: Metrix.VerticalSize(4),
        },
        listTextStyle,
      ]}>
      {item}
    </CustomText.RegularText>
  </View>
);

export const TxtDiscription: React.FC<TxtDiscriptionProps> = ({
  heading,
  headingStyle,
  listData,
  listTextStyle,
  primaryColorHeading,
  listContainerStyle,
  imageStyle,
  mainContainerStyle,
}) => {
  return (
    <View style={[{marginTop: Metrix.VerticalSize(20)}, mainContainerStyle]}>
      {heading && (
        <CustomText.LargeSemiBoldText
          customStyle={[
            {
              fontSize: FontType.FontRegular,
            },
            headingStyle,
          ]}>
          {heading || ''}
          {primaryColorHeading && (
            <CustomText.LargeSemiBoldText
              customStyle={[
                {
                  fontSize: FontType.FontRegular,
                  color: Utills.selectedThemeColors().Primary,
                },
                headingStyle,
              ]}>
              {`  ${primaryColorHeading}` || ''}
            </CustomText.LargeSemiBoldText>
          )}
        </CustomText.LargeSemiBoldText>
      )}
      {listData?.map(item => (
        <TxtDiscriptionComp
          // key={item?.id}
          item={item}
          listTextStyle={listTextStyle}
          listContainerStyle={listContainerStyle}
          imageStyle={imageStyle}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  centredItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // borderWidth: 1,
    width: '100%',
    marginTop: Metrix.VerticalSize(10),
  },
});
