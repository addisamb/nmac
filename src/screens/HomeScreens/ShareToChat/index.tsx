import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {ShareToChatProps} from '../../propTypes';
import {
  BackHeader,
  CustomInput,
  CustomText,
  MainContainer,
} from '../../../components';
import {t} from 'i18next';
import {FontType, Images, Metrix, RouteNames, Utills} from '../../../config';
import {QuizOptionComp} from '../AfterPurchaseCourseDetails/QuizAndAssigmnets/QuizComp';
import navigationService from '../../../config/navigationService';
import {useDispatch, useSelector} from 'react-redux';
import Socket from '../../../config/utills/socketUtils';
import {useIsFocused} from '@react-navigation/native';

const ShareToChat: React.FC<ShareToChatProps> = ({route, active}) => {
  const roomId = useSelector(state => state?.HomeReducer?.course_Object?._id);

  const [concatenatedMessage, setConcatenatedMessage] = useState();

  const keyboardOpen = useRef(null);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const FOCUS = useIsFocused();

  const {
    movetoCourseDetail,
    questionNumber,
    question,
    description,
    isCompleted,
    options,
    selectedOne,
    wrongOne,
    selectedOption,
  } = route.params;

  console.log('====>> route', route.params);

  const filteredOptions = options.filter(
    option =>
      (option.isCorrect && !option.isWrong) ||
      (!option.isCorrect && option.isWrong),
  );

  console.log('hfdubchic', filteredOptions);

  function onsendMsg() {
    Socket.init();

    const messageData = `${t(
      'question',
    )}: ${questionNumber}\n\n${question}\n\n${t('options')} \n\n${filteredOptions
      .map(option => {
        const highlight = option.isCorrect ? t('correct') : t('wrong');
        return `${highlight} : ${option.option}\n`;
      })
      .join('')}\n${t('reason')}: ${description}`;

    let sendMesgDataFormat = `${messageData} \n\n${concatenatedMessage} `;

    if (concatenatedMessage) {
      Socket.emitMessage({
        message: sendMesgDataFormat,
        roomID: roomId,
      });

      Socket.emitChatJoin(
        {
          roomID: roomId,
        },
        dispatch,
      );

      Socket.emitChatLeave({
        roomID: roomId,
      });
    }
  }

  return (
    <>
      <BackHeader heading={t('share_to_chat')} />
      <MainContainer>
        <View style={[styles.flexRowStyles]}>
          <CustomText.LargeBoldText
            customStyle={{fontSize: FontType.FontMedium}}>
            {`${t('question')}: ${questionNumber}`}
            {/* ${currentQuizData?.id} */}
          </CustomText.LargeBoldText>
        </View>
        <CustomText.RegularText
          customStyle={{marginVertical: Metrix.VerticalSize(20)}}>
          {question || ''}
        </CustomText.RegularText>
        <View>
          {filteredOptions.map((option, index) => (
            <QuizOptionComp
              key={option.id}
              option={option}
              isCompleted={isCompleted}
            />
          ))}
        </View>

        <View
          style={{
            // height: 165,
            borderTopWidth: 2,
            borderTopColor: Utills.selectedThemeColors().stroke,
          }}>
          <View style={styles.descViewStyle}>
            <View style={styles.resultBottomBorder} />
            <CustomText.LargeSemiBoldText
              customStyle={{
                fontSize: FontType.FontMedium,
                paddingHorizontal: 10,
              }}>
              {t('reason')}
            </CustomText.LargeSemiBoldText>
            <View style={styles.resultBottomBorder} />
          </View>
        </View>
        <View>
          <CustomText.RegularText
            style={{
              textAlign: 'center',
              // flex: 1
            }}>
            {description}
          </CustomText.RegularText>
        </View>
        <View
          style={{
            // borderWidth:1,
            alignSelf: 'center',
            bottom: 0,
            position: 'absolute',
            width: '100%',
            borderTopLeftRadius: Metrix.VerticalSize(50),
            borderTopRightRadius: Metrix.VerticalSize(50),
            backgroundColor: Utills.selectedThemeColors().Base,
            ...Metrix.createShadow,
          }}>
          <CustomInput
            value={concatenatedMessage}
            onChangeText={e => {
              setConcatenatedMessage(e);
            }}
            inputRef={keyboardOpen}
            returnKeyType={'send'}
            placeholder={t('add_comment')}
            containerStyle={{
              width: '90%',
              alignSelf: 'center',
            }}
            icon={Images.SendIcon}
            onEyePress={() => {
              // navigationService.navigate(RouteNames.HomeRoutes.QuestionChatFlow);
              onsendMsg();
              navigationService.navigate(
                RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
                {
                  movetoIndex: 1,
                  movetoCourseDetail: movetoCourseDetail,
                },
              );
            }}
            iconStyle={{marginRight: 20}}
            customStyle={{
              width: '85%',
            }}
            eye={concatenatedMessage ? true : false}
            eyeContainerStyle={{
              width: Metrix.HorizontalSize(35),
            }}
          />
        </View>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  flexRowStyles: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderWidth: 1,
  },
  descViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Metrix.VerticalSize(10),
    // borderWidth: 1,
  },
  resultBottomBorder: {
    width: '15%',
    borderBottomWidth: 2,
    borderBottomColor: Utills.selectedThemeColors().stroke,
  },
});

export default ShareToChat;
