import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { themeColors } from './Utils/color';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SystemBars } from 'react-native-edge-to-edge';
import Home from '../Screens/Home';
import Quotes from '../Screens/Quotes';
import Category from '../Components/Categories/Category';
import Favorite from '../Screens/Favorite';
import Profile from '../Screens/Profile';
import AdminDashboard from '../Screens/AdminScreen';
import { useAuth } from '../Provider/AuthProvider';

export default function MainTabs() {
  const { user } = useAuth();
  const ADMIN_UID ="EI0iQUdqAaYFP5quGdntJ3IHUID3"; // Replace with actual admin UID
  const Tab = createBottomTabNavigator();
  const TabBarIcon = ({ route, focused, color, size }) => {
    let iconName;
    switch (route.name) {
      case 'Home':
        iconName = 'home-outline';
        break;
      case 'Category':
        iconName = 'grid-outline';
        break;
      case 'Favorite':
        iconName = 'heart-outline';
        break;
      case 'Profile':
        iconName = 'person-outline';
        break;
      case 'AdminDashboard':
        iconName = 'shield-checkmark';
        break;
    }
    // Change icon color for admin dashboard only
    const iconColor = focused ? themeColors.primary : color;
    return (
      <View style={styles.iconContainer}>
        <Ionicons name={iconName} size={size} color={iconColor} />
      </View>
    );
  }; 
    
  return (
  <SafeAreaView style={styles.safeArea}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <TabBarIcon route={route} focused={focused} color={color} size={size} />
          ),
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            elevation: 0,
            backgroundColor: 'black',
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            height: 50,
            shadowColor: themeColors.cardShadow,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          },
          tabBarActiveTintColor: themeColors.primary,
          tabBarInactiveTintColor: themeColors.textSecondary,
        })}
      >
      <Tab.Screen name="Home" component={Home} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Category" component={Category} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Favorite" component={Favorite} options={{ unmountOnBlur: true }} />
      <Tab.Screen name="Profile" component={Profile} options={{ unmountOnBlur: true }} />
            {user?.uid === ADMIN_UID && (
            <Tab.Screen name="AdminDashboard" component={AdminDashboard} options={{ unmountOnBlur: true }} />
          )}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
    },
// Removed lottieIcon style
});
