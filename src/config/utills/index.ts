import Toast from 'react-native-toast-message';
import moment from 'moment';
import DataHandler from '../../services/dataHandler.service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkModColors, DefaultColors} from '..';
import { t } from 'i18next';
import { I18nManager } from 'react-native';
const passwordRegex =
  // `[\d\x]` was an invalid escape (\x expects hex digits); JS silently treated
  // it as a literal "x". Written explicitly as [\dx] — same behaviour, valid syntax.
  /^.*(?=.{3,})(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\dx])(?=.*[@!$#&*%^]).*$/;
// const passwordRegex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,16}$/;
const emailRegex = /^\w+([\.-]?\w+)*@{1}\w+([\.-]?\w+)*(\.[a-zA-Z]{2,3})+$/;

const fullNameRegex =
  /^([a-zA-Z]+|[a-zA-Z]+\s{1}[a-zA-Z]{1,}|[a-zA-Z]+\s{1}[a-zA-Z]{3,}\s{1}[a-zA-Z]{1,})$/;

const phoneNoRegex =
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

function validatePassword(password: string): boolean {
  return passwordRegex.test(password);
}

function validatePhoneNumber(phone: string): boolean {
  return phoneNoRegex.test(phone);
}

function validateEmail(email: string): boolean {
  return emailRegex.test(email);
}

function validateAlpha(name: string): boolean {
  return fullNameRegex.test(name);
}

function showToast(
  message?: string,
  error?: {msg: string} | null,
  status?: 'info' | 'success' | 'error' | 'warning',
  visibilityTime?: number,
) {
  let err = error?.msg;

  if (err === 'timeout of 10000ms exceeded') {
    Toast.show({
      text1: 'Connectivity Issue',
      // topOffset intentionally omitted: the <Toast> at the app root sets it
      // from the real safe-area inset. A hardcoded 10 on Android drew the toast
      // behind the status bar and camera cutout on modern phones.
      type: status || 'info',
      visibilityTime: visibilityTime || 2000,
    });
  } else if (err === 'Network Error') {
    Toast.show({
      text1: 'You have lost internet connection',
      type: status || 'info',
      // topOffset intentionally omitted: the <Toast> at the app root sets it
      // from the real safe-area inset. A hardcoded 10 on Android drew the toast
      // behind the status bar and camera cutout on modern phones.
      visibilityTime: visibilityTime || 2000,
    });
  } else if (message === 'Login to access') {
    const clear = async () => {
      await AsyncStorage.setItem('userData', '');
      await AsyncStorage.removeItem('userData');
      console.log('first');
    };
    clear();
    Toast.show({
      text1: 'User does not exist',
      type: status || 'info',
      // topOffset intentionally omitted: the <Toast> at the app root sets it
      // from the real safe-area inset. A hardcoded 10 on Android drew the toast
      // behind the status bar and camera cutout on modern phones.
      visibilityTime: visibilityTime || 2000,
    });
  } else {
    // Defensive: several call sites pass an Error object or a raw API payload.
    // Rendering a non-string as a React child throws ("Objects are not valid as
    // a React child") and takes down the screen, so coerce here.
    const safeMessage =
      typeof message === 'string' && message.trim()
        ? message
        : typeof (message as any)?.message === 'string'
        ? (message as any).message
        : 'Something Went Wrong';

    Toast.show({
      text1: safeMessage,
      // See note above — inset-aware topOffset comes from the root <Toast>.
      type: status || 'info',
      visibilityTime: visibilityTime || 2000,
    });
  }
}

const timeHumanize = (time: string): string => {

  if (I18nManager.isRTL) {

    const months = [
      "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
      "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
    ];
    
    const weekdays = [
      "الأحد", "الاثنين", "الثلاثاء", "الأربعاء",
      "الخميس", "الجمعة", "السبت"
    ];
    
    // Input date string
    const dateString = time;
    
    // Convert the date string to a Date object
    const date = new Date(dateString);
    
    // Extract parts of the date
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    const weekday = date.getUTCDay();
    
    // Format the date manually in Arabic
    const arabicDate = `${weekdays[weekday]}, ${months[month]} ${day}, ${year}, ${hours}:${minutes}:${seconds} ${hours >= 12 ? 'PM' : 'AM'}`;
    
    return arabicDate
  }

  let current_time: any = moment().format('x');
  // let local_time = moment.utc(time).toDate();
  let to_local = moment(time).format('YYYY-MM-DD HH:mm:ss');
  let that_time: any = moment(to_local).format('x');
  let diff = current_time - that_time;

  var final_time = Math.floor(diff / 1000 / 60);
  if (final_time < 1) {
    return 'just now';
  } else if (final_time >= 1 && final_time < 60) {
    if (final_time < 2) {
      return `${final_time} ${t('min_ago')}`;
    } else {
      return `${final_time} ${t('min_ago')}`;
    }
  } else if (final_time >= 60 && final_time < 1440) {
    let new_hour = Math.floor(final_time / 60);
    if (new_hour <= 1) {
      return `${new_hour} ${t('hours_ago')}`;
    } else {
      return `${new_hour} ${t('hours_ago')}`;
    }
  } else {
    return moment(time).calendar(null, {
      lastDay: `[yesterday ${moment(time).format('hh:mm A')}]`,
      lastWeek: `[${moment(time).format('DD, MMM YYYY  hh:mm A')}]`,
      sameElse: `[${moment(time).format('DD, MMM YYYY  hh:mm A')}]`,
    });
  }
};


const currentThemeColors = () =>
  DataHandler?.getStore()?.getState()?.home?.darkMode;

let selectedThemeColors = () =>
  currentThemeColors() ? DarkModColors : DefaultColors;

export default {
  validatePassword,
  validateAlpha,
  validateEmail,
  validatePhoneNumber,
  showToast,
  timeHumanize,
  // currentThemeColors,
  selectedThemeColors,
};
