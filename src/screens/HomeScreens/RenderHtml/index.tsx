import {
    BackHandler,
    Button,
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import {
    BackHeader,
    CategoryBtnsList,
    ChipButtonComponent,
    CustomInput,
    CustomText,
    MainContainer,
    PrimaryButton,
    ScrollableContainer,
    TransactionDetailsComponent,
    UserTransactionInfo,
  } from '../../../components';
  import {
    FontType,
    Images,
    Metrix,
    NavigationService,
    RouteNames,
    Utills,
  } from '../../../config';
//   import {Text} from 'react-native';
  import React, { useEffect, useState } from 'react';
  import HTML from 'react-native-render-html';
import { useDispatch } from 'react-redux';
import { GetProfileData, getHtmlData } from '../../../Redux/Action/HomeActions/homeActions';
import { Svg, Path, Rect, Text, G, Defs, ClipPath } from 'react-native-svg';

  type RouteProps = {

  };
  
  type RenderHtmlScreenProps = {

  };
  
  export const RenderHtmlScreen: React.FC<RenderHtmlScreenProps> = ({

  }) => {
    
    const htmlContent = '<p>Hello, <strong>React Native</strong>!</p>';

    const [renderHtml, setrenderHtml] = useState<null>(null);
    const dispatch = useDispatch();
    
    useEffect(() => {
        getHtml();
      }, []);

      async function getHtml() {
        let res = await dispatch(getHtmlData());

        if (res?.status) {
            setrenderHtml(res.data.certificateHTML)
            console.log("res===>",res.data.certificateHTML);
        }
        

      }

    return (
        <View> 
        {renderHtml ? <HTML source={{ html: htmlContent }} /> : <Text>sot found</Text>}

      </View>
    );
  };
  
  const styles = StyleSheet.create({});
  