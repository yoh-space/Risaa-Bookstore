import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,TouchableOpacity, Alert } from 'react-native';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChapterUnlocker from './ChapterUnlocker';
import { SystemBars } from 'react-native-edge-to-edge';


const chapterPDFs = {
  1: 'ormoo-48-80.pdf',
  2: 'ormoo-81-187.pdf',
  3: 'ormoo-188-276.pdf',
  4: 'ormoo-277-285.pdf',
  5: 'ormoo-286-367.pdf',
  6: 'ormoo-368-389.pdf',
  7: 'ormoo-390-438.pdf',
  8: 'ormoo-439-482.pdf',
  9: 'ormoo-483-532.pdf',
  10: 'ormoo-533-544.pdf',
};

export default function ChapterPDF({ chapterNumber, onBack }) {
  const [unlocked, setUnlocked] = useState(false);
  const [unlockModalVisible, setUnlockModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUnlocked = async () => {
      const val = await AsyncStorage.getItem(`chapter_unlocked_${chapterNumber}`);
      setUnlocked(val === 'true');
    };
    checkUnlocked();
  }, [chapterNumber]);

  const handleUnlock = async () => {
    setUnlockModalVisible(false);
    setUnlocked(true);
  };

  if (!unlocked) {
    return (
      <View style={styles.lockedContainer}>
        <Text style={styles.lockedTitle}>Chapter {chapterNumber} is Locked</Text>
        <Text style={styles.lockedText}>
          Watch 2 short video ads to unlock this chapter permanently.
        </Text>
        
        <TouchableOpacity 
          style={styles.unlockButton}
          onPress={() => setUnlockModalVisible(true)}
        >
          <Text style={styles.unlockButtonText}>Unlock Chapter</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBack}
        >
          <Text style={styles.backButtonText}>Back to Chapters</Text>
        </TouchableOpacity>

        <ChapterUnlocker
          chapterKey={chapterNumber}
          visible={unlockModalVisible}
          onUnlock={handleUnlock}
          onCancel={() => setUnlockModalVisible(false)}
        />
      </View>
    );
  }

  const source = { uri: `bundle-assets://${chapterPDFs[chapterNumber]}` };

  return (
    <View style={styles.pdfContainer}>
      <Pdf
        source={source}
        onLoadComplete={() => setLoading(false)}
        onError={(error) => Alert.alert('PDF Error', error.message)}
        style={styles.pdf}
      />
      {loading && <ActivityIndicator size="large" color="#4a6fa5" style={styles.loading} />}
    </View>
  );
}

const styles = StyleSheet.create({
  pdfContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  pdf: {
    flex: 1,
    width: '100%',
  },
  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -20,
    marginTop: -20,
  },
  lockedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: 24,
  },
  lockedTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4a6fa5',
    marginBottom: 16,
    textAlign: 'center',
  },
  lockedText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 24,
  },
  unlockButton: {
    backgroundColor: '#4a6fa5',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 16,
  },
  unlockButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    padding: 12,
  },
  backButtonText: {
    color: '#4a6fa5',
    fontSize: 14,
  },
});