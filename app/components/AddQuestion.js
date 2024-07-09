import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { BlurView } from 'expo-blur';
import colors from '../config/colors';
import { retrieveQuestionTemplate } from '../config/apiServiceFeeds';

export function AddQuestions (dashboardBottomDims) {
    const [questionTemplate, setQuestionTemplate] = useState([])
    
    const getquestions = async () => {
        try {
            const response = await retrieveQuestionTemplate()
            setQuestionTemplate(response)
        } catch (err) {
            throw err
        }
    }

    useEffect(()=>{
        getquestions()
    },[])
    return (
        <BlurView intensity={75}
            style={{height: dashboardBottomDims["dashboardBottomDims"], width: '100%', position: 'absolute', top:0, left: 0, display: 'flex', alignItems: 'center'}}>
                <Text style={{fontSize: 25, fontWeight: 'bold', alignItems:'center', flex: 1, paddingTop: '25%'}}>
                    Add your question below!
                </Text>
            <ScrollView style={{flex:9, backgroundColor: 'rgba(186,85,255,0.5)', marginTop:'25%', marginBottom: '5%',width:'90%', borderRadius:20, padding: '2%'}}>
                {questionTemplate.map((question, index)=>(
                    <View key={question.id} >
                    
                    <View style={{
                        flex: 1,
                        backgroundColor: colors.primaryblue,
                        marginBottom: '25%',
                        width: '100%',
                        alignItems: 'center',
                        borderRadius: 20,
                        padding: 10,
                        
                    }}>
                        <Text>
                            {question.title}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {question.inputType}
                        </Text>
                    </View>
                    </View>
                ))}
            </ScrollView>
        </BlurView>
    )

}