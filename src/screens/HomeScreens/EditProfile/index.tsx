import {
  Image,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  BackHeader,
  CustomInput,
  CustomText,
  MainContainer,
  PrimaryButton,
  ProfileHeader,
} from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  Utills,
} from '../../../config';
import {EditProfileProps} from '../../propTypes';
import ImagePicker from 'react-native-image-crop-picker';
import _ from 'lodash';
// import {RootState} from '../../../redux/reducers';
import {useDispatch, useSelector} from 'react-redux';
// import {AuthActions, HomeActions} from '../../../redux/actions';
import {ErrorMessage, Formik} from 'formik';
import * as Yup from 'yup';
import {Provider} from 'react-native-paper';
import {Dropdown} from 'react-native-element-dropdown';
import {normalizeFont} from '../../../config/metrix';
import {t} from 'i18next';
import HomeReducer from '../../../Redux/Reducer/HomeReducer';
import {updateProfile} from '../../../Redux/Action/HomeActions/homeActions';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import {GetProfileData} from '../../../Redux/Action/HomeActions/homeActions';
import {useNavigation} from '@react-navigation/native';
import api from '../../../APICall/api';
import axios from 'axios';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {BASE_URL} from '../../../APICall/constants';

export const EditProfile: React.FC<EditProfileProps> = ({token}) => {
  const userData = useSelector(state => state?.HomeReducer?.userData);

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const scrollRef = useRef(null);

  const [selectedImage, setSelectedImage] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedProfession, setSelectedProfession] = useState(
    userData?.profession || '',
  );

  console.log('selectedProfession==>', selectedProfession);
  // const [profession, setprofession] = useState(null);
  // const [gender, setGender] = useState(false);
  // const [name, setName] = useState(userData?.name || '');
  // const [age, setAge] = useState(userData?.age || '');

  console.log('userData==>', userData);

  const data = [
    {label: t('male'), value: 'Male'},
    {label: t('female'), value: 'Female'},
    {label: t('other'), value: 'Other'},
  ];

  const professiondata = [
    {label: t('professor'), value: 'professor'},
    {label: t('teacher'), value: 'teacher'},
    {label: t('lecturer'), value: 'lecturer'},
    {label: t('software_developer'), value: 'software_developer'},
    {label: t('data_scientist'), value: 'data_scientist'},
    {label: t('digital_marketer'), value: 'digital_marketer'},
    {label: t('graphic_designer'), value: 'graphic_designer'},
    {label: t('project_manager'), value: 'project_manager'},
    {label: t('marketing_specialist'), value: 'marketing_specialist'},
    {label: t('business_analyst'), value: 'business_analyst'},
    {label: t('civil_engineer'), value: 'civil_engineer'},
    {label: t('mechanical_engineer'), value: 'mechanical_engineer'},
    {label: t('electrical_engineer'), value: 'electrical_engineer'},
    {label: t('nurse'), value: 'nurse'},
    {label: t('doctor'), value: 'doctor'},
    {label: t('pharmacist'), value: 'pharmacist'},
    {label: t('lawyer'), value: 'lawyer'},
    {label: t('accountant'), value: 'accountant'},
    {label: t('financial_analyst'), value: 'financial_analyst'},
    {label: t('architect'), value: 'architect'},
    {label: t('interior_designer'), value: 'interior_designer'},
    {label: t('human_resources_manager'), value: 'human_resources_manager'},
    {
      label: t('customer_service_representative'),
      value: 'customer_service_representative',
    },
    {label: t('sales_manager'), value: 'sales_manager'},
    {label: t('event_planner'), value: 'event_planner'},
    {label: t('journalist'), value: 'journalist'},
    {label: t('writer'), value: 'writer'},
    {label: t('translator'), value: 'translator'},
    {label: t('chef'), value: 'chef'},
    {label: t('hotel_manager'), value: 'hotel_manager'},
    {label: t('pilot'), value: 'pilot'},
    {label: t('flight_attendant'), value: 'flight_attendant'},
    {label: t('police_officer'), value: 'police_officer'},
    {label: t('firefighter'), value: 'firefighter'},
    {label: t('social_worker'), value: 'social_worker'},
    {label: t('research_scientist'), value: 'research_scientist'},
    {label: t('biologist'), value: 'biologist'},
    {label: t('chemist'), value: 'chemist'},
    {label: t('physicist'), value: 'physicist'},
    {label: t('data_analyst'), value: 'data_analyst'},
    {label: t('other'), value: 'other'},
  ];

  const imagePicker = async () => {
    try {
      const image = await ImagePicker?.openPicker({
        mediaType: 'photo',
        cropping: true,
        multiple: false,
        cropperCircleOverlay: true,
        compressImageQuality: 0.3,
      });

      const formData = new FormData();
      formData.append('file', {
        uri: image?.path,
        // uri: Platform.OS === 'android'
        // ?
        // image.path.replace('file://', '')
        // :
        // image.path,
        name: image.path.split('/').pop(),
        type: image?.mime,
      });

      const url = `${BASE_URL}api/v1/`;
      const res = await axios.post(`${url}media/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          // Add any other headers you might need, e.g., authorization token
        },
      });

      // console.log(res.data.responseData._id);
      setUserId(res.data.responseData._id);
      if (image && image.path) {
        setSelectedImage(image.path);
        // setIconVisible(true);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (userData?.profession) {
      setSelectedProfession(userData.profession);
    }
  }, [userData]);

  async function updateApi(data) {
    let agevalue = parseInt(data?.age);

    if (agevalue > 100) {
      Utills.showToast('Age Must be less than 100', '', 'error');
    } else {
      let payload = {
        name: data?.name,
        age: parseInt(data?.age),
        gender: data?.gender || '',
        profession: data?.profession || '',
        profileID: userId,
        // profilePic: data?.profilePic || '',
        // education: "masters",
        // interests: "no intrest",
        // qualification: "not intrested",
        // expertise: "not intrested",
      };

      let res = await dispatch(updateProfile(payload));
      if (res) {
        let res = await dispatch(GetProfileData());

        if (res?.status) {
          dispatch({
            type: ActionType.GET_ME_DATA,
            payload: res?.responseData,
          });
          NavigationService.goBack();
        }
      }
    }
  }

  return (
    <Formik
      enableReinitialize
      initialValues={{
        age: userData?.age || '',
        name: userData?.name || '',
        gender: userData?.gender || '',
        profession: userData?.profession || '',
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().required('Name is required'),
        age: Yup.number().integer().positive('Age must be a positive number'),
      })}
      onSubmit={values => {
        updateApi(values);
      }}>
      {({values, handleChange, handleSubmit, errors, touched}) => (
        <>
          <BackHeader heading={t('personal_information')} isPrimary={false} />
          <MainContainer
            isFlatList
            customeStyle={{
              paddingHorizontal: Metrix.HorizontalSize(25),
              paddingVertical: 0,
            }}>
            <View
              style={{
                flex: 1,
              }}>
              {/* <ScrollView showsVerticalScrollIndicator={false}> */}
              <KeyboardAwareScrollView
                ref={scrollRef}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={-10}>
                {selectedImage ? (
                  <ProfileHeader
                    source={{uri: selectedImage}}
                    onChangePhoto={() => imagePicker()}
                  />
                ) : (
                  <ProfileHeader
                    source={
                      userData?.profilePic
                        ? {uri: userData?.profilePic}
                        : Images.user2
                    }
                    onChangePhoto={() => imagePicker()}
                  />
                )}

                <CustomInput
                  heading={t('name')}
                  placeholder={t('name')}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  error={touched.name && errors.name}
                  customStyle={{width: '100%'}}
                />
                {!userData?.email && (
                  <CustomInput
                    heading={t('phone_number')}
                    placeholder={t('enter_your_phone_number')}
                    value={userData?.phone || ''}
                    editable={false}
                    customStyle={{width: '100%'}}
                    // onChangeText={phonenumber => setPhoneNumber(phonenumber)}  phone
                  />
                )}
                {!userData?.phone && (
                  <CustomInput
                    heading={t('enter_your_email')}
                    placeholder={t('enetr_your_email')}
                    value={userData?.email || ''}
                    editable={false}
                    customStyle={{width: '100%'}}
                  />
                )}

                <CustomInput
                  heading={t('age')}
                  placeholder={t('enter_age')}
                  value={values?.age?.toString()}
                  // onChangeText={age => setAge(age)}
                  // value={values.age}
                  onChangeText={handleChange('age')}
                  error={touched.age && errors.age}
                  keyboardType="numeric"
                  customStyle={{width: '100%'}}
                />
                <View>
                  <CustomText.RegularText customStyle={styles.customTextStyle}>
                    {t('select_gender')}
                  </CustomText.RegularText>
                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={data}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={t('gender')}
                    value={userData?.gender || ''}
                    onChange={item => handleChange('gender')(item.value)}
                  />
                </View>

                {/* <View
                  style={{
                    marginTop: Metrix.VerticalSize(10),
                  }}>
                  <CustomText.RegularText customStyle={styles.customTextStyle}>
                    {t('select_profession')}
                  </CustomText.RegularText>

                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={professiondata}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={t('profession')}
                    value={userData?.profession}
                    onChange={item => handleChange('profession')(item.value)}
                    onFocus={() => {
                      console.log('tap');
                      // setBottomPadding(500);
                      scrollRef.current?.scrollToPosition(0, 2000, true); // Scroll
                    }}
                  />
                </View> */}

                <View style={{marginTop: Metrix.VerticalSize(10)}}>
                  <CustomText.RegularText customStyle={styles.customTextStyle}>
                    {t('select_profession')}
                  </CustomText.RegularText>

                  {/* {selectedProfession && (
                    <CustomInput
                      placeholder={t('enter_your_profession')}
                      value={values.profession}
                      onChangeText={text => {
                        handleChange('profession')(text);
                      }}
                      error={touched.profession && errors.profession}
                      customStyle={{width: '100%'}}
                    />} */}

                  <Dropdown
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={professiondata}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={userData?.profession}
                    value={selectedProfession || userData?.profession} // Bind to state
                    onChange={item => {
                      setSelectedProfession(item.value);
                      handleChange('profession')(item.value);
                    }}
                  />

                  {selectedProfession === 'other' && (
                    <CustomInput
                      placeholder={t('enter_your_profession')}
                      value={
                        values.profession === 'other' ? '' : values.profession
                      } // Ensure empty value
                      onChangeText={text => handleChange('profession')(text)}
                      error={touched.profession && errors.profession}
                      customStyle={{width: '100%'}}
                    />
                  )}
                </View>

                <PrimaryButton
                  customStyles={{
                    marginTop: Metrix.VerticalSize(60),
                  }}
                  title={t('update')}
                  onPress={handleSubmit}
                />
                {/* </ScrollView> */}
              </KeyboardAwareScrollView>
            </View>
          </MainContainer>
        </>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  cornerIcon: {
    position: 'absolute',
    width: Metrix.HorizontalSize(25),
    height: Metrix.VerticalSize(25),
    top: '70%',
    left: '65%',
    alignSelf: 'center',
    // borderWidth: 1,
    borderRadius: 50,
  },
  dropdown: {
    height: 50,
    marginTop: Metrix.VerticalSize(10),
    borderWidth: 2,
    borderColor: Utills.selectedThemeColors().stroke,
    borderRadius: 50,
    paddingHorizontal: Metrix.HorizontalSize(22),
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    // borderWidth: 1,
    paddingHorizontal: Metrix.HorizontalSize(10),
    fontSize: FontType.FontMedium,
    color: Utills.selectedThemeColors().LightGrayTextColor,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    // borderWidth:1,
    width: 25,
    height: 25,
    // marginRight: Metrix.HorizontalSize(15),
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    // borderWidth:1,
  },

  customTextStyle: {
    fontSize: normalizeFont(15),
    paddingLeft: Metrix.HorizontalSize(5),
  },
});
