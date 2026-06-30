import {Dimensions, FlatList, I18nManager, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  CustomImage,
  CustomText,
  FadeContainer,
  MainContainer,
  PrimaryButton,
  RoundBorderCardComponent,
} from '../../../../components';
import {Images, Metrix, Utills} from '../../../../config';
import {useDispatch, useSelector} from 'react-redux';
import {
  GetAssiignment,
  GetAssiignmentWithoutLoader,
  QuizAndAssignmentData,
  SpecificAssignment,
  SpecificAssignmentScore,
  SpecificQuiz,
} from '../../../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../../../Redux/Action/ActionType/actionType';
import {number} from 'yup';
import {AssignmentView} from './AssignmentView';
import { t } from 'i18next';
import { ScrollView } from 'react-native';
import { RootState } from '../../HomeScreen';

// ... (import statements and other code)

type AssigmnetsProps = {};

const deviceWidth: number = Dimensions.get('window').width; //device width

export const Assigmnets: React.FC<AssigmnetsProps> = (route) => {
  const AssignmentData = useSelector(state => state?.HomeReducer?.assignmentdata);
  const userData = useSelector((state: RootState) => state?.HomeReducer?.userData);
  const course = useSelector(state => state?.HomeReducer?.course_Object);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [isAssignmentMode, setIsAssignmentMode] = useState(false);
  const [isAssignmentDetials, setIsAssignmentDetials] = useState({});
  const [showMarks, setshowMarks] = useState({
    status: false,
    marks: '',
    statusResult: ''
  });

  async function getSpecificAssiignmentDetail(id) {
    let res = await dispatch(SpecificAssignment(id));
    let data = res?.data
    if (res?.status) {
      setIsAssignmentDetials(data);
    }
  }

  async function getSpecificAssiignmentScore(id) {
    let res = await dispatch(SpecificAssignmentScore(id));
    if (res?.status) {
      setshowMarks({...showMarks, status: res?.status, marks: res?.data?.marks, statusResult: res?.data?.status });
    }
    else{
      setshowMarks({...showMarks, status: false });
    }
  }

  async function GetAssignmentDetail(id) {

    if (userData?.type == 'guest') {
      // return true
      dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
      return
    }

    try {
      dispatch({type: ActionType.HOME_LOADER, payload: true});
      const promise1 =  getSpecificAssiignmentDetail(id);
      const promise2 = getSpecificAssiignmentScore(id);;
      await Promise.all([promise1, promise2]).then(() => {
        setTimeout(() => {
          setIsAssignmentMode(true);
        }, 1000);
      });
    } catch (error) {
      console.error('An error occurred:', error);
      dispatch({type: ActionType.HOME_LOADER, payload: false});
    } finally{
      dispatch({type: ActionType.HOME_LOADER, payload: false});
    }
  }

  function HandleGoBack() {
    setIsAssignmentMode(false)    
  }


  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getAssignment()
  }, []);

  async function getAssignment() {
    let res = await dispatch(GetAssiignmentWithoutLoader(course?._id));

    if (res?.status) {
      dispatch({
        type: ActionType.ASSIGNMENT_DATA,
        payload: res?.data,
      });
    }
    setRefreshing(false);
  }

  return (
    <MainContainer isFlatList>
      {isAssignmentMode ? (
        <FadeContainer>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: Metrix.VerticalSize(30) }} 
        >

          <View style={{ flexDirection: "row", justifyContent: "space-between", marginRight: 10 }} >

          {showMarks?.status ? 
          <>
            {showMarks?.statusResult == 'submitted' ?
            <CustomText.RegularText
            >
              {t("teacher_not_assign_your_marks")}
            </CustomText.RegularText>
              :            
            <CustomText.MediumText>
                {t("obtain_marks")}: {showMarks?.marks}
            </CustomText.MediumText>
            } 
          </>
            : 
            <CustomText.SmallText>
               {t('Assignment_not_submitted')}
            </CustomText.SmallText>
          }
          {/* <PrimaryButton onPress={goBack} title={t('go_back')} /> */}
          </View>          

          <AssignmentView
            showBtnAndUploadOption={showMarks?.status}
            assignmentDetails={isAssignmentDetials}
            setIsAssignmentMode={setIsAssignmentMode}
            goBack={HandleGoBack}
            movetoCourseDetail={route?.movetoCourseDetail}
          />
                 
        </ScrollView>
        </FadeContainer>
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={AssignmentData}
          ListEmptyComponent={<Text style={{ textAlign: "center", marginTop: 20, color: "#000" }} >{t('No Result Founds')}</Text>}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <RoundBorderCardComponent
              touchableOpacityCustomStyle={{
                alignItems: 'flex-start'
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
              subtext={item?.description}
           
              duration={item?.duration}
              image={
                item?.type === 'Assignment'
                  ? Images.AssignmentIcon
                  : Images.QuizIcon
              }
              customTextContainerStyle={{
                width: deviceWidth - Metrix.HorizontalSize(130)
              }}
              onPress={() => {
                GetAssignmentDetail(item?._id)
              }}
            />
          )}
        />
      )}
    </MainContainer>
  );
};
 
const styles = StyleSheet.create({
  backImage: {
    transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
    width: Metrix.HorizontalSize(18),
    height: Metrix.VerticalSize(18),
    tintColor: '#000',
    marginBottom: Metrix.HorizontalSize(10)
  },
     

});