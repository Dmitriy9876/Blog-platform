export const deleteArticle = (slug, token) => async (dispatch) => {
  dispatch({ type: 'START_LOADING' });
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Token ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    dispatch({ type: 'ARTICLE_DELETED', payload: slug });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
}