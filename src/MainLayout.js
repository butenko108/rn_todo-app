import { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { THEME } from './theme';
import { NavBar } from './components/NavBar';
import { MainScreen } from './screens/MainScreen';
import { TodoScreen } from './screens/TodoScreen';
import { ScreenContext } from './context/screen/screenContext';

export const MainLayout = () => {
  const { todoId } = useContext(ScreenContext);

  return (
    <>
      <NavBar title="Todo App" />

      <View style={styles.container}>{todoId ? <TodoScreen /> : <MainScreen />}</View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: THEME.PADDING_HORIZONTAL,
    paddingVertical: 20,
    flex: 1,
  },
});
