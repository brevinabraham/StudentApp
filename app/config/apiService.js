
import axios from 'axios';
import { Cookies } from 'react-cookie';

const BASE_URL = 'http://127.0.0.1:8000'



const cookie = new Cookies()
const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, {email,password});
        const { userId } = response.data;
        cookie.set('userId', userId, { path: '/', secure: true, sameSite: 'strict' })
        return userId;
    } catch (error) {
        throw error;
    }
};

const logout = async () => {
  try {
    cookie.remove(cookie.get('userId'), { path: '/' })
    cookie.remove('userId', { path: '/' })
    console.log('logging out')
    await axios.post(`${BASE_URL}/api/user/logout`);
    console.log('done - now back to login')
  } catch (error) {
    throw error;
  }
};

const isLoggedIn = async () => {
  try {
    return cookie.get('userId');
  } catch (error) {
    throw error;
  }
};

const details = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/protected`,{ withCredentials: true  })
        return response.data
    } catch (err) {
        throw err;
    }
};


export { login, logout, isLoggedIn, details };

