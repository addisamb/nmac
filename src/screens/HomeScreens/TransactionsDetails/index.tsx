import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BackHeader,
  CustomText,
  MainContainer,
  PrimaryButton,
  TransactionDetailsComponent,
  UserTransactionInfo,
} from '../../../components';
import {TransactionsDetailsProps} from '../../propTypes';
import {useRoute} from '@react-navigation/native';
import {t} from 'i18next';
import React, {useRef, useState} from 'react';
import {Metrix, Utills} from '../../../config';
import {useSelector} from 'react-redux';
import ViewShot from 'react-native-view-shot';
import {
  downloadFileAndroid,
  downloadFileIos,
  getDownloadPermissionAndroid,
} from '../../../config/utills/fileDownload';
import RNFetchBlob from 'react-native-blob-util';
import {BASE_URL} from '../../../APICall/constants';
import axios from 'axios';
import ActionType from '../../../Redux/Action/ActionType/actionType';
import mime from 'mime';
import utills from '../../../config/utills';

export const TransactionsDetails: React.FC<TransactionsDetailsProps> = ({}) => {
  const userData = useSelector(state => state?.HomeReducer?.userData);
  // console.log('userData==>', userData?.email);

  const route = useRoute();
  const [uri, setUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef();

  const {selectedItem} = route.params;
  // console.log('selected itemsssss', selectedItem);

  const cardData = [
    {
      id: '1',
      heading: t('transaction_id'),
      subheading: selectedItem?._id,
    },
    {
      id: '2',
      heading: t('transaction_description'),
      subheading: selectedItem?.description,
    },
    {
      id: '3',
      heading: t('payment_method'),
      subheading: selectedItem?.description.includes('enrol') ? 'PayTabs' : t("points_program"),
    },
    {
      id: '4',
      heading: t('user_information'),
      subheading: selectedItem?.detail?.name, //user name from getme
    },
    {
      id: '5',
      heading: t('billing_address'),
      subheading: userData?.email, // also from getme
    },
  ];
  console.log('cardData==>', selectedItem?.description);

  const transactionData = [
    {id: '1', title: t('date'), value: '30 apil 2023'},
    {id: '2', title: t('status'), value: t('done')},
  ];

  const viewShotRef = useRef(null);

  function PrevewDocument(uri: string) {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if (Platform.OS === 'android') {
      getDownloadPermissionAndroid().then(granted => {
        if (granted) {
          let path = downloadFileAndroid(uri);
          if (path) {
            Utills.showToast("File Saved Successfully check notifiction bar", '', 'success');
          }
        }
      });
    } else {
      downloadFileIos(uri).then(res => {
        RNFetchBlob.ios.previewDocument(res.path());
      });
    }
  }

  const takeScreenshot = async () => {
    setIsLoading(true);
    if (viewShotRef.current) {
      try {
        const uri = await viewShotRef.current.capture();
        if (uri) {
          const formData = new FormData();

          formData.append('file', {
            uri:  Platform.OS === 'android'
            ? uri
            : uri.replace('file://', ''),
            // type: 'image/jpeg',
            type: mime.getType(uri),
            name: uri?.split('/')?.pop(),
          });
          const url = `${BASE_URL}api/v1/`;
          const res = await axios.post(`${url}media/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

          let liveUrlPath = res?.data?.responseData?.path;
          PrevewDocument(liveUrlPath);
        }
      } catch (error) {
        console.error('Error while taking screenshot:', error);
        Utills.showToast('', error);
        setIsLoading(false);
      }
    }
  };

  var date = new Date(selectedItem.createdAt);  

  return (
    <>
      <BackHeader heading={t('transaction_details')} isPrimary={false} />
      <ScrollView
        style={{
          marginBottom: Metrix.VerticalSize(30),
        }}>
        <View>

        <TransactionDetailsComponent
            heading={t('received_points')}
            customStyle={{ marginHorizontal: Metrix.HorizontalSize(15) }}
            // items={transactionData}
            item1txt={t('date')}
            item1value={`${date.toISOString().substring(0, 10)}`}
            item2txt={t('status')}
            item2value={t('done')}
            bottomHeadingTitle={t('amount')}
            bottomHeadingValue={`${t('sar')} ${selectedItem.coins}`}
          />

          <ViewShot ref={viewShotRef} style={{backgroundColor: 'white'}}>
            <View
              style={{
                // borderWidth:1,
                marginHorizontal: Metrix.HorizontalSize(20),
                marginTop: Metrix.VerticalSize(15),
              }}>
              <FlatList
                data={cardData}
                renderItem={({item, index}) => (
                  <UserTransactionInfo
                    key={index}
                    heading={item.heading}
                    subheading={item.subheading}
                  />
                )}
              />
            </View>
          </ViewShot>

          <View
            style={{
              marginTop: Metrix.VerticalSize(70),
              width: '90%',
              alignSelf: 'center',
            }}>
            <PrimaryButton
              isLoading={isLoading}
              onPress={takeScreenshot}
              title={t('get_invoice')}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
