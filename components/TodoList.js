// src/components/TodoList.js
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';

const TodoList = ({ onEdit, onDelete, updateList }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, [updateList]); // Adiciona updateList como dependência

  const fetchTodos = async () => {
    const { data } = await supabase.from('todos').select('*').order('created_at', { ascending: false });
    setTodos(data);
  };

  return (
    <FlatList
      data={todos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.todoItem}>
          <Text style={item.completed ? styles.completed : styles.title}>{item.title}</Text>
          <Button title="Edit" onPress={() => onEdit(item)} />
          <Button title="Delete" onPress={() => onDelete(item.id)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 18,
  },
  completed: {
    fontSize: 18,
    textDecorationLine: 'line-through',
  },
});

export default TodoList;
