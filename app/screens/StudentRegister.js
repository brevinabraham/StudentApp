import React, { useRef, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Animated } from 'react-native';


import colors from '../config/colors'
import loginScreenCSS from '../config/loginscreencss';

const Questions = [{
        id: "name",
        title: "Name",
        question: "Enter first and last name",
        keyboardtype: "ascii-capable"
    },{
        id: "phonenumber",
        title: "Phone Number",
        question: "Enter your phone number",
        keyboardtype: "phone-pad"
    },{
        id: "email",
        title: "Email address",
        question: "Enter your email address",
        keyboardtype: "email-address"
    },{
        id: "password",
        title: "Password",
        question: "Enter your password",
        keyboardtype: "visible-password"
    },{
        id: "confirmPassword",
        title: "Confirm Password",
        question: "Enter your password",
        keyboardtype: "visible-password"
    }]

function StudentRegister({navigation}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const translationYvalue = useRef(new Animated.Value(0)).current
    const fadeout = useRef(new Animated.Value(100)).current

    useEffect(() => {(currentQuestionIndex >0 ) &&(
        Animated.timing(translationYvalue,{
            toValue: 50,
            useNativeDriver: true
        })).start()
    },[])

    const handleNextQuestion = () => {
        Animated.parallel([
            Animated.timing(translationYvalue, {
            toValue: 500,
            duration: 125,
            useNativeDriver: true,
            }),
            Animated.timing(fadeout, {
            toValue: 0,
            useNativeDriver: true,
            })]
        ).start(() => {
            setCurrentQuestionIndex((prevIndex) => prevIndex == Questions.length ? Questions.length : prevIndex + 1 );
            Animated.parallel([
                Animated.timing(translationYvalue, {
                toValue: '0',
                duration: 125,
                useNativeDriver: true,
                }),
                Animated.timing(fadeout, {
                toValue: 100,
                useNativeDriver: true,
                })
            ]).start()})
    }

    const handlePrevQuestion = () => {
        Animated.parallel([
            Animated.timing(translationYvalue, {
            toValue: 500,
            duration: 125,
            useNativeDriver: true,
            }),
            Animated.timing(fadeout, {
            toValue: 0,
            useNativeDriver: true,
            })]
        ).start(() => {
            setCurrentQuestionIndex((prevIndex) => prevIndex == 0 ? 0 : prevIndex- 1);
            Animated.parallel([
                Animated.timing(translationYvalue, {
                toValue: '0',
                duration: 125,
                useNativeDriver: true,
                }),
                Animated.timing(fadeout, {
                toValue: 100,
                useNativeDriver: true,
                })
            ]).start()})
    }

    return (
        <SafeAreaView style={{flex: 1, alignContent: "center" }}>
            <KeyboardAvoidingView behavior='padding' style ={{flex: 1}}>
            <ScrollView contentContainerStyle = {{alignItems: "center", gap: '5%', flexGrow: 1}}>
                <View style={[loginScreenCSS.LoginContainersEmptyColor,{flex:8}]}>
                    <ImageBackground source={require('../assets/StudentRegister.jpg')}
                        style = {{
                        width: "100%", height: "100%", alignContent: "stretch"
                        , overflow: 'hidden', borderRadius: 55}}>
                    </ImageBackground>
                </View>
                <View style={[loginScreenCSS.LoginContainersEmptyColor, {flex: 1,gap: '5%'}]}>            
                    <Text style ={[loginScreenCSS.EmptyBackgroundTextTitle,
                        {flex: 1, color: colors.primarylightpurple,fontSize: 40,margin: 0}]}> 
                        Register a Student
                    </Text>
                    <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                        {flex: 1, color: colors.primarylightpurple, margin: 0, padding:0}]}> 
                        Register and ask questions today!
                    </Text>
                </View>
                 <Animated.View
                style={[
                    loginScreenCSS.LoginContainersEmptyColor,
                    {
                        backgroundColor: colors.primarylightpurple,
                        flex: 1,
                        borderRadius: 20,
                        paddingTop: '4%',
                        paddingBottom: '4%',
                        gap: '5%',
                        transform: [
                            {translateY: translationYvalue}
                        ],
                        opacity: fadeout
                    },
                    ]}
                >
                    {Questions.map((question, index) => (
                    index === currentQuestionIndex && (
                    <View key={question.id} style={[loginScreenCSS.LoginContainersEmptyColor
                        , { backgroundColor: colors.white, flex: 1, borderRadius: 20, paddingTop: '4%'
                            , paddingBottom: '4%', alignItems: "flex-start", paddingLeft: "5%" }]}>
                        <Text style={{ color: colors.black, flex: 1 }}>
                            {question.title}:
                        </Text>
                        <View style={[loginScreenCSS.LoginContainersEmptyColor
                            , { backgroundColor: colors.primarylightpurple, flex: 1, borderRadius: 20, paddingTop: '4%'
                            , paddingBottom: '4%', alignItems: "center", alignContent: "center"
                            , justifyContent: "center" }]}>
                            <TextInput key={question.id} placeholder={question.question}
                            keyboardType={question.keyboardtype} placeholderTextColor={colors.white} />
                        </View>
                        </View>
                    )
                    ))}
                </Animated.View>
                <View style={[loginScreenCSS.LoginContainersEmptyColor,{flex:1, flexDirection: "row"}]}>
                    <TouchableOpacity onPress={handlePrevQuestion}
                        style = {[loginScreenCSS.LoginContainersEmptyColor,
                        { backgroundColor: colors.primarylightpurple, alignItems: "center", alignContent: "center"
                        , justifyContent: "center"}]}>
                        <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                        {color: colors.white, paddingTop: '2%', paddingBottom: '2%', fontSize: 30}]}> 
                            {'<'}
                        </Text>      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextQuestion}
                        style = {[loginScreenCSS.LoginContainersEmptyColor,
                        { backgroundColor: colors.primarylightpurple, alignItems: "center", alignContent: "center"
                        , justifyContent: "center"}]}>
                        <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                        {color: colors.white, paddingTop: '2%', paddingBottom: '2%', fontSize: 30}]}> 
                            {'>'}
                        </Text>      
                    </TouchableOpacity>
                </View>


            </ScrollView>
            
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default StudentRegister;

