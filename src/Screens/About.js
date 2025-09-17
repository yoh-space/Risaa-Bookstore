import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from 'react-native-edge-to-edge';
import FooterInfo from '../Components/About/FooterInfo';
import LottieView from 'lottie-react-native';

export default function About({ navigation }) {

  const menuItems = [
    {
      title: 'Author',
      icon: 'person',
      color: '#166d67',
      action: () => navigation.navigate('AuthorInfoScreen')
    },
    {
      title: 'Developer',
      icon: 'code',
      color: '#6C63FF',
      action: () => navigation.navigate('DeveloperInfoScreen')
    },
    {
      title: 'Share App',
      icon: 'share',
      color: '#e67e22',
      action: () => navigation.navigate('ShareAppScreen')
    },
    {
      title: 'Rate App',
      icon: 'star',
      color: '#f1c40f',
      action: () => navigation.navigate('RateAppScreen')
    },
{
  title: 'More Apps',
  icon: 'apps',
  color: '#8e44ad',
  action: () => navigation.navigate('MoreAppsScreen'),
},
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#7d2e00ff' }}>
      <ScrollView contentContainerStyle={styles.container}>
      <LinearGradient
        colors={['#512904ff', '#211c30ff', '#753704ff']}
        style={styles.background}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
          <SystemBars style="light" />
          <View style={styles.header}>
            <LottieView
              source={require('../../assets/animations/about.json')}
              autoPlay
              loop
              style={{ width: 60, height: 60, marginBottom: 10 }}
            />
            <Text style={styles.title}>About Risaa</Text>
            <Text style={styles.subtitle}>Explore more about Author of Risaa Book Collections</Text>
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
    color: 'white',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
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