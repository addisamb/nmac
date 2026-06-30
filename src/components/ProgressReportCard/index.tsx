import {ImageProps, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {FontType, Images, Metrix, Utills} from '../../config';
import CircularProgress from 'react-native-circular-progress-indicator';
import {CustomImage} from '../CustomImage';
import {CustomText} from '..';

type ProgressReportCardProps = {
  image: ImageProps['source'];
  progresspercent: number;
  title: string;
  customContainerStyles?: ViewStyle;
};

export const ProgressReportCard: React.FC<ProgressReportCardProps> = ({
  image,
  progresspercent,
  title,
  customContainerStyles,
}) => {
  return (
    <View style={[styles.container, customContainerStyles]}>
      <View style={styles.flexBetween}>
        <CustomImage
          source={image}
          customStyle={{tintColor: Utills.selectedThemeColors().Primary}}
        />
        <CircularProgress
          value={progresspercent || 0}
          radius={23}
          inActiveStrokeColor={Utills.selectedThemeColors().SecondaryTextColor}
          activeStrokeColor={Utills.selectedThemeColors().Primary}
          activeStrokeWidth={Metrix.VerticalSize(2)}
          inActiveStrokeWidth={Metrix.VerticalSize(2)}
          inActiveStrokeOpacity={0.2}
          progressValueStyle={{color: Utills.selectedThemeColors().Primary}}
          valueSuffix={'%'}
        />
      </View>
      <CustomText.LargeSemiBoldText customStyle={styles.textStyle}>
        {title || ''}
      </CustomText.LargeSemiBoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: Utills.selectedThemeColors().Primary,
    padding: Metrix.VerticalSize(10),
    borderRadius: Metrix.VerticalSize(10),
    backgroundColor: Utills.selectedThemeColors().Base,
    width: '100%',
  },
  flexBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Metrix.VerticalSize(10),
  },
  textStyle: {
    color: Utills.selectedThemeColors().Primary,
    fontSize: FontType.FontSmall,
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
});
