import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import {
  CustomImage,
  CustomText,
  FadeInImage,
  MainContainer,
  ProgressReportCard,
} from '../../../../components';
import {FontType, Images, Metrix, Utills} from '../../../../config';
import CircularProgress from 'react-native-circular-progress-indicator';
import {TimeSpendingList} from './TimeSpendingList';
import {t} from 'i18next';
import { useDispatch, useSelector } from 'react-redux';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import { getProgressReport } from '../../../../Redux/Action/HomeActions/homeActions';

type ProgressReportProps = {};

export const ProgressReport: React.FC<ProgressReportProps> = ({}) => {

  const progress_Report = useSelector(state => state?.HomeReducer?.progress_Report);
  const courseDetail = useSelector(state => state?.HomeReducer?.course_Object);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ProgressReportData()
  }, []);

  async function ProgressReportData() {
    let res = await dispatch(getProgressReport(courseDetail?._id));
    if (res?.staus) {
      dispatch({
        type: ActionType.PROGRESS_REPORT,
        payload: res?.data,
      });
    }    
    
    setRefreshing(false);
  }

  return (
    <MainContainer isFlatList customeStyle={{paddingVertical: 0}}>
      <ScrollView
            showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      <View
        style={{
          paddingTop: Metrix.VerticalSize(10),
          borderRadius: Metrix.VerticalSize(10),
          backgroundColor: Utills.selectedThemeColors().Base,
        }}>
        <View
          style={[
            styles.flexCardViewStyles,
            {
              marginBottom: Metrix.VerticalSize(20),
              paddingHorizontal: Metrix.VerticalSize(10),
            },
          ]}>
          <View
            style={[
              styles.flexCardViewStyles,
              {width: '60%', alignItems: 'center'},
            ]}>
            <FadeInImage
              source={courseDetail?.media?.path ? { uri: courseDetail?.media?.path } : Images.Course1}
              customImageContainerStyle={styles.courseImagesStyles}
            />
            <CustomText.LargeBoldText
              customStyle={{
                width: '65%',
                fontSize: FontType.FontSmall,
                marginLeft: Metrix.VerticalSize(7),
              }}>
                {courseDetail?.name}
            </CustomText.LargeBoldText>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: '100%', alignItems: 'center'}}>
              <CustomImage
                source={Images.Tick}
                customStyle={{
                  width: Metrix.customImageSize(12),
                  height: Metrix.customImageSize(12),
                  alignSelf: 'flex-end',
                }}
              />
              <CircularProgress
                value={progress_Report?.overallProgress}
                radius={30}
                inActiveStrokeColor={
                  Utills.selectedThemeColors().SecondaryTextColor
                }
                activeStrokeColor={Utills.selectedThemeColors().Primary}
                activeStrokeWidth={Metrix.VerticalSize(2)}
                inActiveStrokeWidth={Metrix.VerticalSize(2)}
                inActiveStrokeOpacity={0.2}
                progressValueStyle={{
                  color: Utills.selectedThemeColors().Primary,
                }}
                valueSuffix={'%'}
              />
            </View>

            <CustomText.LargeSemiBoldText customStyle={styles.textStyle}>
              {t('overall_progress')}
            </CustomText.LargeSemiBoldText>
          </View>
        </View>

        <View style={styles.flexCardViewStyles}>
          <ProgressReportCard
            customContainerStyles={{width: '48%'}}
            image={Images.PollSurveyIcon}
            progresspercent={progress_Report?.quiz?.quizprogress}
            title={t('quiz_progress')}
          />
          <ProgressReportCard
            customContainerStyles={{width: '48%'}}
            image={Images.EditDocument}
            progresspercent={progress_Report?.assignment?.assignmentProgress}
            title={t('assignment_progress')}
          />
        </View>
      </View>
      <CustomText.LargeBoldText
        customStyle={{
          textAlign: 'center',
          marginTop: Metrix.VerticalSize(20),
          fontSize: FontType.FontMedium,
        }}>
        {t('time_spending_details')}
      </CustomText.LargeBoldText>
      <TimeSpendingList progress_Report={progress_Report} />
      </ScrollView>
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  flexCardViewStyles: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  courseImagesStyles: {
    width: Metrix.customImageSize(60),
    height: Metrix.customImageSize(60),
    borderRadius: Metrix.VerticalSize(10),
    overflow: 'hidden',
  },
  textStyle: {
    color: Utills.selectedThemeColors().Primary,
    fontSize: FontType.FontSmall,
    alignSelf: 'center',
    marginTop: Metrix.VerticalSize(10),
  },
});