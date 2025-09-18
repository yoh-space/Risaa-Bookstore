import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import { themeColors } from '../Components/Utils/color';
import LinearGradient from 'react-native-linear-gradient';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 4000); // Show splash for 2.5 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      > 
        <SystemBars style='light'/>
        <LottieView
          source={require('../../assets/animations/Books.json')}
          autoPlay
          loop={false}
          style={styles.lottie}
        />
        <Text style={styles.title}>Risaa BookStore</Text>
        <Text style={styles.caption}>Risaa Collections</Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: themeColors.backgroundDark,
  },
  lottie: {
    width: 220,
    height: 220,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 30,
    textAlign: 'center',
  },
  caption: {
    fontSize: 16,
    color: '#fff',
    marginTop: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
