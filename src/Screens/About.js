import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
  Image,
  StatusBar
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SystemBars } from 'react-native-edge-to-edge';
// Developer info from DeveloperScreen.jsx
const DEVELOPER_CONTACTS = [
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

const DEVELOPER_SERVICES = [
  'Full Stack Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'API Integration',
  'Google Admob Integration',
  'Technical Support',
];
const AD_UNIT_ID = 'ca-app-pub-7604915619325589/2035186062';

export default function About({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [adLoaded, setAdLoaded] = React.useState({ top: false, bottom: false });

  const openModal = (content) => {
    setModalContent(content);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setModalContent(null);
  };
  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Handhuuraa Oromo Arsi app! Download now from the Play Store.',
      });
    } catch (error) {
      alert('Error sharing app');
    }
  };

  const menuItems = [
    {
      title: 'Author',
      icon: 'person',
      color: '#166d67',
      action: () => openModal({
        title: 'Author',
        content: (
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
              onPress={() => Linking.openURL("mailto:Ebroseta50@gmail.com?subject=Regarding Handhuuraa Oromo Arsi Book").catch(() => Alert.alert("Error", "Unable to open email client."))}
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 10, marginBottom: 10 }}
            >
              <Ionicons name="mail" size={20} color="#166d67" style={{ marginRight: 10 }} />
              <Text style={{ color: '#166d67', fontWeight: '600', fontSize: 15 }}>Ebroseta50@gmail.com</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("tel:+16515002991").catch(() => Alert.alert("Error", "Unable to open phone dialer."))}
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14, marginBottom: 10 }}
            >
              <Ionicons name="call" size={20} color="#166d67" style={{ marginRight: 10 }} />
              <Text style={{ color: '#166d67', fontWeight: '600', fontSize: 15 }}>+1 651-500-2991</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL("https://wa.me/+16515002991").catch(() => Alert.alert("Error", "WhatsApp is not installed."))}
              style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#e0f7fa', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 14 }}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#25D366" style={{ marginRight: 10 }} />
              <Text style={{ color: '#166d67', fontWeight: '600', fontSize: 15 }}>WhatsApp</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
 {
  title: 'Developer',
  icon: 'code',
  color: '#6C63FF',
  action: () => openModal({
    title: 'About Us',
    content: (
      <ScrollView 
        style={{ maxHeight: 500, width: '100%' }} 
        contentContainerStyle={{ alignItems: 'center', padding: 15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header with Animation */}
        <View style={{ 
          alignItems: 'center', 
          marginBottom: 20,
          transform: [{ scale: 1 }],
          transition: 'transform 0.3s ease'
        }}>
          <View style={{
            backgroundColor: 'rgba(108, 99, 255, 0.1)',
            width: 80,
            height: 80,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 15,
            borderWidth: 2,
            borderColor: '#6C63FF'
          }}>
            <Ionicons name="code" size={40} color="#6C63FF" />
          </View>
          
          <Text style={{ 
            fontSize: 22, 
            fontWeight: '800', 
            marginBottom: 5,
            color: '#2D3748',
            letterSpacing: 0.5
          }}>
            Yo-Tech 
          </Text>
          
          <Text style={{ 
            fontSize: 16, 
            color: '#6C63FF',
            fontWeight: '600',
            marginBottom: 15
          }}>
            @Yoh_Space
          </Text>
          
          <Text style={{ 
            fontSize: 15, 
            color: '#4A5568', 
            textAlign: 'center', 
            lineHeight: 22,
            paddingHorizontal: 10
          }}>
            we are passionate full stack developers creating beautiful, scalable cross-platform 
            mobile and web applications for clients worldwide.
          </Text>
        </View>

        {/* Social Media Section */}
        <View style={{ 
          width: '100%', 
          marginBottom: 20,
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 15,
          shadowColor: '#6C63FF',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3
        }}>
          <Text style={{ 
            fontSize: 16, 
            fontWeight: '700', 
            marginBottom: 12, 
            color: '#6C63FF',
            paddingLeft: 5
          }}>
            Connect With Me
          </Text>
          
          {DEVELOPER_CONTACTS.map((contact) => (
            <TouchableOpacity
              key={contact.label}
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                backgroundColor: 'rgba(108, 99, 255, 0.05)', 
                borderRadius: 8, 
                padding: 12, 
                marginBottom: 8,
                borderWidth: 1,
                borderColor: 'rgba(108, 99, 255, 0.1)',
                transition: 'all 0.2s ease'
              }}
              activeOpacity={0.7}
              onPress={() => Linking.openURL(contact.link)}
            >
              <View style={{
                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                width: 32,
                height: 32,
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12
              }}>
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
        <View style={{ 
          width: '100%',
          backgroundColor: 'white',
          borderRadius: 12,
          padding: 15,
          shadowColor: '#6C63FF',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 3
        }}>
          <Text style={{ 
            fontSize: 16, 
            fontWeight: '700', 
            marginBottom: 12, 
            color: '#6C63FF',
            paddingLeft: 5
          }}>
            My Services
          </Text>
          
          {DEVELOPER_SERVICES.map((service, idx) => (
            <View 
              key={idx} 
              style={{ 
                flexDirection: 'row', 
                alignItems: 'center', 
                marginBottom: 10,
                paddingVertical: 8,
                paddingHorizontal: 5,
                borderRadius: 6,
                backgroundColor: idx % 2 === 0 ? 'rgba(108, 99, 255, 0.03)' : 'transparent'
              }}
            >
              <View style={{
                width: 24,
                height: 24,
                borderRadius: 6,
                backgroundColor: 'rgba(108, 99, 255, 0.1)',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 12
              }}>
                <Ionicons name="checkmark" size={14} color="#6C63FF" />
              </View>
              <Text style={{ color: '#4A5568', fontSize: 14 }}>{service}</Text>
            </View>
          ))}
        </View>

        {/* Footer Note */}
        <Text style={{ 
          fontSize: 13, 
          color: '#A0AEC0', 
          marginTop: 20,
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          Let's build something amazing together!
        </Text>
      </ScrollView>
    ),
    modalStyle: {
      backgroundColor: '#F8FAFC',
      borderRadius: 16,
      padding: 0,
      overflow: 'hidden'
    }
  })
},
    {
      title: 'Share App',
      icon: 'share',
      color: '#e67e22',
      action: () => openModal({
        title: 'Share App',
        content: (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <LottieView
              source={require('../../assets/animations/share.json')}
              autoPlay
              loop
              style={{ width: 60, height: 60, marginBottom: 10 }}
            />
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Share App</Text>
            <TouchableOpacity onPress={handleShare} style={{ backgroundColor: '#e67e22', padding: 10, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Share Now</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
    {
      title: 'Rate App',
      icon: 'star',
      color: '#f1c40f',
      action: () => openModal({
        title: 'Rate App',
        content: (
          <View style={{ alignItems: 'center', padding: 20 }}>
            <Icon name="star" size={40} color="#f1c40f" style={{ marginBottom: 10 }} />
            <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>Rate App</Text>
            <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.custompdfreader&hl=en')} style={{ backgroundColor: '#f1c40f', padding: 10, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '600' }}>Rate Now</Text>
            </TouchableOpacity>
          </View>
        )
      })
    },
{
  title: 'More Apps',
  icon: 'apps',
  color: '#8e44ad',
  action: () => navigation.navigate('MoreAppsScreen'),
},
  ];

  return (
    <View style={styles.background}>
      <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={['rgba(255,255,255,0.96)', 'rgba(255,255,255,0.92)']}
          style={styles.contentWrapper}
        >
          <SystemBars style="light" />
          <View style={styles.header}>
            <LottieView
              source={require('../../assets/animations/about.json')}
              autoPlay
              loop
              style={{ width: 60, height: 60, marginBottom: 10 }}
            />
            <Text style={styles.title}>About This App</Text>
            <Text style={styles.subtitle}>Explore more about Handhuuraa Oromo Arsi</Text>
          </View>

          <View style={styles.menuContainer}>
            {menuItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                onPress={item.action}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={[item.color, `${item.color}cc`]}
                  style={styles.menuItem}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <View style={styles.iconContainer}>
                    {item.icon === 'share' ? (
                      <LottieView
                        source={require('../../assets/animations/share.json')}
                        autoPlay
                        loop
                        style={{ width: 32, height: 32 }}
                      />
                    ) : (
                      <Icon name={item.icon} size={24} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  <Icon name="chevron-right" size={24} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            ))}

          <Text style={styles.footerText}>Handhuuraa Oromo Arsi v1.0.5</Text>
          </View>
        </LinearGradient>
      </ScrollView>

      {/* Modal View */}
      {modalVisible && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 999,
        }}>
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 40,
            minWidth: 280,
            maxWidth: '80%',
            alignItems: 'center',
            elevation: 10,
          }}>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 5 }}>{modalContent?.title}</Text>
            {modalContent?.content}
            <TouchableOpacity onPress={closeModal} style={{ marginTop: 5, backgroundColor: '#1a5f9c', paddingHorizontal: 22, paddingVertical: 10, borderRadius: 8 }}>
              <Text style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
    padding: 20,
    minHeight: '100%',
    marginTop: 20, // Added margin top for spacing
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerIcon: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    fontWeight: '500',
    textAlign: 'center',
  },
  menuContainer: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 15,
  },
  menuItemText: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    textAlign: 'center',
    marginTop: 30,
    color: '#95a5a6',
    fontSize: 14,
  },
});