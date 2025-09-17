import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from 'react-native-edge-to-edge';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../Components/Utils/color';

const { width, height } = Dimensions.get('window');

export default function Profile() {
  const options = [
    { id: 1, name: 'Edit Profile', icon: 'person' },
    { id: 2, name: 'Bio', icon: 'info' },
    { id: 3, name: 'Quick Access', icon: 'flash-on' },
    { id: 4, name: 'Purchase History', icon: 'shopping-cart' },
    { id: 5, name: 'Options', icon: 'settings' },
    { id: 6, name: 'Help & Support', icon: 'help' },
    { id: 7, name: 'Logout', icon: 'logout' },
    { id: 8, name: 'About Us', icon: 'info' },
  ];

  return (
    <LinearGradient
      colors={[
        themeColors.gradientStart,
        themeColors.gradientMiddle,
        themeColors.gradientEnd,
      ]}
      style={styles.background}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SystemBars style="light" />
      <View style={styles.topShape} />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={{ height: 24 }} />
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{
                uri: 'https://i.pravatar.cc/150?img=12', // placeholder avatar
              }}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Icon name="edit" size={18} color={themeColors.textOnPrimary} />
            </TouchableOpacity>
          </View>
          <Text style={styles.username}>John Doe</Text>
          <Text style={styles.userEmail}>johndoe@email.com</Text>
        </View>
        <View style={styles.optionsContainer}>
          {options.map((item) => (
            <TouchableOpacity key={item.id} style={styles.optionCard}>
              <Icon name={item.icon} size={24} color={themeColors.primary} />
              <Text style={styles.optionText}>{item.name}</Text>
              <Icon
                name="keyboard-arrow-right"
                size={24}
                color={themeColors.textSecondary}
                style={{ marginLeft: 'auto' }}
              />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 32 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingBottom: 24,
  },
  background: { flex: 1 },
  scrollWrapper: {
    flex: 1,
    paddingHorizontal: 0,
  },
  topShape: {
    position: 'absolute',
    top: -height * 0.15,
    right: -width * 0.2,
    width: width * 0.8,
    height: width * 0.8,
    borderRadius: width * 0.4,
    backgroundColor: themeColors.cardShadow,
  },
  header: {
    alignItems: 'center',
    marginTop: height * 0.10,
    marginBottom: 18,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: themeColors.primary,
    backgroundColor: themeColors.card,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: themeColors.primary,
    borderRadius: 12,
    padding: 6,
    borderWidth: 2,
    borderColor: themeColors.card,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginTop: 10,
  },
  userEmail: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
  optionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: themeColors.card,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
    marginBottom: 14,
    shadowColor: '#000',
    shadowOpacity: 0.10,
    shadowRadius: 8,
    elevation: 4,
  },
  optionText: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 14,
    color: themeColors.textPrimary,
  },
});
