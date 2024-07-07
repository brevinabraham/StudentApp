import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView, StatusBar, FlatList  } from 'react-native';

import { details, logout, userFeedQuestions } from '../config/apiService';
import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'

import { QuestionBox } from '../components/QuestionBox';
import axios from 'axios';



function Dashboard ({ navigation }) {
    const [userfname, setUserFname] = useState('UserFirstName')
    const [alldetails, setalldetails] = useState({})
    const [allUserFeedQuestions, setAllUserFeedQuestions] = useState([])

    const getAllQuestions = async () => {
        try {
            const response = await userFeedQuestions()
            setAllUserFeedQuestions(response)
            for (let item in response){
                await getImgs(response[item]['id'])
            }
        } catch (err) {
            throw err
        }
    } 

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
        getAllQuestions();
        getImgs()
    },[] );
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        //console.log(viewableItems);
    }, []);
    const [getPic, setGetPic] = useState({})
    const getImgs = async (id) => {
        const gotPic = await axios.get('https://picsum.photos/200/300')
        setGetPic(prevState =>({
            ...prevState, [id]: gotPic.request.responseURL
        }))
    }
    return (
        <SafeAreaView style = {[{backgroundColor: colors.white, display:'flex', flex: 1,paddingHorizontal:'5%',width:'100%'}]}>
            <View style = {{flexDirection:'row',flex:0.5, paddingVertical: 5}}>
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
            <View style = {{backgroundColor:'grey',flex:9, marginVertical: 5, borderRadius: 5}} >
                <FlatList 
                    data={allUserFeedQuestions}
                    key={(item)=>item['id']}
                    onViewableItemsChanged={onViewableItemsChanged}
                    renderItem={({item})=>(
                        <View style={{ width:'96%', alignSelf:'center'}}
                            onPointerEnter={()=>{getImgs(item['id']);}}>
                            <QuestionBox question={item} img={getPic[item['id']]}/>
                        </View>
                    )}
                    />
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