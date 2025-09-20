import React from 'react';
import { themeColors } from '../Utils/color';
import { ScrollView, View, Text, TouchableOpacity, Dimensions, Animated, Platform, Image, Linking} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SystemBars } from 'react-native-edge-to-edge';

const { width } = Dimensions.get('window');

const CONTACTS = [
  {
    icon: 'mail',
    label: 'Email',
    value: 'yohansdam@gmail.com',
    link: 'mailto:yohansdam@gmail.com',
  },
  {
    icon: 'call',
    label: 'Phone',
    value: '+251 911 701 858',
    link: 'tel:+251911701858',
  },
  {
    icon: 'send-outline',
    label: 'Telegram',
    value: '@Yoh_Space',
    link: 'https://t.me/yoh_space',
  },
  {
    icon: 'play-circle',
    label: 'YouTube',
    value: '@Yoh_space',
    link: 'https://youtube.com/@yoh_space',
  },
  {
    icon: 'logo-twitter',
    label: 'Twitter',
    value: '@Yoh_space',
    link: 'https://x.com/yoh_space',
  },
  {
    icon: 'logo-web-component',
    label: 'Website',
    value: 'yotech.space',
    link: 'https://yotech.space',
  },
];

const SERVICES = [
  'Full Stack Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'API Integration',
  'Google Admob Integration',
  'Technical Support',
];

export default function DeveloperInfo() {
  const scrollY = new Animated.Value(0);
  
  // Animated header background
  const headerBackgroundOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [0, 1],
    extrapolate: 'clamp'
  });
  
  // Animated profile scale
  const profileScale = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.8],
    extrapolate: 'clamp'
  });

  return (
  <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.backgroundDark }}>
      <SystemBars style='light' />
      
      {/* Animated Header Background */}
      <Animated.View 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: Platform.OS === 'ios' ? 100 : 80,
          backgroundColor: themeColors.background,
          opacity: headerBackgroundOpacity,
          zIndex: 10,
        }}
      />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={{ padding: 20, paddingTop: 100 }}
      >
        {/* Profile Header */}
        <Animated.View 
          style={{ 
            alignItems: 'center', 
            marginBottom: 30,
            transform: [{ scale: profileScale }]
          }}
        >
          <View style={{ 
            backgroundColor: themeColors.cardBackground, 
            width: 120, 
            height: 120, 
            borderRadius: 60, 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginBottom: 20,
            borderWidth: 4, 
            borderColor: themeColors.primary,
            shadowColor: themeColors.primary,
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.2,
            shadowRadius: 8,
            elevation: 6,
          }}>
            <Image style={{ width: 110, height: 110, borderRadius: 55 }} source={require('../../../assets/images/yo-tech-logo.webp')} />
          </View>
          <Text style={{ 
            fontSize: 28, 
            fontWeight: '800', 
            marginBottom: 6, 
            color: 'white', 
            letterSpacing: 0.5 
          }}>
            Yo-Tech
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: 'white', 
            fontWeight: '600', 
            marginBottom: 16,
            backgroundColor: 'rgba(108, 99, 255, 0.1)',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12
          }}>
            @Yoh_Space
          </Text>
          <Text style={{ 
            fontSize: 16, 
            color: 'white', 
            textAlign: 'center', 
            lineHeight: 24, 
            paddingHorizontal: 10 
          }}>
            We are passionate full stack developers creating beautiful, scalable cross-platform 
            mobile and web applications for clients worldwide.
          </Text>
        </Animated.View>
        
        {/* Social Media Section */}
        <View style={{ 
          width: '100%', 
          marginBottom: 24, 
          backgroundColor: 'whitesmoke', 
          borderRadius: 16, 
          padding: 20, 
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2
        }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '700', 
            marginBottom: 16, 
            color: '#2D3748', 
          }}>
            Connect With Us
          </Text>
          {CONTACTS.map((contact, index) => (
            <TouchableOpacity
              key={contact.label}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: index % 2 === 0 ? 'rgba(108, 99, 255, 0.03)' : 'transparent', 
                borderRadius: 12, 
                padding: 16, 
                marginBottom: 8,
              }}
              activeOpacity={0.7}
              onPress={() => Linking.openURL(contact.link)}
            >
              <View style={{ 
                backgroundColor: 'rgba(108, 99, 255, 0.1)', 
                width: 44, 
                height: 44, 
                borderRadius: 12, 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginRight: 16 
              }}>
                <Ionicons name={contact.icon} size={22} color="#6C63FF" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontWeight: '600', color: '#2D3748', fontSize: 16 }}>{contact.label}</Text>
                <Text style={{ color: '#718096', fontSize: 14 }}>{contact.value}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#A0AEC0" />
            </TouchableOpacity>
          ))}
        </View>
        
        {/* Services Section */}
        <View style={{ 
          width: '100%', 
          backgroundColor: 'white', 
          borderRadius: 16, 
          padding: 20, 
          marginBottom: 20,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 2
        }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '700', 
            marginBottom: 16, 
            color: '#2D3748', 
          }}>
            Our Services
          </Text>
          {SERVICES.map((service, idx) => (
            <View 
              key={idx} 
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 12, 
                paddingVertical: 10, 
                paddingHorizontal: 8, 
                borderRadius: 10, 
                backgroundColor: idx % 2 === 0 ? 'rgba(108, 99, 255, 0.03)' : 'transparent' 
              }}
            >
              <View style={{ 
                width: 28, 
                height: 28, 
                borderRadius: 8, 
                backgroundColor: 'rgba(108, 99, 255, 0.1)', 
                justifyContent: 'center', 
                alignItems: 'center', 
                marginRight: 16 
              }}>
                <Ionicons name="checkmark" size={16} color="#6C63FF" />
              </View>
              <Text style={{ color: '#4A5568', fontSize: 16, flex: 1 }}>{service}</Text>
            </View>
          ))}
        </View>
        
        {/* Call to Action Button */}
        <TouchableOpacity
          style={{
            backgroundColor: '#6C63FF',
            paddingVertical: 16,
            borderRadius: 14,
            alignItems: 'center',
            marginBottom: 24,
            shadowColor: '#6C63FF',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
            elevation: 4
          }}
          activeOpacity={0.8}
          onPress={() => {Linking.openURL('https://yotech.space/contact');}}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: '600' }}>
            Get In Touch
          </Text>
        </TouchableOpacity>
        
        {/* Footer Note */}
        <Text style={{ 
          fontSize: 14, 
          color: '#A0AEC0', 
          textAlign: 'center', 
          fontStyle: 'italic',
          marginBottom: 30
        }}>
          Let's build something amazing together!
        </Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}