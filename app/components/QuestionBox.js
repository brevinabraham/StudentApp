import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';

function formatDate(isoDate) {
    const date = new Date(isoDate);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    const formattedDate = date.toLocaleString('en-GB', options).replace(',', '');
    return formattedDate;
}

export function QuestionBox ({question, img}) {

    return (
        <TouchableOpacity style={{backgroundColor: colors.primaryblue, borderRadius: 15, margin: 10, padding: 10, display: 'flex'}}>
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
                            {question.user_id}
                        </Text>
                    </View>
                </View>
                
                <Text style={{flex: 1, paddingVertical:10}}>
                    {question.content}
                </Text>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold', fontSize:10, flex: 1}}>
                        {formatDate(question.created_at)}
                    </Text>
                    <View style={{alignItems:'flex-end'}}>
                        <Text style={{fontWeight: 'bold', fontSize:10, flex: 1}}>
                            {question.comments_count}
                        </Text>
                    </View>
                    
                </View>
        </TouchableOpacity>
        
    )
    
}