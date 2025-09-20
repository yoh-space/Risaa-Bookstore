import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { themeColors } from '../Utils/color';
import ProfileForm from '../Profile/ProfileForm';

export default function EditProfileModal({ visible, onClose, onSaveComplete }) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.modalCloseButton}>
              <Icon name="close" size={28} color={themeColors.textPrimary} />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <View style={{ width: 28 }} />
          </View>
          <View style={styles.divider} />
          <ProfileForm
            onSaveComplete={onSaveComplete}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '92%',
    minHeight: 420,
    backgroundColor: themeColors.background,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 8,
    paddingBottom: 18,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 10,
    backgroundColor: themeColors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalCloseButton: {
    padding: 6,
    backgroundColor: themeColors.background,
    borderRadius: 16,
    shadowColor: themeColors.danger,
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: themeColors.primary,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1.5,
    backgroundColor: themeColors.border,
    marginHorizontal: 22,
    marginBottom: 8,
    borderRadius: 2,
  },
});
