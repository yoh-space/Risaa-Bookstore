import { createStackNavigator } from '@react-navigation/stack';
import Read from '../Screens/Read';
import MoreAppsScreen from '../Screens/MoreAppsScreen';
import AuthorInfo from './About/AuthorInfo';
import DeveloperInfo from './About/DeveloperInfo';
import React from 'react';
import Login from '../Components/Login/sign-in';
import SignUp from '../Components/Login/sign-up';
import { AuthProvider } from '../Provider/AuthProvider';
const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <AuthProvider>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Read" component={Read} />
      <Stack.Screen name="MoreApps" component={MoreAppsScreen} />
      <Stack.Screen name="AuthorInfoScreen" component={AuthorInfo} />
      <Stack.Screen name="DeveloperInfoScreen" component={DeveloperInfo} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>      
    </AuthProvider>

  );
}
