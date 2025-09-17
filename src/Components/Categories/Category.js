import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SystemBars } from 'react-native-edge-to-edge';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { themeColors } from '../Utils/color';

export default function Category() {
  const Categories = [
    { id: '1', name: 'Fiction', icon: 'book-open-page-variant' },
    { id: '2', name: 'Non-Fiction', icon: 'book' },
    { id: '3', name: 'Science', icon: 'atom' },
    { id: '4', name: 'History', icon: 'bank' },
    { id: '5', name: 'Biography', icon: 'account-tie' },
    { id: '6', name: 'Poetry', icon: 'feather' },
    { id: '7', name: 'Guide', icon: 'compass' },
    { id: '8', name: 'Research', icon: 'flask' },
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <MaterialCommunityIcons
        name={item.icon}
        size={28}
        color={themeColors.primary}
        style={{ marginBottom: 8 }}
      />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.background }}>
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
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: themeColors.accent,
  },
  grid: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  card: {
    flex: 1,
    backgroundColor: themeColors.secondary,
    margin: 8,
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
    color: themeColors.accent,
  },
});
