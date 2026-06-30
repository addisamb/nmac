import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import {CustomText} from '..';
import {FontType, Metrix, Utills} from '../../config';

export type MultipleHeadingComponentProps = {
  mainHeading?: string;
  top?: number,
  heading: string;
  subHeading: string;
};

export const MultipleHeadingComponent: React.FC<
  MultipleHeadingComponentProps
> = ({heading, subHeading, mainHeading, top}) => {
  return (
    <View>
       <CustomText.LargeBoldText
        customStyle={{fontSize: FontType.FontRegular}}
        ellipsizeMode="tail"
        numberOfLines={2}>
        {mainHeading}
      </CustomText.LargeBoldText>
      <CustomText.LargeBoldText
        customStyle={[{fontSize: FontType.FontMedium, marginTop: top } ]}
        ellipsizeMode="tail"
        numberOfLines={2}>
        {heading}
      </CustomText.LargeBoldText>
      <CustomText.SmallText
        isSecondaryColor
        customStyle={{color: Utills.selectedThemeColors().InActiveTabBar}}
        ellipsizeMode="tail"
        numberOfLines={2}>
        {subHeading}
      </CustomText.SmallText>
    </View>
  );
};

const styles = StyleSheet.create({
  // textStyle: {textAlign: 'center'},
});
