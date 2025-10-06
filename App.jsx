import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {TodoScreen} from './src/screens/TodoScreen';
import {NotesScreen} from './src/screens/NotesScreen';
import {AnalyticsScreen} from './src/screens/AnalyticsScreen';
import {DashboardScreen} from './src/screens/DashboardScreen';
import {colors} from './src/styles/colors';

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
       screenOptions={{
  headerShown: false,
  tabBarActiveTintColor: '#3B82F6',  // Blue when active
  tabBarInactiveTintColor: '#64748B',  // Gray when inactive
  tabBarStyle: {
    height: 65,
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: '#0A0E27',  // Dark background
    borderTopWidth: 1,
    borderTopColor: 'rgba(59, 130, 246, 0.2)',  // Subtle blue border
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '600',
  },
}}>

        <Tab.Screen
          name="Tasks"
          component={TodoScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="check-circle" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Notes"
          component={NotesScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="notes" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Analytics"
          component={AnalyticsScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="bar-chart" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarIcon: ({color, size}) => (
              <Icon name="dashboard" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
