import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CookieManager from '@react-native-cookies/cookies';
//import Config from 'react-native-config';  // Import react-native-config

const BASE_URL = 'http://127.0.0.1:8000'


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
        throw error;
    }
};

const logout = async () => {
  try {
    console.log('logging out')
    await axios.post(`${BASE_URL}/api/user/logout`);
    await AsyncStorage.removeItem('userId');
    console.log('done - now back to login')
  } catch (error) {
    throw error;
  }
};

const isLoggedIn = async () => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    console.log(userId)
    return userId;
  } catch (error) {
    throw error;
  }
};

const details = async () => {
    try {
        const userId = await AsyncStorage.getItem('userId');
        const response = await axios.get(`${BASE_URL}/protected`,{userId: userId})
        return response.data
    } catch (err) {
        throw err;
    }
};


export { login, logout, isLoggedIn, details };

