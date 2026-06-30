import { FlatList, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
    BackHeader,
    CourseCardsHorizontalList,
    CustomInput,
    CustomModal,
    CustomText,
    MainContainer,
    PlaceholderComponent,
    PrimaryButton,
    RoundBorderCardComponent,
    WalletCardComponent,
} from '../../../components';
import { MyWalletScreenProps, WithdrawdetailProps } from '../../propTypes';
import { BackHandler } from 'react-native';
import {
    Colors,
    FontType,
    Images,
    Metrix,
    NavigationService,
    RouteNames,
    Utills,
} from '../../../config';
import { t } from 'i18next';
import metrix, { normalizeFont } from '../../../config/metrix';
import { head } from 'lodash';
import { Formik } from 'formik';
import { changePasswordApi } from '../../../Redux/Action/AuthActions/authActions';
import { useDispatch } from 'react-redux';
import { validUserForPaymnet } from '../../../Redux/Action/ProfileActions/profileActions';
import colors from '../../../config/colors';
import InputFieldMask from '../../../components/MaskInputField';

export const Withdrawdetail: React.FC<WithdrawdetailProps> = ({ }) => {

    const[stateData, setStateData] = useState({
        number: '',
        // expDate: '',
        // cvv: '',
        cardType: ''
    })
    
    function Next() {

        if (stateData?.cardType == '') {
            Utills.showToast('Please Select Card Type (Master/Visa)', '', 'error');
        } 
        else if (stateData?.number?.length < 19) {
            Utills.showToast('Enter Valid Card Number', '', 'error');
        } 
        // else if (stateData?.expDate < 5){
        //     Utills.showToast('Enter Valid Expiry Date ', '', 'error');
        // } 
        // else if (stateData?.cvv?.length < 3){
        //     Utills.showToast('Enter Valid CVV number', '', 'error');
        // }
        else{
        NavigationService.navigate(
            RouteNames.HomeRoutes.WidthdrawAmountScreen,{
                cardData: stateData
            }
        );
        }        
    }

    function RenderContent() {

        function renderImage(img: Image, margin, cardType ) {
            return(
            <TouchableOpacity onPress={()=>{ setStateData({...stateData, cardType: cardType})  }} style={[styles.ImgContainer, margin, { } ]} >
                <Image
                  source={img}
                  style={{
                      width: 40,
                      height: 40,
                      // borderWidth: 1,
                      // backgroundColor: "red",
                      alignSelf: 'center',
                    }}
                    resizeMode="contain"
                />
            </TouchableOpacity>
            )
        }

        return (
            <View>
                <View style={{ alignItems: "center", marginTop: Metrix.VerticalSize(30), }} >
                    <CustomText.MediumText
                        customStyle={{
                            fontSize: normalizeFont(15),
                            paddingLeft: Metrix.HorizontalSize(7),
                        }}>
                        {t('select_withdrawal_method')}
                    </CustomText.MediumText>
                </View>

                <View style={styles.twoImgCont} >
                {renderImage(Images.MasterImg, {marginRight: 20, backgroundColor: stateData.cardType == 'MasterCard' ? Colors.TertiaryTextColor : Colors.WhiteTwentyOpacity }, 'MasterCard' )}
                {renderImage(Images.VisaImg, {marginLeft: 20, backgroundColor: stateData.cardType == 'VisaCard' ? Colors.TertiaryTextColor : Colors.WhiteTwentyOpacity  }, 'VisaCard' )}
                </View>

                <View style={{ marginHorizontal: 20 }} >

                <View>
                  <CustomText.MediumText
                    customStyle={{
                        fontSize: normalizeFont(15),
                        marginTop: Metrix.VerticalSize(30)
                    }}>
                    {t('credit_card_details')}
                  </CustomText.MediumText>
                </View>

                <InputFieldMask
                marginTop={20}
                fullWudth={'100%'}
                title={`${t('card_number')}`}
                returnType={'done'}
                imgStyle={{ marginTop: 10, width: 35, height: 35 }}
                img={Images.MasterImg}
                maxLen={19}
                height={45}
                placeholderTextColor={Utills.selectedThemeColors().GrayTextColor}
                placeholder="0000-0000-0000-0000"
                onChangeText={(e)=>{  setStateData({...stateData, number: e})  }}
                value={stateData.number}
                mask={[ /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/ ]}
                keyboardType={"numeric"}
                />

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }} >
                {/* <InputFieldMask
                marginTop={20}
                fullWudth={'45%'}
                title={`${t('Expired Date')}`}
                returnType={'done'}
                imgStyle={{ marginTop: 10, width: 30, height: 30 }}
                img={Images.CalanderImg}
                maxLen={19}
                height={45}
                placeholderTextColor={Utills.selectedThemeColors().GrayTextColor}
                placeholder="MM/YY"
                onChangeText={(e)=>{  setStateData({...stateData, expDate: e})  }}
                value={stateData.expDate}
                mask={[ /\d/, /\d/, '/', /\d/, /\d/ ]}
                keyboardType={"numeric"}
                /> */}
                {/* <InputFieldMask
                marginTop={20}
                fullWudth={'45%'}
                title={`${t('CVV')}`}
                returnType={'done'}
                imgStyle={{ marginTop: 10, width: 40, height: 40 }}
                img={Images.CvvImg}
                maxLen={19}
                height={45}
                placeholderTextColor={Utills.selectedThemeColors().GrayTextColor}
                placeholder="000"
                onChangeText={(e)=>{  setStateData({...stateData, cvv: e})  }}
                value={stateData.cvv}
                mask={[ /\d/, /\d/, /\d/ ]}
                keyboardType={"numeric"}
                /> */}

                </View>

                </View>

            </View>
        )
    }

    function RenderBtn() {
        return (
            <PrimaryButton
                onPress={() => {
                    Next()
                }}
                customStyles={{
                    marginTop: Metrix.VerticalSize(10),
                    height: Metrix.VerticalSize(50),
                    width: '90%',
                    alignSelf: "center",
                    position: "absolute",
                    bottom: 0
                }}
                title={t('continue_widthdraw')}
            />
        )
    }

    return (
        <View style={styles.viewStyle} >
            <BackHeader heading={t('withdrawal_method')} />
            {RenderContent()}
            {RenderBtn()}
        </View>
    );
};

const styles = StyleSheet.create({
    viewStyle: {
        backgroundColor: Utills.selectedThemeColors().Base,
        flex: 1,
    },
    ImgContainer: { borderColor: Utills.selectedThemeColors().BlackOpacity, borderWidth: 0.6, borderRadius: 10, paddingVertical: 5, paddingHorizontal: 20 },
    twoImgCont: { flexDirection: "row", justifyContent: "center", marginTop: Metrix.VerticalSize(30) }
});