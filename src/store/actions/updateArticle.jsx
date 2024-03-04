export const updateArticle = (slug, articleData, token) => async (dispatch) => {
  dispatch({ type: 'START_LOADING' });
  try {
    const response = await fetch(`https://blog.kata.academy/api/articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: articleData }),
    });
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }
    const updatedArticle = await response.json();
    dispatch({ type: 'ARTICLE_UPDATED', payload: updatedArticle.article });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
}