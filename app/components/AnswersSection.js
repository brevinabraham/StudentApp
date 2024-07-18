import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';

export function AnswersSection({ onPress }) {
    return (
        <TouchableOpacity style={{flex:1, marginVertical:'1%'}} onPress={onPress}>
            <View style={{ alignSelf: 'center', justifyContent: 'center', width: '100%', height: '100%', backgroundColor: colors.logingreen, borderRadius: 20, display: 'flex', padding: 8 }}>
                <Text style={{ color: colors.black }}>
                    Answers Section
                </Text>
            </View>
        </TouchableOpacity>
    );
}