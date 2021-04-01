### config/keys needs to be added to the .gitignore file

#### Because this is no longer setup like a traditional next.js application the [...nexauth.js] (which was in the auth folder inside the api folder).file will need to be changed. Need to research whats best way to do this.

### logout would need to be setup in front end with routes via axios. (if using redux, this would be setup in the actions folder) it should look something like this.

```
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';

// Register User
export const registerUser = (userData, history) => (dispatch) => {
	axios
		.post('/users/register', userData)
		.then((res) => history.push('/login'))

		// re-direct to login on successful register
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

// Login - get user token
export const loginUser = (userData) => (dispatch) => {
	axios
		.post('/users/login', userData)
		.then((res) => {
			// Save to localStorage

			// Set token to localStorage
			const { token } = res.data;
			localStorage.setItem('jwtToken', token);
			// Set token to Auth header
			setAuthToken(token);
			// Decode token to get user data
			const decoded = jwt_decode(token);
			// Set current user
			dispatch(setCurrentUser(decoded));
		})
		.catch((err) =>
			dispatch({
				type: GET_ERRORS,
				payload: err.response.data,
			}),
		);
};

// Set logged in user
export const setCurrentUser = (decoded) => {
	return {
		type: SET_CURRENT_USER,
		payload: decoded,
	};
};

// User loading
export const setUserLoading = () => {
	return {
		type: USER_LOADING,
	};
};

// Log user out
export const logoutUser = () => (dispatch) => {
	// Remove token from local storage
	localStorage.removeItem('jwtToken');
	// Remove auth header for future requests
	setAuthToken(false);
	// Set current user to empty object {} which will set isAuthenticated to false
	dispatch(setCurrentUser({}));
};
```
