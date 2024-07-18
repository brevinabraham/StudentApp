import React from 'react';
import { Text, View } from 'react-native';
import colors from '../config/colors';

export function SearchBox() {


    return (
        <View style={{ alignSelf: 'center', justifyContent: 'center', width: '95%', backgroundColor: colors.logingreen, borderRadius: 20, display: 'flex', padding: 8, marginVertical: 5}}>
            <Text style={{color: colors.black, paddingLeft: 25}}>
                Hi search here ... [not working atm]
            </Text>
        </View>
    )
}