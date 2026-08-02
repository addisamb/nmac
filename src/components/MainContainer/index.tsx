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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useKeyboardInset} from '../../config/hooks/useKeyboardInset';
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
  const insets = useSafeAreaInsets();

  // One mechanism for the whole app. KeyboardAvoidingView derives its offset
  // from its own measured frame, which does not survive being nested (it failed
  // outright inside the course-detail tab list) and, under the edge-to-edge that
  // Android 15+ enforces at targetSdk 36, it also stops short by the height of
  // the navigation bar. useKeyboardInset reads the keyboard height from the
  // Keyboard event and corrects for both the nav bar and any window resize.
  const keyboardInset = useKeyboardInset();

  // Closed: clear the gesture/navigation bar. Open: clear the keyboard, which
  // already includes that same nav-bar allowance — so these must not be added
  // together or the content would jump up by the nav bar height twice.
  const bottomPadding =
    keyboardInset > 0
      ? keyboardInset
      : Platform.OS === 'android'
      ? insets.bottom
      : 0;

  return (
    <View style={{flex: 1}}>
      {/* RN's SafeAreaView handles insets on iOS only. On Android it's a no-op,
          so bottom content/buttons got clipped by the gesture nav bar on some
          devices. Add the bottom inset explicitly on Android (0 on iOS). */}
      <SafeAreaView
        style={[
          {flex: 1, paddingBottom: bottomPadding},
          mainContainerStyle,
        ]}>
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
    </View>
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
