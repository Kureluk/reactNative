import React from 'react';
import { createBottomTabNavigator, BottomTabNavigationOptions, RouteProp } from '@react-navigation/bottom-tabs';
import TodoList from '../components/TodoList';
import SettingsScreen from '../components/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Tab = createBottomTabNavigator(); 

const TabNavigator = () => {
  const incompleteCount = useSelector(
    (state: RootState) => state.todo.todos.filter((t) => !t.completed).length
  );

  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<{ Tasks: undefined; Settings: undefined }, keyof { Tasks: undefined; Settings: undefined }>;
      }): BottomTabNavigationOptions => ({
        tabBarIcon: ({
          color,
          size,
        }: {
          color: string;
          size: number;
        }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Tasks') iconName = 'list';
          else iconName = 'settings';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarBadge: route.name === 'Tasks' && incompleteCount > 0 ? incompleteCount : undefined,
      })}
    >
      <Tab.Screen name="Tasks" component={TodoList} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
