import {
  Alert,
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  CustomText,
  FadeContainer,
  MainContainer,
  PrimaryButton,
  RoundBorderCardComponent,
} from '../../../../components';
import {Images, Metrix, RouteNames, Utills} from '../../../../config';
import {QuizView} from './QuizView';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetAssiignment,
  QuizAndAssignmentData,
  SpecificQuiz,
  checkCourseCompletedorNot,
  getCertificate,
  getCourseDetailsWithoutLoder,
  getProgressReport,
} from '../../../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import {number} from 'yup';
import {t} from 'i18next';
import navigationService from '../../../../config/navigationService';
import utills from '../../../../config/utills';
import {RootState} from '../../HomeScreen';

type QuizAndAssigmnetsProps = {};
const screenWidth = Dimensions.get('window').width;

export const QuizAndAssigmnets: React.FC<QuizAndAssigmnetsProps> = ({
  isActive,
  movetoCourseDetail,
}) => {
  const course = useSelector(state => state?.HomeReducer?.course_Object);
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );

  const quizAndAssignmentData = useSelector(
    state => state?.HomeReducer?.quizandassignmentdata,
  );

  console.log('quizAndAssignmentData', quizAndAssignmentData?.questions);
  // const attemptedQuizzes = quizAndAssignmentData?.attemptedQuiz;
  // const totalQuizzes = quizAndAssignmentData?.totalQuiz;

  const dispatch = useDispatch();
  const [isQuizDetials, setIsQuizDetials] = useState({
    isCompleted: false,
    totalQuestions: 0,
    totalCorrectAnswers: 0,
    text: '',
    index: number,
    subtext: '',
    duration: '',
    submittedTime: '',
  });
  const [isQuizMode, setIsQuizMode] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function getSpecificQuizDetail(id) {
    let res = await dispatch(SpecificQuiz(id));

    console.log('====>>-----', res?.responseData);
    // return

    if (res?.status) {
      setIsQuizDetials({
        text: res?.responseData?.name,
        // isCompleted: false,
        isCompleted: res?.responseData?.isSubmitted,
        index: 0,
        duration: res?.responseData?.duration,
        subtext: res?.responseData?.description,
        question: res?.responseData?.questions,
        submittedTime: res?.responseData?.submissionDate,
        isPassed: res?.responseData?.isPassed,
        // totalCorrectAnswers: 4,
        totalCorrectAnswers: res?.responseData?.score,
        totalQuestions: res?.responseData?.questions?.length,
      });
      setIsQuizMode(true);
    }
  }

  const handleViewCertificatePress = async () => {
    if (userData?.type == 'guest') {
      // return true
      dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
      return;
    }

    if (
      quizAndAssignmentData?.attemptedQuiz != quizAndAssignmentData?.totalQuiz
    ) {
      // Utills.showToast(t('Quiz_Is_Not_Complete_Yet'), '', 'error');
      Utills.showToast(t('quiz_not_complete'), '', 'error');
      return;
    }
    try {
      let res = await dispatch(checkCourseCompletedorNot(course?._id));
      if (res?.data?.completed) {
        const certificateData = await dispatch(getCertificate(course?._id));

        if (certificateData?.status) {
          navigationService.navigate(RouteNames.HomeRoutes.ViewCertificate, {
            certificatedata: certificateData,
          });
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  //courseCompletionStatus/{courseId}

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getQuizes();
  }, []);

  async function getQuizes() {
    let res = await dispatch(QuizAndAssignmentData(course?._id));

    if (res?.status) {
      dispatch({
        type: ActionType.QUIZ_AND_ASSIGNMET_DATA,
        payload: res?.responseData,
      });
    }
    setRefreshing(false);
  }

  const renderFooterComponent = () => {
    return (
      <View
        style={{
          height: Metrix.VerticalSize(80),
          width: screenWidth,
          position: 'absolute',
          backgroundColor: '#fff',
          bottom: 0,
        }}>
        <CustomText.MediumText
          style={{
            textAlign: 'center',
            color: utills?.selectedThemeColors()?.Primary,
            marginTop: 7,
          }}>
          {` ${t('number_of_attempted_quiz')} ${
            quizAndAssignmentData?.attemptedQuiz || 0
          } ${t('out_of')} ${quizAndAssignmentData?.totalQuiz || 0}`}
        </CustomText.MediumText>
        <View
          style={{
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 5,
          }}>
          <PrimaryButton
            title={t('view_certificate')}
            secondaryBtn
            customStyles={styles.BtnStyles}
            onPress={handleViewCertificatePress}
            // onPress={getCertificateDetails}
          />
        </View>
      </View>
    );
  };

  return (
    <MainContainer>
      {isQuizMode && isActive ? ( //isActive becouse if this isQuizMode is true and naviagte from other tab to this tab so open successmodla thats why
        <FadeContainer>
          <QuizView
            movetoCourseDetail={movetoCourseDetail}
            quizDetails={isQuizDetials}
            setIsQuizMode={setIsQuizMode}
          />
        </FadeContainer>
      ) : (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={quizAndAssignmentData?.quiz}
            ListEmptyComponent={<Text>{t('No Result Founds')}</Text>}
            ListFooterComponent={<View style={{height: 75}} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <RoundBorderCardComponent
                touchableOpacityCustomStyle={{
                  alignItems: 'flex-start',
                }}
                customDurationTextStyle={
                  item?.completed
                    ? {
                        color: Utills?.selectedThemeColors().Primary,
                      }
                    : {
                        color: Utills?.selectedThemeColors().SecondaryTextColor,
                      }
                }
                imageStyle={{
                  width: Metrix.HorizontalSize(45),
                  height: Metrix.VerticalSize(45),
                }}
                key={index}
                text={item?.name}
                duration={item?.duration}
                subtext={item?.description}
                greenText={`${item?.questions?.length} ${t('marks')}`}
                // image={item?.type === 'Quiz' ? Images.Quiz : Images.WriteDown}
                image={Images.Quiz}
                customTextContainerStyle={{
                  width: '60%',
                }}
                onPress={() => {
                  if (userData?.type == 'guest') {
                    // return true
                    dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
                    return;
                  }

                  getSpecificQuizDetail(item?._id);
                  // Add this log to check if the onPress is triggered
                  console.log('------->>>,', getSpecificQuizDetail);
                }}
              />
            )}
          />
          {
            // quizAndAssignmentData?.quiz?.length &&
            renderFooterComponent()
          }
        </>
      )}
    </MainContainer>
  );
};

const styles = StyleSheet.create({
  BtnStyles: {
    width: '45%',
    marginVertical: 0,
    alignSelf: 'center',
    height: Metrix.VerticalSize(32),
  },
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'white',
    zIndex: 1,
    alignSelf: 'center',
  },
});
