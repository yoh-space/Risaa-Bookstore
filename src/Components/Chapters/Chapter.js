import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChapterUnlocker from './ChapterUnlocker';
import { themeColors } from '../Utils/color';
const Chapter = ({ onChapterPress }) => {
  const freeChapters = [1]; // Chapter 1 is always free
  const [unlockModalVisible, setUnlockModalVisible] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [unlockedChapters, setUnlockedChapters] = useState({});

  useEffect(() => {
    const loadUnlocked = async () => {
      let unlocked = {};
      for (let i = 1; i <= 10; i++) {
        const val = await AsyncStorage.getItem(`chapter_unlocked_${i}`);
        if (val === 'true') unlocked[i] = true;
      }
      setUnlockedChapters(unlocked);
    };
    loadUnlocked();
  }, []);

  const handleChapterPress = async (chapterNumber, pageNumber) => {
    if (freeChapters.includes(chapterNumber) || unlockedChapters[chapterNumber]) {
      onChapterPress(pageNumber);
    } else {
      setSelectedChapter(chapterNumber);
      setUnlockModalVisible(true);
    }
  };

  const handleUnlock = async () => {
    setUnlockModalVisible(false);
    setUnlockedChapters((prev) => ({ ...prev, [selectedChapter]: true }));
    const pageNumber = chapterPages[selectedChapter];
    if (pageNumber) onChapterPress(pageNumber);
  };

  const chapterPages = {
    1: 48, 2: 81, 3: 188, 4: 277, 5: 286,
    6: 368, 7: 390, 8: 439, 9: 483, 10: 533,
  };

  const introPages = {
    1: 1, 2: 3, 3: 10, 4: 17, 5: 23, 6: 27, 7: 30,
  };

  const chapterTitles = [
    "Handhuuraa Fi Ilmaan Arsee",
    "Gosoota Oromoo Arsii",
    "Gameeyii Oromoo Arsii",
    "Handhuuraa Qabeenya Arsi",
    "Aadaa Oromoo Arsii",
    "Amantii Oromoo Arsii",
    "Heeraa Fi Sirna Gadaa Oromoo Arsii",
    "Gita Bittaa Habashaa fi Diddaa Gabrummaa Oromoo Arsii",
    "Medda Beekkumsa Bulchinsa Arsii",
    "Goolaba",
  ];

  const introTitles = [
    "Baafata", "Tartiiba Taattoo", "Galata", "Jechoota Moggaasaa",
    "Ariirrata / Preface", "Axeerara / Abstract", "Seena",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapters (Boqonnaa filadhu)</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Introduction Sections */}
        {introTitles.map((title, index) => (
          <TouchableOpacity
            key={`intro-${index}`}
            style={styles.chapterButton}
            onPress={() => onChapterPress(introPages[index + 1])}
          >
            <Text style={styles.chapterButtonText}>{title}</Text>
          </TouchableOpacity>
        ))}

        {/* Main Chapters */}
        {chapterTitles.map((title, index) => {
          const chapterNumber = index + 1;
          const pageNumber = chapterPages[chapterNumber];
          const unlocked = unlockedChapters[chapterNumber] || freeChapters.includes(chapterNumber);
          
          return (
            <TouchableOpacity
              key={`chapter-${index}`}
              style={[styles.chapterButton, !unlocked && styles.lockedButton]}
              onPress={() => handleChapterPress(chapterNumber, pageNumber)}
            >
              <Text style={styles.chapterButtonText}>
                Boqonnaa {chapterNumber}: {title} {unlocked ? '' : '🔒'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <ChapterUnlocker
        chapterKey={selectedChapter}
        visible={unlockModalVisible}
        onUnlock={handleUnlock}
        onCancel={() => setUnlockModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "lavender",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "darkblue",
  },
  scrollView: {
    width: "100%",
  },
  chapterButton: {
    backgroundColor: "powderblue",
    padding: 12,
    borderRadius: 10,
    marginVertical: 5,
  },
  lockedButton: {
    opacity: 0.7,
  },
  chapterButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
});

export default Chapter;