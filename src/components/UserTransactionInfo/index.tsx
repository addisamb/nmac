import {
  FlatList,
  Image,
  ImageProps,
  ImageStyle,
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
import {customText} from 'react-native-paper';
import {normalizeFont} from '../../config/metrix';

type UserTransactionInfoProps = {
  heading?: string;
  subheading?: string;
  onPress?: () => void;
};

export const UserTransactionInfo: React.FC<UserTransactionInfoProps> = ({
  heading,
  subheading,
}) => {
  return (
    <View
      style={{
        marginTop: 15,
      }}>
      <CustomText.LargeBoldText
        customStyle={{
          fontSize: FontType.FontMedium,
        }}>
        {heading}
      </CustomText.LargeBoldText>

      <CustomText.SmallText
        customStyle={{
          marginTop: Metrix.VerticalSize(5),
          lineHeight: 18,
        }}>
        {subheading}
      </CustomText.SmallText>
    </View>
  );
};

const styles = StyleSheet.create({});
