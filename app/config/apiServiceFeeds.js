import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'

export const retrieveQuestionTemplate = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/feeds/questions_template/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getstatus = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/feeds/questions/`)
    } catch (err) {
        throw err
    }
}

export const postQuestion = async (question) => {
    
    try {
        const response = await axios.post(`${BASE_URL}/api/feeds/add_your_question`, question)
        console.log(response.data)
    } catch (err) {
        throw err;
    }
}