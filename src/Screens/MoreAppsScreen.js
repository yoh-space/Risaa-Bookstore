import React, {useEffect,useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
  StatusBar,
  BackHandler
} from 'react-native';
import { SystemBars } from 'react-native-edge-to-edge';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PlayIcons from 'react-native-vector-icons/Fontisto';
import WebIcons from 'react-native-vector-icons/Foundation';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MoreAppsScreen({ navigation }) {
    useEffect(() => {
      const onBackPress = () => {
        navigation.goBack();
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove();
    }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7d2e00ff' }}>
    <SystemBars style="white" />
    <>
    <ScrollView contentContainerStyle={styles.container}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20}}>
        <Icon name='arrow-back' size={24} color="white" style={{ marginBottom: 20 }} onPress={() => navigation.goBack()} />
        <Text style={styles.header}>More Apps by Developer</Text>            
        </View>
      {/* Kadiir Tech App Card */}
      <LinearGradient colors={["#8e44ad", "#8e44adcc"]} style={styles.card}>
           <View style={styles.cardHeader}>
             <View style={styles.imageCircle}>
               <Image
                 source={require('../../assets/images/kadiirtech.webp')}
                 style={styles.kadiirImage}
                 resizeMode="contain"
               />
             </View>
             <Text style={styles.cardTitle}>Kadiir Tech App</Text>
           </View>
        <Text style={styles.cardDesc}>
          Kadiir Tech 🕊️ waltajjii dijitaalaa Oromoo ammayyaa yoo ta’u, teeknooloojii, beekumsa fi kalaqa bakka tokkotti walitti fiduu irratti kan xiyyeeffatedha. Qabiyyee qulqullina qabu barnoota, aadaa, daldalaa, fayyaa, jireenya fi odeeffannoo garaagaraa dhiyeessuun dargaggoota, ogeeyyii fi abbootii qabeenyaa humneessa. Appiin kun dandeettii dijitaalaa dagaagsa, kalaqa deeggara, eenyummaa Oromoo cimsas. 📲 </Text>
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <TouchableOpacity
            style={styles.cardButton}
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.kadiir.tech')}
          >
            <PlayIcons name="google-play" size={18} color="white" style={{ marginRight: 8 }} />
            <Text style={styles.cardButtonText}>Play Store</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.cardButton, { backgroundColor: 'white', borderWidth: 1, borderColor: '#8e44ad' }]}
            activeOpacity={0.8}
            onPress={() => Linking.openURL('https://kadiir.com')}
          >
            <WebIcons name="web" size={18} color="#8e44ad" style={{ marginRight: 8 }} />
            <Text style={[styles.cardButtonText, { color: '#8e44ad' }]}>Website</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
      {/* Freshman Module App Card */}
            <LinearGradient colors={["#8e44ad", "#8e44adcc"]} style={styles.card}>
           <View style={styles.cardHeader}>
             <View style={styles.imageCircle}>
               <LottieView
                 source={require('../../assets/animations/Book.json')}
                 autoPlay
                 loop
                 style={styles.lottieBook}
               />
             </View>
             <Text style={styles.cardTitle}>Handhuraa Oromoo Arsii</Text>
           </View>
        <Text style={styles.cardDesc}>
          Handhuraa Oromoo Arsii is a comprehensive collection of proverbs, idioms, and wise sayings from the Arsi Oromo community, reflecting their rich cultural heritage and traditional wisdom.
        </Text>
        <TouchableOpacity
          style={styles.cardButton}
          activeOpacity={0.8}
          onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.freshmanmoduleplus')}
        >
          <PlayIcons name="google-play" size={18} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.cardButtonText}>Play Store</Text>
        </TouchableOpacity>
      </LinearGradient>
      {/* Freshman Module Plus Card */}
      <LinearGradient colors={["#8e44ad", "#8e44adcc"]} style={styles.card}>
           <View style={styles.cardHeader}>
             <View style={styles.imageCircle}>
               <LottieView
                 source={require('../../assets/animations/Book.json')}
                 autoPlay
                 loop
                 style={styles.lottieBook}
               />
             </View>
             <Text style={styles.cardTitle}>Freshman Module Plus</Text>
           </View>
        <Text style={styles.cardDesc}>
          Comprehensive all-in-one app for freshman university students with essential tools and resources.
        </Text>
        <TouchableOpacity
          style={styles.cardButton}
          activeOpacity={0.8}
          onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.freshmanmoduleplus')}
        >
          <PlayIcons name="google-play" size={18} color="white" style={{ marginRight: 8 }} />
          <Text style={styles.cardButtonText}>Play Store</Text>
        </TouchableOpacity>
      </LinearGradient>

      <Text style={styles.footer}>All apps are regularly updated with new features and improvements.</Text>
    </ScrollView>    
    </>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#7d2e00ff',
  },
  header: {
    fontSize: 23,
    fontWeight: '800',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
    marginLeft: 20,
  },
  card: {
    width: '100%',
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
    shadowColor: '#8e44ad',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 4,
  },
   cardHeader: {
     flexDirection: 'row',
     alignItems: 'center',
     marginBottom: 12,
   },
   imageCircle: {
     width: 38,
     height: 38,
     borderRadius: 19,
     overflow: 'hidden',
     marginRight: 10,
     borderWidth: 2,
     borderColor: '#fff',
     backgroundColor: '#eee',
     justifyContent: 'center',
     alignItems: 'center',
   },
   lottieBook: {
     width: 38,
     height: 38,
   },
   kadiirImage: {
     width: 38,
     height: 38,
     borderRadius: 19,
     backgroundColor: '#fff',
   },
  iconCircle: {
    backgroundColor: 'rgba(244, 244, 244, 0.63)',
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  cardDesc: {
    fontSize: 15,
    color: '#f3e9f7',
    marginBottom: 16,
    lineHeight: 20,
  },
  cardButton: {
    backgroundColor: '#8e44ad',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    marginTop: 4,
  },
  cardButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
  footer: {
    fontSize: 13,
    color: '#A0AEC0',
    marginTop: 16,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
});
