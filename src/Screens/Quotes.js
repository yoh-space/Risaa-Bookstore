import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import LottieView from 'lottie-react-native';
import Orientation from "react-native-orientation-locker";
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, Platform, TextInput, Alert } from "react-native";
import { BannerAd, BannerAdSize, InterstitialAd, AdEventType } from 'react-native-google-mobile-ads';
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { SystemBars } from "react-native-edge-to-edge";

const quotes = [
    {
      text: "Oromoon waa lama jechuun Lafaa fi eenyumaa isaa yoo jalaa tuqan; Obsa hin qabu akkuma qeerransaa utaalee mataa diinaa irra bu’a.",
      source: "Handhuuraa Oromoo Arsii, Page 32",
    },
    {
      text: "Oromoon yoo tuqan malee nama hin tuqu, Oromoon saba kiyya ta’eefi miti, sheleef hin jenne.",
      source: "Handhuuraa Oromoo Arsii, Page 32",
    },
    {
      
      text: "Nama qalqala qabutu garbuu kadhata.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Farda sangaa ta’u haada irratti beeku.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Dhugaan ilmoo Rabbiiti.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Osoo hin madaalin waldhaansoo hin bayin.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Gumaan seerri Gadaa ittiin murteessituu seera uumamaa dha.",
      source: "Handhuuraa Oromoo Arsii, Page 366",
    },
    {
      text: "Araarri danuu qulqulleessuf godhamu, tokko jaarsi araaraa murteesse nagaya buusuudha.",
      source: "Handhuuraa Oromoo Arsii, Page 366",
    },
    {
      text: "Bitata wallaalanii gabayaa abaaran.",
      source: "Handhuuraa Oromoo Arsii, Page 289",
    },
    {
      text: "Abbaan mishaan haabubbuluu barnootan nama guddisaa, Ilmi mishaan haabubbuluu abbaa gurra muldhisa.",
      source: "Handhuuraa Oromoo Arsii, Page 441",
    },
    {
      text: "Abbaan tulluudha, Ilmi muka tulluu irraati.",
      source: "Handhuuraa Oromoo Arsii, Page 441",
    },
    {
      text: "Seerri sirna Gadaa heera uumama waaqaa fi lafaa irraa ka’eeti.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Nama kufe ol qabee aannan itti qaba; yoo aannan hin jirree bishaan itti qaba.",
      source: "Handhuuraa Oromoo Arsii, Page 32",
    },
    {
      text: "Yoo waliin jiraatan amala walii baru.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Amalli hin dhiisu, gaarri hin godaanu.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Kan amala gaarii qabu hunda waliin jiraata.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Hantuunni amala qabdu abbaa warraa waliin nyaatti.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Dhugaa fi tikseen galgala galti.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Waaben eessaa dabe jennaan; Ilka-muummee.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Nama beelaye garaa itti jabaate hin beeku.",
      source: "Handhuuraa Oromoo Arsii, Page 366",
    },
    {
      text: "Oromoon yoo tuqamee malee nama hin tuqu.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Dabaan buluun bultii hin tahu.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Lafarraa buruqxu malee urjii hin tuqan.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Nama malee, safuu fi seerri lafa guddisan.",
      source: "Handhuuraa Oromoo Arsii, Page 440",
    },
    {
      text: "Intala jibbantu ilma dhalaa, ilma jibbantu ardaa dhaala.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Amalaa fi Adurreen diinqa bulti.",
      source: "Handhuuraa Oromoo Arsii, Page 439",
    },
    {
      text: "Araarri waanyoon keessa jirtu woyyaa taati malee fayyaa hin taatu.",
      source: "Handhuuraa Oromoo Arsii, Page 473",
    },
    {
      text: "Qadhaaba ceem’an keessa jirtu woyyaa taati malee fayyaa hin taatu.",
      source: "Handhuuraa Oromoo Arsii, Page 473",
    },
    {
      text: "Bishaan deemsaan malee, Fardi sangaan deemsaan male, Hayyichi/aalimni deemsaan male.",
      source: "Handhuuraa Oromoo Arsii, Page 474",
    },
    {
      text: "Dubartiin teessumaan malte, Ibiddi teessumaan male, Kinniisni teessumaan male.",
      source: "Handhuuraa Oromoo Arsii, Page 474",
    },
  ];  
// AdMob test banner unit ID for both Android and iOS
const adUnitId = 'ca-app-pub-7604915619325589/3947033537';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, { requestNonPersonalizedAdsOnly: true });

const QUOTES_STORAGE_KEY = 'HANDHUURAA_QUOTES';
const Quotes = ({ onBack }) => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [newQuoteText, setNewQuoteText] = useState("");
  const [newQuoteSource, setNewQuoteSource] = useState("");
  const [allQuotes, setAllQuotes] = useState(quotes);
  const [interstitialLoaded, setInterstitialLoaded] = useState(false);

  // Load quotes from AsyncStorage on mount
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const storedQuotes = await AsyncStorage.getItem(QUOTES_STORAGE_KEY);
        if (storedQuotes) {
          setAllQuotes(JSON.parse(storedQuotes));
        }
      } catch (e) {
        console.log('Failed to load quotes:', e);
      }
    };
    loadQuotes();
  }, []);

  // Save quotes to AsyncStorage whenever allQuotes changes
  useEffect(() => {
    const saveQuotes = async () => {
      try {
        await AsyncStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(allQuotes));
      } catch (e) {
        console.log('Failed to save quotes:', e);
      }
    };
    saveQuotes();
  }, [allQuotes]);
  useEffect(() => {
      const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
        setInterstitialLoaded(true);
      });
  
      const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
        setInterstitialLoaded(false); // Reset for next ad load
        interstitial.load(); // Load a new ad after one is closed
      });
  
      interstitial.load(); // Initial load
  
      return () => {
        unsubscribeLoaded();
        unsubscribeClosed();
      };
    }, []);
  
    const showInterstitial = () => {
      if (interstitialLoaded) {
        interstitial.show();
      } else {
        console.log('Interstitial not loaded yet.');
      }
    };

  // Handler for deleting a quote with confirmation
  const handleDeleteQuote = (index) => {
    Alert.alert(
      'Delete Quote',
      'Are you sure you want to delete this quote?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            setAllQuotes((prevQuotes) => prevQuotes.filter((_, i) => i !== index));
          },
        },
      ]
    );
  };
  useEffect (() => {
    Orientation.lockToPortrait();
  }, []);

  const handleAddQuote = () => {
    if (!newQuoteText.trim() || !newQuoteSource.trim()) return;
    setAllQuotes(prev => [
      ...prev,
      { text: newQuoteText, source: newQuoteSource }
    ]);
    setAddModalVisible(false);
    setNewQuoteText("");
    setNewQuoteSource("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <SystemBars style='light'/>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icons name="arrow-left" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.header}> Quotes from Book</Text>
      </View>

      {/* Add Quote Floating Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => {
          setAddModalVisible(true);
          if (interstitialLoaded) {
            showInterstitial();
          }
        }}
        activeOpacity={0.8}
      >
        <LottieView
          source={require('../../assets/animations/addQuote.json')}
          autoPlay
          loop
          style={{ width: 70, height: 70 }}
        />
        <Text style={styles.floatingButtonText}>Add Quote</Text>
      </TouchableOpacity>

      {/* Scrollable Quotes List */}
      <ScrollView style={styles.quoteList}>
        {allQuotes.map((quote, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSelectedQuote(quote)}
            onLongPress={() => handleDeleteQuote(index)}
            delayLongPress={400}
          >
            <View style={styles.quoteContainer}>
              <Icons name="format-quote-close" size={20} color="white" />
              <Text style={styles.quoteText}>{quote.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Quote Modal */}
      <Modal
        visible={addModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setAddModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setAddModalVisible(false)}>
          <View style={styles.modalBackground}>
            <TouchableWithoutFeedback>
              <View style={[styles.modalContainer, { alignItems: 'stretch' }]}> 
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#1a73e8', textAlign: 'center' }}>Add a Quote</Text>
                <Text style={{ fontSize: 15, marginBottom: 6 }}>Quote Text</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Enter quote text"
                  value={newQuoteText}
                  onChangeText={setNewQuoteText}
                  multiline
                  numberOfLines={3}
                />
                <Text style={{ fontSize: 15, marginBottom: 6, marginTop: 10 }}>Reference / Page</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Handhuuraa Oromoo Arsii, Page 123"
                  value={newQuoteSource}
                  onChangeText={setNewQuoteSource}
                />
                <View style={{ alignItems: 'center', marginTop: 10 }}>
                  <TouchableOpacity
                    style={{ backgroundColor: '#1a73e8', borderRadius: 30, width: 80, height: 30, justifyContent: 'center', alignItems: 'center',flexDirection: 'row' }}
                    onPress={handleAddQuote}
                    activeOpacity={0.8}
                  >
                    <Icon name='check' size={25} color="#fff" />
                    <Text style={{ color: '#fff', fontSize: 12, marginLeft: 5 }}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      {/* Modal for Quote Details */}
      {selectedQuote && (
        <Modal transparent visible={true} animationType="slide">
        <TouchableWithoutFeedback onPress={() => setSelectedQuote(null)}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalQuote}>{selectedQuote.text}</Text>
              <Text style={styles.modalSource}>{selectedQuote.source}</Text>
            </View>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#512904ff",
    paddingHorizontal: 15,
  },
  floatingButtonText:{
    fontSize: 12,
    fontWeight: 300,
    color: 'white',
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
  },
  quoteList: {
    flex: 1,
    paddingBottom: 20,
    backgroundColor: "#40250fff",
  },
  quoteContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    backgroundColor: "#605e5dff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  quoteText: {
    fontSize: 16,
    color: "white",
    marginLeft: 10,
    flex: 1,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#512904ff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalQuote: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
    color: "white",
  },
  modalSource: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  closeButton: {
    padding: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    fontSize: 15,
    color: '#222',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
});

export default Quotes;