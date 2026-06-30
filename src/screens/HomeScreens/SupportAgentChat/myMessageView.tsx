import React, { useState, useRef, useEffect } from "react";
import { Image, Text, View, Pressable, ScrollView, KeyboardAvoidingView, Platform, StatusBar, Dimensions, TouchableOpacity } from "react-native";
import { Images } from "../../../config";
import { useSelector } from "react-redux";
import { RootState } from "../HomeScreen";
import Linkify from 'react-native-linkify'

const MyMessageView = ({data}) => {
    
    const { message } = data

    const userData = useSelector((state: RootState) => state?.HomeReducer?.userData);    

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;

    return (
        <TouchableOpacity activeOpacity={1} style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 24, alignItems: "center"}} >

            <View style={{ marginLeft: 10, backgroundColor: "#396", borderRadius: 8, marginRight: 10, maxWidth: screenWidth - 100  }} >
            <Linkify linkStyle={ { color: 'blue' } } linkDefault={ true }>
                <Text style={{ fontSize: 14, color: "#fff", lineHeight: 24, padding: 8 }} >{message}</Text>
            </Linkify>
            </View>

            <Image style={{ height: 45, width: 45, borderRadius: 100 }} source={  userData?.profilePic ? { uri:  userData?.profilePic } : Images.user2  } resizeMode="contain" />

        </TouchableOpacity>
    )

}

export default MyMessageView;