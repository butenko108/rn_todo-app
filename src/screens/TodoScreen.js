import React, { useState, useContext } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { THEME } from '../theme';
import { AppCard } from '../components/ui/AppCard';
import { EditModal } from '../components/EditModal';
import { AppTextBold } from '../components/ui/AppTextBold';
import { AppButton } from '../components/ui/AppButton';
import { TodoContext } from '../context/todo/todoContext';
import { ScreenContext } from '../context/screen/screenContext';

export const TodoScreen = () => {
  const { todos, removeTodo: onRemove, updateTodo: onSave } = useContext(TodoContext);
  const { todoId, changeScreen: closeTodo } = useContext(ScreenContext);
  const [modal, setModal] = useState(false);
  const selectedTodo = todos.find(todo => todo.id === todoId);

  return (
    <View>
      <EditModal visible={modal} onCancel={setModal} value={selectedTodo} onSave={onSave} />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{selectedTodo.title}</AppTextBold>

        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name="edit" size={20} />
        </AppButton>
      </AppCard>

      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={() => closeTodo(null)} color={THEME.GREY_COLOR}>
            <AntDesign name="back" size={20} color="#fff" />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton onPress={() => onRemove(selectedTodo.id)} color={THEME.DANGER_COLOR}>
            <FontAwesome name="remove" size={20} color="#fff" />
          </AppButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    marginBottom: 20,
    padding: 15,
  },
  button: {
    width: Dimensions.get('window').width > 300 ? 150 : 100,
  },
  title: {
    fontSize: 20,
  },
});
