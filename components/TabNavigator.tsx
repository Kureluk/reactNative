import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TodoList from '../components/TodoList';
import SettingsScreen from '../components/SettingsScreen';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp } from '@react-navigation/native';
import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';

type TabParamList = {
  Tasks: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({
        route,
      }: {
        route: RouteProp<TabParamList, keyof TabParamList>;
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
      })}
    >
      <Tab.Screen name="Tasks" component={TodoList} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
