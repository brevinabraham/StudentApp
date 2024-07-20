import axios from 'axios';

const BASE_URL = 'http://192.168.0.14:8000'



const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, { email, password });
        const { access_token, session_data } = response.data;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('session_id', session_data.session_id);
        localStorage.setItem('expires_at', session_data.expires_at);
        return access_token;
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
    try {
        const session_id = localStorage.getItem('session_id');
        localStorage.removeItem('access_token');
        localStorage.removeItem('session_id');
        localStorage.removeItem('expires_at');
        await axios.post(`${BASE_URL}/api/user/logout`, {}, {
            headers: {
                'session-id': session_id
            }
        });
    } catch (error) {
        throw error;
    }
};

const isLoggedIn = async () => {
    if (!localStorage.getItem('expires_at')) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('session_id');
        localStorage.removeItem('expires_at');
        return false
    }
    if (new Date(localStorage.getItem('expires_at').replace(/\.\d+/, match => match.substring(0, 4))) > Date.now()) {
        try{
            const session_id = localStorage.getItem('session_id')
            if (session_id != null) {
                const response = await axios.get(`${BASE_URL}/api/user/session/loggedin`,{
                    headers: {
                        'session_id' : `Bearer ${session_id}`
                    }
                })
                return response.data.response
            }
        } catch(err) {
            localStorage.removeItem('access_token');
            localStorage.removeItem('session_id');
            localStorage.removeItem('expires_at');
            throw err
        }
    } else {
        logout()
        return false
    }
};

const details = async () => {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get(`${BASE_URL}/api/user/protected/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (err) {
        throw err;
    }
};

const userFeedQuestions = async () => {
    try {
        const response = await axios(`${BASE_URL}/api/feeds/questions`)
        return response.data
    } catch (err) {
        throw err
    }
}

export { login, logout, isLoggedIn, details, userFeedQuestions };
