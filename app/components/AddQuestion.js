import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import { BlurView } from 'expo-blur';
import colors from '../config/colors';

export function AddQuestions (dashboardBottomDims) {
    useEffect(()=>{
        //console.log((dashboardBottomDims["dashboardBottomDims"]))
    })
    return (
        <BlurView intensity={75}
            style={{height: dashboardBottomDims["dashboardBottomDims"], width: '100%', position: 'fixed', top:0, left: 0, display: 'flex', alignItems: 'center'}}>
            <View style={{flex:1, backgroundColor: 'rgba(186,85,255,0.5)', marginTop:'25%', marginBottom: '5%',width:'90%',alignItems: 'center', borderRadius:20}}>
                
            </View>
        </BlurView>
    )

}