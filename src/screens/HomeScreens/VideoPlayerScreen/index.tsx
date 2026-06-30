import {
  BackHandler,
  Button,
  FlatList,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHeader,
  CategoryBtnsList,
  ChipButtonComponent,
  CustomInput,
  CustomText,
  MainContainer,
  PrimaryButton,
  ScrollableContainer,
  TransactionDetailsComponent,
  UserTransactionInfo,
} from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {RoundBorderCardComponent} from '../../../components/RoundBorderCardComponent';
// import {VideoPlayerScreenProps} from '../../propTypes';
import utills from '../../../config/utills';
import {useEffect, useRef, useState} from 'react';
import metroConfig from '../../../../metro.config';
import {t} from 'i18next';
import {Text} from 'react-native';
import navigationService from '../../../config/navigationService';
import {useFocusEffect, useIsFocused, useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  onCompleteVideo,
  submitRatting,
} from '../../../Redux/Action/HomeActions/homeActions';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../HomeScreen';
import { showLoginPleaseModal } from '../../../Redux/Action/AuthActions/authActions';

type RouteProps = {
  description?: string;
  name?: string;
  title?: string;
  videourl?: string;
  id?: number;
};

type VideoPlayerScreenProps = {
  route?: RouteProps;
  tapAnywhereToPause?: boolean;
};

export const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({
  route,
  tapAnywhereToPause,
}) => {
  const {description, name, title, videourl, id} = route?.params;
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const dispatch = useDispatch();
  const [isPaused, setIsPaused] = useState(false);
  
  function handleBackButtonClick() {
    navigationService.goBack();
    setIsPaused(true); // Pause the video when navigating back
    return true;
  }

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
    };
  }, []);


  async function onVideoEnd() {

    if (userData?.type == 'guest') {
      // return true
      dispatch(showLoginPleaseModal(true))
      return
    }

    let payload = {
      contentId: id,
    };
    await dispatch(onCompleteVideo(payload));
  }

  return (
    <>
      {/* <VideoPlayer
        onEnd={onVideoEnd}
        source={{uri: videourl}}
        onBack={handleBackButtonClick}
        paused={isPaused} 
      /> */}
      <View></View>
    </>
  );
};

const styles = StyleSheet.create({});
