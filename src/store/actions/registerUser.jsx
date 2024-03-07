import { START_LOADING, UPDATE_USER_DATA, END_LOADING, SET_ERROR } from './constantsActions';

export const registerUser = (username, email, password) => async dispatch => {
  dispatch({ type: START_LOADING });
  try {
    const response = await fetch('https://blog.kata.academy/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: { username, email, password },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      dispatch({ type: SET_ERROR, payload: data.errors || 'An error occurred' });
      return;
    }

    dispatch({ type: UPDATE_USER_DATA, payload: data.user });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.toString() });
  } finally {
    dispatch({ type: END_LOADING });
  }
}