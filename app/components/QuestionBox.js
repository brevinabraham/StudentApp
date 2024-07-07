import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';

export function QuestionBox ({question, img}) {
    // const [allUserFeedQuestions, setAllUserFeedQuestions] = useState([])

    // const getAllQuestions = ({question}) => {
    //     try {
    //         const response = await userFeedQuestions()
    //         console.log(response)
    //         setAllUserFeedQuestions(response)
    //     } catch (err) {
    //         throw err
    //     }
    // } 

    // useEffect(() => {getAllQuestions()},[])

    return (
        <View style={{backgroundColor: colors.primaryblue, borderRadius: 15, margin: 10, padding: 10, display: 'flex'}}>
            <View style={{flex:1, display: 'flex', flexDirection: 'row',  alignSelf: 'flex-start', width: '100%', paddingBottom:5}}>
                <ImageBackground
                style={{padding: 20, borderRadius:100, overflow: 'hidden', flexShrink: 1}}
                source={img}
                />
                <View style={{alignSelf: 'center',paddingLeft: '5%'}}>
                    <Text style={{fontWeight: 'bold', fontSize:20, flex: 1}}>
                        {question.title}
                    </Text>
                    <Text style={{fontWeight: 'bold', fontSize:10, flex: 1}}>
                        {question.id}
                    </Text>
                </View>
            </View>
            
            <Text style={{flex: 1, paddingVertical:10}}>
                {question.content}
            </Text>
            <Text style={{flex:1}}>
                {question.created_at}
            </Text>
        </View>
    )
    
}