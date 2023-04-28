import {
  FETCH_TODOS,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  SHOW_ERROR,
  CLEAR_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
} from '../types';

const handlers = {
  [ADD_TODO]: (state, { id, title }) => ({
    ...state,
    todos: [...state.todos, { id, title }],
  }),
  [REMOVE_TODO]: (state, { id }) => ({
    ...state,
    todos: state.todos.filter(todo => todo.id !== id),
  }),
  [UPDATE_TODO]: (state, { id, title }) => ({
    ...state,
    todos: state.todos.map(todo => {
      if (todo.id === id) {
        todo.title = title;
      }

      return todo;
    }),
  }),
  [FETCH_TODOS]: (state, { todos }) => ({ ...state, todos }),
  [SHOW_LOADER]: state => ({ ...state, loading: true }),
  [HIDE_LOADER]: state => ({ ...state, loading: false }),
  [SHOW_ERROR]: (state, { error }) => ({ ...state, error }),
  [CLEAR_ERROR]: state => ({ ...state, error: null }),
  DEFAULT: state => state,
};

export const todoReducer = (state, action) => {
  const handler = handlers[action.type] || handlers.DEFAULT;

  return handler(state, action);
};
