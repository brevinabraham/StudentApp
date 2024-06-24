import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { details, logout } from '../config/apiService';
import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'




function Dashboard ({ navigation }) {
    const [userfname, setUserFname] = useState('UserFirstName')
    const handleLogout = async () => {
        try {
            await logout();
            navigation.navigate('LoginScreenWelcome');
            console.log("we are back")
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    const getUserDetails = async () => {
        try {
            const user = await details();
            setUserFname(user.data.fname)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUserDetails();
    }, []);
    return (
        <SafeAreaView style = {[loginscreencss.LoginBackground, {backgroundColor: colors.white}]}>
            <View>
                <Text>
                    Hi {userfname},
                </Text>
            </View>
            <TouchableOpacity onPress={handleLogout}
                    style = {[loginscreencss.LoginContainersEmptyColor,
                    {flex:1, backgroundColor: colors.primarylightpurple
                    ,alignContent: 'center', alignItems: 'center', justifyContent: "center"}]}>
                    <Text style = {[loginscreencss.EmptyBackgroundTextTitle, 
                        {color: colors.white, alignContent: 'center', alignItems: 'center', justifyContent: "center"}]}>
                        Logout
                    </Text>      
                </TouchableOpacity>
        </SafeAreaView>

            
    )
}

export default Dashboard;