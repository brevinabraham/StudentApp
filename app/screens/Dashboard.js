import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, StatusBar, FlatList } from 'react-native';

import { details, logout, userFeedQuestions } from '../config/apiServiceUsers';
import loginscreencss from '../config/loginscreencss';
import colors from '../config/colors'

import { QuestionBox } from '../components/QuestionBox';
import { AddQuestions } from '../components/AddQuestion';
import axios from 'axios';

function Dashboard({ navigation }) {
    const [userfname, setUserFname] = useState('UserFirstName')
    const [alldetails, setalldetails] = useState({})
    const [allUserFeedQuestions, setAllUserFeedQuestions] = useState([])
    const [showAddQuestion, setShowAddQuestion] = useState(false)
    const dashboardBottomBannerRef = useRef()
    const [dashboardBottomBannerDims, setDashboardBottomBannerDims] = useState([])

    const getAllQuestions = async () => {
        try {
            const response = await userFeedQuestions()
            setAllUserFeedQuestions(response.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
            for (let item in response) {
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
    }, []);
    const onViewableItemsChanged = useCallback(({ viewableItems }) => {
        //console.log(viewableItems);
    }, []);
    const [getPic, setGetPic] = useState({})
    const getImgs = async (id) => {
        const gotPic = await axios.get('https://picsum.photos/200/300')
        setGetPic(prevState => ({
            ...prevState, [id]: gotPic.request.responseURL
        }))
    }

    const addQuestionComponent = () => {
        setShowAddQuestion(!showAddQuestion)
        setDashboardBottomBannerDims(screen.height -
            dashboardBottomBannerRef.current.offsetHeight)
    }

    const handleAddQuestionClose = () => {
        setShowAddQuestion(false);
        getAllQuestions(); // Optionally refresh questions after adding a new one
    }

    return (
        <SafeAreaView id="dashboard-view"
            style={[{ backgroundColor: colors.white, display: 'flex', flex: 1, paddingHorizontal: '5%', width: '100%' }]}>
            
            <View id="dashboard-top-banner"
                style={{ flexDirection: 'row', flex: 0.5, paddingVertical: 5 }}>
                <View
                    style={{ alignSelf: 'center' }}>
                    <Text>
                        Hi {userfname},
                    </Text>
                </View>
                <TouchableOpacity onPress={handleLogout}
                    style={[loginscreencss.LoginContainersEmptyColor,
                    { backgroundColor: colors.primarylightpurple, justifyContent: "center" }]}>
                    <Text style={[loginscreencss.EmptyBackgroundTextTitle]}>
                        Logout
                    </Text>
                </TouchableOpacity>
            </View>
            <View id="dashboard-mid-feed-questions"
                style={{ backgroundColor: 'grey', flex: 9, marginVertical: 5, paddingVertical: 5, borderRadius: 5 }} >
                <FlatList
                    data={allUserFeedQuestions}
                    key={(item) => item['id']}
                    onViewableItemsChanged={onViewableItemsChanged}
                    renderItem={({ item }) => (
                        <View style={{ width: '96%', alignSelf: 'center' }}
                            onPointerEnter={() => { getImgs(item['id']); }}>
                            <QuestionBox question={item} img={getPic[item['id']]} />
                        </View>
                    )}
                />
            </View>
            {showAddQuestion && <AddQuestions dashboardBottomDims={dashboardBottomBannerDims} user_id={userfname} onClose={handleAddQuestionClose} />}

            <View id="dashboard-bottom-banner" style={{ flex: 0.5, flexDirection: 'row' }} ref={dashboardBottomBannerRef}>
                <TouchableOpacity onPress={() => {}}  style={{alignItems: 'center', justifyContent: 'center',backgroundColor: 'red', flex:1 }}>   
                    <View >
                        <Text style={{fontWeight: 'bold'}}>
                            Dasboard
                        </Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => addQuestionComponent()} style={{ backgroundColor: 'blue', flex:1, alignItems: 'center', justifyContent: 'center' }} >     
                    <View >
                        <Text style={{fontWeight: 'bold'}}>
                            Add Question
                        </Text>
                    </View>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => {}} style={{alignItems: 'center', justifyContent: 'center',backgroundColor: 'green', flex:1  }} >     
                    <View >
                        <Text style={{fontWeight: 'bold'}}>
                            My Account
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
}

export default Dashboard;
