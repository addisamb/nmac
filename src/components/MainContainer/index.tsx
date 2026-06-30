import React, {ReactNode} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Colors, Metrix, Utills} from '../../config';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/reducers';

type MainContainerProps = {
  children: ReactNode;
  customeStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  hidden?: boolean;
  barStyle?: 'default' | 'light-content' | 'dark-content';
  barBg?: string;
  isPrimary?: boolean;
  isFlatList?: boolean;
};

export const MainContainer: React.FC<MainContainerProps> = ({
  children,
  customeStyle,
  mainContainerStyle,
  hidden = false,
  barStyle,
  barBg = Utills.selectedThemeColors().Base,
  isPrimary = true,
  isFlatList,
}) => {
  const darkMode = useSelector((state: RootState) => state?.home?.darkMode);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={20}>
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
        {!isFlatList ? (
          <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={Keyboard.dismiss}>
            <View style={[styles.container, customeStyle]}>{children}</View>
          </TouchableWithoutFeedback>
        ) : (
          <View style={[styles.container, customeStyle]}>{children}</View>
        )}
      </SafeAreaView>
      {/* <NoInternet isOffline={true} /> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Metrix.HorizontalSize(14),
    paddingVertical: Metrix.VerticalSize(20),
    // borderWidth: 1,
    // backgroundColor: 'white',
  },
});
