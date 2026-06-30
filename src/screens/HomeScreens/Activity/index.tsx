import {
  FlatList,
  I18nManager,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ActivityProps} from '../../propTypes';
import {
  BackHeader,
  CategoryBtnsList,
  CustomText,
  MainContainer,
  RoundBorderCardComponent,
} from '../../../components';
import {t} from 'i18next';
import {FontType, Fonts, Images, Metrix, NavigationService, RouteNames, Utills} from '../../../config';
import {HorizontalSize} from '../../../config/metrix';
import {Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {GetAssiignment, QuizAndAssignmentData, course_ObjectData, getBonusMaterial, getCourseDetailsWithoutLoder, getNotification, getProgressReport} from '../../../Redux/Action/HomeActions/homeActions';
import {NotificationTypes} from '../../../config/utills/notification';
import utills from '../../../config/utills';
import {useIsFocused} from '@react-navigation/native';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import {RootState} from '../HomeScreen';
import {EmptyListComponent} from '../../../components/CourseCardsHorizontalList';
import { MyCourses } from '../../../Redux/Action/CourseAction/CourseAction';
import { Alert } from 'react-native';

type Notification_Object_Type = {
  __v: number;
  _id: string;
  createdAt: string;
  message: string;
  type: string;
  updatedAt: string;
  userId: string;
};

export const Activity: React.FC<ActivityProps> = ({}) => {
  const reduxNotificationData = useSelector(
    (state: RootState) => state?.HomeReducer?.notifications,
  );
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  console.log(typeof reduxNotificationData);
  // console.log('notifications============', reduxNotificationData);

  const dispatch = useDispatch();
  const FOCUS = useIsFocused();

  // const [notification, setnotification] = useState<Notification_Object_Type[]>(
  //   [],
  // );
  const [refreshing, setRefreshing] = useState(false);
  const [notification, setnotification] = useState<Notification_Object_Type[]>(
    reduxNotificationData,
  );
  const [categoryId, setcategoryId] = useState('');

  useEffect(() => {
    if (FOCUS) {
    getNotificationsList();
    // setcategoryId('');
    }
  }, [FOCUS]);

  async function getNotificationsList() {
    let res = await dispatch(getNotification());
    if (res?.status) {
      setnotification(res?.data)
      setcategoryId(0)
    }
  }

  const onRefresh = useCallback(async() => {
    setRefreshing(true);
    let res = await dispatch(getNotification());
    if (res?.status) {
      setnotification(res?.data)
      setcategoryId(0)
    }
    setTimeout(() => {
      setRefreshing(false)
    }, 500);    
  }, []);

  function filterCategoryWise(category: string, id: string) {
    setcategoryId(id);
    let filteredData;
    if (category === 'All') {
      setnotification(reduxNotificationData); // Set notification to all data
    } else {
      filteredData = reduxNotificationData?.filter(
        (obj: Notification_Object_Type) => obj?.type === category,
      );
      setnotification(filteredData); // Set notification to filtered data
    }
  }


  async function getQuizes(ID) {
    let res = await dispatch(QuizAndAssignmentData(ID));
    if (res?.status) {
      dispatch({
        type: ActionType.QUIZ_AND_ASSIGNMET_DATA,
        payload: res?.responseData,
      });
    }
    return res.status
  }
  
  async function getAssignment(ID) {
    let res = await dispatch(GetAssiignment(ID));
  
    if (res?.status) {
      dispatch({
        type: ActionType.ASSIGNMENT_DATA,
        payload: res?.data,
      });
    }
    return res.status
  }
  
  async function bonusMaterialData(ID) {
    let res = await dispatch(getBonusMaterial(ID));
  
    if (res?.status) {
      dispatch({
        type: ActionType.GET_BONUS,
        payload: res?.responseData,
      });
    }
    return res.status
  }
  
  async function ProgressReportData(ID) {
    let res = await dispatch(getProgressReport(ID));
    if (res?.staus) {
      dispatch({
        type: ActionType.PROGRESS_REPORT,
        payload: res?.data,
      });
    }
    return res.staus
  }
  
  async function fetchMyCourses() {

    let res = await dispatch(MyCourses());

    if (res?.status) {
      dispatch({
        type: ActionType.MY_COURSES,
        payload: res?.responseData,
      });
    }
    return res.status
  }

  async function SaveName(ID) {
    
    let res = await dispatch(getCourseDetailsWithoutLoder(ID));
    let data = res?.responseData;
    let object = {
      discountedPrice: JSON.stringify(data?.discountedPrice),
      name: data?.name,
      price: data?.price,
      _id: data?._id,
      sections: data?.sections,
      courseReviews: data?.courseReviews,
      media: data?.media,
      instructorID: data?.instructorID,
      totalReviews: data?.totalReviews,
      totalStudents: data?.totalStudents,
      enrolledStudents: data?.enrolledStudents,
      instructorDetails: data?.instructorDetails,
      vatDiscount: data?.vatTax
    };
    dispatch(course_ObjectData(object));
    return res?.status
}

  const NavigateToCourseDetail = async (data, index) => {

    let courseId = data?.courseId
    
    dispatch({type: ActionType.HOME_LOADER, payload: true});
    try {
      const promise1 = getQuizes(courseId);
      const promise2 = getAssignment(courseId);
      const promise3 = bonusMaterialData(courseId);
      const promise4 = ProgressReportData(courseId);
      const promise5 = fetchMyCourses()
      const promise6 = SaveName(courseId)

      await Promise.all([
        promise1, 
        promise2, 
        promise3, 
        promise4, 
        promise5,
        promise6
      ]).then((res) => {        
        if (res.every((element) => element === true)) {  
          dispatch({type: ActionType.HOME_LOADER, payload: false});       
          NavigationService.navigate(
            RouteNames.HomeRoutes.AfterPurchaseCourseDetails,
            {
              movetoIndex: index,
              movetoCourseDetail: false,
            },
            );
          } else {
            dispatch({type: ActionType.HOME_LOADER, payload: false});  
            // Utills.showToast(t('something_went_wrong_server_error'), '', 'error');
            Utills.showToast(t('something went wrong server error'), '', 'error');
          }
      });
    } catch (error) {
      dispatch({type: ActionType.HOME_LOADER, payload: false});
      Utills.showToast(error, '', 'error');
    }
  };

  function HandleNavigation(data: object) {

    if (userData?.type == 'guest') {  //guest user not enrolled directly see the course
      dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
      return
    }

    if (data?.isLocked) {
      Alert.alert(
        t('course_access_denied'), // New heading
        t('You_cannot_access_this_course_because_thet_ime_duration_has_been_completed'),
      );
      return;
    }

    if (data.type == NotificationTypes.ACCOUNT_SECURITY) { //ok
      
      Alert.alert(t('password_changed'), t('your_password_is_changed_by_Admin'), [
        {text: 'ok', onPress: () => console.log("ok") }
      ]);    

    }
    else if(data.type == NotificationTypes.NEW_COURSE){  //ok-
      Alert.alert(
        t('cant_access_this_course'),
        t('you_arent_enrolled_in_this_course'),
      );
    }
    else if(data.type == NotificationTypes.WITHDRAWAL){  //ok
      NavigationService.navigate(RouteNames.HomeRoutes.MyWalletScreen);
    }
    else if(data.type == NotificationTypes.COIN){ //ok
      NavigationService.navigate(RouteNames.HomeRoutes.MyWalletScreen);
    }
    else if(data.type == NotificationTypes.COURSE){ //ok
        NavigateToCourseDetail(data,0)
    }
    else if(data.type == NotificationTypes.CHAT){  //ok
      NavigateToCourseDetail(data,1)
    }
    else if(data.type == NotificationTypes.ASSIGNMENT ){ //ok
      NavigateToCourseDetail(data,3)
    }
    else if(data.type == NotificationTypes.EVENT ){  //ok
      NavigateToCourseDetail(data,4)
    }
    else if(data.type == NotificationTypes.PROGRESS){
      NavigateToCourseDetail(data,5)
    }
    
  }

  const renderHorizontalCategories = () => {
    interface ItemType {
      type: string;
      _id: string;
    }

    interface RenderItemProps {
      item: ItemType;
    }

    const reminders = [
      {
        id: 0,
        type: 'All',
        title: t('all_notifications'),
      },
      {
        id: 1,
        type: NotificationTypes.ASSIGNMENT,
        title: t('assignment_reminders'),
      },
      {id: 2, type: NotificationTypes.CHAT, title: t('chat_engagement')},
      {id: 3, type: NotificationTypes.COIN, title: t('billing')},
      {id: 4, type: NotificationTypes.COURSE, title: t('course_update')},
      {id: 5, type: NotificationTypes.EVENT, title: t('event_notifications')},
      {id: 6, type: NotificationTypes.PROGRESS, title: t('progress_update')},
    ];

    function renderItem({item}: RenderItemProps) {
      const {type, id} = item;

      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.renderItemContainer,
            {
              backgroundColor:
                categoryId == id
                  ? Utills.selectedThemeColors().Primary
                  : Utills.selectedThemeColors().Base,
            },
          ]}
          onPress={() => filterCategoryWise(type, id)}>
          <CustomText.LargeSemiBoldText
            customStyle={[
              {fontSize: FontType.FontSmall},
              {
                color: categoryId == id ? '#ffffff' : '#A4A4A4',
              },
            ]}
            isSecondaryColor>
            {/* {item.title} */}
            {type === 'All' ? t('all_notifications') : null}
            {type == NotificationTypes.ASSIGNMENT
              ? t('assignment_reminders')
              : type == NotificationTypes.CHAT
              ? t('chat_engagement')
              : type == NotificationTypes.COIN
              ? t('billing')
              : type == NotificationTypes.COURSE
              ? t('course_update')
              : type == NotificationTypes.EVENT
              ? t('event_notifications')
              : type == NotificationTypes.PROGRESS
              ? t('progress_update')
              : null}
          </CustomText.LargeSemiBoldText>
        </TouchableOpacity>
      );
    }

    return (
      <>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={reminders}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      </>
    );
  };

  const renderNotifications = () => {
    interface ItemType {
      type: string;
      createdAt: string;
      updatedAt: string;
      message: string;
      userId: string;
    }

    interface RenderItemProps {
      item: ItemType;
    }

    function renderItem({item}: RenderItemProps) {
      const {type, createdAt, updatedAt, message, arabicMessage, englishMessage, userId} = item;
 
      return (
        <RoundBorderCardComponent
          key={userId}
          text={userData?.language == "arabic" ? arabicMessage : englishMessage }
          subtext={utills.timeHumanize(createdAt)}
          image={I18nManager?.isRTL ? Images.ArabicLogo : Images.NMO}
          customViewStyle={{
            // borderWidth:1,
            // justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal:Metrix.HorizontalSize(10)
          }}
          onPress={()=>{HandleNavigation(item)}}
          customTextStyle={styles.customTextStyle}
          subTextCustomStyle={styles.customTextStyle}
          touchableOpacityCustomStyle={styles.touchableOpacityCustomStyle}
          imageStyle={styles.imageStyle}
        />
      );
    }

    return (
      <>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={userData?.type == 'guest'? [] : notification}
          ListEmptyComponent={EmptyListComponent}
          ListFooterComponent={<View style={{ height: 100 }} />}
          keyExtractor={key => key?._id}
          renderItem={renderItem}
        />
      </>
    );
  };

  return (
    <>
      <View
        style={{
          flex: 1,
          marginHorizontal: Metrix.HorizontalSize(15),
          marginVertical: Metrix.HorizontalSize(15),
        }}>
        <View>
          <CustomText.MediumText
            customStyle={{
              fontWeight: '700',
            }}>
            {t('notifications')}
          </CustomText.MediumText>
          {renderHorizontalCategories()}
        </View>

        <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />}>
          {renderNotifications()}
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  customTextStyle: {
    // color:"red",
    fontFamily: Fonts['Medium'],
    textAlign: I18nManager.forceRTL ? 'left' : 'right',
  },
  touchableOpacityCustomStyle: {
    // borderWidth:1,
    borderRadius: Metrix.HorizontalSize(10),
    padding: 10,
    height: Metrix.VerticalSize(80),
  },

  imageStyle: {
    marginRight: Metrix.HorizontalSize(8),
    width: Metrix.HorizontalSize(27),
    height: Metrix.VerticalSize(27),
  },

  renderItemContainer: {
    marginVertical: 10,
    // borderWidth: 1,
    paddingHorizontal: Metrix.HorizontalSize(17),
    paddingVertical: Metrix.VerticalSize(7),
    marginRight: Metrix.HorizontalSize(7),
    borderRadius: Metrix.VerticalSize(20),
    ...Metrix.createShadow,
  },
  topHeadingContainer: {
    // borderWidth: 1,
    // paddingHorizontal: Metrix.HorizontalSize(17),
    paddingVertical: Metrix.VerticalSize(7),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
 