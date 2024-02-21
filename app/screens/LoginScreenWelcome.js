import React from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';

import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'

function LoginScreen({prop,navigation}) {
    return (
        <SafeAreaView style = {[loginscreencss.LoginBackground, {backgroundColor: colors.white}]}>
            <View style = {loginscreencss.LoginContainersEmptyColor}>
                <Text style = {[loginscreencss.EmptyBackgroundTextTitle,
                    {fontSize: 40,marginTop: '5%', marginBottom: '5%', color:colors.black}]}>
                    Connect with experts
                </Text>               
            </View>
            <View style = {loginscreencss.LoginContainersEmptyColor}>
                <Text style = {[loginscreencss.EmptyBackgroundText,{color:colors.black}]}>
                    Get answers to your academic questions instantly
                </Text>               
            </View>
            <View style = {[loginscreencss.LoginContainersEmptyColor,
                {flex: 5, backgroundColor: colors.white}]}>
                <ImageBackground 
                    style = {{
                        width: "100%", height: "100%", alignContent: "center",paddingTop: '5%', paddingBottom: '5%'
                    }}
                    source = {require('../assets/WelcomeMainPicture.jpg')}>
                </ImageBackground>            
            </View>
            <View style = {[loginscreencss.LoginContainersEmptyColor,
                {flexDirection: "row", gap: '5%'}]}>
                <TouchableOpacity onPress={() => navigation.navigate('StudentRegister')}
                    style = {[loginscreencss.LoginContainersEmptyColor,
                    {flex:1, backgroundColor: colors.primarylightpurple}]}>
                    <Text style = {[loginscreencss.EmptyBackgroundTextTitle, 
                        {color: colors.white}]}>
                        Student
                    </Text>      
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TeacherRegister')}
                    style = {[loginscreencss.LoginContainersEmptyColor,
                    {flex:1, backgroundColor: colors.primaryblue}]}>
                    <Text style = {[loginscreencss.EmptyBackgroundTextTitle, 
                        {color: colors.white}]}>
                        Teacher
                    </Text>      
                </TouchableOpacity>
            </View>

            <TouchableOpacity style = {[loginscreencss.LoginContainersEmptyColor, 
                {flex: 0.5}]}>
                <Text style = {[loginscreencss.EmptyBackgroundText,{color:colors.black}]}>
                    login
                </Text>               
            </TouchableOpacity>
            <View style = {[loginscreencss.LoginContainersEmptyColor]}>
                <ImageBackground style = {{width: '100%', height: '100%', borderRadius: 55, overflow: 'hidden'}}
                    source = {require('../assets/WelcomeMainBottomBar.jpg')}>
                <Text style = {[loginscreencss.EmptyBackgroundText,
                    {color:colors.black,alignSelf: "center", paddingTop: '3%' }]}>
                    Need help?
                </Text>             
                
                </ImageBackground>   
            </View>
        </SafeAreaView>
    );
}


export default LoginScreen;