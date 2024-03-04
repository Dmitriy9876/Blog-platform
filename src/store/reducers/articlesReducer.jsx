const initialState = {
  articlesData: {
    articles: [],
    articlesCount: 0,
  },
  loading: false,
  error: null,
};

export const articlesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_LOADING':
      return { ...state, loading: true, error: null };
    case 'END_LOADING':
      return { ...state, loading: false };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'SET_ARTICLES':
      return {
        ...state,
        articlesData: {
          articles: action.payload.articles,
          articlesCount: action.payload.articlesCount,
        },
        loading: false,
      };
    case 'SET_ARTICLE':
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          articles: state.articlesData.articles.map(article => 
            article.slug === action.payload.slug ? action.payload : article
          ),
        },
        loading: false,
      };
    case 'ARTICLE_CREATED':
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          articles: [...state.articlesData.articles, action.payload],
          articlesCount: state.articlesData.articlesCount + 1,
        },
        loading: false,
        error: null,
      };
    case 'ARTICLE_DELETED':
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          articles: state.articlesData.articles.filter(article => article.slug !== action.payload),
          articlesCount: state.articlesData.articlesCount - 1,
        },
        loading: false,
        error: null,
      };
    case 'ARTICLE_UPDATED':
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          articles: state.articlesData.articles.map(article =>
            article.slug === action.payload.slug ? { ...article, ...action.payload } : article
          ),
        },
        loading: false,
        error: null,
      };
    case 'SET_LIKE': {
      const updatedArticles = state.articlesData.articles.map(article => {
        if (article.slug === action.payload.article.slug) {
          return {
            ...article,
            favorited: action.payload.article.favorited,
            favoritesCount: action.payload.article.favoritesCount,
          };
        }
        return article;
      });
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          articles: updatedArticles,
        },
        loading: false,
      };
    }
    case 'UNSET_LIKE': {
      const articlesAfterUnfavorite = state.articlesData.articles.map(article => {
        if (article.slug === action.payload.article.slug) {
          return {
            ...article,
            favorited: action.payload.article.favorited,
            favoritesCount: action.payload.article.favoritesCount,
          };
        }
        return article;
      });
      return {
        ...state,
        articlesData: {
          ...state.articlesData,
          articles: articlesAfterUnfavorite,
        },
        loading: false,
      };
    }
    default:
      return state;
  }
}