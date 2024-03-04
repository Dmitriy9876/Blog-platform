import { configureStore } from '@reduxjs/toolkit';
import { articlesReducer } from './reducers/articlesReducer';
import userReducer from './reducers/userReducer';
import { loadState, saveState } from '../services/localStorage';

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    user: userReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const state = store.getState();

  saveState({
    articles: state.articles,
    user: state.user
  });

  const token = state.user.user?.token;
  if (token) {
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('token');
  }
});