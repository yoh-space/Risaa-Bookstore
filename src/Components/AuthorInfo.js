import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AuthorInfo({ onEmailPress, onPhonePress, onWhatsAppPress }) {
  return (
    <View style={{ alignItems: 'flex-start', padding: 10, width: '100%' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Image
          source={require('../../assets/images/ibro.jpg')}
          style={{ width: 60, height: 60, marginRight: 10, borderRadius: 20 }}
          resizeMode="contain"
        />
        <Text style={{ fontSize: 18, fontWeight: '600', color: '#166d67' }}>Ibroo Wallyyii</Text>
      </View>
      <Text style={{ fontSize: 15, color: '#333', marginBottom: 18, marginLeft: 2 }}>
        Author of Handhuuraa Oromo Arsi
      </Text>
      <TouchableOpacity
        onPress={onEmailPress}
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 10 }}
      >
        <Ionicons name="mail" size={20} color="#166d67" style={{ marginRight: 10 }} />
        <Text style={{ color: '#166d67', fontWeight: '600', fontSize: 15 }}>Ebroseta50@gmail.com</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPhonePress}
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 10 }}
      >
        <Ionicons name="call" size={20} color="#166d67" style={{ marginRight: 10 }} />
        <Text style={{ color: '#166d67', fontWeight: '600', fontSize: 15 }}>+1 651-500-2991</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onWhatsAppPress}
        style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14 }}
      >
        <Ionicons name="logo-whatsapp" size={20} color="#25D366" style={{ marginRight: 10 }} />
        <Text style={{ color: '#166d67', fontWeight: '600', fontSize: 15 }}>WhatsApp</Text>
      </TouchableOpacity>
    </View>
  );
}
