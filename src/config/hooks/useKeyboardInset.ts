import {useEffect, useRef, useState} from 'react';
import {Keyboard, Platform, useWindowDimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * Returns how many pixels of bottom padding a screen needs so its content is
 * not hidden behind the on-screen keyboard.
 *
 * Why this exists instead of <KeyboardAvoidingView>:
 *
 *  - KeyboardAvoidingView positions itself from its own measured frame. Inside
 *    the course-detail tabs each screen lives in a horizontal FlatList item, and
 *    that measurement does not survive the nesting — the chat input stayed under
 *    the keyboard no matter which `behavior` was used.
 *  - This app targets SDK 36. From Android 15 edge-to-edge is enforced, and
 *    under it windowSoftInputMode="adjustResize" no longer resizes the window,
 *    so simply letting Android handle it does nothing either.
 *
 * This hook takes the keyboard height straight from the Keyboard event, then
 * subtracts however much the window ALREADY shrank. So:
 *
 *   - window does not resize (edge-to-edge)  -> returns the full keyboard height
 *   - window resizes (older Android)         -> returns ~0, no double offset
 *   - iOS                                    -> returns the full keyboard height
 *
 * making it correct on every configuration rather than the one we assume.
 */
export const useKeyboardInset = (): number => {
  const {height: windowHeight} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Tallest window seen = the keyboard-closed height. Comparing against it tells
  // us whether the OS resized the window for this keyboard.
  const fullHeight = useRef(windowHeight);
  if (windowHeight > fullHeight.current) {
    fullHeight.current = windowHeight;
  }

  useEffect(() => {
    // iOS fires will*, Android only ever fires did*.
    const showEvent =
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent =
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSub = Keyboard.addListener(showEvent, e => {
      setKeyboardHeight(e?.endCoordinates?.height ?? 0);
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  if (keyboardHeight <= 0) return 0;

  // Android reports the keyboard height WITHOUT the navigation-bar strip, but
  // under edge-to-edge the window extends behind that strip — so padding by the
  // keyboard height alone still left the bottom of the input covered by exactly
  // the nav bar's height.
  //
  // insets.bottom is precisely how far the window extends past the usable area,
  // so it is the right correction rather than a hardcoded nav-bar guess:
  //   - Android, edge-to-edge      -> insets.bottom = nav bar height (added)
  //   - Android, window is inset   -> insets.bottom = 0 (nothing added)
  // On iOS the reported keyboard height already spans to the bottom of the
  // screen, home indicator included, so adding the inset there would overshoot.
  const systemBarExtra = Platform.OS === 'android' ? insets.bottom : 0;

  const alreadyShrunkBy = Math.max(0, fullHeight.current - windowHeight);
  return Math.max(0, keyboardHeight + systemBarExtra - alreadyShrunkBy);
};
