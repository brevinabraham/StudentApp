import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000'

export const retrieveQuestionTemplate = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/feeds/questions/`);
        return response.data;
    } catch (error) {
        throw error;
    }
};