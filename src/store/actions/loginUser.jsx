export const loginUser = (email, password) => async (dispatch) => {
  dispatch({ type: 'START_LOADING' });
  try {
    const response = await fetch('https://blog.kata.academy/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: { email, password },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const data = await response.json();

    localStorage.setItem('user', JSON.stringify(data.user));

    dispatch({ type: 'UPDATE_USER_DATA', payload: data.user });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
}

export const userLoggedOut = () => ({
  type: 'USER_LOGGED_OUT',
});

export const clearError = () => ({
  type: 'CLEAR_ERROR',
})