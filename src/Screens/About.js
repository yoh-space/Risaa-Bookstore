import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { SystemBars } from 'react-native-edge-to-edge';
import AuthorInfo from '../Components/AuthorInfo';
import DeveloperInfo from '../Components/DeveloperInfo';
import ShareApp from '../Components/ShareApp';
import RateApp from '../Components/RateApp';
import FooterInfo from '../Components/FooterInfo';
import LottieView from 'lottie-react-native';
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

export default function About({ navigation }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);

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
          <AuthorInfo
            onEmailPress={() => Linking.openURL("mailto:kadiirabdullaxif@gmail.com?subject=Regardin to Risaa Bookstore App")}
            onPhonePress={() => Linking.openURL("tel:+251928753295")}
            onWhatsAppPress={() => Linking.openURL("https://wa.me/+251928753295")}
          />
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
      <DeveloperInfo
        contacts={DEVELOPER_CONTACTS}
        services={DEVELOPER_SERVICES}
        onContactPress={link => Linking.openURL(link)}
      />
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
        content: <ShareApp onShare={handleShare} />
      })
    },
    {
      title: 'Rate App',
      icon: 'star',
      color: '#f1c40f',
      action: () => openModal({
        title: 'Rate App',
        content: <RateApp />
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

          <FooterInfo />
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