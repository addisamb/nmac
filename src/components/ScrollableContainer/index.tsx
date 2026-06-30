import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Metrix, Utills} from '../../config';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';

type ScrollableContainerProps = {
  children: ReactNode;
  customeStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  hidden?: boolean;
  ref?: React.RefObject<ScrollView>;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  barBg?: string;
  isPrimary?: boolean;
};

export const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  customeStyle,
  ref,
  hidden = false,
  barStyle,
  barBg = Utills.selectedThemeColors().Base,
  isPrimary = true,
  mainContainerStyle,
}) => {
  const darkMode = useSelector((state: RootState) => state?.home?.darkMode);
  return (
    <SafeAreaView style={[{flex: 1}, mainContainerStyle]}>
      <StatusBar
        hidden={hidden}
        barStyle={
          barStyle
            ? barStyle
            : darkMode
            ? 'light-content'
            : isPrimary
            ? 'light-content'
            : 'dark-content'
        }
        backgroundColor={barBg}
      />
      <ScrollView
      ref={ref}
        style={[styles.container, customeStyle]}
        keyboardShouldPersistTaps="handled">
        {children}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Metrix.HorizontalSize(20),
    // paddingVertical: Metrix.VerticalSize(20),
    marginVertical: Metrix.VerticalSize(20),
    // marginBottoms: Metrix.VerticalSize(80),
    // borderWidth: 1,
    // backgroundColor: 'white',
  },
});
