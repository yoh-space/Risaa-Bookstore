import { createStackNavigator } from '@react-navigation/stack';
import Read from '../Screens/Read';
import MoreAppsScreen from '../Screens/MoreAppsScreen';
import AuthorInfo from './About/AuthorInfo';
import DeveloperInfo from './About/DeveloperInfo';
import React from 'react';
import Login from '../Components/Login/sign-in';
import SignUp from '../Components/Login/sign-up';
import { AuthProvider } from '../Provider/AuthProvider';
import Notification from '../Screens/Notification';
import Profile from '../Screens/Profile';
import HelpSupport from '../Components/Profile/HelpSupport';
import FAQ from '../Components/Profile/FAQ';
import TermsConditions from '../Components/Profile/TermsConditions';
import PaymentHistory from '../Components/Profile/PaymentHistory';
import RateApp from './About/RateApp';
import ShareApp from './About/ShareApp';
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
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="TermsConditions" component={TermsConditions} />
      <Stack.Screen name="PaymentHistory" component={PaymentHistory} />
      <Stack.Screen name="RateApp" component={RateApp} />
      <Stack.Screen name="ShareApp" component={ShareApp} />
    
    </Stack.Navigator>      
    </AuthProvider>

  );
}
