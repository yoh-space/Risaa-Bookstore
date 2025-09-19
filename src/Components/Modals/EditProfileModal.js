import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../Utils/color';
import ProfileForm from '../Profile/ProfileForm';

export default function EditProfileModal({ visible, onClose, initialData, onSaveComplete }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
            <Icon name="close" size={24} color={themeColors.textPrimary} />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Edit Profile</Text>
          <View style={{ width: 24 }} />
        </View>
        <ProfileForm
          initialData={initialData}
          onSaveComplete={onSaveComplete}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: themeColors.background,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: themeColors.border,
  },
  modalCloseButton: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: themeColors.textPrimary,
  },
});
