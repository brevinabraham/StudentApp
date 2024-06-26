<<<<<<< HEAD
import axios from 'axios';
import { Cookies } from 'react-cookie';


=======
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
//import Config from 'react-native-config';  // Import react-native-config
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73

const BASE_URL = 'http://127.0.0.1:8000'


<<<<<<< HEAD

const cookie = new Cookies()
const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, {email,password});
        const { userId } = response.data;
        cookie.set('userId', userId, { path: '/', secure: true, sameSite: 'strict' })
        return userId;
    } catch (error) {
=======
const login = async (email, password) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/user/login`, {
        email,
        password,
        });
        const { userId } = response.data;
        await AsyncStorage.setItem('userId', userId);
        await CookieManager.clearAll()
        return userId;
    } catch (error) {
        console.error('Login error:', error);
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73
        throw error;
    }
};

const logout = async () => {
  try {
<<<<<<< HEAD
    cookie.remove(cookie.get('userId'), { path: '/' })
    cookie.remove('userId', { path: '/' })
    console.log('logging out')
    await axios.post(`${BASE_URL}/api/user/logout`);
=======
    console.log('logging out')
    await axios.post(`${BASE_URL}/api/user/logout`);
    await AsyncStorage.removeItem('userId');
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73
    console.log('done - now back to login')
  } catch (error) {
    throw error;
  }
};

const isLoggedIn = async () => {
  try {
<<<<<<< HEAD
    return cookie.get('userId');
=======
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId)
    return userId;
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73
  } catch (error) {
    throw error;
  }
};

const details = async () => {
    try {
<<<<<<< HEAD
        const response = await axios.get(`${BASE_URL}/protected`,{ withCredentials: true  })
=======
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`${BASE_URL}/protected`,{userId: userId})
>>>>>>> 007b9c05532d9a7be51dce005f9066ac52dbaa73
        return response.data
    } catch (err) {
        throw err;
    }
};


export { login, logout, isLoggedIn, details };

