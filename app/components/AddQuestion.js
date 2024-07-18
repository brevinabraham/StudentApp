import React, { useEffect, useState, useCallback } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { debounce } from 'lodash';
import CreatableSelect from 'react-select/creatable';
import colors from '../config/colors';
import { retrieveQuestionTemplate, postQuestion, editQuestion } from '../config/apiServiceFeeds';
import { useNavigation } from '@react-navigation/native';

export function AddQuestions({ dashboardBottomDims, user_id, onClose, Edit }) {
    const initialPickerItems = {
        status_id: { items: ['test', 'test2', 'test3'], selected: [] },
        tags_id: { items: [], selected: [] },
        topic_id: { items: [], selected: [] },
        subtopic_id: { items: [], selected: [] },
    };

    const [questionTemplate, setQuestionTemplate] = useState([]);
    const [inputHeights, setInputHeights] = useState({});
    const [pickerItems, setPickerItems] = useState(initialPickerItems);
    const [question, setQuestion] = useState({
        user_id: JSON.stringify(Edit) === '{}' ? user_id : Edit.user_id,
        title: JSON.stringify(Edit) === '{}' ? '' : Edit.title,
        content: JSON.stringify(Edit) === '{}' ? '' : Edit.content,
        status_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.status_id.selected : Edit.status_id,
        tags_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.tags_id.selected : Edit.tags_id,
        topic_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.topic_id.selected : Edit.topic_id,
        subtopic_id: JSON.stringify(Edit) === '{}' ? initialPickerItems.subtopic_id.selected : Edit.subtopic_id,
        comments_count: JSON.stringify(Edit) === '{}' ? 0 : Edit.comments_count,
    });

    const navigation = useNavigation();

    const getquestions = async () => {
        const response = await retrieveQuestionTemplate();
        setQuestionTemplate(response);
    };

    const addQuestion = async () => {
        question['user_id'] = user_id;
        JSON.stringify(Edit) === '{}' ? '' : question['created_at'] = Edit.created_at;
        JSON.stringify(Edit) === '{}' ? await postQuestion(question) : await editQuestion(Edit.id, question);
        onClose();
    };

    useEffect(() => {
        getquestions();
        if (JSON.stringify(Edit) !== '{}') {
            const updatedPickerItems = { ...initialPickerItems };
            if (Edit.status_id) {
                updatedPickerItems.status_id.selected = Edit.status_id;
            }
            if (Edit.tags_id) {
                updatedPickerItems.tags_id = {
                    items: [...initialPickerItems.tags_id.items, ...Edit.tags_id],
                    selected: Edit.tags_id
                };
            }
            if (Edit.topic_id) {
                updatedPickerItems.topic_id = {
                    items: [...initialPickerItems.topic_id.items, ...Edit.topic_id],
                    selected: Edit.topic_id
                };
            }
            if (Edit.subtopic_id) {
                updatedPickerItems.subtopic_id = {
                    items: [...initialPickerItems.subtopic_id.items, ...Edit.subtopic_id],
                    selected: Edit.subtopic_id
                };
            }
            setPickerItems(updatedPickerItems);
        }
    }, []);

    const handleContentSizeChangeDebounced = useCallback(
        debounce((id, newHeight) => {
            setInputHeights((prevHeights) => ({
                ...prevHeights,
                [id]: newHeight
            }));
        }, 0),
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
                items: [...prevItems[id].items, ...items],
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
                height: JSON.stringify(Edit) === '{}' ? dashboardBottomDims : "100%",
                width: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: JSON.stringify(Edit) === '{}' ? 0 : 1
            }}>
            <View style={{ flex: 1 }}>
                <Text style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                    alignItems: 'center',
                    paddingTop: '25%'
                }}>
                    {JSON.stringify(Edit) === '{}' ? "Add your question below!" : "Edit your Question"}
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
                                        defaultValue={JSON.stringify(Edit) !== '{}' ? Edit[question.question_field] : ''}
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
                                        onChange={(newValue) => handleNewItemChange(question.question_field, question.question_field, newValue)}
                                        options={(pickerItems[question.question_field]?.items || []).map(item => ({ value: item, label: item }))}
                                        value={(pickerItems[question.question_field]?.selected || []).map(item => ({ value: item, label: item }))}
                                        formatCreateLabel={formatCreateLabel}
                                        placeholder="Select or create an option"
                                        styles={{
                                            control: (base, state) => ({
                                                ...base,
                                                flex: 1,
                                                Width: '90%',
                                                borderRadius: 20,
                                                borderColor: colors.primaryblue,
                                                borderColor: state.isFocused ? colors.grey : colors.primaryblue,
                                                marginBottom: '80px',
                                            }),
                                            menu: (base) => ({
                                                ...base,
                                                flex: 1,
                                                marginTop: '-80px',
                                                overflow: 'auto',
                                                Width: '90%',
                                                borderRadius: 20,
                                                backgroundColor: colors.white,
                                                borderColor: colors.primaryblue,
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
                                            }),
                                            menuList: (base) => ({
                                                ...base,
                                                maxHeight: 100, // Adjust as needed
                                                overflow: 'auto',
                                                Width: '90%',
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
                <TouchableOpacity style={{
                    backgroundColor: colors.green, alignItems: 'center', borderRadius: 20,
                    margin: '1%', padding: 10,
                }} onPress={addQuestion}>
                    <Text>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>
        </BlurView>
    )
}
