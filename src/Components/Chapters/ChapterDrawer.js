
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, ScrollView, Easing } from 'react-native';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'react-native-linear-gradient';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const { width } = Dimensions.get('window');


const adUnitId ='ca-app-pub-7604915619325589/3947033537';
const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  requestNonPersonalizedAdsOnly: true,
});

export default function ChapterDrawer({ visible, onClose, onChapterSelect, currentPage, chapterTitle, chapterPage }) {
  // Remove all premium/unlocked logic. Only interstitial ad logic remains.
  const [pendingPage, setPendingPage] = React.useState(null);
  const [adLoaded, setAdLoaded] = React.useState(false);
  const translateX = React.useRef(new Animated.Value(-width)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true,
          easing: Easing.out(Easing.exp)
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: -width,
          duration: 250,
          useNativeDriver: true
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true
        })
      ]).start();
    }
  }, [visible]);

  // Interstitial ad event listeners
  React.useEffect(() => {
    const loaded = interstitial.addAdEventListener(AdEventType.LOADED, () => setAdLoaded(true));
    const closed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
      setAdLoaded(false);
      if (pendingPage !== null) {
        onChapterSelect(pendingPage);
        setPendingPage(null);
      }
      interstitial.load();
    });
    const error = interstitial.addAdEventListener(AdEventType.ERROR, () => {
      setAdLoaded(false);
      if (pendingPage !== null) {
        onChapterSelect(pendingPage);
        setPendingPage(null);
      }
      interstitial.load();
    });
    interstitial.load();
    return () => {
      loaded();
      closed();
      error();
    };
  }, [pendingPage, onChapterSelect]);

  if (!visible) return null;

  const renderChapterItem = (title, idx, isIntro = false) => {
    const page = isIntro ? introPages[idx + 1] : chapterPages[idx + 1];
  // Prefer chapterPage if provided for initial highlight
  const isSelected = (chapterPage ? chapterPage === page : currentPage === page);
    const iconName = isIntro ? "file-document-outline" : "book-open-variant";
    const iconColor = isSelected ? '#000000ff' : (isIntro ? '#b54d07ff' : '#972800ff');
    const handlePress = () => {
      setPendingPage(page);
      if (adLoaded) {
        interstitial.show();
      } else {
        // If ad not loaded, just proceed (fallback)
        onChapterSelect(page);
        setPendingPage(null);
      }
    };
    return (
      <TouchableOpacity
        key={`${isIntro ? 'intro' : 'chapter'}-${idx}`}
        style={[styles.chapterItem, isSelected && styles.selectedItem]}
        onPress={handlePress}
        activeOpacity={0.7}
      >
        <LinearGradient
          colors={isSelected ? ['#6c28d9', '#4C1D95'] : ['transparent', 'transparent']}
          style={styles.gradientBackground}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.chapterContent}>
            <Icons 
              name={iconName} 
              size={22} 
              color={iconColor} 
              style={styles.chapterIcon} 
            />
            <View style={{ flex: 1, minWidth: 120 }}>
              <Text 
                style={[
                  styles.chapterText, 
                  isSelected && styles.selectedText
                ]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {chapterTitle && chapterPage === page ? chapterTitle : title}
              </Text>
            </View>
            {isSelected && (
              <Icons 
                name="chevron-right" 
                size={22} 
                color="black" 
                style={styles.selectedIcon} 
              />
            )}
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <Animated.View style={[styles.overlay, { opacity }]}>
      <Animated.View 
        style={[
          styles.drawer, 
          { 
            transform: [{ translateX }],
            shadowOpacity: opacity.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 0.3]
            })
          }
        ]}
      >
        <LinearGradient
          colors={['#4a2601ff', '#af5f1eff']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Table of Contents</Text>
            <TouchableOpacity 
              onPress={onClose} 
              style={styles.closeBtn}
              hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
            >
              <Icons name="close" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        
        <ScrollView 
          style={styles.scrollContainer} 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <Text style={styles.sectionLabel}>Introduction</Text>
          {introTitles.map((title, idx) => renderChapterItem(title, idx, true))}
          
          <View style={styles.sectionDivider} />
          
          <Text style={styles.sectionLabel}>Main Chapters</Text>
          {chapterTitles.map((title, idx) => renderChapterItem(title, idx))}
        </ScrollView>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Current Page: <Text style={styles.currentPageHighlight}>{currentPage || 'Not selected'}</Text>
          </Text>
        </View>
      </Animated.View>
      
      <TouchableOpacity 
        style={styles.backdrop} 
        activeOpacity={0.5} 
        onPress={onClose} 
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    flexDirection: 'row',
    zIndex: 9999,
  },
  drawer: {
    width: width * 0.85,
    backgroundColor: '#fff',
    height: '100%',
    elevation: 24,
    shadowColor: '#000',
    shadowOffset: { width: 5, height: 0 },
    shadowRadius: 15,
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#fff',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  closeBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  sectionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4B5563',
    marginTop: 24,
    marginBottom: 12,
    paddingLeft: 8,
    letterSpacing: 0.5,
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
    marginHorizontal: 8,
  },
  chapterItem: {
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 4,
  },
  gradientBackground: {
    paddingVertical: 2,
  },
  chapterContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.95)',
  },
  selectedItem: {
    elevation: 2,
    shadowColor: '#6D28D9',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  chapterIcon: {
    marginRight: 12,
  },
  marqueeContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  chapterText: {
    fontSize: 15,
    color: '#1F2937',
    lineHeight: 22,
    fontWeight: '500',
  },
  premiumText: {
    color: '#6B7280',
  },
  selectedText: {
    color: 'black',
    fontWeight: '600',
  },
  selectedIcon: {
    marginLeft: 8,
    color: 'black',
  },
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  footer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  footerText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '500',
  },
  currentPageHighlight: {
    color: '#3B82F6',
    fontWeight: '600',
  },
  tagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  premiumTag: {
    backgroundColor: '#FEF3C7',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  premiumTagText: {
    color: '#92400E',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
  unlockedTag: {
    backgroundColor: '#D1FAE5',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  unlockedTagText: {
    color: '#065F46',
    fontWeight: '600',
    fontSize: 12,
    marginLeft: 4,
  },
});