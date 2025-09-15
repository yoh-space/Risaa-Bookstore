import React from "react";
import { View, Text, TouchableOpacity, Linking, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { SystemBars } from "react-native-edge-to-edge";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RateApp() {
  return (
    <SafeAreaView style={styles.container}>
      <SystemBars style="light" />

      {/* Stars */}
      <View style={styles.starsRow}>
        {[...Array(5)].map((_, index) => (
          <Icon key={index} name="star" size={36} color="#f1c40f" />
        ))}
      </View>

      {/* Title */}
      <Text style={styles.title}>Enjoying the App?</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Tap below to rate us on the Play Store. Your feedback helps us improve!
      </Text>

      {/* Rate button */}
      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            "https://play.google.com/store/apps/details?id=com.risaa.bookstore&hl=en"
          )
        }
        activeOpacity={0.85}
        style={styles.button}
      >
        <Text style={styles.buttonText}>⭐ Rate Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: "#723000da",
  },
  starsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "whitesmoke",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#6b5600ff",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 4, // shadow for Android
    shadowColor: "#000", // shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
