import {
  BackHandler,
  Button,
  FlatList,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
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
import {SupportAgentChatProps} from '../../propTypes';
import utills from '../../../config/utills';
import React, {useEffect, useRef, useState} from 'react';
import metroConfig from '../../../../metro.config';
import {t} from 'i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../HomeScreen';
import {normalizeFont} from '../../../config/metrix';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {CommentAndReply} from '../AfterPurchaseCourseDetails/Chat';
import Socket, { SocketTypes } from '../../../config/utills/socketUtils';
import MyMessageView from './myMessageView';
import SenderView from './senderView';
import { useIsFocused } from '@react-navigation/native';
import { EmptyListChat } from '../../../components/CourseCardsHorizontalList';

type SupportAgentChatProps = {
  active: boolean;
};

export const chatData = [
  {
      id: 1,
      msg: 'Job Offer sent',
      time: '10:54 PM',
      senderId: 125,
      msgType: 'deleted'
  },
  {
      id: 2,
      msg: 'Job accepted',
      time: '10:54 PM',
      senderId: 122,
      msgType: 'reported'
  },
  {
      id: 3,
      msg: 'Refund requested',
      time: '10:54 PM',
      senderId: 125,
      msgType: 'deleted',
      line: 'underline'
  },
  {
      id: 4,
      msg: 'Hey! Look forward to meeting you Saturday night. What time were you thinking?',
      time: '10:54 PM',
      senderId: 122,
      msgType: 'reported'
  },
  {
      id: 5,
      msg: 'Hey! Look forward to meeting you Saturday night. What time were you thinking?',
      time: '10:54 PM',
      senderId: 122,
      msgType: 'reported'
  },
]



export const SupportAgentChat: React.FC<SupportAgentChatProps> = ({...props}) => {

  const { msg } = props?.route?.params

  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const inputrefrence = useRef(null);
  const FOCUS = useIsFocused()

  const userName = useSelector((state: RootState) => state?.HomeReducer?.userData?.name);
  const userId = useSelector((state: RootState) => state?.HomeReducer?.userData?._id);
  const chats = useSelector((state: RootState) => state?.HomeReducer?.joinSupportChat);
  
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [comment, setComment] = useState('');
  
  useEffect(() => {
    if (FOCUS) {
      Socket.init()   
      setTimeout(() => {
        scrollRef?.current?.scrollToEnd({animated: true});
      }, 800);

      Socket.onMessageRecieved_NewSupportAgent(onReciveMessage_Support);  
      return () => {;
        Socket.remove(SocketTypes.NEW_SUPPORT_MESSAGE, onReciveMessage_Support);
      }

    }
  }, [FOCUS]);

  useEffect(()=>{
    setTimeout(() => inputrefrence?.current?.focus() , 100)
   
    setComment(msg)
    // sendBackScreenMsg(msg)
  },[msg])

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(()=>{
    if (isKeyboardVisible) {
      scrollRef?.current?.scrollToEnd({animated: true});
    }
  },[isKeyboardVisible])


  const onReciveMessage_Support = () => {
    Socket.emitJoinSupportChat({
      userId: userId
    },
    dispatch,
    );
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({animated: true});
    }, 800);
  };


  function onsendMsg() {

    if (comment) {       
        Socket.emitSendSupportMessage({
          message: comment,
          userId: userId
        });

        setTimeout(() => {
          Socket.emitJoinSupportChat({
            userId: userId
          },
            dispatch,
          );
        }, 500);
        setTimeout(() => {
          scrollRef?.current?.scrollToEnd({animated: true});
        }, 1000);
        setComment('');
      }
  }

  // function sendBackScreenMsg(txt: string) {

  //   if (txt) {       
      
  //     setTimeout(() => {
  //       Socket.emitJoinSupportChat({
  //         userId: userId
  //       },
  //         dispatch,
  //       );
  //     }, 100);

  //       Socket.emitSendSupportMessage({
  //         message: txt,
  //         userId: userId
  //       });

  //       setTimeout(() => {
  //         Socket.emitJoinSupportChat({
  //           userId: userId
  //         },
  //           dispatch,
  //         );
  //       }, 1000);

  //       setTimeout(() => {
  //         scrollRef?.current?.scrollToEnd({animated: true});
  //       }, 1000);
  //     }
  // }


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

      <View style={{flex: 1}}>
        <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareView animated={true}>

        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{
          paddingBottom: Metrix.VerticalSize(20),
          marginHorizontal: Metrix.VerticalSize(16)
        }}
         >


          <FlatList
            data={chats?.messages}
            ListEmptyComponent={()=>
              <View style={{ alignSelf: "center", marginTop: Metrix.VerticalSize(20) }} >
              {EmptyListChat()}
              </View>

            }
            renderItem={({item, index})=>{              
              return (
                <View key={index} >
                    {item?.fromUserID == userId
                        ?
                    <MyMessageView
                      data={item} 
                    />
                      :
                    <SenderView
                      data={item} 
                    />
                    }                   
                </View>
              )
            }}
          />

        </ScrollView>

        <View
           style={{
             width: '100%',
             borderTopLeftRadius: Metrix.VerticalSize(50),
             borderTopRightRadius: Metrix.VerticalSize(50),
             backgroundColor: Utills.selectedThemeColors().Base,
             paddingBottom: Metrix.VerticalSize(5),
             ...Metrix.createShadow,
           }}>
           <CustomInput
            inputRef={inputrefrence}
            //  returnKeyType={'send'}
             placeholder={t('add_comment')}
             containerStyle={{
               width: '90%',
               alignSelf: 'center',
             }}
             customStyle={{
              width: '85%',
              // backgroundColor: "yellow"
            }}
             icon={Images.SendIcon}
             eye
             onChangeText={comment => setComment(comment)}
             value={comment}
             onEyePress={()=>{ onsendMsg() }}
      
           />
         </View>

</KeyboardAwareView>

        </SafeAreaView>
      </View>
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
    paddingVertical: Metrix.VerticalSize(15),
    paddingHorizontal: Metrix.HorizontalSize(15),
    backgroundColor: Utills.selectedThemeColors().Primary,
    // borderWidth:1
  },
  inputStyle: {
    borderWidth: 1,
  },
  directionRow: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guiderStyles: {
    // borderWidth: 1,
    height: '90%',
    width: Metrix.HorizontalSize(40),
    marginVertical: 0,
    justifyContent: 'flex-start',
    paddingHorizontal: Metrix.HorizontalSize(5),
    marginLeft: Metrix.HorizontalSize(8),
  },
  downloadFileStyle: {
    // borderWidth: 1,
    alignItems: 'center',
    marginVertical: Metrix.VerticalSize(5),
    width: '20%',
  },
  downloadImageStyle: {
    // borderWidth: 1,
    width: Metrix.HorizontalSize(20),
    height: Metrix.VerticalSize(20),
  },
  mainContainer: {
    // borderWidth: 1,
    width: '90%',
    paddingVertical: Metrix.VerticalSize(4),
  },
  sideLineStyles: {
    // borderWidth: 1,
    borderColor: Utills.selectedThemeColors().Grey,
    // height: '83%',
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    borderBottomStartRadius: 20,
    borderTopStartRadius: 20,
    // borderTopLeftRadius: 20,
    // borderTopWidth: 1,
    borderLeftWidth: 1,
    marginTop: Metrix.VerticalSize(5),
    marginBottom: Metrix.VerticalSize(70),
    // marginRight:-50
  },
  profileImageStyle: {
    alignItems: 'flex-start',
    width: '15%',
  },

  bottamModalHeadingStyle: {
    fontSize: normalizeFont(22),
    // textAlign: 'center',
  },
  bottamModalViewStyle: {
    // borderWidth:1,
    height: '8.5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginTop: Metrix.VerticalSize(5),
  },

  samllModalButtonStyle: {
    width: Metrix.HorizontalSize(121.604),
    height: Metrix.VerticalSize(32.232),
    marginTop: Metrix.VerticalSize(40),
  },
  smallModalTextStyle: {
    marginTop: Metrix.VerticalSize(5),
    color: Utills.selectedThemeColors().LightGrayTextColor,
    textDecorationLine: 'underline',
  },
  backImage: {
    width: Metrix.HorizontalSize(18),
    height: Metrix.VerticalSize(18),
    tintColor: '#000',
  },
});
