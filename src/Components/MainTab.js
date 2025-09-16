import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet,Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SystemBars } from 'react-native-edge-to-edge';
import LottieView from 'lottie-react-native';
import Home from '../Screens/Home';
import Notes from '../Screens/Notes';
import Quotes from '../Screens/Quotes';
import About from '../Screens/About';

export default function MainTabs() {
    const Tab = createBottomTabNavigator();
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
          animationSource = require('../../assets/animations/homeIcon.json');
          break;
        case 'Notes':
          iconName = 'create-outline';
          animationSource = require('../../assets/animations/notes.json');
          break;
        case 'Quotes':
          iconName = 'chatbox-ellipses-outline';
          animationSource = require('../../assets/animations/quotes.json');
          break;
        case 'About':
          iconName = 'information-outline';
          animationSource = require('../../assets/animations/about.json');
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
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#5e2a00ff', // or your preferred background
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: 50,
    },
  lottieIcon: {
    width: 40,
    height: 40,
  },
});

