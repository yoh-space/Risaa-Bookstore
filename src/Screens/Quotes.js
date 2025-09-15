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
    "text": "Ijoollee biyyaa kootii, hundumtuu haadhoo kooti.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Maaloo ormaayyuu guddisee, dabarseefii boonsee, maaf dabaree dhabaa? jette Oromiyaan, jette harmeen, boossee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Qotee qotee namichi, sanyii darbatee. Rafeen bulu, namni waan hormaa abdatee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Sooreettii haadha sooree, irbaanni irra buusa qaba.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Maarree yoo du’e, jabaan gaafa biyyaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Biyya ormaa dhaquun nama hindhibuu, galuutu nama dhiba.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Ani yoo du’e, lafa hinsiilessu.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Lubbuu biliqa baatuuf maafan gola naanna’aa, sabaa koof falmeen du’ee Taaddasaa Birruu ta’aa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Jirra jirra bullee barii arguuf, garaa nubal’isee yaa nuhii.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Oromoon Oromoo irratti yeroo dhukaasu arguu caala; du’a wayya, warri du’e nihobbaafate bar.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Baay’inni rakkoodhaa, furmaata mataansaa. Harreen ba’aa diddeeti, taati harree diidaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Garaaf qalbii kiyya hatanii, akkan sirraa cituuf yaadanii.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Nan mammaaka namammaaksisaa, raajii bara kanaa yaa jamaa. Boolla keessa teessee boolla qottii, dhaala abbaashee ilmoon rirmaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Manni keenya holqaaree tabba guddaadha malee, Oromoon biyya diigaaree, biyya ijaare malee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "An sossodaadhee baranaa, qalbii kootii. Gibee gamaan jaaladhee, sanyii mootii…",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Allaattiidhaaf kochoo; qocaadhaa dhagaachaa, kennaa maaltu dida? Jirra hunda baachaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Akkamiin sirraa citaa, fudhee Oromiyaa koo siin lixaa...",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Addaggeen safuun beektu; addarra buusan malee, falmadhu Qeerroo sihii abdiin sabaa yoomillee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Shaayee tiyya shaayee, haleeli shimalaan lolli gaye.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Kormi biyyaa ba’ee; biyyaa hormaa jiru, hinbokkisuu inuma barooda.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Diina hinsarmu; harka hinkennu, goonni Oromoo dura dhuma.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Gabaa galtu hingaggeessan; nidhageeffatu malee, namaa gamtu hindheessan, niwareegamu malee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Yoo Harargee luka cabsan, Wallaggaatu okkola.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Qotiyyoo abbaan didaa, yaa didaa harqoota keessaa. Qorra baraan dadhabee, morma kee jalattan dheessaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Yoo Ambootti goota ajjeessan, Shaasheetu gumaa baasa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Nuun mitii; Farda keenyaa nibeeku bareechanii, gaafa gaarren Adawaa, gaafa Maqalee sanii.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Walirraa fagaanne, kunoo dugdaaf garaa taanee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Cuwaa cufaa jettii, simbirroon halkanii. Nama garaan dhaane, dirmammuun arganii.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Of boodatti deebi’ee, bookeef tafkiin lakkaawu.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Maasaan gamaa lafan baatu; talbaa facaafata taatii, tokko du’ee tokko hinyaatu, wal-gaggalaafata taati.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Harki harka hinyaatu, diina ofii malee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Maaloo yaa ilmaan koo quxisuu; maaloo yaa ilmaan koo hangafaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Waa’een keenyaa, yoo itti dhiisan silaa nama hindhiisu.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Lafa ajaaf raqaa, allaattiif saree malee maaltu dhaqaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Garaan haadhaa burreedhaa, gootas dabbeessasi baata.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Kombortaa ormii namaa hinbaadhatu, abbatu ofii baadhata malee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Keessa namaa hinbeektu, keessa qabattee namatti kenniti.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Yaa jabbiloota koo; yaa jabbiloota odaa jalaa, kan nama nyaatu nukeessa jira.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Hiriyyaan dharaa; garaa sibaraa, mataa simaraa ofeegi hadaraa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Jiruu biyya ormaa maal jireenyaa jedhuu, obsuudha malee, danda’uudha malee kan biraa maal godhuu.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Mootummaan kun ana bituu hindanda’uu beeki, ani ummata kiyyaaf qaaliidha!.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Nafxanyaan kaleessas, hardhas borus diina Oromooti.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Seenaa Rirmi hinyaatu.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Mana gumaa nun geessinaa, mana gumaataa malee.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Biyya sirna gadaa, madda wal-qixxummaa. Gaaddisa odaan kee, mallattoo eenyummaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Lubbuun dhiiraa biliqa, guyyaa baatu hinbeekanii.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Jiituu bonaafi gannaa, kan uumamaan toltee; Jaannata ardiitii, kamtu siin qixxaatee?",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Qabda seenaa boonsaa, kumaatama kumaa! Haadha jechuun, biyya jechuun, anaa Oromiyaa dhumaa.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Hin qaanofneen nama qaanessiti.",
    "source": "— Oromoo Proverbs"
  },
  {
    "text": "Amboo gubbaan, yaa baala goodaree.",
    "source": "— Oromoo Proverbs"
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