import {
  FlatList,
  I18nManager,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHeader,
  CustomModal,
  CustomText,
  MainContainer,
  PrimaryButton,
  RoundBorderCardComponent,
  SecondaryButton,
} from '../../../components';
import {
  FontType,
  Images,
  Metrix,
  NavigationService,
  RouteNames,
  Utills,
} from '../../../config';
import {TransactionsHistoryProps} from '../../propTypes';
import {t} from 'i18next';
import {useEffect, useState} from 'react';
import {normalizeFont} from '../../../config/metrix';
import {useIsFocused} from '@react-navigation/native';
import {TransactionHistory} from '../../../Redux/Action/HomeActions/homeActions';
import {useDispatch, useSelector} from 'react-redux';
import utills from '../../../config/utills';
import navigationService from '../../../config/navigationService';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import { EmptyListComponent } from '../../../components/CourseCardsHorizontalList';

export const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({}) => {
  const userData = useSelector(state => state?.HomeReducer?.userData);
  // console.log('userData++++===>>', userData?._id);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [applyButtonPressed, setApplyButtonPressed] = useState(false);
  const [modalPostVisible, setModalPostVisible] = useState(false);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);
  console.log('transactionHistory++++++', transactionHistory);

  const buttonTitles = [
    {
      id: '1',
      title: t('all'),
      styleID: 'All',
    },
    {
      id: '2',
      title: t('received_rewards'),
      styleID: 'Received rewards',
    },
    {
      id: '3',
      title: t('sended_rewards'),
      styleID: 'Sended rewards',
    },
  ];

  const handleButtonPress = (index: any) => {
    setSelectedButtonIndex(index);
  };

  useEffect(() => {
    const getTransactionHistoryData = async () => {
      try {
        let res = await dispatch(TransactionHistory());

        let data = res?.data;

        console.log('====>>-----', data);

        if (res?.status) {
          const allTransactions = [
            ...res.data.receivedPoints,
            ...res.data.sentPoints,
            ...res.data.exchangedCourses,
          ];
          let filteredTransactions = [];

          if (selectedButtonIndex === 0) {
            // Display all transactions
            filteredTransactions = allTransactions;
          } else if (selectedButtonIndex === 1) {
            // Display received rewards
            filteredTransactions = allTransactions.filter(
              transaction => transaction.type === 'Course',
            );
          } else if (selectedButtonIndex === 2) {
            // Display sent rewards
            filteredTransactions = allTransactions.filter(
              transaction =>
                transaction.type === 'Chat' &&
                userData?._id === transaction.fromUserId,
            );
          }
          setTransactionHistory(filteredTransactions);
        }
      } catch (error) {
        console.error('Error fetching transaction history:', error);
      }
    };
    getTransactionHistoryData();
  }, [selectedButtonIndex]);

  return (
    <>
      <BackHeader isPrimary={false} heading={t('transactions_history')} />
      <MainContainer>
        <View
          style={{
            paddingBottom: Metrix.VerticalSize(15),
            paddingHorizontal: Metrix.HorizontalSize(10),
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <CustomText.LargeSemiBoldText>
            {t('transactions_history')}
          </CustomText.LargeSemiBoldText>
          <TouchableOpacity
            onPress={() => {
              setModalPostVisible(true);
            }}
            activeOpacity={0.7}>
            <Image
              style={{
                height: Metrix.VerticalSize(20),
                width: Metrix.HorizontalSize(20),
                transform: [{scaleX: I18nManager.isRTL ? -1 : 1}],
              }}
              source={Images.Filter}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <FlatList
          data={transactionHistory}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={EmptyListComponent}
          renderItem={({item, index}) => (
            console.log("result===>",item),            
            <RoundBorderCardComponent
              touchableOpacityCustomStyle={{
                justifyContent: 'space-between',
                // backgroundColor: Utills.selectedThemeColors().CardColor
              }}
              key={index}
              image={
                item.type === 'Course'
                  ? Images.ReceivedPoints
                  : Images.BuyCourse
              }
              text={
                userData?._id === item.toUserId
                  ? t('received_rewards')
                  : userData?._id === item.fromUserId
                  ? t('sended_rewards')
                  : t('buy_course')
              }
              subtext={utills.timeHumanize(item.createdAt)}
              amount={`${Math.floor(item.coins * 100) / 100} ${t('coins')}`}
              onPress={() => {
                console.log('Item pressed:', item);
                navigationService.navigate(
                  RouteNames.HomeRoutes.TransactionsDetails,
                  {
                    selectedItem: item,
                  },
                );
              }}
            />
          )}
        />
      </MainContainer>

      <CustomModal
        onClose={() => {
          setModalPostVisible(false);
        }}
        bottomModal
        // smallModal
        visible={modalPostVisible}>
        <CustomText.LargeBoldText customStyle={styles.modalTextStyle}>
          {t('filter')}
        </CustomText.LargeBoldText>

        <View
          style={{
            alignItems: 'center',
            marginTop: Metrix.VerticalSize(20),
            paddingHorizontal: Metrix.HorizontalSize(25),
          }}>
          {buttonTitles.map((item, index) => {
            console.log(item.title);
            return (
              <PrimaryButton
                key={item.id}
                title={item.title}
                customStyles={[
                  item.styleID == 'All'
                    ? styles.all
                    : item.styleID == 'Received rewards'
                    ? styles.recivedRewards
                    : item.styleID == 'Sended rewards'
                    ? styles.sentReward
                    : null,
                  index === selectedButtonIndex ? styles.selectedButton : null,
                ]}
                textColor={
                  index === selectedButtonIndex
                    ? Utills.selectedThemeColors().Base
                    : Utills.selectedThemeColors().LightGrayTextColor
                }
                onPress={() => handleButtonPress(index)}
              />
            );
          })}
        </View>
        {/* <View
          style={{
            paddingHorizontal: Metrix.HorizontalSize(25),
          }}>
          <PrimaryButton
            onPress={() => {
              setModalPostVisible(false);
            }}
            customStyles={{
              marginTop: Metrix.VerticalSize(20),
            }}
            title={t('apply')}
          />
        </View> */}
      </CustomModal>
    </>
  );
};
const styles = StyleSheet.create({
  modalViewStyle: {
    alignSelf: 'center',
    borderRadius: 10,
    height: Metrix.VerticalSize(10),
    width: Metrix.HorizontalSize(140),
    backgroundColor: Utills.selectedThemeColors().Base,
  },
  modalTextStyle: {
    fontSize: normalizeFont(17),
    marginTop: Metrix.VerticalSize(10),
    textAlign: 'center',
  },
  sentReward: {
    // borderWidth: 1,
    height: Metrix.VerticalSize(35),
    width: Metrix.HorizontalSize(160),
    backgroundColor: Utills.selectedThemeColors().Base,
    ...Metrix.createShadow,
  },
  recivedRewards: {
    // borderWidth: 1,
    height: Metrix.VerticalSize(35),
    width: Metrix.HorizontalSize(175),
    marginVertical: Metrix.VerticalSize(3),
    backgroundColor: Utills.selectedThemeColors().Base,
    ...Metrix.createShadow,
  },
  selectedButton: {
    backgroundColor: Utills.selectedThemeColors().Primary,
  },
  all: {
    // borderWidth: 1,
    width: Metrix.HorizontalSize(68),
    height: Metrix.VerticalSize(35),
    ...Metrix.createShadow,
    backgroundColor: Utills.selectedThemeColors().Base,
  },
});
