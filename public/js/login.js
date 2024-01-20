import axios from 'axios';
import { showAlert } from './alert.js';
export const login = async (email, password) => {
  try {
    console.log(email, password);
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:3000/api/v1/users/login',
      data: {
        email,
        password,
      },
    });
    console.log(res.data.status);
    if (res.data.status === 'success') {
      showAlert('success', 'Logged in successfully');
      window.setTimeout(() => {
        location.assign('/');
      }, 100);
    }
    //this will redirect to the home page after 1.5 seconds
  } catch (error) {
    showAlert('error', error.response.data.message);
  }
};

export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: 'http://127.0.0.1:3000/api/v1/users/logout',
    });
    if (res.data.status === 'success') {
      location.reload(true);
    }
  } catch (error) {
    console.log(error.response);
    showAlert('error', 'Error logging out! Try again');
  }
};
