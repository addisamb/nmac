import {
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {InvitationRewardsProps} from '../../propTypes';
import {t} from 'i18next';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {
  BackHeader,
  CustomImage,
  CustomInput,
  CustomText,
  MainContainer,
  PrimaryButton,
  WalletCardComponent,
} from '../../../components';
import {VerticalSize, normalizeFont} from '../../../config/metrix';
import {Item} from 'react-native-paper/lib/typescript/src/components/Drawer/Drawer';
import {useDispatch, useSelector} from 'react-redux';
import {getMyReferals} from '../../../Redux/Action/HomeActions/homeActions';
import utills from '../../../config/utills';
import {EmptyListComponent} from '../../../components/CourseCardsHorizontalList';
import {useIsFocused} from '@react-navigation/native';
import {RootState} from '../HomeScreen';

export const InvitationRewards: React.FC<InvitationRewardsProps> = ({}) => {
  const userData = useSelector(
    (state: RootState) => state?.HomeReducer?.userData,
  );
  const dispatch = useDispatch();
  const FOCUS = useIsFocused();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (FOCUS) {
      getMyReferallsRewards();
    }
  }, [FOCUS]);

  async function getMyReferallsRewards() {
    let res = await dispatch(getMyReferals());

    if (res?.status) {
      setData(res?.data);
    }
  }

  // const userData = [
  //   {
  //     name: 'Ali Rehman',
  //     description: t('invitation_reward_desc'),
  //     date: '15 April 2023',
  //     imageSource: Images.Badge,
  //   },
  //   {
  //     name: 'Bilal Raza',
  //     description: t('invitation_reward_desc'),
  //     date: '15 April 2023',
  //     imageSource: Images.Badge,
  //   },
  //   {
  //     name: 'Muhammad Asad',
  //     description: t('invitation_reward_desc'),
  //     date: '15 April 2023',
  //     imageSource: Images.Badge,
  //   },
  // ];

  function renderData({item}) {
    return (
      <View key={item} style={styles.cardStyle}>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <CustomImage source={Images.Badge} />
          </View>
          <View
            style={{
              paddingHorizontal: Metrix.HorizontalSize(11),
            }}>
            <CustomText.LargeSemiBoldText
              customStyle={{fontSize: normalizeFont(15)}}>
              {item.name}
            </CustomText.LargeSemiBoldText>
            <CustomText.RegularText
              customStyle={{fontSize: normalizeFont(11), marginTop: 5}}>
              {t('got_5_point_and_youve_got_25_SAR')}
            </CustomText.RegularText>
          </View>
        </View>
        <View>
          <CustomText.LargeSemiBoldText customStyle={styles.dateStyle}>
            {utills.timeHumanize(item?.createdAt)}
          </CustomText.LargeSemiBoldText>
        </View>
      </View>
    );
  }

  console.log('sadsds====>', userData);

  return (
    <>
      <BackHeader heading={t('referrals')} />
      <View style={styles.viewStyle}></View>
      <View style={styles.cardviewStyle}>
        <View>
          <CustomText.LargeSemiBoldText customStyle={styles.textStyle}>
            {/* {t('currency')} */}
            {Math.round(userData?.coins * 5)} {t('sar')}
          </CustomText.LargeSemiBoldText>
          <CustomText.LargeSemiBoldText customStyle={styles.descTextStyle}>
            {t('total_points_invitation')}
          </CustomText.LargeSemiBoldText>
        </View>
        <CustomImage customStyle={styles.imageStyle} source={Images.Badge} />
        <View>
          <CustomText.LargeSemiBoldText customStyle={styles.textStyle}>
            {data?.length ? data?.length : 0}
          </CustomText.LargeSemiBoldText>
          <CustomText.LargeSemiBoldText customStyle={styles.descTextStyle}>
            {t('total_invited_invitation')}
          </CustomText.LargeSemiBoldText>
        </View>
      </View>

      <MainContainer>
        <View style={styles.mainViewStyle}></View>
        <CustomText.LargeSemiBoldText
          customStyle={{
            // borderWidth:1,
            textAlign: 'center',
            marginTop: Metrix.VerticalSize(15),
            fontSize: FontType.FontMedium,
          }}>
          {t('invited_users_rewards')}
        </CustomText.LargeSemiBoldText>

        <View
          style={{
            marginTop: Metrix.VerticalSize(10),
          }}>
          <FlatList
            data={data}
            renderItem={renderData}
            style={{
              paddingVertical: Metrix.VerticalSize(10),
            }}
            ListEmptyComponent={EmptyListComponent}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item?.id}
          />
        </View>
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  mainViewStyle: {
    borderColor: Utills.selectedThemeColors().stroke,
    marginTop: Metrix.VerticalSize(65),
    borderWidth: 0.5,
  },

  viewStyle: {
    position: 'relative',
    height: Metrix.VerticalSize(50),
    justifyContent: 'space-between',
    paddingVertical: Metrix.VerticalSize(8),
    paddingHorizontal: Metrix.HorizontalSize(15),
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
  textStyle: {
    textAlign: 'center',
    fontSize: FontType.FontSmall,
    color: Utills.selectedThemeColors().Primary,
  },

  imageStyle: {
    width: Metrix.HorizontalSize(62),
    height: Metrix.VerticalSize(62),
  },
  descTextStyle: {
    fontSize: normalizeFont(13),
    color: utills.selectedThemeColors().Black,
  },
  cardviewStyle: {
    // borderWidth:1,
    top: 120,
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    position: 'absolute',
    justifyContent: 'space-between',
    borderRadius: Metrix.HorizontalSize(10),
    height: Metrix.VerticalSize(80),
    paddingHorizontal: Metrix.HorizontalSize(20),
    backgroundColor: Utills.selectedThemeColors().Base,
    ...Metrix.createShadow,
  },

  cardStyle: {
    justifyContent: 'space-between',
    // borderWidth: 1,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Metrix.VerticalSize(15),
    paddingVertical: Metrix.VerticalSize(10),
    borderColor: Utills.selectedThemeColors().stroke,
  },

  dateStyle: {
    justifyContent: 'flex-start',
    // borderWidth: 1,
    marginBottom: Metrix.VerticalSize(20),
    fontSize: normalizeFont(11),
    color: Utills.selectedThemeColors().Primary,
  },
});
