import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SystemBars } from "react-native-edge-to-edge";
import { themeColors } from "../Components/Utils/color";
import { adminFeatures } from "../Components/Utils/adminFeatures";
import UserManagement from "../Components/Admin/UserManagement";
import BookManagement from "../Components/Admin/BookManagement";
import Payments from "../Components/Admin/Payments";
import Notifications from "../Components/Admin/Notifications";
import AppSettings from "../Components/Admin/AppSettings";
import Support from "../Components/Admin/Support";
import Analytics from "../Components/Admin/Analytics";

const componentMap = {
  UserManagement,
  BookManagement,
  Payments,
  Notifications,
  AppSettings,
  Support,
  Analytics,
};

export default function AdminDashboard({ navigation }) {
  const [selectedFeature, setSelectedFeature] = React.useState(null);

  const handleFeatureSelect = (feature) => {
    setSelectedFeature(feature);
  };

  const SelectedComponent = selectedFeature ? componentMap[selectedFeature.component] : null;

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="light" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Dashboard</Text>
      </View>

      {/* Feature Cards or Selected Section */}
      {selectedFeature ? (
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ padding: 5 }} onPress={() => setSelectedFeature(null)}>
            <Icon name="arrow-back" size={24} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <SelectedComponent />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {adminFeatures.map((feature) => (
            <TouchableOpacity
              key={feature.id}
              style={[styles.card, { borderLeftColor: feature.color }]}
              onPress={() => handleFeatureSelect(feature)}
            >
              <Icon name={feature.icon} size={32} color={feature.color} style={{ marginRight: 16 }} />
              <View style={{ flex: 1 }}>
                <Text style={styles.cardTitle}>{feature.title}</Text>
                <Text style={styles.cardDesc}>{feature.description}</Text>
              </View>
              <Icon name="chevron-right" size={24} color={themeColors.textMuted} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
  },
  header: {
    paddingVertical: 5,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.cardBorder,
    backgroundColor: themeColors.backgroundDark,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: themeColors.textPrimary,
  },
  scrollContent: {
    padding: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themeColors.cardBackground,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
});
