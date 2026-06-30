import {
  Alert,
  BackHandler,
  Button,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  TextInput,
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
import {SupportAgentProps} from '../../propTypes';
import utills from '../../../config/utills';
import {useEffect, useRef, useState} from 'react';
import metroConfig from '../../../../metro.config';
import {t} from 'i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Socket from '../../../config/utills/socketUtils';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {RootState} from '../HomeScreen';
import ActionType from '../../../Redux/Action/ActionType/actionType';

export const SupportAgent: React.FC<SupportAgentProps> = ({}) => {
  const userName = useSelector(
    (state: RootState) => state?.HomeReducer?.userData?.name,
  );
  const userId = useSelector(state => state?.HomeReducer?.userData?._id);
  const chats = useSelector((state: RootState) => state?.HomeReducer?.joinSupportChat);  

  const Focus = useIsFocused();
  const dispatch = useDispatch();
  let messageRef = useRef<TextInput>(null!);

  const [loader, setloader] = useState(false);
  const [loaderSeeAnswer, setloaderSeeAnswer] = useState(false);
  const [sendMessage, setSendMessage] = useState('');
  const [sendMessagesub, setSendMessagesub] = useState('');


  const ChipData = [
    {
      text: t('my_courses_not_showing'),
    },
    {
      text: t('i_have_a_question'),
    },
    {
      text: t('i_need_help_regarding_my_payment'),
    },
    {
      text: t('i_have_a_suggestion'),
    },
  ];

  function seeAnswers() {
    try {
      Socket.init()  
      setloaderSeeAnswer(true)
        Socket.emitJoinSupportChat({
          userId: userId
        },
        dispatch,
        );
    } 
    finally {
      setTimeout(() => {
        setloaderSeeAnswer(false)
        NavigationService.navigate(RouteNames.HomeRoutes.SupportAgentChat,{
          msg: ""
        });  
      },1000)
    }
  }
  

  const onsendMsg = () => {
    if (sendMessagesub == '') {
      Alert.alert("Please Enter Subject")
    }
    else if (sendMessage == '') {
      Alert.alert("Please Enter Message")
    }
    else{
        setloader(true)
        Socket.init()  
          Socket.emitJoinSupportChat({
            userId: userId
          },
          dispatch,
          );

        // Socket.init()      
        // Socket.emitSendSupportMessage({
          //   message: sendMessage,
          //   userId: userId
          // });
          // setTimeout(() => {
            //   Socket.emitJoinSupportChat({
              //     userId: userId
              //   },
              //   dispatch,
              //   );
              // }, 500);
        setTimeout(() => {
          
          NavigationService.navigate(RouteNames.HomeRoutes.SupportAgentChat,{
            msg: `${sendMessagesub} ${'\n'}${sendMessage}`
          });
          setSendMessage('');
          setSendMessagesub('');
          setloader(false)

        }, 1500);
      } 
  };

  function selectedChip(option) {
    setSendMessagesub(option.text)    
  }

  return (
    <>
      <BackHeader heading={t('support_agent')} />
      <View style={styles.viewStyle}>
        <CustomText.LargeBoldText
          customStyle={{
            fontSize: FontType.FontLarge,
            color: Utills.selectedThemeColors().Base,
            marginBottom: Metrix.VerticalSize(10),
          }}>
          {`${t('hi_user')} ${userName}`}
        </CustomText.LargeBoldText>
      </View>

      <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      extraScrollHeight={50}
      >
        <MainContainer>
          <View>
            <View>
              <CustomText.LargeBoldText
                customStyle={{
                  textAlign: 'center',
                  fontSize: FontType.FontRegular,
                }}>
                {t('how_can_we_help_you')}
              </CustomText.LargeBoldText>
            </View>

            <View
              style={{
                // borderWidth: 1,
                marginTop: 20,
                flexDirection: 'row',
                flexWrap: 'wrap',
                width: '100%',
              }}>
              {ChipData.map((option, index) => (
                <ChipButtonComponent onPress={()=>{selectedChip(option)}} key={index} text={option.text} />
              ))}
            </View>

            <View>
              <CustomText.LargeBoldText
                customStyle={{
                  textAlign: 'center',
                  fontSize: FontType.FontRegular,
                  marginVertical: Metrix.VerticalSize(15),
                }}>
                {t('start_conversation')}
              </CustomText.LargeBoldText>
              <CustomInput
                heading={t('subject')}
                placeholder={t('enter_objective')}
                customtextContainerStyle={styles.inputStyle}
                returnKeyType="next"
                value={sendMessagesub}
                customStyle={{
                  width: '100%',
                  // backgroundColor: "yellow"
                }}
                onChangeText={(e)=> setSendMessagesub(e) }
                onSubmitEditing={() => messageRef.current.focus()}
              />
              <CustomInput
                multiline
                // submit={onsendMsg}
                customtextContainerStyle={{
                  height: Metrix.VerticalSize(100),
                  borderRadius: Metrix.HorizontalSize(20),
                  ...styles.inputStyle,
                }}
                value={sendMessage}
                onChangeText={(e)=>{ setSendMessage(e) }}
                customStyle={{
                  marginTop: Metrix.VerticalSize(10),
                  width: '100%',
                  // backgroundColor: "yellow"
                }}
                heading={t('message')}
                placeholder={t('message_here')}
                // returnKeyType="done"
                inputRef={messageRef}
              />

              <PrimaryButton
                isLoading={loader}
                onPress={onsendMsg}
                customStyles={{
                  marginTop: Metrix.VerticalSize(15),
                  alignSelf: 'center',
                  width: '90%',
                }}
                title={t('send')}
              />

              <PrimaryButton
                isLoading={loaderSeeAnswer}
                onPress={seeAnswers}
                customStyles={{
                  marginTop: Metrix.VerticalSize(15),
                  alignSelf: 'center',
                  width: '90%',
                }}
                title={t('see_answers')}
              />
            </View>
          </View>
        </MainContainer>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  btnImageStyle: {
    width: Metrix.HorizontalSize(24),
    height: Metrix.HorizontalSize(24),
    tintColor: utills.selectedThemeColors().Base,
  },
  headerCustomStyle: {
    backgroundColor: Utills.selectedThemeColors().Primary,
    paddingHorizontal: Metrix.HorizontalSize(10),
    paddingTop: Metrix.VerticalSize(45),
    alignItems: 'center',
  },
  viewStyle: {
    // height: Metrix.VerticalSize(60),
    // paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(15),
    backgroundColor: Utills.selectedThemeColors().Primary,
    // borderWidth:1
  },
  inputStyle: {
    borderWidth: 1,
    // backgroundColor: "red"
  },
});
function alert(arg0: string) {
  throw new Error('Function not implemented.');
}
