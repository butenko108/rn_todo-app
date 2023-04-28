import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, useWindowDimensions } from 'react-native';
import { AddTodo } from '../components/AddTodo';
import { AppText } from '../components/ui/AppText';
import { AppButton } from '../components/ui/AppButton';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';

export const MainScreen = () => {
  const { todos, addTodo, removeTodo, fetchTodos, loading, error } = useContext(TodoContext);
  const { changeScreen: openTodo } = useContext(ScreenContext);
  const { width } = useWindowDimensions();
  const calculateWidth = width - THEME.PADDING_HORIZONTAL * 2;

  useEffect(() => {
    const loadTodos = async () => await fetchTodos();

    loadTodos();
  }, []);

  if (loading) {
    return <AppLoader />;
  }

  if (error) {
    return (
      <View style={styles.center}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={async () => await fetchTodos()}>Repeat</AppButton>
      </View>
    );
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />

      {todos.length ? (
        <View style={{ width: calculateWidth }}>
          <FlatList
            data={todos}
            renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo} openTodo={openTodo} />}
          />
        </View>
      ) : (
        <View style={styles.imgWrap}>
          <Image style={styles.image} source={require('../../assets/no-todos.jpg')} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imgWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 300,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
  },
});
