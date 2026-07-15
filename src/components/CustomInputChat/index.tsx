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

type CustomInputChatProps = TextInputProps & {
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

export const CustomInputChat: FC<CustomInputChatProps> = ({
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
              justifyContent: "space-around",
              flexDirection: 'row'
            },
            eyeContainerStyle,
          ]}>
          {addfiles ? (
            <TouchableOpacity onPress={onAddFile} activeOpacity={0.6}>
              <Image
                source={Images.AddFiles}
                style={{
                  width: 20,
                  height: 20,
                  // borderWidth: 1,
                  // backgroundColor: "red",
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          ) : <></>}

          {eye ? (
            <TouchableOpacity
              activeOpacity={0.6}
              style={{ backgroundColor: Utills.selectedThemeColors().TextInputBaseColor }}
              onPress={onEyePress}>
                <Image
                  source={icon}
                  style={[{
                    width: 20,
                    height: 20,
                    right: 5,
                    // backgroundColor: "red",
                  }, iconStyle  ]}
                  resizeMode="contain"
                />
            </TouchableOpacity>
          ) : <></>}

        </View>
      </View>
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
