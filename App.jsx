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
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.gray,
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
            borderTopWidth: 1,
            borderTopColor: colors.border,
            backgroundColor: colors.white,
          },
          tabBarLabelStyle: {
            fontSize: 12,
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
