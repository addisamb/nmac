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
import {CustomImage, CustomText} from '..';
import {customText} from 'react-native-paper';
import {normalizeFont} from '../../config/metrix';
import {VerifyUser} from '../../screens';
import {t} from 'i18next';

type WalletCardComponentProps = {
  onPress?: () => void;
  onPress1?: () => void;
  customStyle?: ViewStyle;
};

export const WalletCardComponent: React.FC<WalletCardComponentProps> = ({
  onPress,
  onPress1,
  customStyle,
}) => {
  return (
    <View style={[styles.mainViewStyle, customStyle]}>
      <View style={styles.cardItemStyle}>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress1}
        style={styles.cardItemStyle}>
        <CustomImage source={Images.BuyNow} />
        <CustomText.RegularText style={styles.textSyle}>
        {t("buy_now")}
        </CustomText.RegularText>
      </TouchableOpacity>
      </View>
      <View
        style={{
          borderWidth: 0.5,
        }}></View>
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.cardItemStyle}>
        <CustomImage source={Images.Withdraw} />
        <CustomText.RegularText style={styles.textSyle}>
          {t('withdraw')}
        </CustomText.RegularText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    // position:"absolute",
    borderRadius: Metrix.HorizontalSize(20),
    paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(45),
    backgroundColor: Utills.selectedThemeColors().Base,
    width: '100%',
    ...Metrix.createShadow,
  },

  cardItemStyle: {
    alignItems: 'center',
  },
  textSyle: {
    marginTop: Metrix.HorizontalSize(7),
  },
});
