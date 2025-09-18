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
import { logOut } from '../Auth/authService';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from 'react-native-edge-to-edge';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../Components/Utils/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { options } from '../Components/Utils/profileOptions';

const { width, height } = Dimensions.get('window');

export default function Profile({navigation}) {

  // Example user data
  const user = {
    name: 'Ryan Sterling',
    id: '1105486242',
    membership: 'Standard Member',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };

  return (
    <View style={{flex:1}}>
      <LinearGradient
        colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
       <View style={styles.headerRow}>
        <Icon name="person" size={24} color="white" style={styles.backIcon} />
        <Text style={styles.profileTitle}>Profile</Text>
        <TouchableOpacity onPress={() => {    
          navigation.navigate('RootStack', { screen: 'Login' });
        }} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity style={styles.editAvatarBtn}>
              <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userId}>ID No : {user.id}</Text>
          <View style={styles.memberBadge}>
            <Text style={styles.memberBadgeText}>{user.membership}</Text>
          </View>
        </View>
        {options.map((section) => (
          <View key={section.title} style={{ marginBottom: 18 }}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.optionsContainer}>
              {section.data.map((item) => (
                <TouchableOpacity key={item.id} style={styles.optionCard}>
                  {item.name === 'Payment History' ? (
                    <Ionicons name="cart" size={22} color={themeColors.primary} />
                  ) : (
                    <Icon name={item.icon} size={22} color={themeColors.primary} />
                  )}
                  <Text style={styles.optionText}>{item.name}</Text>
                  {item.value && (
                    <Text style={styles.optionValue}>{item.value}</Text>
                  )}
                  <Icon name="keyboard-arrow-right" size={22} color={themeColors.textSecondary} style={{ marginLeft: 'auto' }} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
        <View style={{ height: 32 }} />
      </ScrollView>             
    </LinearGradient>

    </View>
  );
}

const styles = StyleSheet.create({
    sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginLeft: 22,
    marginTop: 24,
    marginBottom: 6,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingBottom: 24,
  },
  bg: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 8,
    backgroundColor: 'transparent',
  },
  profileTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
  },
  logoutBtn: {
    padding: 4,
  },
  logoutText: {
    color: themeColors.danger,
    fontWeight: 'bold',
    fontSize: 15,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
    paddingBottom: 24,
  },
  profileCard: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 18,
    marginHorizontal: 18,
    marginTop: 10,
    alignItems: 'center',
    paddingVertical: 24,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: themeColors.backgroundLight,
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: -8,
    left: '50%',
    transform: [{ translateX: -22 }],
    backgroundColor: themeColors.cardBackground,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: themeColors.cardBorder,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  editText: {
    color: themeColors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  userName: {
    fontSize: 19,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginTop: 8,
  },
  userId: {
    fontSize: 14,
    color: themeColors.textSecondary,
    marginTop: 2,
  },
  memberBadge: {
    backgroundColor: themeColors.warning,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginTop: 8,
  },
  memberBadgeText: {
    color: themeColors.textOnLight,
    fontWeight: 'bold',
    fontSize: 13,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginLeft: 22,
    marginTop: 28,
    marginBottom: 10,
  },
  optionsContainer: {
    backgroundColor: themeColors.cardBackground,
    borderRadius: 16,
    marginHorizontal: 14,
    paddingVertical: 8,
    paddingHorizontal: 2,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    marginBottom: 2,
  },
  optionText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 14,
    color: themeColors.textPrimary,
    flex: 1,
  },
  optionValue: {
    fontSize: 13,
    color: themeColors.textSecondary,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
    marginLeft: 22,
    marginTop: 24,
    marginBottom: 6,
  },
});
