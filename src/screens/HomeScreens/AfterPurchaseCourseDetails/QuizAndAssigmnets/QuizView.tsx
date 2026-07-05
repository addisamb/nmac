import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontType, Images, Metrix, Utills} from '../../../../config';
import {
  CustomImage,
  CustomModal,
  CustomText,
  FadeContainer,
  PrimaryButton,
} from '../../../../components';
import {t} from 'i18next';
import {NavigationDataComponent} from '../../NavigationScreen';
import {useEffect, useRef, useState} from 'react';
import {QuizComp} from './QuizComp';
import {useDispatch, useSelector} from 'react-redux';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import {GetQuizAnswer} from '../../../../Redux/Action/HomeActions/homeActions';
import {useIsFocused} from '@react-navigation/native';
import navigationService from '../../../../config/navigationService';
import utills from '../../../../config/utills';

export type TwoBtnViewTypes = {
  onPressBtnA: () => void;
  onPressBtnB: () => void;
  btnATitle: string;
  btnBTitle: string;
};

type QuizViewProps = {
  quizDetails: {
    isCompleted: boolean;
    totalQuestions: number;
    totalCorrectAnswers: number;
    text: string;
    index: number;
    subtext: string;
    duration: string;
    questions?: [];
  };
  setIsQuizMode: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TwoBtnView: React.FC<TwoBtnViewTypes> = ({
  onPressBtnA,
  onPressBtnB,
  btnATitle,
  btnBTitle,
}) => (
  <View style={[styles.flexRowStyles, {width: '100%'}]}>
    <PrimaryButton
      title={btnATitle}
      customStyles={{
        width: '45%',
        height: Metrix.VerticalSize(32),
        marginVertical: 0,
      }}
      onPress={onPressBtnA}
    />
    <PrimaryButton
      title={btnBTitle}
      secondaryBtn
      customStyles={styles.cancelBtnStyles}
      onPress={onPressBtnB}
    />
  </View>
);

export const QuizView: React.FC<QuizViewProps> = ({
  quizDetails,
  setIsQuizMode,
  movetoCourseDetail,
}) => {
  const quizId = useSelector(state => state?.HomeReducer?.course_Object?._id);
  const dispatch = useDispatch();
  const focus = useIsFocused();

  const [isQuizStart, setIsQuizStart] = useState(false);
  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [isModalClosed, setIsModalClosed] = useState(false);
  const [showDetailedResult, setShowDetailedResult] = useState(false);

  const {
    isCompleted,
    totalCorrectAnswers,
    totalQuestions,
    index,
    duration,
    isPassed,
    submittedTime,
    questions,
  } = quizDetails;

  const allCorrect = totalQuestions == totalCorrectAnswers;
  const passingCriteria = totalQuestions / 2;

  function renderItem(
    heading: string,
    subtext: string,
    conditionToShowImage: boolean,
  ) {
    return (
      <>
        <View style={{marginTop: Metrix.VerticalSize(10)}}>
          <CustomText.LargeBoldText
            customStyle={{fontSize: FontType.FontMedium}}>
            {heading}
          </CustomText.LargeBoldText>

          {conditionToShowImage && (
            <View
              style={{
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
              <CustomText.RegularText
                isSecondaryColor
                customStyle={{
                  fontSize: FontType.FontSmall,
                }}>
                {subtext}
              </CustomText.RegularText>
            </View>
          )}

          {!conditionToShowImage && (
            <CustomText.RegularText
              isSecondaryColor
              customStyle={{
                marginTop: Metrix.VerticalSize(15),
                fontSize: FontType.FontSmall,
              }}>
              {subtext}
            </CustomText.RegularText>
          )}
        </View>
      </>
    );
  }

  useEffect(() => {
    setTimeout(() => {
      if (quizDetails.isCompleted) {
        setModalPostVisible(true);
      }
    }, 400);
  }, [focus]);

  const handleModalClose = () => {
    setModalPostVisible(false);
    setIsModalClosed(true);
  };

  async function fetcData(id) {
    const response = await dispatch(GetQuizAnswer(id));
    console.log('API Response:', response?.responseData);
    // Guard against an empty/failed response (previously crashed on responseData[0]).
    const answersArray = response?.responseData?.[0]?.answers;

    // Log the 'answers' array
    console.log('Answers Array:', answersArray);
    if (answersArray?.length > 0) {
      answersArray.forEach((innerArray: any, outerIndex: any) => {
        if (innerArray.length > 0 && typeof innerArray[0] === 'object') {
          innerArray.forEach((object: any, innerIndex: any) => {
            console.log(`Object ${innerIndex + 1}:`, object);
          });
        }
      });
    }
  }

  const handleGoBack = () => {
    setIsQuizMode(false);
  };

  console.log('submittedTime===>', utills.timeHumanize(submittedTime));

  return isQuizStart ? (
    <FadeContainer>
      <QuizComp
        movetoCourseDetail={movetoCourseDetail}
        index={index}
        passorFail={isPassed}
        duration={duration}
        questions={questions}
        isQuizStart={isQuizStart}
        setIsQuizStart={setIsQuizStart}
        isCompleted={isCompleted}
        handleGoBack={handleGoBack}
        setIsQuizMode={setIsQuizMode}
      />
    </FadeContainer>
  ) : (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          // borderWidth: 1,
        }}>
        <View style={[styles.flex, {paddingVertical: 0}]}>
          {renderItem(t('task'), quizDetails?.text, false)}
          {renderItem(t('description'), quizDetails?.subtext, false)}
          {renderItem(
            t('type'),
            `${quizDetails?.totalQuestions || 0} ${t(
              `mcq_question_answers`,
            )} `,
            false,
          )}
          {renderItem(
            t('duration'),
            `${quizDetails?.duration}  ${t('Minutes')}`,
            true,
          )}

          {isCompleted ? (
            <>
              {renderItem(
                t('your_submission'),
                ` ${utills.timeHumanize(submittedTime)}`,
                true,
              )}
            </>
          ) : null}
        </View>
        {!isCompleted ? (
          <TwoBtnView
            btnATitle={t('start_now')}
            btnBTitle={t('go_back')}
            onPressBtnA={() => {
              setIsQuizStart(true);
            }}
            onPressBtnB={() => setIsQuizMode(false)}
          />
        ) : (
          <>
            <CustomModal
              onClose={() => {
                setModalPostVisible(false);
              }}
              bottomModal
              smallContainerStyles={{
                height: '50%',
              }}
              visible={modalPostVisible}>
              <View
                style={{
                  // borderWidth:1,
                  alignItems: 'center',
                }}>
                <CustomImage
                  source={Images.Congrats}
                  customStyle={{width: '90%', height: '65%'}}
                />
                <PrimaryButton
                  onPress={() => {
                    handleModalClose();
                  }}
                  customStyles={{
                    width: '70%',
                    marginTop: Metrix.HorizontalSize(20),
                  }}
                  title={`${totalCorrectAnswers} / ${totalQuestions} ${t(
                    'answer_correct',
                  )}`}
                />
              </View>
            </CustomModal>

            {isModalClosed && (
              <View
                style={{
                  // borderWidth: 1,
                  borderTopWidth: 1,
                  borderTopColor: Utills.selectedThemeColors().stroke,
                  backgroundColor: Utills.selectedThemeColors().Base,
                  flex: 1,
                  width: '100%',
                  paddingHorizontal: Metrix.VerticalSize(10),
                  alignSelf: 'center',
                }}>
                <View>
                  {/* {quizStatus.AllCorrect && ( */}
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: Metrix.VerticalSize(20),
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <View style={styles.resultBottomBorder} />
                      <CustomText.LargeSemiBoldText
                        isSecondaryColor
                        customStyle={{
                          fontSize: FontType.FontRegular,
                          paddingHorizontal: 10,
                        }}>
                        {t('result')}
                      </CustomText.LargeSemiBoldText>
                      <View style={styles.resultBottomBorder} />
                    </View>

                    <View
                      style={
                        {
                          // borderWidth: 1,
                        }
                      }>
                      <ImageBackground
                        source={Images.ResultStar}
                        style={{
                          width: Metrix.HorizontalSize(250),
                          height: Metrix.VerticalSize(145),
                        }}>
                        <CustomText.LargeBoldText
                          style={{
                            fontSize: 24,

                            textAlign: 'center',
                            color: Utills.selectedThemeColors().Base,
                            top: 73,
                          }}>
                          {`${totalCorrectAnswers} / ${totalQuestions} `}
                        </CustomText.LargeBoldText>
                      </ImageBackground>
                    </View>
                    <CustomText.LargeSemiBoldText
                      isSecondaryColor
                      customStyle={{
                        fontSize: FontType.FontRegular,
                        marginTop: Metrix.VerticalSize(10),
                      }}>
                      {`${totalCorrectAnswers} ${t(`out_of`)} ${totalQuestions} ${t(`answers_correct`)}`}
                    </CustomText.LargeSemiBoldText>

                    {/* <TwoBtnView
                        btnATitle={t('view_result')}
                        btnBTitle={t('view_certificate')}
                        onPressBtnB={() => {
                          // Open an alert when onPressBtnB is triggered
                          Alert.alert('Alert Title', 'Certificate Remaning');
                        }}
                        // onPressBtnB={() => setIsQuizMode(false)}
                        // btnBTitle={t('go_back')}
                        onPressBtnA={() => {
                          setIsModalClosed(false);
                          // setTimeout(() => {
                          setShowDetailedResult(true);
                          // }, 500);
                        }}
                      /> */}

                    <PrimaryButton
                      customStyles={{
                        width: '40%',
                        height: 40,
                      }}
                      secondaryBtn
                      title={t('view_result')}
                      onPress={() => {
                        setIsModalClosed(false);
                        // setTimeout(() => {
                        setShowDetailedResult(true);
                        // }, 500);
                      }}
                    />
                  </View>

                  {/* )} */}
                </View>
              </View>
            )}

            {showDetailedResult && (
              <View
                style={{
                  borderTopWidth: 1,
                  // borderWidth: 1,
                  borderTopColor: Utills.selectedThemeColors().stroke,
                  backgroundColor: Utills.selectedThemeColors().Base,
                  flex: 0.75,
                  width: '100%',
                  paddingHorizontal: Metrix.VerticalSize(10),
                  alignSelf: 'center',
                }}>
                <View
                  style={[
                    styles.flex,
                    styles.flexRowStyles,
                    {flexDirection: 'column'},
                  ]}>
                  <View style={[styles.flexRowStyles, {width: '50%'}]}>
                    <View style={styles.resultBorder}></View>
                    <View>
                      <CustomText.RegularText
                        customStyle={{fontSize: Metrix.customFontSize(18)}}>
                        {t('result')}
                      </CustomText.RegularText>
                    </View>
                    <View style={styles.resultBorder}></View>
                  </View>
                  <CustomText.RegularText
                    customStyle={{fontSize: FontType.FontExtraLarge}}>
                    {isPassed ? 'Passed' : 'Failed'}
                  </CustomText.RegularText>
                  <View
                    style={[
                      styles.scoreViewStyle,
                      {
                        backgroundColor: isPassed ? '#337499' : '#933',
                      },
                    ]}>
                    <CustomText.ExtraLargeBoldText
                      customStyle={{
                        color: Utills.selectedThemeColors().Base,
                      }}>
                      {`${totalCorrectAnswers}/${totalQuestions}`}
                    </CustomText.ExtraLargeBoldText>
                  </View>
                  <TwoBtnView
                    btnATitle={
                      isCompleted && isPassed
                        ? t('view_answers')
                        : t('re_attempt')
                    }
                    onPressBtnA={() => {
                      if (isCompleted && isPassed) {
                        // If passOrFail > 50 and isCompleted is true, execute logic for viewing answers
                        // fetcData(quizId);
                        setIsQuizStart(true);
                        console.log('View answers');
                      } else {
                        // If passOrFail is less than or equal to 50 or isCompleted is false, execute logic for starting quiz
                        setIsQuizStart(true);
                      }
                    }}
                    // btnATitle={t('view_answers')}
                    // onPressBtnA={() => {
                    //   // fetcData(quizId);
                    //   setIsQuizStart(true);
                    //   console.log('=====>>>>>>');
                    // }}
                    btnBTitle={t('go_back')}
                    onPressBtnB={() => setIsQuizMode(false)}
                  />
                </View>
              </View>
            )}
          </>
        )}

        {isCompleted && !isModalClosed && !showDetailedResult && (
          <View
            style={{
              alignItems: 'center',
            }}>
            <PrimaryButton
              title={t('go_back')}
              secondaryBtn
              customStyles={styles.cancelBtnStyles}
              onPress={() => setIsQuizMode(false)}
            />
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  flexRowStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
    marginTop: Metrix.HorizontalSize(10),
  },
  clockVewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cancelBtnStyles: {
    height: Metrix.VerticalSize(32),
    width: '45%',
    marginVertical: 0,
  },
  roundOptionStyles: {
    borderWidth: 1,
    borderColor: Utills.selectedThemeColors().Primary,
    width: '8%',
    height: '75%',
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
    // flex: 1,
    width: '15%',
    borderBottomWidth: 2,
    borderBottomColor: Utills.selectedThemeColors().stroke,
  },
});
