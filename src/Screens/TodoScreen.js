import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TodoItem} from '../components/TodoItem';
import {EditModal} from '../components/EditModal';
import {storage} from '../utils/storage';
import {colors} from '../styles/colors';

export const TodoScreen = () => {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');
  const [filter, setFilter] = useState('all');
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      saveTodos();
      updateAnalytics();
    }
  }, [todos]);

  const loadTodos = async () => {
    const data = await storage.getTodos();
    setTodos(data);
  };

  const saveTodos = async () => {
    await storage.saveTodos(todos);
  };

  const updateAnalytics = async () => {
    const today = new Date().toISOString().split('T')[0];
    const completed = todos.filter(t => t.completed).length;
    await storage.updateDailyStats(today, completed, todos.length);
  };

  const addTodo = () => {
    if (inputText.trim() === '') {
      Alert.alert('Error', 'Please enter a task');
      return;
    }

    const newTodo = {
      id: Date.now().toString(),
      text: inputText.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
  };

  const toggleTodo = id => {
    setTodos(todos.map(t => (t.id === id ? {...t, completed: !t.completed} : t)));
  };

  const deleteTodo = id => {
    Alert.alert('Delete Task', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setTodos(todos.filter(t => t.id !== id)),
      },
    ]);
  };

  const startEdit = item => {
    setEditingItem(item);
    setShowEditModal(true);
  };

  const saveEdit = text => {
    if (text.trim() === '') {
      Alert.alert('Error', 'Task cannot be empty');
      return;
    }
    setTodos(todos.map(t => (t.id === editingItem.id ? {...t, text: text.trim()} : t)));
    setShowEditModal(false);
    setEditingItem(null);
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(t => !t.completed);
      case 'completed':
        return todos.filter(t => t.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todos.filter(t => !t.completed).length;
  const completedCount = todos.filter(t => t.completed).length;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.dark} />
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Tasks</Text>
          <Text style={styles.subText}>
            {activeCount} active · {completedCount} completed
          </Text>
        </View>
        <View style={styles.statsBox}>
          <Text style={styles.statsNumber}>{todos.length}</Text>
          <Text style={styles.statsLabel}>Total</Text>
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          placeholderTextColor={colors.light}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={addTodo}
        />
        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Icon name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        {['all', 'active', 'completed'].map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterButton, filter === f && styles.filterActive]}
            onPress={() => setFilter(f)}>
            <Text
              style={[
                styles.filterText,
                filter === f && styles.filterTextActive,
              ]}>
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredTodos}
        renderItem={({item}) => (
          <TodoItem
            item={item}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={startEdit}
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="check-circle-outline" size={64} color={colors.darkLight} />
            <Text style={styles.emptyText}>No tasks here</Text>
            <Text style={styles.emptySubtext}>Tap + to add your first task</Text>
          </View>
        }
      />

      <EditModal
        visible={showEditModal}
        title="Edit Task"
        value={editingItem?.text || ''}
        onSave={saveEdit}
        onCancel={() => setShowEditModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
   header: {
    backgroundColor: '#0A0E27',
    padding: 20,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(59, 130, 246, 0.2)',  // Blue border
  },
  headerText: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  },
  subText: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 6,
  },
  statsBox: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',  // Subtle blue bg
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  statsNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',  // Blue number
  },
  statsLabel: {
    fontSize: 11,
    color: colors.textLight,
    marginTop: 2,
  },

  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.darkCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.dark,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginRight: 12,
    color: colors.text,
  },
  addButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.darkCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: colors.dark,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: 14,
    color: colors.textLight,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.white,
  },
  list: {
    padding: 16,
  },
  empty: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 18,
    color: colors.textLight,
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.light,
    marginTop: 8,
  },
});
