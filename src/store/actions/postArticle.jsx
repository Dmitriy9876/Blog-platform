export const postArticle = (articleData, token) => async (dispatch) => {
  dispatch({ type: 'START_LOADING' });
  try {
    const response = await fetch('https://blog.kata.academy/api/articles', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ article: articleData }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка: ${response.status}, Сообщение: ${errorData.errors.body.join(', ')}`);
    }

    const data = await response.json();

    dispatch({ type: 'ARTICLE_CREATED', payload: data.article });
    dispatch({ type: 'END_LOADING' });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
    dispatch({ type: 'END_LOADING' });
  }
}