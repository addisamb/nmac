import React, {ReactNode} from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  Platform,
  ViewStyle,
} from 'react-native';
import {Colors, FontType, Images, Metrix, Utills} from '../../config';
import {useThemeHook} from '../../hooks';
import utills from '../../config/utills';
import {AuthHeader, CustomText, SecondaryButton} from '..';
import {normalizeFont} from '../../config/metrix';

type ModalProps = {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;
  childrenViewStyle?: ViewStyle;
  smallModal?: boolean;
  crossIcon?: boolean;
  smallContainerStyles?: ViewStyle;
  bottomModal?: boolean;
  bottomContainerStyles?: ViewStyle;
  hitSlop?: any
};

export const CustomModal: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  childrenViewStyle,
  smallModal,
  crossIcon,
  smallContainerStyles,
  bottomModal,
  bottomContainerStyles,
  hitSlop,
}) => {
  // const {Colors} = useThemeHook();

  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={onClose}
      animationType={Platform.OS == 'ios' ? 'slide' : 'fade'}>
      <SafeAreaView style={[styles.modalContainer]}>
        <TouchableOpacity
          style={[
            styles.modalContainer,
            smallModal && {
              alignItems: 'center',
              justifyContent: 'center',
            },
          ]}
          activeOpacity={0.9}
          onPress={() => !bottomModal && {}}>
          {smallModal ? (
            <View style={[styles.smallModalContent, smallContainerStyles]}>
              <TouchableOpacity
              hitSlop={hitSlop}
                style={{
                  // borderWidth:1,
                  left:120,
                  alignItems: 'flex-end',
                }}
                activeOpacity={0.6}
                onPress={onClose}
                >
                {crossIcon ? (
                  <Image
                    source={Images.Cross}
                    resizeMode="contain"
                    style={{
                      width: Metrix.HorizontalSize(25),
                      height: Metrix.VerticalSize(25),
                    }}
                  />
                ) : null}
              </TouchableOpacity>
              {children}
            </View>
          ) : bottomModal ? (
            <View style={[styles.bottomModalContent, bottomContainerStyles]}>
              <TouchableOpacity
              // hitSlop={50}
                hitSlop={500}
                onPress={onClose}
                style={styles.bottomModalStyles}></TouchableOpacity>
              {children}
            </View>
          ) : (
            <View style={styles.modalContent}>
              {/* <TouchableOpacity activeOpacity={0.6} onPress={onClose}>
                <Image
                  source={Images.Cross}
                  resizeMode="contain"
                  style={{
                    width: Metrix.HorizontalSize(35),
                    height: Metrix.VerticalSize(35),
                  }}
                />
              </TouchableOpacity> */}
              <View style={[styles.childrenView, childrenViewStyle]}>
                {children}
              </View>
            </View>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: Utills.selectedThemeColors().BaseOpacity('0.6'),
  },
  modalContent: {
    flex: 1,
    width: '100%',
    maxHeight: '100%',
    paddingTop: Metrix.VerticalSize(20),
    paddingHorizontal: Metrix.HorizontalSize(20),
    backgroundColor: Utills.selectedThemeColors().Base,
  },
  childrenView: {
    // borderWidth: 1,
    // borderColor: 'yellow',
    flex: 1,
    marginTop: Metrix.VerticalSize(20),
  },

  bottomModalContent: {
    // borderWidth: 1,
    marginTop: Metrix.VerticalSize(40),
    top: '50%',
    width: '100%',
    height: '50%',
    backgroundColor: Utills.selectedThemeColors().Base,
    borderRadius: Metrix.VerticalSize(20),
    // alignItems: 'center',
    // justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    borderColor: 'red',
    // height: '100%',
    // borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    padding: Metrix.VerticalSize(0),
    ...Metrix.createShadow,
  },
  smallModalContent: {
    // borderWidth: 1,
    height: '47%',
    width: '80%',
    backgroundColor: Utills.selectedThemeColors().Base,
    borderRadius: Metrix.VerticalSize(20),
    alignItems: 'center',
    borderColor: Utills.selectedThemeColors().TextInputBorderColor,
    padding: Metrix.VerticalSize(15),
    ...Metrix.createShadow,
  },
  bottomModalStyles: {
    alignSelf: 'center',
    borderRadius: 10,
    height: Metrix.VerticalSize(10),
    width: Metrix.HorizontalSize(140),
    marginTop: Metrix.VerticalSize(20),
    backgroundColor: utills.selectedThemeColors().Primary,
  },
});
