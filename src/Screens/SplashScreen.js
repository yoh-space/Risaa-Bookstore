import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import { SystemBars } from 'react-native-edge-to-edge';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish();
    }, 4000); // Show splash for 2.5 seconds
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <SystemBars style='light'/>
      <LottieView
        source={require('../../assets/animations/Books.json')}
        autoPlay
        loop={false}
        style={styles.lottie}
      />
      <Text style={styles.title}>Handhuuraa Oromoo Arisi</Text>
      <Text style={styles.caption}>Enjoy your reading</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1E3A8A',
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
