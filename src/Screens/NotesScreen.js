import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NoteCard} from '../components/NoteCard';
import {storage} from '../utils/storage';
import {colors} from '../styles/colors';

export const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    saveNotes();
  }, [notes]);

  const loadNotes = async () => {
    const data = await storage.getNotes();
    setNotes(data);
  };

  const saveNotes = async () => {
    await storage.saveNotes(notes);
  };

  const openNewNote = () => {
    setCurrentNote(null);
    setTitle('');
    setContent('');
    setShowModal(true);
  };

  const openEditNote = note => {
    setCurrentNote(note);
    setTitle(note.title);
    setContent(note.content);
    setShowModal(true);
  };

  const saveNote = () => {
    if (content.trim() === '') {
      Alert.alert('Error', 'Note content cannot be empty');
      return;
    }

    if (currentNote) {
      // Update existing note
      setNotes(
        notes.map(n =>
          n.id === currentNote.id
            ? {
                ...n,
                title: title.trim(),
                content: content.trim(),
                updatedAt: new Date().toISOString(),
              }
            : n,
        ),
      );
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        title: title.trim() || 'Untitled Note',
        content: content.trim(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setNotes([newNote, ...notes]);
    }

    setShowModal(false);
    setTitle('');
    setContent('');
    setCurrentNote(null);
  };

  const deleteNote = id => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setNotes(notes.filter(n => n.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Notes</Text>
          <Text style={styles.subText}>{notes.length} notes</Text>
        </View>
        <TouchableOpacity style={styles.fab} onPress={openNewNote}>
          <Icon name="add" size={28} color={colors.white} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={notes}
        renderItem={({item}) => (
          <NoteCard item={item} onPress={openEditNote} onDelete={deleteNote} />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Icon name="notes" size={64} color={colors.light} />
            <Text style={styles.emptyText}>No notes yet</Text>
            <Text style={styles.emptySubtext}>
              Tap + to create your first note
            </Text>
          </View>
        }
      />

      <Modal visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(false);
                setTitle('');
                setContent('');
                setCurrentNote(null);
              }}>
              <Icon name="close" size={28} color={colors.text} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>
              {currentNote ? 'Edit Note' : 'New Note'}
            </Text>
            <TouchableOpacity onPress={saveNote}>
              <Icon name="check" size={28} color={colors.primary} />
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.titleInput}
            placeholder="Note Title"
            placeholderTextColor={colors.gray}
            value={title}
            onChangeText={setTitle}
          />

          <TextInput
            style={styles.contentInput}
            placeholder="Start typing..."
            placeholderTextColor={colors.gray}
            value={content}
            onChangeText={setContent}
            multiline
            textAlignVertical="top"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    backgroundColor: colors.primary,
    padding: 20,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
  },
  subText: {
    fontSize: 14,
    color: colors.white,
    opacity: 0.9,
    marginTop: 4,
  },
  fab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
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
    color: colors.gray,
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.textLight,
    marginTop: 8,
  },
   modalContainer: {
    flex: 1,
    backgroundColor: colors.dark,  // Changed from colors.white
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.darkCard,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 16,
    color: colors.text,
    backgroundColor: colors.darkCard,
  },
  contentInput: {
    flex: 1,
    fontSize: 16,
    padding: 16,
    paddingTop: 8,
    color: colors.text,
    lineHeight: 24,
    backgroundColor: colors.dark,
  },

});
