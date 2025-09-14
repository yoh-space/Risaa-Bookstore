import { createStackNavigator } from '@react-navigation/stack';
import Read from '../Screens/Read';
import MoreAppsScreen from '../Screens/MoreAppsScreen';
import { SystemBars } from 'react-native-edge-to-edge';

const Stack = createStackNavigator();

export default function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Read" component={Read} />
      <Stack.Screen name="MoreApps" component={MoreAppsScreen} />
    </Stack.Navigator>
  );
}
