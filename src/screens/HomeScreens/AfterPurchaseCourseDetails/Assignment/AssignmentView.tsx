import {
  Alert,
  Image,
  ImageBackground,
  Linking,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontType, Images, Metrix, NavigationService, RouteNames, Utills} from '../../../../config';
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
import {useDispatch, useSelector} from 'react-redux';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import {
  GetQuizAnswer,
  SubmitAssignment,
  getProgressReport,
} from '../../../../Redux/Action/HomeActions/homeActions';
import {useIsFocused} from '@react-navigation/native';
import navigationService from '../../../../config/navigationService';
import {QuizComp} from '../QuizAndAssigmnets/QuizComp';
import metrix from '../../../../config/metrix';
import DocumentPicker from '@react-native-documents/picker';
import axios from 'axios';
import {BASE_URL} from '../../../../APICall/constants';
import colors from '../../../../config/colors';
import utills from '../../../../config/utills';
import {MyCourses} from '../../../../Redux/Action/CourseAction/CourseAction';
import { RootState } from '../../HomeScreen';
import { showLoginPleaseModal } from '../../../../Redux/Action/AuthActions/authActions';
import { HandleNavigationAndroid, HandleNavigationIOS, getMediaIcon } from '../../../../config/utills/imagesIconHandler';

type AssignmentViewProps = {
  assignmentDetails: {};
  showBtnAndUploadOption?: Boolean;
  setIsAssignmentMode: React.Dispatch<React.SetStateAction<boolean>>;
  goBack?: () => void;
  movetoCourseDetail
};

export const AssignmentView: React.FC<AssignmentViewProps> = ({
  assignmentDetails,
  showBtnAndUploadOption,
  setIsAssignmentMode,
  goBack,
  movetoCourseDetail
}) => {
  const dispatch = useDispatch();
  const focus = useIsFocused();

  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFile_ID, setUploadedFile_ID] = useState('');
  const userData = useSelector((state: RootState) => state?.HomeReducer?.userData);
  const uploadAuthToken = useSelector((state: any) => state?.AuthReducer?.userToken);
  const course = useSelector(state => state?.HomeReducer?.course_Object);

  // console.log('++++++++', showBtnAndUploadOption);
  console.log('++++++++', assignmentDetails.media[0]);

  function renderItem(
    heading: string,
    subtext: string,
    conditionToShowImage: boolean,
  ) {
    return (
      <View style={{marginTop: Metrix.VerticalSize(8)}}>
        <CustomText.LargeBoldText customStyle={{fontSize: FontType.FontMedium}}>
          {heading}
        </CustomText.LargeBoldText>

        {!conditionToShowImage && (
          <CustomText.RegularText
            isSecondaryColor
            customStyle={{
              marginTop: Metrix.VerticalSize(15),
              fontSize: FontType.FontSmall,
            }}>
            {subtext}
            {/* {" WARN  (ADVICE) View #4205 of type RCTView has a shadow set but cannot c."} */}
          </CustomText.RegularText>
        )}

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
      </View>
    );
  }

  function PrevewFile(item) {


    // if (
    //   item?.path?.toLowerCase()?.split('.').pop() == 'mov' ||
    //   item?.path?.toLowerCase()?.split('.').pop() == 'mp4'
    // ) {
    //   NavigationService.navigate(RouteNames.HomeRoutes.VideoPlayerScreen, {
    //     name: item?.name,
    //     description: 'this is description',
    //     title: item?.name,
    //     videourl: item?.path,
    //     id: item?._id,
    //   });
    // } else {
      if (item?.path) {

      if (Platform.OS == 'android') {      

        const extension = item?.url?.path?.toLowerCase()?.split('.').pop();
        if (extension == 'vtt') {
          Linking.openURL(item?.url)
          return
        }
        
        let FormatedUrl = HandleNavigationAndroid(item?.path)
          NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen,{
          url: FormatedUrl,
          movetoCourseDetail: movetoCourseDetail,
          movetoIndex: 3,
          documentTitle: item?.name
        })
      }
      else if (Platform.OS == 'ios'){
        let FormatedUrl = HandleNavigationIOS(item?.path)
          NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen,{
          url: FormatedUrl,
          movetoCourseDetail: movetoCourseDetail,
          movetoIndex: 3,
          documentTitle: item?.name
        })
      }

    }
    // }
    return;
  }

  function renderDescription(
    heading: string,
    assignmentDetails: string,
    conditionToShowImage: boolean,
  ) {    
    return (
      <View style={{marginTop: Metrix.VerticalSize(8)}}>
        <CustomText.LargeBoldText customStyle={{fontSize: FontType.FontMedium}}>
          {heading}
        </CustomText.LargeBoldText>

        {conditionToShowImage && (
          <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: Metrix.VerticalSize(10),
            }}>
            <CustomImage
              source={getMediaIcon(assignmentDetails?.media[0]?.path)}
              customStyle={{
                width: Metrix.HorizontalSize(20),
                height: Metrix.VerticalSize(20),
                marginRight: Metrix.VerticalSize(10)
              }}
            />
            <TouchableOpacity
              onPress={()=>{ PrevewFile(assignmentDetails?.media[0]) }}
            >
            <CustomText.RegularText
              isSecondaryColor
              customStyle={{
                fontSize: FontType.FontSmall,
                color: "blue",
                textDecorationLine: "underline"
              }}>
              {assignmentDetails?.media[0].name}
            </CustomText.RegularText>
            </TouchableOpacity>
          </View>
            <CustomText.RegularText
            isSecondaryColor
            customStyle={{
              marginTop: Metrix.VerticalSize(10),
              fontSize: FontType.FontSmall,
            }}>
            {assignmentDetails?.description}
          </CustomText.RegularText>
          </>
        )}
      </View>
    );
  }

  const selectDoc = async () => {
    try {
      const result = await DocumentPicker.pick({
        // type: [DocumentPicker.types.audio,
        //   DocumentPicker.types.csv,
        //   DocumentPicker.types.doc,
        //   DocumentPicker.types.docx,
        //   DocumentPicker.types.pdf,
        //   DocumentPicker.types.ppt,
        //   DocumentPicker.types.pptx,
        //   DocumentPicker.types.video,
        //   DocumentPicker.types.xls,
        //   DocumentPicker.types.xlsx,
        //   DocumentPicker.types.zip,
        // ],
        type: [DocumentPicker.types.allFiles],
      });

      if (Array.isArray(result) && result.length > 0) {
        const doc = result[0];

        const formData = new FormData();

        formData.append('file', {
          uri: doc.uri,
          type: doc.type,
          name: doc?.uri?.split('/')?.pop(),
        });

        const url = `${BASE_URL}api/v1/`;
        const res = await axios.post(`${url}media/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${uploadAuthToken}`,
          },
        });

        let fileID = res?.data?.responseData?._id?.toString();
        setUploadedFile_ID(fileID);
        setUploadedFile(doc);
      } else {
        console.log('No document selected');
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the upload', err);
      } else {
        console.log('Error picking document', err);
      }
    }
  };

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

  const sendFile = async () => {

    if (userData?.type == 'guest') {
      // return true
      dispatch(showLoginPleaseModal(true))
      return
    }

    if (!uploadedFile) {
      // Utills.showToast(t('Please_Select_Your_Assignment_File'), '', 'error');
      Utills.showToast(t('Please Select Your Assignment File'), '', 'error');
    } else {
      try {
        if (uploadedFile && uploadedFile_ID) {
          let payload = {
            assignmentId: assignmentDetails?._id,
            attachedFiles: [uploadedFile_ID],
            comments: 'this is comment',
            status: 'submitted',
          };
          let response = await dispatch(SubmitAssignment(payload));
          if (response?.status) {
            setUploadedFile(null);
            fetchMyCourses();
            ProgressReportData();
            console.log('Submit Assignment response:', response);
          }
          setIsAssignmentMode(false);
        } else {
          console.log('No file uploaded');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <>
      {/* <ScrollView contentContainerStyle={{flexGrow: 1}}> */}
      <View style={{flex: 1}}>
        <View>
          {renderItem(t('task'), assignmentDetails?.name, false)}
          {renderDescription(
            t('description'),
            assignmentDetails,
            true
          )}
          {renderItem(t('type'), assignmentDetails?.AssignmentType, false)}
          {renderItem(
            t('duration'),
            `${assignmentDetails?.duration} ${t('Minutes')}`,
            true,
          )}
          {renderItem(
            t('due_date'),
            `${(assignmentDetails?.dueDate?.split('T')[0])}`,
            false,
          )}
        </View>

        {showBtnAndUploadOption ? (
          <View
          style={{marginTop: Metrix.VerticalSize(20)}}
          >
            <PrimaryButton onPress={goBack} title={t('go_back')} />
          </View>
        ) : (
          <View style={{marginTop: Metrix.VerticalSize(10)}}>
            <CustomText.MediumText>
              {t('upload_Document')}
            </CustomText.MediumText>
            <View
              style={[
                styles.uploadView,
                {height: 120, width: '90%', marginBottom: 20},
              ]}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={selectDoc} activeOpacity={0.6}>
                  <Image
                    style={{
                      height: 40,
                      width: 40,
                    }}
                    source={Images.UploadFiles}
                  />
                </TouchableOpacity>
                <CustomText.RegularText
                  customStyle={{marginTop: metrix.VerticalSize(10)}}
                  isSecondaryColor>
                  {uploadedFile
                    ? uploadedFile?.name
                    : t('upload_your_files_here')}
                </CustomText.RegularText>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
                // flex: 1,
              }}>
              <PrimaryButton onPress={sendFile} title={t('submit')} />
              <PrimaryButton onPress={goBack} title={t('go_back')} />
            </View>
          </View>
        )}
      </View>
      {/* </ScrollView> */}
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
  uploadView: {
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Utills.selectedThemeColors().Primary,
    borderStyle: 'dashed',
    marginTop: Metrix.VerticalSize(10),
    // marginBottom:10,
    backgroundColor: 'rgba(51, 153, 102, 0.05)',
    justifyContent: 'center',
  },
});
