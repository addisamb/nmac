import {
  ActivityIndicator,
  Modal,
  Platform,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {Colors, Images, Metrix, Utills} from '../../config';
import {ActivityIndicatorProps} from 'react-native-paper';
import {useSelector} from 'react-redux';
// import {RootState} from '../../redux/reducers';
import {CustomText, LottieAnimatedComponent} from '..';
import {useThemeHook} from '../../hooks';
import {Image} from 'react-native';

type LoaderProps = ActivityIndicatorProps & {};
//anas
//muneeb
export const Loader: React.FC<LoaderProps> = ({size = 'large'}) => {
  const isLoadingAuth = useSelector(state => state?.AuthReducer?.authLoader);
  const isLoadingHome = useSelector(state => state?.HomeReducer?.homeLoader);

  if (isLoadingAuth || isLoadingHome) {
    return (
      <Modal
        visible={isLoadingAuth || isLoadingHome}
        // visible={isLoadingAuth || isLoadingHome}
        transparent={true}
        animationType={'fade'}>
        <View style={styles.mainContaienr}>
          {/* <CustomText.MediumText>
            {`Auth : ${checkingAuthActionLoader}`}
            {`Home : ${checkingHomeActionLoader}`}
          </CustomText.MediumText> */}
          {/* <ActivityIndicator size={size} color={Utills.selectedThemeColors().Primary} /> */}

          <LottieAnimatedComponent speed={2}/>
          {/* <Image
            source={es.NMOImag}
            style={{
              width: '70%',
              height: '40%',
            }}
            resizeMode="contain"
          /> */}
        </View>
      </Modal>
    );
  } else {
    return null;
  }
};

interface LoaderStyles {
  mainContaienr: ViewStyle;
}
const styles = StyleSheet.create<LoaderStyles>({
  mainContaienr: {
    flex: 1,
    backgroundColor: Utills.selectedThemeColors().BaseOpacity('1'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});