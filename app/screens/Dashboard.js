import React, { useEffect, useState } from 'react';
<<<<<<< HEAD
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity  } from 'react-native';
=======
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73

import { details, logout } from '../config/apiService';
import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'




function Dashboard ({ navigation }) {
    const [userfname, setUserFname] = useState('UserFirstName')
<<<<<<< HEAD
    const [alldetails, setalldetails] = useState({})

=======
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73
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
<<<<<<< HEAD
            setUserFname(user.data.fname + " " + user.data.lname)
            setalldetails(user.data)
=======
            setUserFname(user.data.fname)
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUserDetails();
<<<<<<< HEAD
    }, [console.log(alldetails)]);
    return (
        <SafeAreaView style = {[{backgroundColor: colors.white, display:'flex', flex: 1,paddingHorizontal:'5%',width:'100%'}]}>
            <View style = {{flexDirection:'row',flex:0.5,padding:'5px'}}>
                <View style = {{alignSelf:'center'}}>
                    <Text>
                        Hi {userfname},
                    </Text>
                </View>
                <TouchableOpacity onPress={handleLogout}
                    style = {[loginscreencss.LoginContainersEmptyColor,
                    { backgroundColor: colors.primarylightpurple,justifyContent: "center"}]}>
                    <Text style = {[loginscreencss.EmptyBackgroundTextTitle]}>
                        Logout
                    </Text>      
                </TouchableOpacity>
            </View>
            <View style = {{backgroundColor:'yellow',flex:9,justifyContent:'center',alignItems:'center'}}>
                <View style = {{alignContent:'flex-start' }}>
                    
                    {Object.entries(alldetails).map(([key, value], index) => (
                        <View key={index}>
                            <Text>{key}: {value}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <View style = {{backgroundColor:'blue',flex:0.5}}>
                <View style = {{alignContent:'flex-start' }}>
                    <Text>
                        Hi {userfname},
                    </Text>
                </View>
            </View>
=======
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
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73
        </SafeAreaView>

            
    )
}

export default Dashboard;