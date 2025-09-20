import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { themeColors } from "../Utils/color";

const { width } = Dimensions.get("window");

export default function QuickAccess() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const actions = [
    { id: "1", label: "Send", icon: "send" },
    { id: "2", label: "Receive", icon: "download" },
    { id: "3", label: "Scan QR", icon: "qr-code-scanner" },
    { id: "4", label: "Top Up", icon: "account-balance-wallet" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.openButton} onPress={toggleModal}>
        <Text style={styles.openText}>Open Quick Actions</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isVisible}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.title}>Quick Actions</Text>
          <View style={styles.cardWrapper}>
            {actions.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => {
                  toggleModal();
                  console.log(`Selected: ${item.label}`);
                }}
              >
                <Icon name={item.icon} size={28} color="#4F46E5" />
                <Text style={styles.cardText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: themeColors.backgroundDark,
  },
  openButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#4F46E5",
    borderRadius: 12,
  },
  openText: {
    color: "#fff",
    fontWeight: "600",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: 250,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 16,
    color: "#111827",
  },
  cardWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: width / 2.3,
    paddingVertical: 20,
    marginBottom: 16,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    marginTop: 8,
    fontWeight: "500",
    color: "#374151",
  },
  closeButton: {
    marginTop: 10,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  closeText: {
    fontSize: 16,
    color: "#4F46E5",
    fontWeight: "600",
  },
});