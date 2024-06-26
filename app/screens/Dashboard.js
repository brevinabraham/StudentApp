import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity  } from 'react-native';

import { details, logout } from '../config/apiService';
import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'




function Dashboard ({ navigation }) {
    const [userfname, setUserFname] = useState('UserFirstName')
    const [alldetails, setalldetails] = useState({})

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
            setUserFname(user.data.fname + " " + user.data.lname)
            setalldetails(user.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        getUserDetails();
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
        </SafeAreaView>

            
    )
}

export default Dashboard;