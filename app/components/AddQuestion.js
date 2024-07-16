import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { debounce } from 'lodash';
import CreatableSelect from 'react-select/creatable';
import colors from '../config/colors';
import { retrieveQuestionTemplate, postQuestion } from '../config/apiServiceFeeds';
import { useNavigation } from '@react-navigation/native';

export function AddQuestions({ dashboardBottomDims, user_id, onClose }) {
    const [questionTemplate, setQuestionTemplate] = useState([]);
    const [inputHeights, setInputHeights] = useState({});
    const [pickerItems, setPickerItems] = useState({});
    const [question, setQuestion] = useState({
        user_id: user_id,
        title: '',
        content: '',
        status_id: [],
        tags_id: [],
        topic_id: [],
        subtopic_id: [],
        comments_count: 0
    });

    const navigation = useNavigation(); // Use the navigation hook

    const getquestions = async () => {
        const response = await retrieveQuestionTemplate();
        setQuestionTemplate(response);
    };

    const addQuestion = async () => {
        question["user_id"] = user_id;
        await postQuestion(question);
        onClose(); // Call the onClose callback to update the state in Dashboard
    };

    useEffect(() => {
        getquestions();
    }, []);

    const handleContentSizeChangeDebounced = useCallback(
        debounce((id, newHeight) => {
            setInputHeights((prevHeights) => ({
                ...prevHeights,
                [id]: newHeight
            }));
        }, 100),
        []
    );

    const handleContentSizeChange = (id, event) => {
        const newHeight = event.nativeEvent.contentSize.height;
        if (inputHeights[id] !== newHeight) {
            handleContentSizeChangeDebounced(id, newHeight);
        }
    };

    const handleNewItemChange = (id, title, newValue) => {
        const items = newValue ? newValue.map(item => item.value) : [];
        setPickerItems(prevItems => ({
            ...prevItems,
            [id]: {
                items: items,
                selected: items
            }
        }));
        setQuestion(prevQuestions => ({
            ...prevQuestions,
            [title]: items
        }));
    };

    const formatCreateLabel = (inputValue) => `Create "${inputValue}"`;

    const handleInputChange = (title, value) => {
        setQuestion(prevQuestions => ({
            ...prevQuestions,
            [title]: value
        }));
    };

    return (
        <BlurView intensity={75}
            style={{
                height: dashboardBottomDims,
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: "1%"
            }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    alignItems: 'center',
                    paddingTop: '25%'
                }}>
                    Add your question below!
                </Text>
            </View>
            <View style={{
                flex: 15,
                width: '100%',
                backgroundColor: 'rgba(186,85,255,0.7)',
                marginTop: '25%',
                marginBottom: '5%',
                width: '90%',
                borderRadius: 20,
                padding: '2%',
            }}>
                <ScrollView style={{ flex: 1 }} >
                    {questionTemplate.map((question) => (
                        <View key={question.id} style={{ alignItems: 'center', marginBottom: 20 }} >
                            <View style={{
                                backgroundColor: colors.primaryblue,
                                width: '100%',
                                alignItems: 'center',
                                borderRadius: 20,
                                padding: 15
                            }}>
                                <Text>
                                    {question.title + (question.required === 1 ? "*" : "")}
                                </Text>
                            </View>
                            {question.inputType === 'string' ? (
                                <View style={{
                                    flex: 1,
                                    width: '100%',
                                    marginVertical: 10,
                                    alignItems: 'center'
                                }}>
                                    <TextInput
                                        style={{
                                            height: inputHeights[question.id] ? Math.max(40, inputHeights[question.id]) : 40,
                                            width: '90%',
                                            borderWidth: 1,
                                            borderRadius: 20,
                                            padding: 10,
                                        }}
                                        multiline={question.multiline}
                                        onContentSizeChange={(event) => handleContentSizeChange(question.id, event)}
                                        placeholder="Enter text"
                                        onChangeText={(value) => handleInputChange(question.question_field, value)}
                                    />
                                </View>
                            ) : (
                                <View style={{
                                    flex: 1,
                                    width: '100%',
                                    marginVertical: 10,
                                    alignItems: 'center',
                                    paddingBottom: 20
                                }}>
                                    <CreatableSelect
                                        isMulti
                                        onChange={(newValue) => handleNewItemChange(question.id, question.question_field, newValue)}
                                        options={(pickerItems[question.id]?.items || []).map((item, idx) => ({ value: item, label: item }))}
                                        value={(pickerItems[question.id]?.selected || []).map(item => ({ value: item, label: item }))}
                                        formatCreateLabel={formatCreateLabel}
                                        placeholder="Select or create an option"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                flex: 1,
                                                maxwidth: '90%',
                                                borderRadius: 20,
                                                backgroundColor: colors.white,
                                                borderColor: colors.primaryblue,
                                                borderColor: state.isFocused ? colors.grey : colors.primaryblue,
                                                margin: 10,
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                marginTop: 0,
                                                marginLeft: '5%',
                                                overflow: 'hidden',
                                                borderRadius: 20,
                                                backgroundColor: colors.white,
                                                borderColor: colors.primaryblue,
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
                                            }),
                                            menuList: (base) => ({
                                                ...base,
                                                padding: 0
                                            }),
                                            option: (base, state) => ({
                                                ...base,
                                                backgroundColor: state.isSelected ? colors.primaryblue : colors.white,
                                                color: state.isSelected ? colors.white : colors.black,
                                                '&:hover': {
                                                    backgroundColor: colors.primaryblue,
                                                    color: colors.white
                                                }
                                            }),
                                            multiValue: (base) => ({
                                                ...base,
                                                marginRight: '15px' // Adds space between selected items
                                            }),
                                            multiValueLabel: (base) => ({
                                                ...base,
                                                color: colors.black
                                            }),
                                            multiValueRemove: (base) => ({
                                                ...base,
                                                color: colors.primaryblue,
                                                ':hover': {
                                                    backgroundColor: colors.primaryblue,
                                                    color: colors.white
                                                }
                                            })
                                        }}
                                    />
                                </View>
                            )}
                        </View>
                    ))}
                </ScrollView>
                <TouchableOpacity style={{ backgroundColor: colors.green, alignItems: 'center', borderRadius: 20, 
                margin: '1%', padding: 10, }} onPress={addQuestion}>
                    <Text>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    )
}
