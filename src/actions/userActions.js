import axios from 'axios'
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_RESET,
  // USER_DETAILS_REQUEST,
  // USER_DETAILS_SUCCESS,
  // USER_DETAILS_FAIL,
  // USER_UPDATE_PROFILE_REQUEST,
  // USER_UPDATE_PROFILE_SUCCESS,
  // USER_UPDATE_PROFILE_FAIL,
} from '../constants/userConstants'


export function login(email, password)
{
  return async function (dispatch)
  {
    try
    {
      dispatch({type: USER_LOGIN_REQUEST, });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post(
        '/api/users/login',
        { email, password },
        config
      );

      dispatch({type: USER_LOGIN_SUCCESS, payload: data, });

      localStorage.setItem('userToken', JSON.stringify(data))
    } catch (error)
    {
      dispatch({type: USER_LOGIN_FAIL, payload: error.response.data.message, });
    }
  }
}

export function logout()
{
  return function (dispatch)
  {
    localStorage.removeItem('userToken');
    dispatch({ type: USER_LOGOUT });
  }
}

export function register(name, email, password)
{
  return async function (dispatch)
  {
    try
    {
      dispatch({type: USER_REGISTER_REQUEST});

      const config =
      {
        headers: {'Content-Type': 'application/json'},
      };

      const { data } = await axios.post(
        '/api/users',
        { name, email, password },
        config
      );

      dispatch({type: USER_REGISTER_SUCCESS});

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      dispatch({type: USER_REGISTER_RESET});

      localStorage.setItem('userToken', JSON.stringify(data));
    } catch (error)
    {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload: error.response.data.message,
      });
    }
  }
}

export function getUserDetails(userToken) {

  return async function (dispatch) {
    try {

      dispatch({
        type: USER_DETAILS_REQUEST,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      }

      const { data } = await axios.get('/api/users/profile', config);

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });

    } catch (error) {

      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: USER_DETAILS_FAIL,
        payload: message,
      });

    }
  }
}

export function updateUserProfile(userToken, updatedUser) {

  return async function (dispatch) {
    try {
      dispatch({
        type: USER_UPDATE_PROFILE_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken.token}`,
        },
      }

      const { data } = await axios.put(
        `/api/users/profile`,
        updatedUser,
        config
      );

      dispatch({
        type: USER_UPDATE_PROFILE_SUCCESS,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_DETAILS_SUCCESS,
        payload: data,
      });
      localStorage.setItem('userToken', JSON.stringify(data));
    } catch (error) {
      const message = error.response.data.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout());
      }
      dispatch({
        type: USER_UPDATE_PROFILE_FAIL,
        payload: message,
      });
    }
  }
}
