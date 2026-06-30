import React, {FC, useState, Ref} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
  ImageProps,
  ViewStyle,
  Switch,
  I18nManager,
} from 'react-native';
import {Colors, Fonts, Metrix, Images, FontType, Utills} from '../../config';
import {CustomText} from '..';
import { t } from 'i18next';

type ToggleComponentProps = TextInputProps & {
  text?: string;
  subtext?: string;
  showToggle?: boolean;
  showText?: boolean;
  iconImage?: ImageProps['source'];
  onPress?: () => void;
  value?: boolean;
  onValueChange?: () => void;
};

export const ToggleComponent: FC<ToggleComponentProps> = ({
  text,
  subtext,
  showToggle,
  showText,
  iconImage,
  onPress,
  value,
  onValueChange,
  ...rest
}) => {
  return (
    <View
      style={{
        // borderWidth:1,
        marginTop: Metrix.VerticalSize(30),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <CustomText.LargeSemiBoldText
        customStyle={{
          fontSize: FontType.FontMedium,
        }}>
        {text}
      </CustomText.LargeSemiBoldText>
      {showToggle  && (
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{
            false: Utills.selectedThemeColors().PrimaryColorOpacity(),
            true: Utills.selectedThemeColors().Primary,
          }}
          thumbColor={'#ffffff'}
          ios_backgroundColor={Utills.selectedThemeColors().PrimaryColorOpacity()}
        />
      )}
      {showText && (
        <TouchableOpacity
          onPress={onPress}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <CustomText.MediumText
            customStyle={{
              color: Utills.selectedThemeColors().Primary,
              fontSize: FontType.FontMedium,
            }}>
            {t('change_language')}
          </CustomText.MediumText>
          {iconImage && (
            <Image
              style={{
                transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
                width: Metrix.HorizontalSize(20),
                height: Metrix.VerticalSize(20),
              }}
              source={iconImage}
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
