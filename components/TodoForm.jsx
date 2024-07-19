// src/components/TodoForm.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { supabase } from '../supabaseClient';

const TodoForm = ({ selectedTodo, onSave }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (selectedTodo) {
      setTitle(selectedTodo.title);
    }
  }, [selectedTodo]);

  const handleSubmit = async () => {
    if (selectedTodo) {
      await supabase.from('todos').update({ title }).eq('id', selectedTodo.id);
    } else {
      await supabase.from('todos').insert([{ title }]);
    }
    setTitle('');
    onSave();
  };

  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        placeholder="New task"
        value={title}
        onChangeText={setTitle}
      />
      <Button title={selectedTodo ? 'Update' : 'Add'} onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 10,
    padding: 5,
  },
});

export default TodoForm;
