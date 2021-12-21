import HttpService from '@checkmoney/core';
import EncryptedStorage from 'react-native-encrypted-storage';

const getToken = async () => {
  try {
    const session = await EncryptedStorage.getItem('user_session');
    return JSON.parse(session || '{}');
  } catch (error) {
    console.log('getToken', error);
  }
};

const saveToken = async (data: any) => {
  try {
    await EncryptedStorage.setItem('user_session', JSON.stringify(data));
  } catch (error) {
    console.log('saveToken', error);
  }
};

export const Api = new HttpService(fetch, getToken, saveToken);
