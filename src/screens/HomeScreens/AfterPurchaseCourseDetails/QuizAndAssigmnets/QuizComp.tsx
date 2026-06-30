import {
  Alert,
  Dimensions,
  FlatList,
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationDataComponent} from '../../NavigationScreen';
import {FontType, Images, Metrix, RouteNames, Utills} from '../../../../config';
import {
  CustomImage,
  CustomModal,
  CustomText,
  FadeContainer,
  PrimaryButton,
} from '../../../../components';
import {t} from 'i18next';
import {AnyObject, string} from 'yup';
import {TwoBtnView} from './QuizView';
import {useSelector} from 'react-redux';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import {
  QuizAndAssignmentData,
  SubmitQuizData,
  getProgressReport,
} from '../../../../Redux/Action/HomeActions/homeActions';
import {useDispatch} from 'react-redux';
import {Image} from 'react-native';
import CountDown from 'react-native-countdown-component';
import navigationService from '../../../../config/navigationService';
import {useNavigation} from '@react-navigation/native';
import {MyCourses} from '../../../../Redux/Action/CourseAction/CourseAction';
import {RootState} from '../../HomeScreen';
import {showLoginPleaseModal} from '../../../../Redux/Action/AuthActions/authActions';
import metrix from '../../../../config/metrix';

type QuizCompProps = {
  isQuizStart: boolean;
  setIsQuizStart: React.Dispatch<React.SetStateAction<boolean>>;
  handleGoBack: React.Dispatch<React.SetStateAction<boolean>>;
  setIsQuizMode: React.Dispatch<React.SetStateAction<boolean>>;
  isCompleted?: boolean;
  index: number;
  passorFail: number;
  duration: string;
  description: string;
  isActive: boolean;
};

type OptionsType = {
  id: string;
  option: string;
  isCorrect?: boolean;
  optionIndex?: number;
  questionId?: string;
};

type QuizDataTypes = {
  id: string;
  node_id: string;
  next_node_id: string;
  previous_node_id: string;
  question: string;
  duration: string;
  description: string;
  selectedOne: OptionsType;
  options: OptionsType[];
};

type QuizOptionCompTypes = {
  option: OptionsType;
  selectedOption: OptionsType;
  setSelectedOption: React.Dispatch<React.SetStateAction<OptionsType>>;
  selectedOne: OptionsType;
  isCompleted: boolean;
};

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export const QuizOptionComp: React.FC<QuizOptionCompTypes> = ({
  option,
  selectedOption,
  setSelectedOption,
  selectedOne,
  isCompleted,
  wrongOne,
}) => {
  const checkSelectedAndCorrectOne =
    (isCompleted && option?.isCorrect) || option?.id == selectedOption?.id;
  // wrongOne
  const checkSelectedAndWrongOne = isCompleted && option?.isWrong;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.flexRowStyles,
        {
          marginVertical: Metrix.VerticalSize(15),
          alignItems: 'center',
        },
      ]}
      onPress={() => {
        !isCompleted && setSelectedOption(option);
        console.log('Selected Option:', option);
      }}>
      {isCompleted && checkSelectedAndCorrectOne ? (
        <CustomImage source={Images.Tick} />
      ) : checkSelectedAndWrongOne ? (
        <CustomImage
          source={Images.Cross}
          customStyle={{tintColor: Utills.selectedThemeColors().ErrorTextColor}}
        />
      ) : (
        <View style={styles.roundOptionStyles}>
          <CustomText.MediumText
            customStyle={{
              fontSize: FontType.FontSmall,
              color: Utills.selectedThemeColors().Primary,
            }}>
            {option?.id}
          </CustomText.MediumText>
        </View>
      )}

      {/* ✅ Auto-adjust height based on content */}
      <View
        style={{
          width: '90%',
          paddingHorizontal: Metrix.HorizontalSize(15),
          backgroundColor: checkSelectedAndCorrectOne
            ? Utills.selectedThemeColors().Primary
            : Utills.selectedThemeColors().CourseContainerColor,
          borderRadius: Metrix.VerticalSize(50),
          marginLeft: Metrix.HorizontalSize(10),
          // borderWidth: 1,
          borderColor: 'red',
          flexShrink: 1, // Shrinks if content is less
          flexGrow: 1, // Expands if content is more
          paddingVertical: Metrix.VerticalSize(10), // Ensures proper padding
        }}>
        {/* ✅ ScrollView will only scroll when text overflows */}
        <ScrollView
          nestedScrollEnabled={true}
          style={{maxHeight: Metrix.VerticalSize(150)}}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <CustomText.MediumText
            customStyle={{
              fontSize: FontType.FontRegular,
              color: checkSelectedAndCorrectOne
                ? Utills.selectedThemeColors().Base
                : Utills.selectedThemeColors().PrimaryTextColor,
            }}>
            {option?.option}
          </CustomText.MediumText>
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
};

export const QuizComp: React.FC<QuizCompProps> = ({
  isQuizStart,
  setIsQuizStart,
  handleGoBack,
  isCompleted,
  index,
  passorFail,
  duration,
  description,
  setIsQuizMode,
  movetoCourseDetail,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const course = useSelector(state => state?.HomeReducer?.course_Object);
  const specificQuiz = useSelector(state => state?.HomeReducer?.specificQuiz);

  const specificIdData = specificQuiz;
  const quizId = specificIdData?._id;
  // console.log(specificIdData, '=====>>> arha hai Second Response');

  const quizData = specificIdData?.questions?.map((question, index) => {
    // const id = (index + 1).toString();
    const id = (index + 1).toString();
    const node_id = id;
    const next_node_id = (index + 2).toString();
    const previous_node_id = index === 0 ? '0' : index.toString();
    const questionId = question?._id;

    const options = question.options.map((option, optionIndex) => {
      return {
        id: (optionIndex + 1).toString(),
        option: option,
        isCorrect: optionIndex === question.correct_option,
        isWrong: optionIndex === question.selectedOption,
        optionIndex,
        questionId,
      };
    });

    return {
      id,
      node_id,
      next_node_id,
      previous_node_id,
      question: question.question_text,
      duration: duration, // You can set the duration as needed
      description: question.description,
      // selectedOne: {
      //   id: (question.correct_option + 1).toString(),
      //   option: question.options[question.correct_option],
      //   isCorrect: true,
      // },
      // wrongOption: {
      //   id: (question.selectedOption + 1).toString(),
      //   option: question.options[question.selectedOption],
      //   isWrong: true,
      // },
      options,
    };
  });

  // const [quizData, setQuizData] = useState(initialQuizData);
  const [currentQuizData, setCurrentQuizData] = useState<
    QuizDataTypes | undefined
  >(quizData[0]);

  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const isFirstNodeId = quizData[0]?.node_id == currentQuizData?.node_id;
  const initialSelectedOption = {id: '', option: ''};
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);
  const [selectedOptionHistory, setSelectedOptionHistory] = useState<any>({});
  const [modalVisibleNext, setModalVisibleNext] = useState(false);
  const [modalVisibleCancel, setModalVisibleCancel] = useState(false);
  const [QuizDuration, seQuizDuration] = useState(0);
  console.log('in pppprpepre Quiz comp ====', isFirstNodeId);

  const handleNext = () => {
    const next_node_data = quizData?.find(
      item => item?.node_id == currentQuizData?.next_node_id,
    );

    if (isCompleted && passorFail) {
      if (next_node_data == undefined) {
        setIsQuizStart(false);
        setModalVisibleNext(true);
      } else {
        setCurrentQuizData(next_node_data);
      }
    } else {
      if (selectedOption?.id == '') {
        Utills.showToast(t('please_select_on_option'));
      } else if (next_node_data == undefined) {
        // submitQuiz();
        setModalVisibleNext(true);
      } else {
        setCurrentQuizData(next_node_data);
        const isSelectedOption = Boolean(
          selectedOptionHistory[Number(currentQuizData?.next_node_id)],
        );
        setSelectedOption(
          isSelectedOption
            ? selectedOptionHistory[Number(currentQuizData?.next_node_id)]
            : initialSelectedOption,
        );
      }
      // setSelectedOptionHistory((prev: any) => ({
      //   ...prev,
      //   [Number(currentQuizData?.node_id)]: selectedOption,
      // }));

      // Debug approch quiz option last node
      setSelectedOptionHistory((prev: any) => ({
        ...prev,
        [Number(currentQuizData?.node_id)]: selectedOption,
      }));

      // if (!isCompleted && next_node_data === undefined) {
      //   submitQuiz();
      // }
    }
  };

  const handleCancel = () => {
    const previous_node_data = quizData?.find(
      item => item?.node_id == currentQuizData?.previous_node_id,
    );
    if (isCompleted) {
      if (previous_node_data == undefined) {
        setIsQuizStart(false);
        // setModalVisibleNext(true);
      } else {
        setCurrentQuizData(previous_node_data);
      }
    } else {
      if (previous_node_data == undefined) {
        setModalVisibleCancel(true);
      } else {
        setCurrentQuizData(previous_node_data);
        setSelectedOption(
          selectedOptionHistory[Number(currentQuizData?.previous_node_id)],
        );
      }
    }
  };

  // async function submitQuiz() {
  //   console.log('Selected Options History:', selectedOptionHistory);
  //   console.log('check payload', Object.values(selectedOptionHistory));

  //   const mappedAnswers = Object.values(selectedOptionHistory).map(
  //     (answer: any) => ({
  //       questionId: answer.questionId,
  //       selectedOption: Number(answer.optionIndex),
  //     }),
  //   );

  //   const payload = {
  //     quizId,
  //     answers: mappedAnswers,
  //     totalTime: Math.round((QuizDuration / 60) * 100) / 100,
  //   };
  //   console.log('Payload:', payload);
  //   return;

  //   if (mappedAnswers?.length) {
  //     let res = await dispatch(SubmitQuizData(payload));
  //     if (res?.status) {
  //       setModalVisibleNext(true);
  //     }
  //   }
  // }

  async function fetchMyCourses() {
    let res = await dispatch(MyCourses());

    if (res?.status) {
      dispatch({
        type: ActionType.MY_COURSES,
        payload: res?.responseData,
      });
    }
  }

  async function ProgressReportData() {
    let res = await dispatch(getProgressReport(course?._id));
    if (res?.staus) {
      dispatch({
        type: ActionType.PROGRESS_REPORT,
        payload: res?.data,
      });
    }
  }

  async function submitQuiz(key: string) {
    if (userData?.type == 'guest') {
      // return true
      dispatch(showLoginPleaseModal(true));
      return;
    }

    const mappedAnswers = Object.values(selectedOptionHistory).map(
      (answer: any) => ({
        questionId: answer.questionId,
        selectedOption: Number(answer.optionIndex),
      }),
    );

    const payload = {
      quizId,
      answers: mappedAnswers,
      submissionDate: new Date(),
      totalTime: Math.round((QuizDuration / 60) * 100) / 100,
    };
    if (mappedAnswers.length > 0) {
      dispatch(SubmitQuizData(payload));
      // if (res.status) {
      //   setModalVisibleNext(true);
      // }
    }
    if (key == 'timeout') {
      setIsQuizMode(false);
    }
    fetchMyCourses();
    ProgressReportData();
  }

  async function getQuizes() {
    let res = await dispatch(QuizAndAssignmentData(course?._id));

    if (res?.status) {
      dispatch({
        type: ActionType.QUIZ_AND_ASSIGNMET_DATA,
        payload: res?.responseData,
      });
    }
  }

  // const handleFinish = () => {
  //   Alert.alert('Alert Title', 'Certificate Remaning');
  // };

  const apiResponse = currentQuizData?.duration;
  // console.log('=====>>> duration', apiResponse);
  const durationFromApi = apiResponse * 60;

  const handleFinish = () => {
    Alert.alert('Time End', 'your quiz time is ended', [
      {
        text: 'Ok',
        onPress: () => {
          submitQuiz('timeout');
        },
      },
    ]);
  };

  const handleShareToChat = () => {
    navigationService.navigate(RouteNames.HomeRoutes.ShareToChat, {
      movetoCourseDetail: movetoCourseDetail,
      questionNumber: currentQuizData?.id,
      question: currentQuizData?.question,
      description: currentQuizData.description,
      options: currentQuizData?.options,
      isCompleted: isCompleted,
    });
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'space-between'}}>
        <View style={{flex: 2}}>
          <View style={[styles.flexRowStyles]}>
            <CustomText.LargeBoldText
              customStyle={{fontSize: FontType.FontMedium}}>
              {`${t('question')}: ${currentQuizData?.id}`}
            </CustomText.LargeBoldText>

            {(passorFail == undefined && !isCompleted) || !passorFail ? (
              <View style={styles.clockVewStyle}>
                <CustomImage
                  source={Images.Clock}
                  customStyle={{
                    width: Metrix.HorizontalSize(20),
                    height: Metrix.VerticalSize(20),
                    marginRight: Metrix.VerticalSize(10),
                  }}
                />
                {/* <CustomText.RegularText isSecondaryColor>
              {currentQuizData?.duration || ''}
            </CustomText.RegularText> */}
                <CountDown
                  until={durationFromApi}
                  size={12}
                  onChange={e => {
                    seQuizDuration(e);
                  }}
                  onFinish={() => {
                    handleFinish();
                  }} // Corrected prop name
                  digitStyle={{
                    backgroundColor: Utills.selectedThemeColors().Base,
                  }}
                  digitTxtStyle={{color: Utills.selectedThemeColors().Primary}}
                  timeToShow={['M', 'S']}
                />
              </View>
            ) : null}
          </View>
          <CustomText.RegularText
            customStyle={{marginVertical: Metrix.VerticalSize(20)}}>
            {currentQuizData?.question || ''}
          </CustomText.RegularText>
          <View>
            <FlatList
              data={currentQuizData?.options || []} // Ensure data is always an array
              keyExtractor={item => item?.id?.toString()} // Unique key for each item
              renderItem={({item}) => (
                <QuizOptionComp
                  option={item}
                  selectedOption={selectedOption}
                  setSelectedOption={setSelectedOption}
                  selectedOne={currentQuizData?.selectedOne}
                  wrongOne={currentQuizData?.wrongOption}
                  isCompleted={isCompleted && passorFail}
                />
              )}
              ListFooterComponent={() => (
                <View style={{padding: 20, alignItems: 'center'}}>
                  {isCompleted &&
                    currentQuizData?.description &&
                    passorFail && (
                      <View>
                        <ScrollView>
                          <View
                            style={{
                              borderTopWidth: 2,
                              borderTopColor:
                                Utills.selectedThemeColors().stroke,
                              paddingHorizontal: 10,
                            }}>
                            <View style={styles.descViewStyle}>
                              <View style={styles.resultBottomBorder} />
                              <CustomText.LargeSemiBoldText
                                customStyle={{
                                  fontSize: FontType.FontMedium,
                                  paddingHorizontal: 10,
                                }}>
                                {t('Reason')}
                              </CustomText.LargeSemiBoldText>
                              <View style={styles.resultBottomBorder} />
                            </View>
                            <CustomText.RegularText
                              numberOfLines={screenHeight < 680 ? 2 : 0}
                              style={{textAlign: 'center'}}>
                              {currentQuizData.description}
                            </CustomText.RegularText>
                            <TouchableOpacity
                              onPress={handleShareToChat}
                              activeOpacity={0.6}
                              style={styles.shareWithChat}>
                              <CustomText.MediumText
                                customStyle={{
                                  color: Utills.selectedThemeColors().Primary,
                                }}>
                                {t('share_to_chat')}
                              </CustomText.MediumText>
                              <Image
                                style={{
                                  width: 20,
                                  height: 20,
                                  transform: [
                                    {
                                      rotateZ: I18nManager.isRTL
                                        ? '-2.4rad'
                                        : '0.8rad',
                                    },
                                  ],
                                }}
                                source={Images.SendIcon}
                              />
                            </TouchableOpacity>
                          </View>
                        </ScrollView>
                      </View>
                    )}

                  <View
                    style={[
                      styles.flexRowStyles,
                      {
                        width: '100%',
                      },
                    ]}>
                    <PrimaryButton
                      title={
                        isFirstNodeId
                          ? isCompleted
                            ? t('cancel')
                            : t('cancel')
                          : t('previous')
                      }
                      secondaryBtn
                      customStyles={styles.cancelBtnStyles}
                      onPress={handleCancel}
                    />
                    <PrimaryButton
                      title={t('next')}
                      customStyles={{
                        width: '45%',
                        height: Metrix.VerticalSize(33),
                        // borderWidth:1
                      }}
                      onPress={handleNext}
                    />
                  </View>

                  {!passorFail && (
                    <PrimaryButton
                      title={t('cancel_quiz')}
                      textColor={Utills.selectedThemeColors().ErrorTextColor}
                      // secondaryBtn
                      customStyles={[
                        styles.cancelBtnStyles,
                        {
                          alignSelf: 'center',
                          borderWidth: 0,
                          backgroundColor: 'transparent',
                        },
                      ]}
                      onPress={() => setModalVisibleCancel(true)}
                    />
                  )}
                </View>
              )}
              contentContainerStyle={{
                paddingBottom: Metrix.VerticalSize(100),
              }}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </View>
      <CustomModal
        onClose={() => {
          setModalVisibleNext(false);
          setTimeout(() => {
            setIsQuizStart(false);
          }, 1000);
        }}
        visible={modalVisibleNext}
        smallModal>
        <View
          style={[
            styles.heightWidthHundred,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}>
          <CustomText.LargeBoldText
            customStyle={{color: Utills.selectedThemeColors().Primary}}>
            {t('great')}
          </CustomText.LargeBoldText>
          <CustomImage
            source={Images.Wow}
            customStyle={{
              width: Metrix.customImageSize(100),
              height: Metrix.customImageSize(100),
            }}
          />
          <CustomText.RegularText
            style={{
              color: Utills.selectedThemeColors().Primary,
              textAlign: 'center',
            }}
            isSecondaryColor>
            {t('your_quiz_has_been_submitted_successfully')}
          </CustomText.RegularText>

          {/* <PrimaryButton
            title={t('ok')}
            customStyles={{width: '45%', height: Metrix.VerticalSize(32)}}
            onPress={() => {
              setModalVisibleNext(false);
              setIsQuizStart(false);
              handleGoBack(false);
            }}
          /> */}
          <PrimaryButton
            title={t('ok')}
            customStyles={{width: '45%', height: Metrix.VerticalSize(32)}}
            onPress={() => {
              submitQuiz();
              setTimeout(() => setModalVisibleNext(false), 300);
              setIsQuizStart(false);
              handleGoBack(false);
              getQuizes();
            }}
          />
        </View>
      </CustomModal>
      <CustomModal
        onClose={() => setModalVisibleCancel(false)}
        visible={modalVisibleCancel}
        smallModal
        smallContainerStyles={{
          height: '25%',
        }}>
        <View
          style={[
            styles.heightWidthHundred,
            {alignItems: 'center', justifyContent: 'space-between'},
          ]}>
          <CustomText.LargeBoldText
            customStyle={{color: Utills.selectedThemeColors().Primary}}>
            {t('are_your_sure')}
          </CustomText.LargeBoldText>
          <CustomText.RegularText isSecondaryColor>
            {t('cancel_quiz_will_be_enable_to_proceed_again')}
          </CustomText.RegularText>
          <TwoBtnView
            btnATitle={t('no')}
            btnBTitle={t('yes')}
            onPressBtnA={() => setModalVisibleCancel(false)}
            // onPressBtnB={() => setIsQuizStart(false)}
            onPressBtnB={() => setIsQuizMode(false)}
          />
        </View>
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  flexRowStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  clockVewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelBtnStyles: {
    width: '45%',
    height: Metrix.VerticalSize(32),
    marginVertical: 0,
  },
  roundOptionStyles: {
    borderWidth: 1,
    borderColor: Utills.selectedThemeColors().Primary,
    width: '8%',
    height: Metrix.VerticalSize(25),
    borderRadius: Metrix.VerticalSize(50),
    alignItems: 'center',
    justifyContent: 'center',
  },
  heightWidthHundred: {
    height: '100%',
    width: '100%',
  },
  flex: {flex: 1, paddingVertical: Metrix.VerticalSize(5)},
  resultBorder: {borderWidth: 1, width: '27%'},
  scoreViewStyle: {
    // borderWidth: 1,
    height: Metrix.VerticalSize(60),
    width: '60%',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultBottomBorder: {
    width: '15%',
    borderBottomWidth: 2,
    borderBottomColor: Utills.selectedThemeColors().stroke,
  },
  descViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(10),
    // borderWidth: 1,
  },
  shareWithChat: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // width: '50%',
    marginTop: Metrix.VerticalSize(10),
  },
  ScrollviewStyle: {
    // flex:1,
    // borderWidth: 1,
    alignItems: 'center',
    padding: Metrix.HorizontalSize(10),
  },
});
