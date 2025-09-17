import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from 'react-native-edge-to-edge';
import { themeColors } from '../Components/Utils/color';

const { width, height } = Dimensions.get('window');

export default function Profile() {
  return (
    <LinearGradient
      colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
      style={styles.background}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SystemBars style="light" />
      <View style={styles.topShape} />
      <View style={styles.container}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your profile details will appear here.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  topShape: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: themeColors.cardShadow,
  },
  bottomShape: {
    position: 'absolute',
    bottom: -height * 0.2,
    left: -width * 0.15,
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: themeColors.cardShadow,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: themeColors.textSecondary,
  },
});
