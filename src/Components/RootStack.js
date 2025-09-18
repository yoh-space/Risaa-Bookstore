import { createStackNavigator } from '@react-navigation/stack';
import Read from '../Screens/Read';
import MoreAppsScreen from '../Screens/MoreAppsScreen';
import AuthorInfo from './About/AuthorInfo';
import DeveloperInfo from './About/DeveloperInfo';
import React from 'react';
import Login from '../Components/Login/sign-in';
import SignUp from '../Components/Login/sign-up';
import { SystemBars } from 'react-native-edge-to-edge';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Read" component={Read} />
      <Stack.Screen name="MoreApps" component={MoreAppsScreen} />
      <Stack.Screen name="AuthorInfoScreen" component={({ route }) => (
        <AuthorInfo {...route.params} />
      )} />
      <Stack.Screen name="DeveloperInfoScreen" component={({ route }) => (
        <DeveloperInfo {...route.params} />
      )} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}
