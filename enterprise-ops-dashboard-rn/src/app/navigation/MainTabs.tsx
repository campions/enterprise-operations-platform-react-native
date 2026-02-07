import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DashboardScreen from '../../features/dashboard/screens/DashboardScreen';
import AssetsScreen from '../../features/assets/AssetsScreen';
import ConfigurationScreen from '../../features/configuration/ConfigurationScreen';
import { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Dashboard"
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarActiveTintColor: '#0055BA',
      tabBarInactiveTintColor: '#8C99AE',
      tabBarIcon: ({ color, size }) => {
        const iconMap: Record<keyof RootTabParamList, keyof typeof MaterialCommunityIcons.glyphMap> = {
          Dashboard: 'view-dashboard-outline',
          Assets: 'format-list-bulleted',
          Configuration: 'tune'
        };
        const iconName = iconMap[route.name as keyof RootTabParamList];
        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      }
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Assets" component={AssetsScreen} />
    <Tab.Screen name="Configuration" component={ConfigurationScreen} />
  </Tab.Navigator>
);

export default MainTabs;
