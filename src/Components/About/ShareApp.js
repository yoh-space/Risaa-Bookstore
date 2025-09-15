import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import LottieView from 'lottie-react-native';

export default function ShareApp({ onShare }) {
  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <LottieView
        source={require('../../../assets/animations/share.json')}
        autoPlay
        loop
        style={{ width: 60, height: 60, marginBottom: 10 }}
      />
      <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Share App</Text>
      <TouchableOpacity onPress={onShare} style={{ backgroundColor: '#e67e22', padding: 10, borderRadius: 8 }}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Share Now</Text>
      </TouchableOpacity>
    </View>
  );
}
