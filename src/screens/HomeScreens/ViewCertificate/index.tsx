import {ActivityIndicator, Dimensions, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

import React, {useState} from 'react';
import {ViewCertificateProps} from '../../propTypes';
import {BackHeader, CustomImage, MainContainer} from '../../../components';
import {t} from 'i18next';
import Pdf from 'react-native-pdf';
import {Images, Metrix, Utills} from '../../../config';
import {Image} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {  downloadFileAndroid, getDownloadPermissionAndroid, downloadFileIos } from '../../../config/utills/fileDownload';
import RNFetchBlob from 'react-native-blob-util'

export const ViewCertificate: React.FC<ViewCertificateProps> = ({}) => {
  const route = useRoute();
  const certificateData = route.params.certificatedata;

  const imageUrl = certificateData?.data?.image?.path;
  const pdfUrl =  certificateData?.data?.pdf?.path

  console.log("===>",pdfUrl,"==>imageUrl==>",imageUrl);

  function PrevewDocument(url: string) {             
    if (Platform.OS === 'android') {
      getDownloadPermissionAndroid().then(granted => {
        if (granted) {
          downloadFileAndroid(url);
        }
      });
    } else {
      downloadFileIos(url)
      .then(res => {
          RNFetchBlob.ios.previewDocument(res.path());
      });
    }
}

  return (
    <>
      <BackHeader heading={t('view_certificate')} />
      <MainContainer>

    <TouchableOpacity onPress={()=>{PrevewDocument(pdfUrl)}} style={styles.downloadIconContainer} >
      <Image
        source={Images.DownloadIcon}
        style={styles.icon}
      />
    </TouchableOpacity>

        <Image
          style={styles.pdf}
          source={{uri: imageUrl}}
           resizeMode="contain"
        />
      </MainContainer>
    </>
  );
};

const styles = StyleSheet.create({
  pdf: {
    // flex: 1,
    // backgroundColor: 'red',
    // borderWidth: 1,
    width: '100%',
    height: '100%',
  },
  downloadIconContainer: {
    position: "absolute", 
    right: 25, 
    top: 20,  
    zIndex: 999 
  },
  icon: {
    width: Metrix.customImageSize(50), 
    height: Metrix.customImageSize(50)
  }

});
