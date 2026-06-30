import React, { useState, useRef, useEffect } from "react";
import { Image, Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Dimensions, TouchableOpacity, Linking, I18nManager } from "react-native";
import { Images, Metrix, NavigationService, RouteNames } from "../../../config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../HomeScreen";
import ActionType from "../../../Redux/Action/ActionType/actionType";
import { HandleNavigationAndroid, HandleNavigationIOS, getMediaIcon } from "../../../config/utills/imagesIconHandler";
import Linkify from 'react-native-linkify'

const SenderView = ({data}) => {
    
    const { message, media } = data
    const userData = useSelector((state: RootState) => state?.HomeReducer?.userData);
    const dispatch  = useDispatch();

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const websiteRegix = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;

    
    function ShowContent(data) {

        if (userData?.type == 'guest') {
          dispatch({type: ActionType.PLEASE_LOGIN, payload: true});
          return
        }
      
        // if (data[0]?.path?.toLowerCase()?.split('.').pop() == 'mov' || data[0]?.path?.toLowerCase()?.split('.').pop() == 'mp4') {
        //   NavigationService.navigate(RouteNames.HomeRoutes.VideoPlayerScreen,{
        //     name: data?.title,
        //     description: "this is description",
        //     title: data?.title,
        //     videourl: data[0]?.path,
        //     id: data?._id
        //   })
        // }
        // else{

          if (Platform.OS == 'android') {
            
            const extension = data[0]?.path?.toLowerCase()?.split('.').pop();
            if (extension == 'vtt') {
              Linking.openURL(data?.media?.path)
              return
            }

            let FormatedUrl = HandleNavigationAndroid(data[0]?.path)
              NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen,{
              url: FormatedUrl,
              movetoCourseDetail: "back",
              movetoIndex: 0,
              documentTitle: data[0]?.name
            })
          }
          else if (Platform.OS == 'ios'){
            let FormatedUrl = HandleNavigationIOS(data[0]?.path)
              NavigationService.navigate(RouteNames.HomeRoutes.WebViewScreen,{
              url: FormatedUrl,
              movetoCourseDetail: "back",
              movetoIndex: 0,
              documentTitle: data[0]?.name
            })
          }
        // }    
      }

    
    return (
        <TouchableOpacity  activeOpacity={1} style={{ flexDirection: "row", justifyContent: "flex-start", marginTop: 24, alignItems: "center", marginRight: 15 }} >
            <Image style={{ height: 45, width: 45, borderRadius: 100 }} source={I18nManager?.isRTL ? Images.ArabicLogo : Images.NMO} resizeMode="contain" />
            {message ? 
            <View  style={{ marginLeft: 10, backgroundColor: "#F6F6F6", borderRadius: 8, marginRight: 10, maxWidth: screenWidth - 100 }} >    
             <Linkify linkStyle={ { color: '#2980b9'} } linkDefault={ true }>
                <Text style={{ fontSize: 14, color: "#161719",  padding: 8 }} >{message}</Text>
             </Linkify>
            </View>
            :
            <TouchableOpacity onPress={()=>{ ShowContent(media) }} style={{ marginLeft: 10, backgroundColor: "#F6F6F6", borderRadius: 8, marginRight: 10, maxWidth: screenWidth -90, flexDirection: "row", alignItems: "center" }} >
              <Image style={{ height: Metrix.VerticalSize(20), width: Metrix.HorizontalSize(20), left: 2, tintColor: "#000" }} source={getMediaIcon(media[0]?.path)} resizeMode="contain" />
              <Text style={{ fontSize: 14, color: "#161719",  padding: 8, textDecorationLine: "underline" }} >{media[0]?.name}</Text>
            </TouchableOpacity>
        }
        </TouchableOpacity>
    )

}

export default SenderView;
