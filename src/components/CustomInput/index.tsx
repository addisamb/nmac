import React, {FC, useState, Ref, Fragment} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  TextInputProps,
  ImageProps,
  ViewStyle,
  I18nManager,
} from 'react-native';
import {CustomText} from '..';
import {Colors, Fonts, Metrix, Images, FontType, Utills} from '../../config';
import {useThemeHook} from '../../hooks';
import metrix from '../../config/metrix';

type CustomInputProps = TextInputProps & {
  customStyle?: TextInputProps['style'];
  onEyePress?: () => void;
  onAddFile?: () => void;
  hidepswdState?: boolean;
  eye?: boolean;
  addfiles?: boolean;
  icon?: ImageProps['source'];
  onBtnPress?: () => void;
  iconStyle?: ImageProps['style'];
  error?: string;
  touched?: boolean;
  inputRef?: Ref<TextInput>;
  heading?: string;
  containerStyle?: ViewStyle;
  customTextStyle?: any;
  eyeImageStyle?: any;
  customtextContainerStyle?: ViewStyle;
  eyeContainerStyle?: ViewStyle;
  returnKeyType?: string,
  submit?: () => void;
};

export const CustomInput: FC<CustomInputProps> = ({
  customStyle,
  icon,
  onEyePress,
  onAddFile,
  hidepswdState,
  addfiles,
  eye,
  onBtnPress,
  iconStyle = {},
  error,
  touched,
  inputRef,
  heading,
  containerStyle,
  customTextStyle,
  eyeContainerStyle,
  customtextContainerStyle,
  eyeImageStyle,
  returnKeyType,
  submit,
  ...rest
}) => {
  //   const [isFocused, setIsFocused] = useState(false);
  // const {Colors} = useThemeHook();

  return (
    <View style={containerStyle}>
      {heading && (
        <CustomText.RegularText
          customStyle={{
            textAlign: I18nManager.isRTL ? 'left' : 'right',
            marginLeft: Metrix.HorizontalSize(10),
            fontSize: Metrix.customFontSize(15),
            ...customTextStyle,
          }}>
          {heading || ''}
        </CustomText.RegularText>
      )}
      <View style={[styles.textContainer, customtextContainerStyle]}>
        <TextInput
          returnKeyType={returnKeyType}
          onSubmitEditing={submit}
          selectionColor={Utills.selectedThemeColors().Primary}
          style={[styles.textInput, customStyle]}
          placeholderTextColor={
            Utills.selectedThemeColors().TextInputPlaceholserColor
          }
          ref={inputRef}
          {...rest}
        />
        <View
          style={[
            {
              // borderWidth: 1,
              width: Metrix.HorizontalSize(60),
              flexDirection: 'row'
            },
            eyeContainerStyle,
          ]}>
          {eye ? (
            <TouchableOpacity
              activeOpacity={0.6}
              style={styles.eyeStyle}
              onPress={onEyePress}>
              {icon ? (
                <Image
                  source={icon}
                  style={[{
                    width: 20,
                    height: 20,
                  }, iconStyle  ]}
                  resizeMode="contain"
                />
              ) : hidepswdState ? (
                <Image
                  source={Images.EyeDisableIcon}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Utills.selectedThemeColors().SecondaryTextColor,
                  }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={Images.EyeAbleIcon}
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: Utills.selectedThemeColors().SecondaryTextColor,
                  }}
                  resizeMode="contain"
                />
              )}
            </TouchableOpacity>
          ) : <></>}
          {addfiles ? (
            <TouchableOpacity onPress={onAddFile} activeOpacity={0.6}>
              <Image
                source={Images.AddFiles}
                style={{
                  width: 20,
                  height: 20,
                  // borderWidth: 1,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : <></>}
        </View>
      </View>
      {touched && error && (
        <CustomText.SmallText
          customStyle={{
            color: Utills.selectedThemeColors().ErrorTextColor,
            marginBottom: Metrix.VerticalSize(15),
            marginLeft: Metrix.HorizontalSize(10),
          }}>
          {error}
        </CustomText.SmallText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    borderWidth: 2,
    borderRadius: Metrix.VerticalSize(50),
    height: Metrix.VerticalSize(45),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Metrix.VerticalSize(10),
    backgroundColor: Utills.selectedThemeColors().TextInputBaseColor,
    borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    alignItems: 'center',
    overflow: 'hidden',
  },
  textInput: {
    color: Utills.selectedThemeColors().PrimaryTextColor,
    fontSize: Metrix.customFontSize(16),
    paddingLeft: Metrix.HorizontalSize(20),
    fontFamily: Fonts['Regular'],
    height: '100%',
    // borderWidth: 1,
    // textAlign: I18nManager.isRTL ? 'left' : 'right',
    textAlign: I18nManager.isRTL ? 'right' : 'left',
    // borderWidth: 1,
    // backgroundColor: Utills.selectedThemeColors().TextInputBaseColor,
  },
  eyeStyle: {
    width: '50%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: Utills.selectedThemeColors().TextInputBaseColor,
  },
});
