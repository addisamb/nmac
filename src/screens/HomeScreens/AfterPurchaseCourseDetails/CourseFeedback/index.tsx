import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {MyCourseCard} from '../../Courses';
import {FontType, Images, Metrix, Utills} from '../../../../config';
import {
  CustomInput,
  CustomModal,
  CustomText,
  MainContainer,
  PrimaryButton,
  RatingComponent,
} from '../../../../components';
import {normalizeFont} from '../../../../config/metrix';
import {t} from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {ResetPasswordApi} from '../../../../Redux/Action/AuthActions/authActions';
import {submitRatting} from '../../../../Redux/Action/HomeActions/homeActions';
import { AirbnbRating, Rating } from 'react-native-ratings';
import { RootState } from '../../HomeScreen';
import ActionType from '../../../../Redux/Action/ActionType/actionType';

type CourseFeedbackProps = {};

export const CourseFeedback: React.FC<CourseFeedbackProps> = ({}) => {
  const id = useSelector(state => state?.HomeReducer?.course_Object?._id);
  const userData = useSelector((state: RootState) => state?.HomeReducer?.userData);
  const dispatch = useDispatch();

  const [modalVisible, setModalVisible] = useState(false);
  const [comnt, setcomnt] = useState('');
  const [starRatting, setstarRatting] = useState('');
  const [defaultstarRatting, setdefaultstarRatting] = useState(0);

  async function Feedback() {

    if (userData?.type == 'guest') {
      // return true
      dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
      return
    }

    if (!starRatting) {
      Utills.showToast('Please Give Star Ratings', '', 'error');
    } else if (!comnt.trim()) {
      Utills.showToast('Please Enter Comment', '', 'error');
    } else {
      let payload = {
        courseId: id,
        rating: starRatting,
        description: comnt,
      };
      let res = await dispatch(submitRatting(payload));
      if (res?.status) {
        setTimeout(() => {
          setModalVisible(true);
        }, 1000);
        setcomnt('');
      }
    }
  }
  

  return (
    <>
      <MainContainer>
        {/* <MyCourseCard
          item={{
            id: '1',
            image: Images.Course1,
            heading: 'Understand what Design Thinking is all about',
            subHeading: 'Description: All can be perfect in math',
            progressInPercent: 1,
          }}
        /> */}

        <View
          style={{
            marginTop: Metrix.VerticalSize(20),
          }}>
          <CustomText.LargeBoldText
            style={{
              textAlign: 'center',
              fontSize: FontType.FontMedium,
            }}>
            {t('rate_course')}
          </CustomText.LargeBoldText>
        </View>

        <View
          style={{
            alignItems: 'center',
            marginBottom:  Metrix.VerticalSize(20),
          }}>
          {/* <RatingComponent totalReviews={starRatting} rating={starRatting} getRatting={setstarRatting} /> */}

          <View style={styles.centreItem}>
            <CustomText.LargeSemiBoldText
              customStyle={{
                marginTop: 10,
                marginBottom: 10,
                // color: Utills.selectedThemeColors().TertiaryTextColor,
                marginRight: 10,
              }}>
              {starRatting || "0.0"}
            </CustomText.LargeSemiBoldText>

            {/* <Rating
              imageSize={15}
              // startingValue={avgRating}
              onFinishRating={setstarRatting}
              // readonly
            /> */}

            <AirbnbRating
                defaultRating={defaultstarRatting}
                showRating={false}
                size={27}
                onFinishRating={setstarRatting}
            />

          </View>
        </View>
        <CustomInput
          multiline
          customtextContainerStyle={{
            height: Metrix.VerticalSize(100),
            borderRadius: Metrix.HorizontalSize(20),
          }}
          value={comnt}
          onChangeText={e => {
            setcomnt(e);
          }}
          customStyle={{
            marginTop: Metrix.VerticalSize(10),
            // backgroundColor: "red",
            width: '100%',
            textAlignVertical: 'top'
          }}
          heading={t('comment')}
          placeholder={t('comment_here')}
        />

        <PrimaryButton
          onPress={() => {
            Feedback();
          }}
          customStyles={{
            alignSelf: 'center',
            width: '90%',
          }}
          title={t('submit')}
        />
      </MainContainer>

      <CustomModal
        smallContainerStyles={{
          height: '38%',
        }}
        onClose={() => {
          setModalVisible(false);
        }}
        smallModal
        visible={modalVisible}>
        <View>
          <CustomText.LargeBoldText customStyle={styles.smallModalHeading}>
            {t('thank_you')}
          </CustomText.LargeBoldText>
        </View>
        <View
          style={{
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(15),
          }}>
          <Image
            style={{
              height: Metrix.VerticalSize(100),
              width: Metrix.HorizontalSize(100),
            }}
            source={Images.CheckConfirm}
          />
          <View style={{width: '80%'}}>
            <CustomText.RegularText style={styles.smallModalTextStyle}>
              {t('your_feedback_has_been_submitted_successfully')}
            </CustomText.RegularText>
          </View>
        </View>
        <PrimaryButton
          onPress={() => {
            setModalVisible(false);
          }}
          customStyles={styles.samllModalButtonStyle}
          title={t('ok')}
        />
      </CustomModal>
    </>
  );
};

const styles = StyleSheet.create({
  smallModalTextStyle: {
    marginTop: Metrix.VerticalSize(5),
    textAlign: 'center',
    color: Utills.selectedThemeColors().LightGrayTextColor,
  },

  samllModalButtonStyle: {
    width: Metrix.HorizontalSize(121.604),
    height: Metrix.VerticalSize(32.232),
  },
  smallModalHeading: {
    textAlign: 'center',
    fontSize: normalizeFont(22),
    color: Utills.selectedThemeColors().Primary,
  },
  centreItem: {
    // flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
  },
});
