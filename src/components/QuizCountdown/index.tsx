import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  AppState,
  AppStateStatus,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

type TimeUnit = 'D' | 'H' | 'M' | 'S';

type QuizCountdownProps = {
  /** Seconds to count down from. Changing it restarts the timer. */
  until: number;
  size?: number;
  running?: boolean;
  /** Called every tick with the seconds remaining. */
  onChange?: (secondsRemaining: number) => void;
  /** Called once, when the timer reaches zero. */
  onFinish?: () => void;
  digitStyle?: ViewStyle;
  digitTxtStyle?: TextStyle;
  timeToShow?: TimeUnit[];
};

/**
 * Replaces react-native-countdown-component@2.7.1, which called
 * AppState.removeEventListener() in componentWillUnmount. React Native removed
 * that API — addEventListener now returns a subscription — so unmounting the
 * timer threw "undefined is not a function". Submitting a quiz sets
 * isQuizMode(false), which unmounts this component, so every quiz submission
 * crashed the screen.
 *
 * Counts against a wall-clock deadline rather than decrementing a counter, so
 * the remaining time stays correct if the app is backgrounded mid-quiz (the
 * old component tracked this manually, which is why it hooked AppState).
 */
export const QuizCountdown: React.FC<QuizCountdownProps> = ({
  until,
  size = 12,
  running = true,
  onChange,
  onFinish,
  digitStyle,
  digitTxtStyle,
  timeToShow = ['M', 'S'],
}) => {
  const safeUntil = Math.max(0, Math.floor(Number(until) || 0));
  const [remaining, setRemaining] = useState(safeUntil);

  const deadlineRef = useRef<number>(Date.now() + safeUntil * 1000);
  const finishedRef = useRef(false);
  // Held in refs so the interval never needs re-creating when a parent
  // re-render hands us new inline callbacks.
  const onChangeRef = useRef(onChange);
  const onFinishRef = useRef(onFinish);
  onChangeRef.current = onChange;
  onFinishRef.current = onFinish;

  // Restart whenever the duration changes (it arrives from the API after the
  // first render, so the initial value is usually 0).
  useEffect(() => {
    deadlineRef.current = Date.now() + safeUntil * 1000;
    finishedRef.current = false;
    setRemaining(safeUntil);
  }, [safeUntil]);

  const recompute = useCallback(() => {
    const left = Math.max(
      0,
      Math.round((deadlineRef.current - Date.now()) / 1000),
    );

    setRemaining(prev => (prev === left ? prev : left));
    onChangeRef.current?.(left);

    if (left <= 0 && !finishedRef.current) {
      finishedRef.current = true;
      onFinishRef.current?.();
    }
  }, []);

  useEffect(() => {
    if (!running || safeUntil <= 0) return;

    const id = setInterval(recompute, 1000);

    // Correct for time elapsed while backgrounded, using the modern
    // subscription API.
    const sub = AppState.addEventListener('change', (s: AppStateStatus) => {
      if (s === 'active') recompute();
    });

    return () => {
      clearInterval(id);
      sub.remove();
    };
  }, [running, safeUntil, recompute]);

  const days = Math.floor(remaining / 86400);
  const hours = Math.floor((remaining % 86400) / 3600);
  const minutes = Math.floor((remaining % 3600) / 60);
  const seconds = remaining % 60;

  // When hours/days are not displayed, fold them into the minutes so a long
  // quiz still shows the full remaining time rather than silently wrapping.
  const showsHours = timeToShow.includes('H') || timeToShow.includes('D');
  const displayMinutes = showsHours ? minutes : Math.floor(remaining / 60);

  const units: {key: TimeUnit; value: number}[] = [
    {key: 'D', value: days},
    {key: 'H', value: hours},
    {key: 'M', value: displayMinutes},
    {key: 'S', value: seconds},
  ].filter(u => timeToShow.includes(u.key)) as {
    key: TimeUnit;
    value: number;
  }[];

  return (
    <View style={styles.row}>
      {units.map((u, i) => (
        <View key={u.key} style={styles.row}>
          <View style={[styles.digit, digitStyle]}>
            <Text
              allowFontScaling={false}
              style={[styles.digitText, {fontSize: size * 1.6}, digitTxtStyle]}>
              {String(u.value).padStart(2, '0')}
            </Text>
          </View>
          {i < units.length - 1 && (
            <Text
              allowFontScaling={false}
              style={[styles.separator, {fontSize: size * 1.6}, digitTxtStyle]}>
              :
            </Text>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  digit: {
    minWidth: 32,
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  digitText: {
    fontWeight: '600',
    textAlign: 'center',
  },
  separator: {
    marginHorizontal: 2,
    fontWeight: '600',
  },
});
