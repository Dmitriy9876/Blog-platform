const initialState = {
  isLoading: false,
  user: null,
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case 'UPDATE_USER_DATA':
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    case 'END_LOADING':
      return {
        ...state,
        isLoading: false,
      };
    case 'USER_LOGGED_OUT':
      return {
        ...initialState,
      };
    default:
      return state;
  }
}