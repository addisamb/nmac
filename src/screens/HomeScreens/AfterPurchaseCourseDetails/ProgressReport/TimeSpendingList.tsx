import {
  FlatList,
  I18nManager,
  ImageProps,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FontType, Images, Metrix, Utills} from '../../../../config';
import {
  CustomImage,
  CustomText,
  SpentHoursComponent,
} from '../../../../components';
import {QuizAttemptsCards} from './QuizAttemptsCards';
import {t} from 'i18next';

type TimeSpendingListProps = {};

const data = [
  {
    id: '0',
    title: t('videos'),
    coverImage: Images.CharacterVideos,
    hoursSpent: {
      primaryTitle: t('total_time'),
      primaryValue: '4hr 35m',
    },
    details: {
      image: Images.YoutubeIcon,
      primaryTitle: t('view_videos'),
      primaryValue: '17',
      secondaryTitle:  t('remaining'),
      secondaryValue: '3',
    },
  },
  {
    id: '1',
    title: t('assignments'),
    coverImage: Images.AssignmentIllustration,
    hoursSpent: {
      primaryTitle: t('total_time'),
      primaryValue: '4hr 35m',
    },
    details: {
      image: Images.AssignmentIcon,
      primaryTitle: t('done_assignments'),
      primaryValue: '17',
      secondaryTitle: t('remaining'),
      secondaryValue: '3',
    },
  },
  {
    id: '2',
    title: t('quiz'),
    hoursSpent: {
      primaryTitle: t('total_time'),
      primaryValue: '4hr 35m',
    },
    details: {
      image: Images.PollSurveyIcon,
      primaryTitle: t('complete_quiz'),
      primaryValue: '17',
      secondaryTitle:  t('remaining'),
      secondaryValue: '3',
    },
  },
  {
    id: '3',
    title: t('chat'),
    hoursSpent: {
      primaryTitle: t('total_time'),
      primaryValue: '4hr 35m',
    },
    details: {
      image: Images.GroupChatIcon,
      primaryTitle: t('ask_question'),
      primaryValue: '17',
      secondaryTitle:  t('replies'),
      secondaryValue: '8',
    },
  },
  {
    id: '4',
    title: t('bonus_points'),
    coverImage: Images.Like,
    hoursSpent: {
      primaryTitle: t('total_time'),
      primaryValue: '4hr 35m',
    },
    details: {
      image: Images.CertificateBadge,
      primaryTitle: t('total_rewards'),
      primaryValue: '17',
      secondaryTitle: ' ',
      secondaryValue: ' ',
    },
  },
];

const dataRowList = [
  {
    id: '0',
    title: t('videos'),
  },
  {
    id: '1',
    title: t('assignments'),
  },
  {
    id: '2',
    title: t('quiz'),
  },
  {
    id: '3',
    title: t('chat'),
  },
  {
    id: '4',
    title: t('bonus_points'),
  },
];

const RenderItem: React.FC<{
  item: {id: string; title: string};
  onPress: () => void;
  isActive: string;
}> = ({item, onPress, isActive}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      key={item?.id}
      style={[
        styles.renderItemContainer,
        isActive == item?.id && {
          borderBottomColor: Utills.selectedThemeColors().Primary,
          borderBottomWidth: 2,
        },
      ]}
      onPress={onPress}>
      <CustomText.LargeBoldText
        customStyle={[
          {fontSize: FontType.FontSmall},
          {
            color:
              isActive == item?.id
                ? Utills.selectedThemeColors().Primary
                : Utills.selectedThemeColors().LightGreyText,
          },
        ]}
        isSecondaryColor>
        {item?.title}
      </CustomText.LargeBoldText>
    </TouchableOpacity>
  );
};

type spentHoursDetailsTypes = {
  details: {
    image: ImageProps['source'];
    primaryTitle: string;
    primaryValue: string;
    secondaryTitle?: string;
    secondaryValue?: string;
  };
  hoursSpent: {
    primaryTitle: string;
    primaryValue: boolean;
  };
  coverImage?: ImageProps['source'];
};

const ConditionalDataComp: React.FC<{id: string, progress_Report: object}> = ({id, progress_Report}) => {
  const [spentHoursDetails, setSpentHoursDetails] =
    useState<spentHoursDetailsTypes>({
      details: {
        image: Images.YoutubeIcon,
        primaryTitle: t('view_videos'),
        primaryValue: progress_Report?.videos?.watchedVideos?.toString(),
        secondaryTitle:  t('remaining'),
        secondaryValue: progress_Report?.videos?.watchedVideos?.toString(),
      },
      hoursSpent: {
        primaryTitle: t('total_time'),
        primaryValue: `${progress_Report?.videos?.totalTime}`,
      },
      coverImage: Images.CharacterVideos
      
    });


  useEffect(() => {
    const switchFunc = () => {
      switch (id) {
        case '0':
          setSpentHoursDetails({
            details: {
              image: Images.YoutubeIcon,
              primaryTitle: t('view_videos'),
              primaryValue: progress_Report?.videos?.watchedVideos?.toString(),
              secondaryTitle:  t('remaining'),
              secondaryValue: progress_Report?.videos?.remainingVideos?.toString(),
            },
            hoursSpent: {
              primaryTitle: t('total_time'),
              primaryValue: `${progress_Report?.videos?.totalTime}m`,
            },
            coverImage: Images.CharacterVideos,
          });
          break;

        case '1':
          setSpentHoursDetails({
            details: {
              image: Images.AssignmentIcon,
              primaryTitle: t('done_assignments'),
              primaryValue: progress_Report?.assignment?.completedAssignment?.toString(),
              secondaryTitle: t('remaining'),
              secondaryValue:  progress_Report?.assignment?.remainingAssignment?.toString(),
            },
            hoursSpent: {
              primaryTitle: t('total_time'),
              primaryValue: false,
            },
            coverImage: data[1]?.coverImage,
          });

          console.log("ASdsamhvdashjvdb====>?",progress_Report?.assignment?.completedAssignment?.toString());
          
          break;

        case '2':
          setSpentHoursDetails({
            details: {
              image: Images.PollSurveyIcon,
              primaryTitle: t('complete_quiz'),
              primaryValue: progress_Report.quiz?.completedQuiz?.toString(),
              secondaryTitle:  t('remaining'),
              secondaryValue: progress_Report?.quiz?.remainingQuiz?.toString(),
            },
            hoursSpent: {
              primaryTitle: t('total_time'),
              primaryValue: `${Math.floor(progress_Report?.quiz?.totalTime)}m`,
            },
          });
          break;

        case '3':
          setSpentHoursDetails({
            details: {
              image: Images.GroupChatIcon,
              primaryTitle: t('ask_question'),
              primaryValue: progress_Report?.chat?.asked_questions?.toString(),
              secondaryTitle:  t('replies'),
              secondaryValue: progress_Report?.chat?.replies?.toString(),
            },
            hoursSpent: {
              primaryTitle: t('total_time'),
              primaryValue: false,
            },
          });
          break;

        case '4':
          setSpentHoursDetails({
            coverImage: Images.Like,
            hoursSpent: {
              primaryTitle: t('total_time'),
              primaryValue: false,
            },
            details: {
              image: Images.CertificateBadge,
              primaryTitle: t('total_rewards'),
              primaryValue: progress_Report?.rewards?.totalReceivedPoints?.toString(),
              secondaryTitle: ' ',
              secondaryValue: ' ',
            },
          }
          );
          break;

        default:
          setSpentHoursDetails({
            details: data[0]?.details,
            hoursSpent: data[0]?.hoursSpent,
            coverImage: data[0]?.coverImage,
          });
          break;
      }
    };
    switchFunc();
  }, [id, progress_Report, progress_Report?.quiz?.completedQuizData?.length]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 100 }} >
      <View style={{height: Metrix.VerticalSize(70)}}>
        <View style={styles.flexSpacebetween}>
          <SpentHoursComponent
            details={spentHoursDetails?.details}
            customContainerStyles={{width: '60%'}}
          />
          
        {spentHoursDetails?.hoursSpent?.primaryValue
        ?
        <SpentHoursComponent
          details={spentHoursDetails?.hoursSpent}
          customContainerStyles={{width: '35%'}}
          customPrimaryTextViewStyles={{width: '70%'}}
        />
        :
        <View style={{ width: '40%' }} /> //for adjusting style
        }
          
        </View>
      </View>
      {spentHoursDetails?.coverImage && (
        <CustomImage
          source={spentHoursDetails?.coverImage}
          customStyle={{
            // borderWidth:1,
            alignSelf: 'center',
            borderColor:"black",
            width: 70,
            height:70,
            // height: Platform.OS === 'ios' ? 70 : 70, 
            marginVertical: Metrix.VerticalSize(20),
            // backgroundColor: "red",
            transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
            resizeMode: "contain"
          }}
          />
      )}
      {id == '2' && (
        <View
          style={{
            flex: 1,
            marginVertical: Metrix.VerticalSize(10),
          }}>
          <CustomText.LargeBoldText
            customStyle={{
              fontSize: FontType.FontRegular,
              color: Utills.selectedThemeColors().Primary,
            }}>
            {t('your_attempt')}
          </CustomText.LargeBoldText>
          {progress_Report?.quiz?.completedQuizData?.map(item => (
            <QuizAttemptsCards key={item?.id} details={item} />
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export const TimeSpendingList: React.FC<TimeSpendingListProps> = ({progress_Report}) => {
  const [isActive, setIsActive] = useState('0');

  return (
    <View style={{width: '100%', flex: 1}}>
      <View
        style={{
          marginVertical: Metrix.VerticalSize(10),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {dataRowList?.map(item => (
          <RenderItem
            key={item?.id}
            item={item}
            isActive={isActive}
            onPress={() => setIsActive(item?.id)}
          />
        ))}
      </View>
      <ConditionalDataComp progress_Report={progress_Report} id={isActive} />
    </View>
  );
};

const styles = StyleSheet.create({
  renderItemContainer: {
    // marginTop:10,
    // borderWidth: 1,
    paddingVertical: Metrix.VerticalSize(7),
    // marginRight: Metrix.HorizontalSize(30),
    backgroundColor: Utills.selectedThemeColors().Base,
  },
  flexSpacebetween: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '100%',
    // borderWidth: 1,
    // flex: 1,
  },
});