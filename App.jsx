// App.js
import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { supabase } from './supabaseClient';

const App = () => {
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [updateList, setUpdateList] = useState(false); // Estado para forçar a atualização

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase.from('todos').delete().eq('id', id);
      if (error) throw error;
      setSelectedTodo(null);
      setUpdateList(!updateList); // Atualiza a lista após exclusão
    } catch (error) {
      console.error('Error deleting todo:', error.message);
    }
  };

  const handleSave = () => {
    setSelectedTodo(null);
    setUpdateList(!updateList); // Atualiza a lista após salvamento
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <TodoForm selectedTodo={selectedTodo} onSave={handleSave} />
      <TodoList onEdit={handleEdit} onDelete={handleDelete} updateList={updateList} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default App;
