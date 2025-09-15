import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { Animated, View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Home from './src/Screens/Home';
import Notes from './src/Screens/Notes';
import Quotes from './src/Screens/Quotes';
import About from './src/Screens/About';
import Read from './src/Screens/Read';
import SplashScreen from './src/Screens/SplashScreen';
import MoreAppsScreen from './src/Screens/MoreAppsScreen';
import AuthorInfo from './src/Components/About/AuthorInfo';
import DeveloperInfo from './src/Components/About/DeveloperInfo';
import ShareApp from './src/Components/About/ShareApp';
import RateApp from './src/Components/About/RateApp';
import mobileAds, { InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
// Interstitial ad setup
const INTERSTITIAL_AD_UNIT_ID = 'ca-app-pub-7604915619325589/3947033537';
const interstitial = InterstitialAd.createForAdRequest(INTERSTITIAL_AD_UNIT_ID, {
  keywords: ['book', 'oromo history', 'afaan oromo books','translator afan oromoo to english'],
});

let adCount = 0;
const adIntervals = [40 * 1000, 5 * 60 * 1000, 10 * 60 * 1000]; // first: immediate, second: 5min, third: 10min
const defaultInterval = 12 * 60 * 1000; // 12min for subsequent ads
let lastAdShown = Date.now();
let nextAdTimeout = null;

function scheduleNextAd() {
  adCount++;
  let interval = adIntervals[adCount] !== undefined ? adIntervals[adCount] : defaultInterval;
  nextAdTimeout = setTimeout(() => {
    if (interstitial.loaded) {
      interstitial.show();
      lastAdShown = Date.now();
    } else {
      // If not loaded, try again after interval
      scheduleNextAd();
    }
  }, interval);
}

interstitial.addAdEventListener(AdEventType.LOADED, () => {
  // Show first ad immediately when loaded
  if (adCount === 0) {
    lastAdShown = Date.now();
    scheduleNextAd();
  }
});

interstitial.addAdEventListener(AdEventType.CLOSED, () => {
  interstitial.load();
  scheduleNextAd();
});

interstitial.load();


mobileAds()
  .initialize()
  .then(adapterStatuses => {
});

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabBarIcon = ({ route, focused, color, size }) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;
  const translateYValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (focused) {
      Animated.parallel([
        Animated.spring(scaleValue, {
          toValue: 1.2,
          friction: 3,
          useNativeDriver: true,
        }),
        Animated.sequence([
          Animated.timing(translateYValue, {
            toValue: -10,
            duration: 100,
            useNativeDriver: true,
          }),
          Animated.spring(translateYValue, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    } else {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [focused]);

  let iconName;
  let animationSource;

  switch (route.name) {
    case 'Home':
      iconName = 'home-outline';
      animationSource = require('./assets/animations/homeIcon.json');
      break;
    case 'Notes':
      iconName = 'create-outline';
      animationSource = require('./assets/animations/notes.json');
      break;
    case 'Quotes':
      iconName = 'chatbox-ellipses-outline';
      animationSource = require('./assets/animations/quotes.json');
      break;
    case 'About':
      iconName = 'information-outline';
      animationSource = require('./assets/animations/about.json');
      break;
  }

  return (
    <View style={styles.iconContainer}>
      {focused ? (
        <Animated.View
          style={[
            styles.animatedIcon,
            {
              transform: [
                { scale: scaleValue },
                { translateY: translateYValue },
              ],
            },
          ]}
        >
          <LottieView
            source={animationSource}
            autoPlay
            loop
            style={styles.lottieIcon}
          />
        </Animated.View>
      ) : (
        <Ionicons name={iconName} size={size} color={color} />
      )}
      {focused && <View style={[styles.activeIndicator, { backgroundColor: color }]} />}
    </View>
  );
};

function MainTabs() {
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
            backgroundColor: 'transparent',
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            height: 50,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
          },
          tabBarActiveTintColor: 'transparent',
          tabBarInactiveTintColor: 'white',
        })}
      >
        <Tab.Screen name="Home" component={Home} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Notes" component={Notes} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="Quotes" component={Quotes} options={{ unmountOnBlur: true }} />
        <Tab.Screen name="About" component={About} options={{ unmountOnBlur: true }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const handleSplashFinish = () => setShowSplash(false);

  // Listen for navigation changes to show scheduled ads
  const navigationRef = React.useRef();
  // No need to listen for navigation events for scheduled ads

  if (showSplash) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }
  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                    {
                      scale: next
                        ? next.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 0.9],
                          })
                        : 1,
                    },
                  ],
                },
                overlayStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                  }),
                },
              };
            },
            transitionSpec: {
              open: {
                animation: 'spring',
                config: {
                  stiffness: 1000,
                  damping: 500,
                  mass: 3,
                  overshootClamping: true,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
              close: {
                animation: 'spring',
                config: {
                  stiffness: 1000,
                  damping: 500,
                  mass: 3,
                  overshootClamping: true,
                  restDisplacementThreshold: 0.01,
                  restSpeedThreshold: 0.01,
                },
              },
            },
          }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="Read">
            {(props) => (
              <SafeAreaView style={styles.safeArea} edges={['bottom']}>
                <Read {...props} />
              </SafeAreaView>
            )}
          </Stack.Screen>
          <Stack.Screen name="MoreAppsScreen" component={MoreAppsScreen} />
          <Stack.Screen name="AuthorInfoScreen">
            {({ route }) => <AuthorInfo {...route.params} />}
          </Stack.Screen>
          <Stack.Screen name="DeveloperInfoScreen">
            {({ route }) => <DeveloperInfo {...route.params} />}
          </Stack.Screen>
          <Stack.Screen name="ShareAppScreen">
            {({ route }) => <ShareApp {...route.params} />}
          </Stack.Screen>
          <Stack.Screen name="RateAppScreen" component={RateApp} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'black', // or your preferred background
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
  },
  animatedIcon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieIcon: {
    width: 40,
    height: 40,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 10,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
});
