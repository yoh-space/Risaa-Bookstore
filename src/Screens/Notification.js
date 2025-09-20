import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SystemBars } from "react-native-edge-to-edge";
import Icon from "react-native-vector-icons/MaterialIcons";
import { themeColors } from "../Components/Utils/color";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const mockNotifications = [
  { id: "1", title: "Order Confirmation", message: "Your book *Siitolii* is on the way.", type: "success" },
  { id: "2", title: "Promo Alert", message: "Get 20% off your next purchase!", type: "warning" },
  { id: "3", title: "Profile Update", message: "Your profile was updated successfully.", type: "info" },
];

export default function Notification() {
  const navigation = useNavigation();

  const renderNotification = ({ item }) => {
    let icon = "notifications";
    let color = themeColors.textSecondary;

    if (item.type === "success") {
      icon = "check-circle";
      color = themeColors.success;
    } else if (item.type === "warning") {
      icon = "warning";
      color = themeColors.warning;
    } else if (item.type === "danger") {
      icon = "error";
      color = themeColors.danger;
    }

    return (
      <View style={styles.card}>
        <Icon name={icon} size={28} color={color} style={{ marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardMessage}>{item.message}</Text>
        </View>
        <TouchableOpacity>
          <Icon name="chevron-right" size={24} color={themeColors.textMuted} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="light" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 4, marginRight: 16 }}>
          <Icon name="arrow-back" size={24} color={themeColors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      {/* Notifications List */}
      <FlatList
        data={mockNotifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themeColors.backgroundDark,
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.cardBorder,
    backgroundColor: themeColors.backgroundDark,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: themeColors.textPrimary,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: themeColors.cardBackground,
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: themeColors.cardShadow,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: themeColors.textPrimary,
    marginBottom: 4,
  },
  cardMessage: {
    fontSize: 14,
    color: themeColors.textSecondary,
  },
});
