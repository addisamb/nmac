import {
    StyleSheet,
    Text,
    Image,
    View,
    TextInput,
    TouchableOpacity,
    I18nManager,
  } from 'react-native';
  import React from 'react';
  import MaskInput from 'react-native-mask-input';
import { CustomText } from '..';
import { t } from 'i18next';
import { Images, Metrix } from '../../config';
import { normalizeFont } from '../../config/metrix';
  
  const InputFieldMask = (props) => {
    return (
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#080F18', width: props?.fullWudth, marginTop: props?.marginTop }} >
        <CustomText.RegularText
          customStyle={{
              fontSize: normalizeFont(15)
          }}>
         {props?.title}
        </CustomText.RegularText>

        <View style={styles.imgAndInput} >
        <Image
        source={props?.img}
        style={props?.imgStyle}
          resizeMode="contain"
        />
        <MaskInput
          mask={props.mask}
          returnKeyType={props?.returnType}
          maxLength={props.maxLen}
          placeholderTextColor={props.placeholderTextColor}
          style={[styles.input,{ height: props.height }]}
          {...props}
        />
        </View>
      </View>
    );
  };
  
  export default InputFieldMask;
  
  const styles = StyleSheet.create({
    container: {
      width: '100%'
    },
    input: {
      marginLeft: I18nManager.isRTL ? 0 : 14,
      color: 'black',
    //   backgroundColor: "red",
      width: "90%",
      fontSize: 15,
    },
    imgAndInput:
    { flexDirection: "row", alignItems: "center" }
  });
  