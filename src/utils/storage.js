import AsyncStorage from '@react-native-async-storage/async-storage';

export const storage = {
  // Todos
  async getTodos() {
    try {
      const data = await AsyncStorage.getItem('todos');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  },

  async saveTodos(todos) {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  },

  // Notes
  async getNotes() {
    try {
      const data = await AsyncStorage.getItem('notes');
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  },

  async saveNotes(notes) {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(notes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  },

  // Analytics
  async getAnalytics() {
    try {
      const data = await AsyncStorage.getItem('analytics');
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading analytics:', error);
      return {};
    }
  },

  async saveAnalytics(analytics) {
    try {
      await AsyncStorage.setItem('analytics', JSON.stringify(analytics));
    } catch (error) {
      console.error('Error saving analytics:', error);
    }
  },

  async updateDailyStats(date, completed, total) {
    const analytics = await this.getAnalytics();
    analytics[date] = {
      completed: completed || 0,
      total: total || 0,
      timestamp: new Date().toISOString(),
    };
    await this.saveAnalytics(analytics);
  },
};
