import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker'; // Import only the necessary part
import {Images, Metrix, Utills} from '../../../config';
import {
  BackHeader,
  CustomInput,
  CustomText,
  MainContainer,
  PrimaryButton,
} from '../../../components';
import {t} from 'i18next';
import {Formik} from 'formik';
import DropDown from 'react-native-paper-dropdown';
import {string} from 'yup';
import {PaperProvider} from 'react-native-paper';
import {normalizeFont} from '../../../config/metrix';

export const MyAccountScreen: React.FC<MyAccountScreenStyles> = ({}) => {
  const [selectedImage, setSelectedImage] = useState(''); // Initialize with the default image URI

  const [showDropDown, setShowDropDown] = useState(false);
  const [gender, setGender] = useState<string | null>(null);

  const [colors, setColors] = useState(false);

  const [profession, setprofession] = useState<string | null>(null);

  const genderList = [
    {
      label: 'Male',
      value: 'male',
    },
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Others',
      value: 'others',
    },
  ];

  const professionList = [
    {
      label: 'PT Teacher',
      value: 'PT Teacher',
    },
    {
      label: 'Professor',
      value: 'Professor',
    },
    {
      label: 'Computer Engineer',
      value: 'Computer Engineer',
    },
  ];

  // const renderLabel = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && {color: 'blue'}]}>
  //        "
  //        {""}
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        if (image && image.path) {
          setSelectedImage(image.path); // Update the selectedImage state with the new image URI
        }
      })
      .catch(error => {
        console.log('Image picker error: ', error);
      });
  };

  function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <PaperProvider>
        <Formik
          initialValues={{
            name: '',
            phoneNumber: '',
            age: '',
          }}
          onSubmit={values => {
            console.log(values, '-----');
          }}>
          {({
            values,
            errors,
            touched,
            handleChange,
            setFieldTouched,
            isValid,
            handleSubmit,
          }) => (
            <>
              <BackHeader heading="Personal details" />

              <MainContainer
                customeStyle={{
                  paddingHorizontal: Metrix.HorizontalSize(30),
                }}>
                <View style={styles.imageView}>
                  <Image
                    style={{
                      borderRadius: 50,
                      width: '100%',
                      height: '100%',
                    }}
                    source={{uri: selectedImage}}
                  />
                  <TouchableOpacity
                    onPress={handleImagePicker}
                    style={styles.cornerIcon}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      source={Images.Upload}
                      resizeMode="center"
                    />
                  </TouchableOpacity>
                </View>

                <View style={{marginTop: Metrix.VerticalSize(20)}}>
                  <CustomInput
                    heading={t('name')}
                    placeholder={t('enter_name')}
                    onChangeText={handleChange('name')}
                    onBlur={() => setFieldTouched('name')}
                    value={values?.name}
                    error={errors?.name}
                    touched={touched?.name}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />

                  <CustomInput
                    containerStyle={{
                      marginTop: Metrix.VerticalSize(15),
                    }}
                    heading={t('phone_number')}
                    placeholder={t('enter_number')}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={() => setFieldTouched('phoneNumber')}
                    value={values?.phoneNumber}
                    error={errors?.phoneNumber}
                    touched={touched?.phoneNumber}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  <CustomInput
                    containerStyle={{
                      marginTop: Metrix.VerticalSize(10),
                    }}
                    heading={t('age')}
                    placeholder={t('enter_age')}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={() => setFieldTouched('phoneNumber')}
                    value={values?.age}
                    error={errors?.age}
                    touched={touched?.age}
                    autoCapitalize="none"
                    returnKeyType="next"
                  />
                  <View
                    style={{
                      marginTop: Metrix.VerticalSize(10),
                    }}>
                    <CustomText.MediumText
                      customStyle={{
                        fontSize: normalizeFont(15),
                        paddingLeft: Metrix.HorizontalSize(7),
                      }}>
                      Gender
                    </CustomText.MediumText>
                    <DropDown
                      // label='Gender'
                      mode={'outlined'}
                      visible={showDropDown}
                      showDropDown={() => setShowDropDown(true)}
                      onDismiss={() => setShowDropDown(false)}
                      value={gender}
                      setValue={setGender}
                      list={genderList}
                      dropDownContainerHeight={150}
                      activeColor="white"
                      placeholder="Enter your age"
                      theme={{
                        colors: {
                          primary: Utills.selectedThemeColors().Base,
                          background: Utills.selectedThemeColors().Base,
                          surface: Utills.selectedThemeColors().Base,
                        },
                      }}
                      dropDownStyle={{
                        backgroundColor: Utills.selectedThemeColors().Base,
                        // borderRadius:50,
                      }}
                      dropDownItemStyle={{
                        backgroundColor: Utills.selectedThemeColors().Base,
                      }}
                      dropDownItemSelectedTextStyle={{
                        fontWeight: 'bold',
                      }}
                      dropDownItemSelectedStyle={{
                        backgroundColor: Utills.selectedThemeColors().Primary,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      marginTop: Metrix.VerticalSize(10),
                    }}>
                    <CustomText.MediumText
                      customStyle={{
                        fontSize: normalizeFont(15),
                        paddingLeft: Metrix.HorizontalSize(7),
                      }}>
                      Profession
                    </CustomText.MediumText>
                    <DropDown
                      mode={'outlined'}
                      visible={colors}
                      showDropDown={() => setColors(true)}
                      onDismiss={() => setColors(false)}
                      value={profession}
                      setValue={setprofession}
                      list={professionList}
                      dropDownContainerHeight={150}
                      activeColor="white"
                      placeholder="Enter your profession"
                      theme={{
                        colors: {
                          primary: Utills.selectedThemeColors().Base,
                          background: Utills.selectedThemeColors().Base,
                          surface: Utills.selectedThemeColors().Base,
                        },
                      }}
                      dropDownStyle={{
                        borderWidth: 2,
                        backgroundColor: Utills.selectedThemeColors().Base,
                        // borderRadius:50,
                      }}
                      dropDownItemStyle={{
                        backgroundColor: Utills.selectedThemeColors().Base,
                      }}
                      dropDownItemSelectedTextStyle={{
                        fontWeight: 'bold',
                      }}
                      dropDownItemSelectedStyle={{
                        backgroundColor: Utills.selectedThemeColors().Primary,
                      }}
                    />
                  </View>
                  <PrimaryButton
                    customStyles={{
                      marginTop: Metrix.VerticalSize(40),
                    }}
                    title={'Update'}
                  />
                </View>
              </MainContainer>
            </>
          )}
        </Formik>
      </PaperProvider>
    </>
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
  imageView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    width: Metrix.HorizontalSize(85),
    height: Metrix.VerticalSize(85),
    alignSelf: 'center',
    borderRadius: 50,
  },
});

interface MyAccountScreenStyles {}

// ... (the rest of your code)
