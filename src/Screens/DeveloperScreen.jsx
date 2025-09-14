import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { SystemBars } from 'react-native-edge-to-edge';
import { SafeAreaView } from 'react-native-safe-area-context';

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
    value: 'Telegram: @Yoh_Space',
    link: 'https://t.me/yoh_space',
  },
  {
    icon: 'play-circle',
    label: 'YouTube',
    value: 'Youtube: youtube.com/yoh-space',
    link: 'https://youtube.com/@yoh_space',
  },
  {
    icon: 'logo-twitter',
    label: 'Twitter',
    value: 'Twitter: x.com/yoh_space',
    link: 'https://x.com/yoh_space',
  },
  {
    icon: 'logo-web-component',
    label: 'Website',
    value: 'Website: yotech.space',
    link: 'https://yotech.space',
  },
];

const DEVELOPER_SERVICES = [
  'Full Stack Web Development',
  'Mobile App Development',
  'UI/UX Design',
  'API Integration',
  'Google Adsense / Admob Integration',
  'Technical Support',
];

export default function DeveloperScreen() {
  const navigation = useNavigation();
  const statusBarBg = isDark ? '#000' : '#e6f7e6';

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: statusBarBg,
      }}
    >
      <SystemBars style='auto'/>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={26} color="#222" />
          </TouchableOpacity>
          <Text style={styles.title}>About Us</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Yo-Tech (Yoh_Space)</Text>
          <Text style={styles.cardDesc}>
            I am a passionate full stack developer specializing in web and
            mobile applications. I build beautiful, scalable, and robust
            solutions for clients worldwide.
          </Text>
        </View>
        <Text style={styles.sectionTitle}>Contact</Text>
        {DEVELOPER_CONTACTS.map((contact) => (
          <TouchableOpacity
            key={contact.label}
            style={styles.contactRow}
            onPress={() => Linking.openURL(contact.link)}
          >
            <Ionicons
              name={contact.icon}
              size={22}
              color="#4a6cf7"
              style={{ marginRight: 12 }}
            />
            <Text style={styles.contactLabel}>Yoh Dam</Text>
            <Text style={styles.contactValue}>React Native Developer</Text>
          </TouchableOpacity>
        ))}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Services</Text>
          {DEVELOPER_SERVICES.map((service, idx) => (
            <View key={idx} style={styles.serviceRow}>
              <Ionicons
                name="checkmark-circle"
                size={20}
                color="#4a6cf7"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.serviceText}>{service}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 10,
    backgroundColor: '#e6f7e6',
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  backButton: {
    marginRight: 10,
    padding: 6,
    borderRadius: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#222',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    textAlign: 'center',
  },
  cardDesc: {
    color: '#444',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  contactLabel: {
    fontWeight: 'bold',
    color: '#4a6cf7',
    marginRight: 6,
  },
  contactValue: {
    color: '#222',
    fontSize: 15,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 8,
  },
  serviceText: {
    color: '#444',
    fontSize: 15,
  },
});
