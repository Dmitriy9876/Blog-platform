import { START_LOADING, SET_ARTICLES, SET_ARTICLE, END_LOADING, SET_ERROR } from './constantsActions';

export const getArticles = (limit = 5, offset = 0) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles?limit=${limit}&offset=${offset}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const data = await response.json();
    dispatch({ type: SET_ARTICLES, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};

export const getArticle= (slug) => async (dispatch) => {
  dispatch({ type: START_LOADING });
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${localStorage.getItem('token')}`,
      }
    });
    if (!response.ok) {
      throw new Error('Article could not be fetched!');
    }
    const data = await response.json();
    dispatch({ type: SET_ARTICLE, payload: data.article });
    dispatch({ type: END_LOADING });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
}