import { UNSET_LIKE, SET_ERROR } from './constantsActions';

export const deleteLike = (slug, token) => async (dispatch) => {
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}/favorite`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    dispatch({ type: UNSET_LIKE, payload: data });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
}