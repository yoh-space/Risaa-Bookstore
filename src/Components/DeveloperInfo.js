import React from 'react';
import { ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DeveloperInfo({ contacts, services, onContactPress }) {
  return (
    <ScrollView 
      style={{ maxHeight: 500, width: '100%' }} 
      contentContainerStyle={{ alignItems: 'center', padding: 15 }}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={{ alignItems: 'center', marginBottom: 20 }}>
        <View style={{ backgroundColor: 'rgba(108, 99, 255, 0.1)', width: 80, height: 80, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginBottom: 15, borderWidth: 2, borderColor: '#6C63FF' }}>
          <Ionicons name="code" size={40} color="#6C63FF" />
        </View>
        <Text style={{ fontSize: 22, fontWeight: '800', marginBottom: 5, color: '#2D3748', letterSpacing: 0.5 }}>Yo-Tech</Text>
        <Text style={{ fontSize: 16, color: '#6C63FF', fontWeight: '600', marginBottom: 15 }}>@Yoh_Space</Text>
        <Text style={{ fontSize: 15, color: '#4A5568', textAlign: 'center', lineHeight: 22, paddingHorizontal: 10 }}>
          we are passionate full stack developers creating beautiful, scalable cross-platform mobile and web applications for clients worldwide.
        </Text>
      </View>
      {/* Social Media Section */}
      <View style={{ width: '100%', marginBottom: 20, backgroundColor: 'white', borderRadius: 12, padding: 15, shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12, color: '#6C63FF', paddingLeft: 5 }}>Connect With Me</Text>
        {contacts.map((contact) => (
          <TouchableOpacity
            key={contact.label}
            style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(108, 99, 255, 0.05)', borderRadius: 8, padding: 12, marginBottom: 8, borderWidth: 1, borderColor: 'rgba(108, 99, 255, 0.1)' }}
            activeOpacity={0.7}
            onPress={() => onContactPress(contact.link)}
          >
            <View style={{ backgroundColor: 'rgba(108, 99, 255, 0.1)', width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
              <Ionicons name={contact.icon} size={18} color="#6C63FF" />
            </View>
            <View>
              <Text style={{ fontWeight: '600', color: '#4A5568', fontSize: 14 }}>{contact.label}</Text>
              <Text style={{ color: '#718096', fontSize: 13 }}>{contact.value}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      {/* Services Section */}
      <View style={{ width: '100%', backgroundColor: 'white', borderRadius: 12, padding: 15, shadowColor: '#6C63FF', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}>
        <Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12, color: '#6C63FF', paddingLeft: 5 }}>My Services</Text>
        {services.map((service, idx) => (
          <View key={idx} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, paddingVertical: 8, paddingHorizontal: 5, borderRadius: 6, backgroundColor: idx % 2 === 0 ? 'rgba(108, 99, 255, 0.03)' : 'transparent' }}>
            <View style={{ width: 24, height: 24, borderRadius: 6, backgroundColor: 'rgba(108, 99, 255, 0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
              <Ionicons name="checkmark" size={14} color="#6C63FF" />
            </View>
            <Text style={{ color: '#4A5568', fontSize: 14 }}>{service}</Text>
          </View>
        ))}
      </View>
      {/* Footer Note */}
      <Text style={{ fontSize: 13, color: '#A0AEC0', marginTop: 20, textAlign: 'center', fontStyle: 'italic' }}>
        Let's build something amazing together!
      </Text>
    </ScrollView>
  );
}
