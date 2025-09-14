import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RateApp() {
  return (
    <View style={{ alignItems: 'center', padding: 20 }}>
      <Icon name="star" size={40} color="#f1c40f" style={{ marginBottom: 10 }} />
      <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Rate App</Text>
      <TouchableOpacity onPress={() => {
        // Open Play Store link
        // You can pass this as a prop if you want to handle outside
        // or keep it here for simplicity
        Linking.openURL('https://play.google.com/store/apps/details?id=com.risaa.bookstore&hl=en');
      }} style={{ backgroundColor: '#f1c40f', padding: 10, borderRadius: 8 }}>
        <Text style={{ color: '#fff', fontWeight: '600' }}>Rate Now</Text>
      </TouchableOpacity>
    </View>
  );
}
