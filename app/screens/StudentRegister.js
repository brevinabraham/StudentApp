import React, { useRef, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TextInput, ScrollView, KeyboardAvoidingView, TouchableOpacity, Animated } from 'react-native';
import { enGB, registerTranslation, DatePickerInput, tr } from 'react-native-paper-dates';
import axios from 'axios';

import colors from '../config/colors'
import loginScreenCSS from '../config/loginscreencss';

registerTranslation('en-GB', enGB)

function StudentRegister({navigation}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const translationYvalue = useRef(new Animated.Value(0)).current
    const fadeout = useRef(new Animated.Value(100)).current
    const [Questions, setQuestions] = useState([])
    const [inputDate, setInputDate] = React.useState(new Date())

    useEffect(() => {
        axios.get('http://13.60.35.183:8000/questions/')
            .then(response => setQuestions(response.data))
            .then(() => console.log(Questions))
            .catch(err => console.error('Error fetching questions:',err))
    },[setQuestions])

    useEffect(() => {(currentQuestionIndex >0 ) && (
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
            <ScrollView contentContainerStyle = {{alignItems: "center", flexGrow: 1}}>
                <View style={[loginScreenCSS.LoginContainersEmptyColor,{flex:8}]}>
                    <ImageBackground source={require('../assets/StudentRegister.jpg')}
                        style = {{
                        width: "100%", height: "100%", alignContent: "stretch"
                        , overflow: 'hidden', borderRadius: 55}}>
                    </ImageBackground>
                </View>
                <View style={[loginScreenCSS.LoginContainersEmptyColor, {flex: 1}]}>            
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
                        transform: [
                            {translateY: translationYvalue}
                        ],
                        opacity: fadeout
                    },
                    ]}
                >
                    {Questions.map((question, index) => (
                    index === currentQuestionIndex && (
                    <View key={question.var_id} style={[loginScreenCSS.LoginContainersEmptyColor
                        , { backgroundColor: colors.white, flex: 1, borderRadius: 20, paddingTop: '4%'
                            , paddingBottom: '4%', alignItems: "flex-start", paddingLeft: "5%" }]}>
                        <Text style={{ color: colors.black, flex: 1 }}>
                            {question.title}:
                        </Text>
                        <View style={[loginScreenCSS.LoginContainersEmptyColor
                            , { backgroundColor: colors.primarylightpurple, flex: 1, borderRadius: 20, paddingTop: '4%'
                            , paddingBottom: '4%', alignItems: "center", alignContent: "center"
                            , justifyContent: "center" }]}>
                            {question.title.toLowerCase().includes("date") ? (
                                <DatePickerInput
                                    locale="en-GB"
                                    mode = "single"
                                    value={inputDate}
                                    onChange={(d) => setInputDate(d)}
                                    inputMode = "start"
                                    presentationStyle = "pageSheet"
                                    autoComplete={question.autocomplete} 
                                    style = {{ color: colors.white, height: '75%', borderRadius: 20}}
                                    focusable = {true}
                                    onFocus={() => currentQuestionIndex == index ? this.textInput.focus() : false}
                                    />
                            ) : (
                                
                                <TextInput 
                                    key={question.var_id} 
                                    placeholder={question.question}
                                    keyboardType={question.keyboardtype} 
                                    autoComplete={question.autocomplete} 
                                    placeholderTextColor={colors.white} 
                                    focusable = {true}
                                    onFocus={() => currentQuestionIndex == index ? this.textInput.focus() : false}
                                    />
                            )}
                        </View>
                        </View>
                    )
                    ))}
                </Animated.View>
                <View style={[loginScreenCSS.LoginContainersEmptyColor,{flex:1, flexDirection: "row"}]}>
                    <TouchableOpacity onPress={handlePrevQuestion}
                        style = {[loginScreenCSS.LoginContainersEmptyColor,
                        { backgroundColor: colors.primarylightpurple, alignItems: "center", alignContent: "center"
                        , justifyContent: "center"}]}
                        focusable = {true}      
                        >
                        <Text style ={[loginScreenCSS.EmptyBackgroundText, 
                        {color: colors.white, paddingTop: '2%', paddingBottom: '2%', fontSize: 30}]}> 
                            {'<'}
                        </Text>      
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleNextQuestion}
                        style = {[loginScreenCSS.LoginContainersEmptyColor,
                        { backgroundColor: colors.primarylightpurple, alignItems: "center", alignContent: "center"
                        , justifyContent: "center"}]}
                        focusable = {true}      
                        >
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

