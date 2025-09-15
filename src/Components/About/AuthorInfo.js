import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Linking } from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';

const { width } = Dimensions.get('window');

export default function AuthorInfo() {
  const [scaleValue] = useState(new Animated.Value(1));
  
  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };
  
  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const handleEmail = () => {
    Linking.openURL("mailto:kadiirabdullaxif@gmail.com?subject=Regardin to Risaa Bookstore App");
  };
  const handlePhone = () => {
    Linking.openURL("tel:+251928753295");
  };
  const handleWhatsApp = () => {
    Linking.openURL("https://wa.me/+251928753295");
  };
  return (
    <SafeAreaView style={{ 
      alignItems: 'center', 
      flex: 1,
      padding: 20, 
      borderRadius: 16,
      marginVertical: 10,

    }}>
      <SystemBars style='dark' />
      {/* Author Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        marginBottom: 16, 
        width: '100%' 
      }}>
        <View style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 2
        }}>
          <Image
            source={require('../../../assets/images/kadiir.png')}
            style={{ 
              width: 80, 
              height: 80, 
              marginRight: 16, 
              borderRadius: 20,
              borderWidth: 3,
              borderColor: '#E8F5F4'
            }}
            resizeMode="cover"
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ 
            fontSize: 20, 
            fontWeight: '700', 
            color: '#166d67',
            marginBottom: 4
          }}>
            Kadiir Abdulaxif
          </Text>
          <View style={{
            backgroundColor: 'rgba(22, 109, 103, 0.1)',
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: 12,
            alignSelf: 'flex-start'
          }}>
            <Text style={{ 
              fontSize: 14, 
              color: '#166d67', 
              fontWeight: '500'
            }}>
              Author and Blogger
            </Text>
          </View>
        </View>
      </View>
      
      <Text style={{ 
        fontSize: 15, 
        color: '#4A5568', 
        marginBottom: 20, 
        textAlign: 'center',
        lineHeight: 22
      }}>
        Get in touch for collaborations, questions, or feedback
      </Text>
      
      {/* Contact Options */}
      <View style={{ width: '100%' }}>
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            onPress={handleEmail}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: '#F5FDFC', 
              borderRadius: 14, 
              padding: 16, 
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#E0F7FA'
            }}
          >
            <View style={{
              backgroundColor: 'rgba(22, 109, 103, 0.1)',
              width: 44,
              height: 44,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16
            }}>
              <Ionicons name="mail" size={22} color="#166d67" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                color: '#166d67', 
                fontWeight: '600', 
                fontSize: 16,
                marginBottom: 2
              }}>
                Email
              </Text>
              <Text style={{ 
                color: '#4A5568', 
                fontSize: 14 
              }}>
                kadiirabdullaxif@gmail.com
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#166d67" />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            onPress={handlePhone}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: '#F5FDFC', 
              borderRadius: 14, 
              padding: 16, 
              marginBottom: 12,
              borderWidth: 1,
              borderColor: '#E0F7FA'
            }}
          >
            <View style={{
              backgroundColor: 'rgba(22, 109, 103, 0.1)',
              width: 44,
              height: 44,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16
            }}>
              <Ionicons name="call" size={22} color="#166d67" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                color: '#166d67', 
                fontWeight: '600', 
                fontSize: 16,
                marginBottom: 2
              }}>
                Phone
              </Text>
              <Text style={{ 
                color: '#4A5568', 
                fontSize: 14 
              }}>
                +251 912 345 678
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#166d67" />
          </TouchableOpacity>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
          <TouchableOpacity
            onPress={handleWhatsApp}
            onPressOut={handlePressOut}
            activeOpacity={0.8}
            style={{ 
              flexDirection: 'row', 
              alignItems: 'center', 
              backgroundColor: '#F5FDFC', 
              borderRadius: 14, 
              padding: 16,
              borderWidth: 1,
              borderColor: '#E0F7FA'
            }}
          >
            <View style={{
              backgroundColor: 'rgba(37, 211, 102, 0.1)',
              width: 44,
              height: 44,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 16
            }}>
              <Ionicons name="logo-whatsapp" size={22} color="#25D366" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                color: '#166d67', 
                fontWeight: '600', 
                fontSize: 16,
                marginBottom: 2
              }}>
                WhatsApp
              </Text>
              <Text style={{ 
                color: '#4A5568', 
                fontSize: 14 
              }}>
                Message me directly
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#166d67" />
          </TouchableOpacity>
        </Animated.View>
      </View>
      
      {/* Social Links */}
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'center', 
        marginTop: 20,
        width: '100%'
      }}>
        <TouchableOpacity style={{
          backgroundColor: 'rgba(22, 109, 103, 0.1)',
          width: 44,
          height: 44,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 8
        }}>
          <Ionicons name="logo-twitter" size={22} color="#166d67" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: 'rgba(22, 109, 103, 0.1)',
          width: 44,
          height: 44,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 8
        }}>
          <Ionicons name="logo-linkedin" size={22} color="#166d67" />
        </TouchableOpacity>
        <TouchableOpacity style={{
          backgroundColor: 'rgba(22, 109, 103, 0.1)',
          width: 44,
          height: 44,
          borderRadius: 22,
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 8
        }}>
          <Ionicons name="logo-instagram" size={22} color="#166d67" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}