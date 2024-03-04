export const updateUser = (username, email, password, image, token) => async (dispatch) => {
  dispatch({ type: 'START_LOADING' });

  try {
    const requestBody = {
      user: { email, username, bio: "I'm studying to be a programmer", image, password },
    };

    const response = await fetch('https://blog.kata.academy/api/user', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.errors.body[0]);
    }

    const data = await response.json();

    dispatch({ type: 'UPDATE_USER_DATA', payload: data.user });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  } finally {
    dispatch({ type: 'END_LOADING' });
  }
}