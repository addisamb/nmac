import {
  FlatList,
  Image,
  ImageProps,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Vibration,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Linking,
  I18nManager,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  AuthHeader,
  CustomImage,
  CustomInputChat,
  CustomModal,
  CustomText,
  MainContainer,
  PrimaryButton,
  RoundImageContainer,
} from '../../../../components';
import {
  Colors,
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../../config';
import {t} from 'i18next';
import {HorizontalSize, normalizeFont} from '../../../../config/metrix';
import DocumentPicker, {
  DirectoryPickerResponse,
  DocumentPickerResponse,
} from '@react-native-documents/picker';
import {select} from 'redux-saga/effects';
import {composeInitialProps} from 'react-i18next';
// import Socket, { SocketTypes } from "../../../../config/utills/socketUtils";
import io from 'socket.io-client';
import {BASE_URL} from '../../../../APICall/constants';
import {useIsFocused} from '@react-navigation/native';
import Socket, {SocketTypes} from '../../../../config/utills/socketUtils';
import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {KeyboardAwareView} from 'react-native-keyboard-aware-view';
import {StatusBar} from 'react-native';
import axios from 'axios';
import {
  downloadFileAndroid,
  downloadFileIos,
  getDownloadPermissionAndroid,
} from '../../../../config/utills/fileDownload';
import RNFetchBlob from 'react-native-blob-util';
import {
  GetProfileData,
  submitCoin,
  updateProfile,
} from '../../../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import {RootState} from '../../HomeScreen';
import {EmptyListChat} from '../../../../components/CourseCardsHorizontalList';
import { HandleNavigationAndroid, HandleNavigationIOS } from '../../../../config/utills/imagesIconHandler';
import { showLoginPleaseModal } from '../../../../Redux/Action/AuthActions/authActions';
import Linkify from 'react-native-linkify';

type ChatProps = {
  active: boolean;
  movetoCourseDetail: boolean,
};

type CommentDataTypes = {
  id?: string;
  profileImage?: ImageProps['source'];
  userName: string;
  message: string;
  isGuider?: boolean;
  role?: string;
  onPress?: () => void;
  onPressReply?: () => void;
  senderDetail?: {
    name?: string;
  };
  replyer?: {
    id?: string;
    profileImage?: ImageProps['source'];
    userName: string;
    message: string;
    isGuider?: boolean;
    role?: string;
  }[];
};

type CommentAndReplyContentTypes = {
  userDetails: CommentDataTypes;
  isReply?: boolean;
  children?: React.ReactNode;
  customContainerStyles?: ViewStyle;
  onPress?: () => void;
  onPressReply?: () => void;
};

const CommentAndReplyContent: React.FC<CommentAndReplyContentTypes> = ({
  userDetails,
  isReply,
  children,
  customContainerStyles,
  onPressReply,
  movetoCourseDetail
}) => {
  const {userName, isGuider, role, profileImage, message, senderDetail, media} =
    userDetails;

  function PrevewDocument(data) {
    if (Platform.OS === 'android') {
      getDownloadPermissionAndroid().then(granted => {
        if (granted) {
          downloadFileAndroid(data[0]?.path);
        }
      });
    } else {
      downloadFileIos(data[0]?.path).then(res => {
        RNFetchBlob.ios.previewDocument(res.path());
      });
    }
  }


  function PrevewDocumentWebView(data) {
    let path = data[0]?.path

    if (Platform.OS == 'android') {
      let FormatedUrl = HandleNavigationAndroid(path)
        NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen,{
        url: FormatedUrl,
        movetoCourseDetail: movetoCourseDetail,
        movetoIndex: 1,
        documentTitle: data[0]?.name
      })
    }
    else if (Platform.OS == 'ios'){
      let FormatedUrl = HandleNavigationIOS(path)
        NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen,{
        url: FormatedUrl,
        movetoCourseDetail: movetoCourseDetail,
        movetoIndex: 1,
        documentTitle: data[0]?.name
      })
    }
  }

  

  return (
    <View
      style={[
        {
          // borderWidth: 1,
          width: '85%',
        },
        customContainerStyles,
      ]}>
      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: Metrix.VerticalSize(5),
          }}>
          <CustomText.LargeBoldText
            customStyle={{
              fontSize: FontType.FontSmall,
              color: Utills.selectedThemeColors().Primary,
            }}>
            {senderDetail?.name}
          </CustomText.LargeBoldText>
          {senderDetail?.role === 'Guider' && (
            <PrimaryButton
              title={t('guider')}
              customStyles={styles.guiderStyles}
              textStyles={{fontSize: FontType.FontExtraSmall}}
            />
          )}
        </View>
        <Linkify linkStyle={ { color: 'blue' } } linkDefault={ true }>
        <CustomText.SmallText>{message}</CustomText.SmallText>
        </Linkify>
        {media.length ? (
          <>
          <View
          style={{
            // borderWidth:1,
            flexDirection:"row",
            width:190
          }}
          >
            <TouchableOpacity
            onPress={() => {
              PrevewDocumentWebView(media);
            }}
              activeOpacity={0.7}
              style={[styles.directionRow, styles.downloadFileStyle]}>
              <CustomImage
                source={Images.ReadDown}
                customStyle={styles.downloadImageStyle}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                PrevewDocument(media);
              }}
              activeOpacity={0.7}
              style={[styles.directionRow, styles.downloadFileStyle]}>
              {/* <CustomImage
              source={Images.ReadDown}
              customStyle={styles.downloadImageStyle}
            /> */}
              <CustomImage
                source={Images.DownloadIcon}
                customStyle={styles.downloadImageStyle}
              />
            </TouchableOpacity>
            </View>
          </>
        ) : null}
        {!isReply && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              onPressReply(userDetails);
            }}>
            <CustomText.SmallText isSecondaryColor>
              {t('reply')}
            </CustomText.SmallText>
          </TouchableOpacity>
        )}
      </View>
      {children}
    </View>
  );
};

export const CommentAndReply: React.FC<{
  commentarUserDetails: CommentDataTypes;
}> = ({commentarUserDetails, onPressReply, movetoCourseDetail}) => {
  const roomId = useSelector(state => state?.HomeReducer?.course_Object?._id);
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const dispatch = useDispatch();

  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [sendCoinUserData, setsendCoinUserData] = useState({
    toUserId: '',
    chatId: '',
    name: '',
    media: [],
  });
  const {senderDetail, repliesData, media} = commentarUserDetails;

  async function donateCoin() {

    if (userData?.type == 'guest') {
      // return true
      dispatch(showLoginPleaseModal(true))
      return
    }

    setModalPostVisible(false);
    let payload = {
      coins: 1,
      courseId: roomId, //chat join id
      toUserId: sendCoinUserData.toUserId, //fromUserID
      chatId: sendCoinUserData.chatId, //har user ki id
      type: 'Chat',
    };

    
    let res = await dispatch(submitCoin(payload));


    if (res.status) {
      Socket.emitdDonateToUser(
        {
          roomID: roomId,
          notify: true,
          receiverUserId: sendCoinUserData.toUserId
        }
      );      
    }
  }

  function SaveUserId(item) {
    // console.log(item);
    if (
      item?.fromUserID === userData?._id ||
      item?.senderDetail?.type === 'Teacher'
    ) {
      return; // Prevent sending coins to oneself or teachers
    } else {
      setsendCoinUserData({
        chatId: item?._id,
        toUserId: item?.fromUserID,
        media: item.senderDetail.profilePic,
        name: item.senderDetail.name,
      });
      setModalPostVisible(true); // Open modal for other cases
    }
  }

  function Rendermodal() {
    return (
      <CustomModal
        onClose={() => {
          setModalPostVisible(false);
          // console.log("run");
        }}
        bottomModal
        bottomContainerStyles={{
          marginTop: Metrix.VerticalSize(0),
          height: '80%',
          top: '42%',
        }}
        visible={modalPostVisible}>
        <MainContainer>
          <View style={styles.bottamModalViewStyle}>
            <CustomText.LargeBoldText
              customStyle={styles.bottamModalHeadingStyle}>
              {t('promote_this_user')}
            </CustomText.LargeBoldText>
            <CustomText.RegularText
              customStyle={{
                fontSize: normalizeFont(11),
                color: Utills.selectedThemeColors().LightGrayTextColor,
              }}>
              {t('desc')}
            </CustomText.RegularText>
          </View>
          <View
            style={{
              // borderWidth:1,
              alignItems: 'center',
            }}>
            <Image
              style={{
                height: Metrix.VerticalSize(106),
                width: Metrix.HorizontalSize(112),
                marginTop: Metrix.VerticalSize(15),
              }}
              source={Images.StaeLike}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(20),
            }}>
            <View
              style={{
                // borderWidth: 1,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  paddingRight: Metrix.HorizontalSize(5),
                }}>
                <CustomImage
                  customStyle={{borderRadius: 100}}
                  source={
                    sendCoinUserData?.media == undefined
                      ? Images.user2
                      : {uri: sendCoinUserData?.media}
                  }
                />
              </View>
              <View
                style={{
                  // borderWidth: 1,
                  justifyContent: 'center',
                }}>
                <CustomText.LargeBoldText
                  customStyle={{
                    fontSize: FontType.FontMedium,
                  }}>
                  {sendCoinUserData.name}
                </CustomText.LargeBoldText>
              </View>
              <View>
                <Image source={Images.FallingStar} />
              </View>
            </View>
            <PrimaryButton
              onPress={() => {
                donateCoin();
              }}
              customStyles={{
                marginTop: Metrix.VerticalSize(100),
              }}
              title={t('rewards_now')}
            />
          </View>
        </MainContainer>
      </CustomModal>
    );
  }

  return (
    <>
      <View style={{flexDirection: 'row'}}>
        <View style={[styles.directionRow, styles.mainContainer]}>
          <View
            style={{
              // borderWidth:1,
              width: '100%',
              justifyContent: 'space-between',
              marginLeft:
                Platform.OS === 'ios' && I18nManager.forceRTL ? 25 : 0,
            }}>
            <View
              style={[
                styles.directionRow,
                {
                  // borderWidth:1,
                  width: '100%',
                },
              ]}>
              <TouchableOpacity
                // style={{ backgroundColor: "blue" }}
                activeOpacity={0.7}>
                {repliesData.length ? (
                <TouchableOpacity
                onPress={() => {
                  SaveUserId(commentarUserDetails);
                }}
                // style={{ backgroundColor: "red" }}
                >
                  <RoundImageContainer
                    source={
                      senderDetail?.profilePic
                        ? {uri: senderDetail?.profilePic}
                        : Images.user2
                    }
                    circleWidth={35}
                    customContainerStyle={{
                      // borderWidth: 1,
                      ...styles.profileImageStyle,
                      width: '100%',
                    }}
                  />
                </TouchableOpacity>
                ) : (
                <TouchableOpacity
                onPress={() => {
                  SaveUserId(commentarUserDetails);
                }}
                  // style={{ backgroundColor: "yellow" }}
                  >
                  <RoundImageContainer
                    source={
                      senderDetail?.profilePic
                        ? {uri: senderDetail?.profilePic}
                        : Images.user2
                    }
                    circleWidth={35}
                    customContainerStyle={{
                      // borderWidth: 1,
                      ...styles.profileImageStyle,
                      width: '100%',
                    }}
                  />
                </TouchableOpacity>
                )}
                {repliesData.length ? (
                  <View style={styles.sideLineStyles} />
                ) : null}
              </TouchableOpacity>

              <CommentAndReplyContent
                movetoCourseDetail={movetoCourseDetail}
                onPressReply={onPressReply}
                userDetails={commentarUserDetails}>
                <FlatList
                  data={repliesData}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View
                      // onPress={() => {
                      //   SaveUserId(commentarUserDetails?.repliesData[index]);
                      // }}
                      // activeOpacity={0.7}
                      style={[
                        styles.directionRow,
                        {
                          // backgroundColor: "red" ,
                          marginVertical: Metrix.VerticalSize(13)
                        },
                      ]}>
                        <TouchableOpacity onPress={()=>( SaveUserId(commentarUserDetails?.repliesData[index]) ) } >
                      <RoundImageContainer
                        source={
                          item?.senderDetail?.profilePic
                          ? {uri: item?.senderDetail?.profilePic}
                          : Images.user2
                        }
                        circleWidth={30}
                        customContainerStyle={styles.profileImageStyle}
                        />
                        </TouchableOpacity>
                      <CommentAndReplyContent
                        isReply
                        userDetails={item}
                        imgIndex={index}
                      />
                    </View>
                  )}
                />
              </CommentAndReplyContent>
            </View>
          </View>
        </View>
      </View>

      {Rendermodal()}
    </>
  );
};

export const Chat: React.FC<ChatProps> = (route) => {
  
  const chatsMsgData = useSelector(state => state?.HomeReducer?.chatsMsg);
  const roomId = useSelector(state => state?.HomeReducer?.course_Object?._id);

  const scrollRef = useRef(null);
  const focus = useIsFocused();
  const dispatch = useDispatch();
  const keyboardOpen = useRef(null);

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  // const [showSheet, setshowSheet] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [comment, setComment] = useState('');
  const [reply, setreply] = useState({
    showmsg: false,
    showDocument: false,
    msg: '',
    id: '',
  });
  


  async function getMyData() {
    let res = await dispatch(GetProfileData());

    if (res?.status) {
      dispatch({
        type: ActionType.GET_ME_DATA,
        payload: res?.responseData,
      });
    }
  }


  function joinChattoGetData() {
    Socket.emitChatJoin(
      {
        roomID: roomId,
      },
      dispatch,
    );
    setTimeout(() => {
      scrollRef?.current?.scrollToEnd({animated: true});
    }, 700);
  }

  const onReciveMessage_Comment = () => {
    joinChattoGetData();
  };

  const onReciveMessage_Nested = () => {
    joinChattoGetData();
  };

  const notify_meOnBonus_OpenModal = () => {
    setModalVisible(true)
  };
  

  useEffect(() => {
    Socket.init();
      joinChattoGetData();

      Socket.onMessageRecieved_NewComment(onReciveMessage_Comment);
      Socket.onMessageRecieved_NestedComment(onReciveMessage_Nested);
      Socket.onMessage_OpenModal(notify_meOnBonus_OpenModal);

      return () => {
        Socket.remove(SocketTypes.NEW_COMMENT, onReciveMessage_Comment);
        Socket.remove(SocketTypes.NEW_REPLY, onReciveMessage_Nested);
        Socket.remove(SocketTypes.NOTIFY_ME, notify_meOnBonus_OpenModal);
      };
    
  }, []);

  useEffect(() => {
    if (isKeyboardVisible) {
      setTimeout(() => {
        scrollRef?.current?.scrollToEnd({animated: true});
      }, 1000);
    }
  }, [isKeyboardVisible]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  function sendFile() {
    if (reply.showDocument) {
      // setreply({...reply, showDocument: true, msg: name, id: ''});

      let id = reply?.id.toString();
      const response = {
        mediaIDs: [id],
      };

      Socket.emitMessage({
        message: reply.msg,
        roomID: roomId,
        mediaIDs: response?.mediaIDs,
      });

      Socket.emitChatJoin(
        {
          roomID: roomId,
        },
        dispatch,
      );
      // setComment('');
      setreply({
        ...reply,
        showDocument: false,
        showmsg: false,
        msg: '',
        id: '',
      });
      setTimeout(() => {
        scrollRef?.current?.scrollToEnd({animated: true});
      }, 1000);
      console.log('done');
    }
  }

  const selectDoc = async () => {
    try {
      const result = await DocumentPicker.pick({
        // type: DocumentPicker.types.pdf,
      });

      if (Array.isArray(result) && result.length > 0) {
        const doc = result[0]; // Assuming you want the first document in the array

        console.log(doc);

        console.log(doc.uri, 'uri');
        console.log(doc.type, 'format');
        console.log(doc.name, 'file name');

        // return;
        const formData = new FormData();
        formData.append('file', {
          uri: doc?.uri,
          type: doc?.type,
          name: doc?.name,
        });

        const url = `${BASE_URL}api/v1/media/upload`;
        // const res = await axios.post(`${url}media/upload`, formData);

        const res = await axios({
          method: 'post',
          url: url,
          data: formData,
          headers: {'Content-Type': 'multipart/form-data'},
        });

        setreply({
          ...reply,
          showDocument: true,
          msg: doc?.name,
          id: res.data.responseData._id.toString(),
        });
      } else {
        console.log('No document selected');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err))
        console.log('User cancelled the upload', err);
      else console.log('===>', err);
    }
  };

  function replyComnt(userDetails: object) {
    Vibration.vibrate(100);
    keyboardOpen?.current?.focus();
    setreply({
      ...reply,
      showmsg: true,
      showDocument: false,
      msg: userDetails?.message,
      id: userDetails?._id,
    });
    return;
  }

  function onsendMsg() {
    if (reply.showmsg) {
      if (comment) {
        Socket.emitNestedComnt({
          message: comment,
          roomID: roomId,
          commentID: reply?.id,
        });
      }

      Socket.emitChatJoin(
        {
          roomID: roomId,
        },
        dispatch,
      );
      setComment('');
      setreply({...reply, showmsg: false, msg: '', id: ''});
    } else {
      if (comment) {
        if (reply.showDocument) {
          const response = {
            mediaIDs: [reply.id],
          };

          Socket.emitMessage({
            message: `${reply.msg} ${'\n'}${comment}`,
            roomID: roomId,
            mediaIDs: response?.mediaIDs,
          });
        } else if (!reply.showDocument) {
          Socket.emitMessage({
            message: comment,
            roomID: roomId,
          });
        }
      }

      Socket.emitChatJoin(
        {
          roomID: roomId,
        },
        dispatch,
      );
      setComment('');
      setreply({
        ...reply,
        showmsg: false,
        showDocument: false,
        msg: '',
        id: '',
      });
      setTimeout(() => {
        scrollRef?.current?.scrollToEnd({animated: true});
      }, 1000);
    }
  }

  function RenderModalAchievement() {
    return (
      <CustomModal
        onClose={() => {
          setModalVisible(false);
        }}
        smallModal
        smallContainerStyles={{
          height: '35%',
        }}
        visible={modalVisible}>
        <View>
          <CustomText.LargeBoldText
            customStyle={{
              textAlign: 'center',
              fontSize: normalizeFont(22),
              color: Utills.selectedThemeColors().Primary,
            }}>
            {t('congrats')}
          </CustomText.LargeBoldText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(15),
          }}>
          <Image
            style={{
              height: Metrix.VerticalSize(52),
              width: Metrix.HorizontalSize(45),
            }}
            source={Images.StarBadge}
          />
          <CustomText.RegularText style={styles.smallModalTextStyle}>
            {t('bonus_point')}
          </CustomText.RegularText>
        </View>
        <PrimaryButton
          onPress={() => {
            setModalVisible(false);
            getMyData()
          }}
          customStyles={styles.samllModalButtonStyle}
          title={t('ok')}
        />
      </CustomModal>
    );
  }

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAwareView
          animated={true}
          doNotForceDismissKeyboardWhenLayoutChanges={true}
          keyboardShouldPersistTaps={'always'}
          scrollEnabled={true}>
          {/* <ScrollView    keyboardShouldPersistTaps={'handled'}     scrollEnabled={true} > */}

          {/* <TouchableOpacity onPress={()=>{ FileDownloadExample() }} >
        <Text>sadsaddssasad</Text>
      </TouchableOpacity> */}

          {/* console.log(); */}
          <FlatList
            ref={scrollRef}
            // onScroll={(e)=>console.log("onScroll--->",e.nativeEvent.contentOffset)}
            data={chatsMsgData}
            ListEmptyComponent={EmptyListChat}
            // ListFooterComponent={<View style={{ height: 50 }} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={{
              marginHorizontal: Metrix.HorizontalSize(20),
            }}
            renderItem={({item, index}) => (
              <CommentAndReply
                movetoCourseDetail={route?.movetoCourseDetail}
                onPressReply={replyComnt}
                commentarUserDetails={item}
              />
            )}
          />

          {/* </ScrollView> */}

          <View
            style={{
              // borderWidth: 1,
              // position: 'absolute',
              // bottom: 0,
              width: '100%',
              borderTopLeftRadius: Metrix.VerticalSize(50),
              borderTopRightRadius: Metrix.VerticalSize(50),
              backgroundColor: Utills.selectedThemeColors().Base,
              paddingBottom: Metrix.VerticalSize(5),
              ...Metrix.createShadow,
            }}>
            {reply.showmsg && (
              <View style={[styles.pickDocContainer, {height: 20}]}>
                <Text
                  style={styles.pickDocTxt}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {reply?.msg}
                </Text>
                <TouchableOpacity
                  style={{width: 30}}
                  onPress={() => {
                    setreply({...reply, showmsg: false, msg: '', id: ''});
                  }}>
                  <CustomImage
                    source={Images.Cross}
                    customStyle={[
                      styles.backImage,
                      {
                        borderRadius: 100,
                        borderWidth: 0.2,
                        borderColor: '#000',
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            )}

            {reply.showDocument && (
              <View style={[styles.pickDocContainer, {height: 40}]}>
                <Text
                  style={styles.pickDocTxt}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {reply?.msg}
                </Text>

                <View style={{width: 70, flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{width: 35}}
                    onPress={() => {
                      setreply({
                        ...reply,
                        showDocument: false,
                        showmsg: false,
                        msg: '',
                        id: '',
                      });
                    }}>
                    <CustomImage
                      source={Images.Cross}
                      customStyle={[
                        styles.backImage,
                        {
                          borderRadius: 100,
                          borderWidth: 0.2,
                          borderColor: Colors.Primary,
                        },
                      ]}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{width: 35}}
                    onPress={() => {
                      sendFile();
                    }}>
                    <CustomImage
                      source={Images.SendIcon}
                      customStyle={[
                        styles.sendImage,
                        {
                          // borderRadius: 100,
                          resizeMode: 'contain',
                        },
                      ]}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}

            <CustomInputChat
              inputRef={keyboardOpen}
              returnKeyType={'send'}
              // submit={onsendMsg}
              placeholder={t('add_comment')}
              containerStyle={{
                width: '90%',
                alignSelf: 'center',
              }}
              onAddFile={selectDoc}
              onEyePress={onsendMsg}
              icon={Images.SendIcon}
              value={comment}
              // resizeMode: 'contain'

              customStyle={[
                {
                  width: '75%',
                },
              ]}
              onChangeText={comment => setComment(comment)}
              addfiles={reply?.showmsg ? false : true}
              eye={comment ? true : false}
              eyeContainerStyle={{
                width: '25%'
              }}
            />
          </View>
        </KeyboardAwareView>
        {RenderModalAchievement()}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  directionRow: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  guiderStyles: {
    // borderWidth: 1,
    height: '90%',
    width: Metrix.HorizontalSize(50),
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
    width: Metrix.HorizontalSize(28),
    height: Metrix.VerticalSize(28),
  },
  mainContainer: {
    // borderWidth: 1,
    width: '90%',
    paddingVertical: Metrix.VerticalSize(4),
  },
  sideLineStyles: {
    // borderWidth: 1,
    borderColor: Utills.selectedThemeColors().Grey,
    // backgroundColor: "red",
    // height: '83%',
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    borderBottomStartRadius: 15,
    borderTopStartRadius: 15,
    // borderTopLeftRadius: 20,
    // borderTopWidth: 1,
    borderLeftWidth: 1,
    marginTop: Metrix.VerticalSize(5),
    marginBottom: Metrix.VerticalSize(20),
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
    tintColor: Colors.Primary,
  },
  sendImage: {
    width: Metrix.HorizontalSize(20),
    height: Metrix.VerticalSize(20),
    tintColor: Colors.Primary,
  },
  pickDocContainer: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: 20,
    ...Metrix.createShadow,
    borderWidth: 0.3,
    borderColor: Colors.Grey,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  pickDocTxt: {
    fontSize: 12,
    color: Colors.Danger,
    width: 200,
  },
});
