import React, { useReducer, useContext } from 'react';
import { Alert } from 'react-native';

import {
  ADD_TODO,
  CLEAR_ERROR,
  FETCH_TODOS,
  HIDE_LOADER,
  REMOVE_TODO,
  SHOW_ERROR,
  SHOW_LOADER,
  UPDATE_TODO,
} from '../types';
import { ScreenContext } from '../screen/screenContext';
import { TodoContext } from './todoContext';
import { todoReducer } from './todoReducer';
import { Http } from '../../http';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

export const TodoState = ({ children }) => {
  const { todoId, changeScreen } = useContext(ScreenContext);
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = async title => {
    clearError();

    try {
      const data = await Http.post(
        'https://rn-todo-app-86362-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
        { title },
      );
      dispatch({ type: ADD_TODO, title, id: data.name });
    } catch (error) {
      showError('Something went wrong, try again...');
    }
  };

  const updateTodo = async (id, title) => {
    clearError();

    try {
      const data = await Http.patch(
        `https://rn-todo-app-86362-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
        { title },
      );

      dispatch({ type: UPDATE_TODO, id, title });
    } catch (error) {
      showError('Something went wrong, try again...');
      console.log(error);
    }
  };

  const removeTodo = id => {
    const selectedTodo = state.todos.find(todo => todo.id === todoId);

    Alert.alert(
      'Delete todo',
      `Are you sure you want to delete todo: ${selectedTodo?.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            clearError();

            try {
              const data = await Http.delete(
                `https://rn-todo-app-86362-default-rtdb.europe-west1.firebasedatabase.app/todos/${id}.json`,
              );

              changeScreen(null);
              dispatch({ type: REMOVE_TODO, id });
            } catch (error) {
              showError('Something went wrong, try again...');
            }
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const showLoader = () => dispatch({ type: SHOW_LOADER });
  const hideLoader = () => dispatch({ type: HIDE_LOADER });
  const showError = error => dispatch({ type: SHOW_ERROR, error });
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  const fetchTodos = async () => {
    showLoader();
    clearError();

    try {
      const data = await Http.get(
        'https://rn-todo-app-86362-default-rtdb.europe-west1.firebasedatabase.app/todos.json',
      );

      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }));
      dispatch({ type: FETCH_TODOS, todos });
    } catch (error) {
      showError('Something went wrong, try again...');
      console.log(error);
    } finally {
      hideLoader();
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
