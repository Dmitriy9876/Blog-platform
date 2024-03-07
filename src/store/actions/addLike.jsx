import { SET_LIKE, SET_ERROR } from './constantsActions';

export const addLike = (slug, token) => async (dispatch) => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    dispatch({ type: SET_LIKE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
}