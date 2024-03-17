import React, {useState, useEffect} from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';

import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'
import { TextInput } from 'react-native-web';

function LoginScreen({prop,navigation}) {
    const [showLoginForm, setShowLoginForm] = useState(false)
    const [loginform, setloginform] = useState({})
    const [isFormValid, setIsFormValid] = useState(false);

    const checkFormValidity = () => {
        if (loginform.email.length >0 && loginform.password.length >0) {
            setIsFormValid(true);
        } else {
            setIsFormValid(false);
        }
    };
    const handleInputChange = (key, value) => {
        console.log(loginform)
        setloginform({ ...loginform, [key]: value });
        checkFormValidity();
    };
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
                        width: "100%", height: "100%", alignContent: "center"
                        ,paddingTop: '5%', paddingBottom: '5%'
                    }}
                    source = {require('../assets/WelcomeMainPicture.jpg')}>
                </ImageBackground>            
            </View>
            {!showLoginForm &&
            <View style = {[loginscreencss.LoginContainersEmptyColor,
                {flexDirection: "row"}]}>
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
            </View>}
            {showLoginForm && 
            <View style = {[loginscreencss.LoginContainersEmptyColor,{
                backgroundColor: colors.logingreen,marginTop: '2%', marginBottom: '2%'
                , borderRadius: 20
            }]}>
                <View style = {{alignItems: "center",flexDirection: "column"
                    , flex: 1
                    , width: "100%", paddingTop: "2%", paddingBottom: "4%"
                    , alignItems: "center", alignContent: "center", justifyContent: "center"}}>
                    <View style = {[loginscreencss.LoginContainersEmptyColor,{alignItems: "center"
                        , alignContent: "center"
                        , justifyContent: "center"}]}>
                        <TextInput 
                            style = {{backgroundColor: colors.white
                            , color: colors.black
                            , borderRadius: 20
                            , width: "100%"
                            , height: "75%"
                            }}
                            label = "email"
                            placeholder="email"
                            onChange = {(d) => handleInputChange("email",d.target.value)}
                        />
                    </View>
                    <View style = {[loginscreencss.LoginContainersEmptyColor,{alignItems: "center"
                        , alignContent: "center"
                        , justifyContent: "center"}]}>
                        <TextInput 
                            style = {{backgroundColor: colors.white
                                , color: colors.black
                                , borderRadius: 20
                                , width: "100%"
                                , height: "75%"
                                }}
                            label = "password"
                            placeholder="password"
                            onChange = {(d) => handleInputChange("password",d.target.value)}
                        />
                    </View>
                    {isFormValid &&
                    <TouchableOpacity style = {[loginscreencss.LoginContainersEmptyColor,
                    { backgroundColor: colors.white, borderRadius: 20, height: "60%"}]}>
                        <Text>
                            Submit
                        </Text>
                    </TouchableOpacity>}
                </View>
            </View>
            }
            {!isFormValid &&
            <TouchableOpacity style = {[loginscreencss.LoginContainersEmptyColor, 
                {flex: 0.5}]} onPress={() => setShowLoginForm(!showLoginForm)}>
                <Text style = {[loginscreencss.EmptyBackgroundText,{color:colors.black}]}>
                    login
                </Text>               
            </TouchableOpacity>}
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