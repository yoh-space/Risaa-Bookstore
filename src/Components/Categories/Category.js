import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SystemBars } from 'react-native-edge-to-edge';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeColors } from '../Utils/color';

const { width, height } = Dimensions.get('window');

export default function Category() {
  const Categories = [
    { id: '1', name: 'Fiction', icon: 'book-open-page-variant' },
    { id: '2', name: 'Non-Fiction', icon: 'book' },
    { id: '3', name: 'Science', icon: 'atom' },
    { id: '4', name: 'History', icon: 'bank' },
    { id: '5', name: 'Physiology ', icon: 'account-tie' },
    { id: '6', name: 'Poetry', icon: 'feather' },
    { id: '7', name: 'Guide', icon: 'compass' },
    { id: '8', name: 'Research', icon: 'flask' },
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconWrap}>
        <MaterialCommunityIcons
          name={item.icon}
          size={32}
          color={themeColors.primary}
        />
      </View>
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={[themeColors.gradientStart, themeColors.gradientMiddle, themeColors.gradientEnd]}
      style={styles.background}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}
    >
      <SystemBars style="light" />
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Categories</Text>
      </View>
      <FlatList
        data={Categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  headerContainer: {
    paddingTop: 32,
    paddingBottom: 18,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: themeColors.textPrimary,
    letterSpacing: 0.5,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: themeColors.cardBackground,
    margin: 8,
    paddingVertical: 28,
    paddingHorizontal: 10,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: themeColors.cardBorder,
  },
  iconWrap: {
    backgroundColor: themeColors.backgroundLight,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  cardText: {
    fontSize: 15,
    fontWeight: '700',
    color: themeColors.textPrimary,
    letterSpacing: 0.2,
  },
});
