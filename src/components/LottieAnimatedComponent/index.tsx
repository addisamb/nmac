import {ImageProps, StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import Lottie from 'lottie-react-native';
import {Images, Metrix} from '../../config';
import {Image} from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';

type LottieAnimatedComponentProps = {
  src?: ImageProps['source'];
  customStyle?: ViewStyle;
  speed?: number;
};

export const LottieAnimatedComponent: React.FC<
  LottieAnimatedComponentProps
> = ({src, customStyle, speed = 0.9}) => {
  return (
    <Lottie
      // source={Images.NMO}
      // source={src ? src : require('../../assets/images/NMO')}
      source={src ? src : require('../../assets/animations/NMOAnimation.json')}
      autoPlay
      loop
      style={[
        {
          width: Metrix.HorizontalSize(150),
          height: Metrix.VerticalSize(150),
        },
        customStyle,
      ]}
      resizeMode="cover"
      speed={speed}
    />
  );
};

interface LottieAnimatedComponentStyles {}
const styles = StyleSheet.create<LottieAnimatedComponentStyles>({});