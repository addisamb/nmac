import {
  Linking,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../../config';
import {
  CustomImage,
  CustomText,
  FadeContainer,
  MainContainer,
  PrimaryButton,
  RoundBorderCardComponent,
} from '../../../../components';
import {FlatList} from 'react-native-gesture-handler';
import {RoundBorderCardProps} from '../../../../components/RoundBorderCardComponent';
import {t} from 'i18next';
import {ContainerComp} from '../../../../components/CurriculumComponent';
import {useDispatch, useSelector} from 'react-redux';
import {
  QuizAndAssignmentData,
  getBonusMaterial,
} from '../../../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import RNFetchBlob from 'react-native-blob-util';
import {
  downloadFile,
  getDownloadPermissionAndroid,
} from '../../../../config/utills/fileDownload';
import {
  HandleNavigationAndroid,
  HandleNavigationIOS,
  getExtensionName,
  getMediaIcon,
} from '../../../../config/utills/imagesIconHandler';
import utills from '../../../../config/utills';
import {RootState} from '../../HomeScreen';

type BonusMaterialProps = {};

type BonusMaterialDetailsTypes = {
  description?: string;
  dataType?: 'Document file' | 'Video' | '' | string;
  dataDetails?: {
    id: string;
    title: string;
    video?: {path: string; duration: string};
    url?: string;
  };
  courseTitle?: string;
  meetLink?: string;
  time?: string;
  duration?: string;
};

type BonusMaterialViewType = {
  bonusMaterialDetails: BonusMaterialDetailsTypes;
  setBonusDataViewMode: React.Dispatch<React.SetStateAction<boolean>>;
};

const BonusMaterialView: React.FC<BonusMaterialViewType> = ({
  bonusMaterialDetails,
  setBonusDataViewMode,
  movetoCourseDetail,
}) => {
  const {
    dataType,
    description,
    dataDetails,
    meetLink,
    courseTitle,
    time,
    duration,
  } = bonusMaterialDetails;

  console.log('bonusMaterialDetails', bonusMaterialDetails);

  const item = dataDetails;
  function PrevewFile(item) {
    // if (
    //   item?.url?.toLowerCase()?.split('.').pop() == 'mov' ||
    //   item?.url?.toLowerCase()?.split('.').pop() == 'mp4'
    // ) {
    //   NavigationService.navigate(RouteNames.HomeRoutes.VideoPlayerScreen, {
    //     name: item?.title,
    //     description: 'this is description',
    //     title: item?.title,
    //     videourl: item?.url,
    //     id: item?._id,
    //   });
    // } else {
    if (item?.url) {
      if (Platform.OS == 'android') {
        const extension = item?.url?.path?.toLowerCase()?.split('.').pop();
        if (extension == 'vtt') {
          Linking.openURL(item?.url);
          return;
        }

        let FormatedUrl = HandleNavigationAndroid(item?.url);
        NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen, {
          url: FormatedUrl,
          movetoCourseDetail: movetoCourseDetail,
          movetoIndex: 4,
          documentTitle: item?.title,
        });
      } else if (Platform.OS == 'ios') {
        let FormatedUrl = HandleNavigationIOS(item?.url);
        NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen, {
          url: FormatedUrl,
          movetoCourseDetail: movetoCourseDetail,
          movetoIndex: 4,
          documentTitle: item?.title,
        });
      }
    }
    // }
    return;
  }

  const TextWithStyle = ({title, content, isLink = false}) => {
    const handlePress = () => {
      if (isLink) {
        Linking.openURL(content);
      }
    };

    return (
      <View>
        <CustomText.LargeBoldText>{title}</CustomText.LargeBoldText>
        {isLink ? (
          <TouchableOpacity onPress={handlePress}>
            <CustomText.SmallText
              customStyle={{
                marginVertical: Metrix.VerticalSize(10),
                color: 'blue',
              }}>
              {content || ''}
            </CustomText.SmallText>
          </TouchableOpacity>
        ) : (
          <CustomText.SmallText
            customStyle={{marginVertical: Metrix.VerticalSize(10)}}>
            {content || ''}
          </CustomText.SmallText>
        )}
      </View>
    );
  };

  const YourCustomComponent = ({}) => {
    const formatDuration = seconds => {
      if (!seconds) return '0 sec'; // Default value agar duration na ho

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      if (seconds > 59) {
        return `${minutes} ${t('Minutes')} ${remainingSeconds} ${t('seconds')}`;
      } else {
        return `${seconds} ${t('seconds')}`;
      }
    };

    

    // Usage

    if (meetLink == '') {
      return (
        <View>
          {/* Your first return statement */}
          <CustomText.LargeBoldText>
            {t('description')}
          </CustomText.LargeBoldText>
          <CustomText.SmallText
            customStyle={{marginVertical: Metrix.VerticalSize(10)}}>
            {description || ''}
          </CustomText.SmallText>
          <CustomText.LargeBoldText>{dataType}</CustomText.LargeBoldText>
          <ContainerComp
            key={item?.id}
            showtitleDescription={false}
            onPress={async () => {
              PrevewFile(item);
            }}
            title={item?.title}
            totalVideos={getExtensionName(item?.url)}
            totalTime={formatDuration(item?.duration)}
            // totalTime={item?.duration}

            image={getMediaIcon(item?.url)}
            customMainContainerStyles={{
              backgroundColor: Utills.selectedThemeColors().Base,
              borderBottomWidth: 1,
              borderColor: '#C8C8C8',
              marginBottom: Metrix.VerticalSize(10),
            }}
            imageStyle={{
              width: Metrix.customImageSize(25),
              height: Metrix.customImageSize(25),
            }}
          />
        </View>
      );
    } else {
      return (
        <View>
          <TextWithStyle title={t('title')} content={courseTitle} />
          <TextWithStyle title={t('format')} content={dataType} />
          <CustomText.LargeBoldText>{t('duration')}</CustomText.LargeBoldText>
          <View
            style={{
              // borderWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(10),
            }}>
            <CustomImage
              source={Images.Clock}
              customStyle={{
                width: Metrix.HorizontalSize(20),
                height: Metrix.VerticalSize(20),
                marginRight: Metrix.VerticalSize(10),
              }}
            />

            <View>
              <CustomText.RegularText
                isSecondaryColor
                customStyle={{
                  fontSize: FontType.FontSmall,
                }}>
                {utills.timeHumanize(time)}
              </CustomText.RegularText>
            </View>
          </View>

          <TextWithStyle
            title={t('meeting_link')}
            content={meetLink}
            isLink={true}
          />
          <TextWithStyle title={t('description')} content={description} />
        </View>
      );
    }
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <YourCustomComponent
          description={description}
          dataType={dataType}
          item={item}
          PrevewFile={PrevewFile}
        />

        <PrimaryButton
          title={t('go_back')}
          // secondaryBtn
          onPress={() => setBonusDataViewMode(false)}
        />
      </View>
    </>
  );
};

export const BonusMaterial: React.FC<BonusMaterialProps> = route => {
  const bonus_material = useSelector(
    state => state?.HomeReducer?.bonus_material,
  );

  console.log('bonus_material', bonus_material);

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const course = useSelector(state => state?.HomeReducer?.course_Object);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [bonusMaterialDetails, setBonusMaterialDetails] =
    useState<BonusMaterialDetailsTypes>({
      description: '',
      dataType: '',
      dataDetails: {
        id: '',
        title: '',
        url: '',
      },
      courseTitle: '',
      meetLink: '',
      time: '',
      duration: '',
    });

  const [bonusDataViewMode, setBonusDataViewMode] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    bonusMaterialData();
  }, []);

  async function bonusMaterialData() {
    let res = await dispatch(getBonusMaterial(course?._id));

    console.log('bonus material res', res);

    if (res?.status) {
      dispatch({
        type: ActionType.GET_BONUS,
        payload: res?.responseData,
      });
    }
    setRefreshing(false);
  }


  const formatDuration = (seconds) => {
    if (!seconds) return "0 sec"; // Default value agar duration na ho

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return seconds > 59 ? `${minutes} ${t('Minutes')} ${remainingSeconds} ${t('seconds')}` : `${seconds} ${t('seconds')}`;
  };



  return (
    <MainContainer>
      {bonusDataViewMode ? (
        <FadeContainer>
          {/* <TouchableOpacity
            onPress={() => {
              setBonusDataViewMode(false);
            }}>
            <CustomImage
              source={Images.Arrow}
              customStyle={[styles.backImage]}
            />
          </TouchableOpacity> */}
          <BonusMaterialView
            movetoCourseDetail={route?.movetoCourseDetail}
            bonusMaterialDetails={bonusMaterialDetails}
            setBonusDataViewMode={setBonusDataViewMode}
          />
        </FadeContainer>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={bonus_material}
          ListEmptyComponent={
            <Text style={{textAlign: 'center', marginTop: 20, color: '#000'}}>
              {t('No Result Founds')}
            </Text>
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RoundBorderCardComponent
              touchableOpacityCustomStyle={{
                alignItems: 'flex-start',
              }}
              customDurationTextStyle={{}}
              imageStyle={{
                width: Metrix.HorizontalSize(45),
                height: Metrix.VerticalSize(45),
              }}
              key={index}
              image={
                item?.type == 'webinar'
                  ? getMediaIcon(`${item?.type}.link`)
                  : getMediaIcon(item?.media[0]?.path)
              }
              text={item.title}
              subtext={item.desc}
              // greenText={getExtensionName(item?.media[0]?.path)}
              greenText={`${
                item?.type == 'webinar'
                  ? getExtensionName(`${item?.type}.link`)
                  : getExtensionName(item?.media[0]?.path)
              } ${formatDuration(item.media[0]?.meta?.duration)}`}
              customTextContainerStyle={{
                width: '60%',
              }}
              onPress={() => {
                if (userData?.type == 'guest') {
                  // return true
                  dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
                  return;
                }

                setBonusDataViewMode(true);
                setBonusMaterialDetails({
                  description: item?.desc,
                  courseTitle: item?.title,
                  meetLink: item?.meetingLink,
                  time: item?.scheduleTime,
                  dataType:
                    item?.type == 'webinar'
                      ? getExtensionName(`${item?.type}.link`)
                      : getExtensionName(item?.media[0]?.path),
                  dataDetails: {
                    id: '1',
                    title: item.media[0]?.meta?.mimetype,
                    url: item?.media[0]?.path,
                    duration: item.media[0]?.meta?.duration,
                  },
                });
              }}
            />
          )}
        />
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  backImage: {
    width: Metrix.HorizontalSize(18),
    height: Metrix.VerticalSize(18),
    tintColor: '#000',
    marginBottom: Metrix.HorizontalSize(10),
  },
});
