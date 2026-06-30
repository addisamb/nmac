import {Image, ImageProps, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Metrix} from '../../config';

type CustomImageProps = ImageProps & {
  source: ImageProps['source'];
  resizeMode?: ImageProps['resizeMode'];
  customStyle?: ImageProps['style'];
};

export const CustomImage: React.FC<CustomImageProps> = ({
  source,
  resizeMode = 'contain',
  customStyle,
  ...rest
}) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[
        {width: Metrix.customImageSize(30), height: Metrix.customImageSize(30)},
        customStyle,
      ]}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({});
