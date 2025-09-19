import React, { useState } from 'react';
import { useAuth } from '../../Provider/AuthProvider';
import { Modal, View, Text, TouchableOpacity, FlatList, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CartsModal({ visible, onClose, cartItems, onRemoveBook, navigation }) {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();
  
  const subtotal = cartItems.reduce((sum, book) => sum + (book.price || 0), 0);
  const totalPrice = subtotal - discount;

  const applyCoupon = () => {
    // Simple coupon validation logic
    if (couponCode.toUpperCase() === 'SAVE10') {
      setDiscount(subtotal * 0.1); // 10% discount
      setIsCouponApplied(true);
    } else {
    setDiscount(0);
    setIsCouponApplied(false);
    setError('Invalid coupon code');
    }
  };

  const handleProceedToPayment = () => {
    if (!user) {
      setError('You must be logged in to proceed to payment.');
      navigation.navigate('Login');
      return;
    }
    setError('Proceeding to payment...');
    // You might navigate to a payment screen or process payment here
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={styles.modalBox}>
          <View style={styles.header}>
            <Ionicons name="cart" size={28} color="#1a5f9c" />
            <Text style={styles.title}>Your Cart</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          {error ? (
            <Text style={{ color: '#E74C3C', textAlign: 'center', marginBottom: 8 }}>{error}</Text>
          ) : null}
          <FlatList
            data={cartItems}
            keyExtractor={(item, idx) => item.id ? item.id.toString() : idx.toString()}
            renderItem={({ item }) => (
              <View style={styles.itemRow}>
                <Text style={styles.bookTitle}>{item.title}</Text>
                <Text style={styles.bookPrice}>{`$${item.price.toFixed(2)}`}</Text>
                <TouchableOpacity onPress={() => onRemoveBook(item.id)} style={styles.removeBtn}>
                  <Ionicons name="trash" size={20} color="#E74C3C" />
                </TouchableOpacity>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No books in cart.</Text>}
          />
          
          {/* Coupon Code Section */}
          <View style={styles.couponSection}>
            <Text style={styles.couponLabel}>Coupon Code</Text>
            <View style={styles.couponInputRow}>
              <TextInput
                style={styles.couponInput}
                value={couponCode}
                onChangeText={setCouponCode}
                placeholder="Enter coupon code"
                editable={!isCouponApplied}
              />
              <TouchableOpacity 
                style={[styles.applyButton, isCouponApplied && styles.appliedButton]} 
                onPress={applyCoupon}
                disabled={isCouponApplied}
              >
                <Text style={styles.applyButtonText}>
                  {isCouponApplied ? 'Applied' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Summary Section */}
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryText}>Subtotal:</Text>
              <Text style={styles.summaryPrice}>${subtotal.toFixed(2)}</Text>
            </View>
            
            {discount > 0 && (
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Discount:</Text>
                <Text style={styles.discountText}>-${discount.toFixed(2)}</Text>
              </View>
            )}
            
            <View style={[styles.summaryRow, styles.totalRow]}>
              <Text style={styles.totalText}>Total:</Text>
              <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
            </View>
          </View>
          
          {/* Proceed to Payment Button */}
          <TouchableOpacity 
            style={styles.paymentButton} 
            onPress={handleProceedToPayment}
            disabled={cartItems.length === 0}
          >
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" style={styles.paymentIcon} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 20,
    width: '85%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: '700',
    color: '#1a5f9c',
    marginLeft: 8,
  },
  closeBtn: {
    padding: 4,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  bookTitle: {
    fontSize: 15,
    color: '#333',
    flex: 1,
  },
  bookPrice: {
    fontSize: 15,
    color: '#1a5f9c',
    fontWeight: '600',
    marginLeft: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 20,
  },
  couponSection: {
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  couponLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  couponInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    fontSize: 15,
  },
  applyButton: {
    backgroundColor: '#1a5f9c',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  appliedButton: {
    backgroundColor: '#4CAF50',
  },
  applyButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  summaryContainer: {
    marginTop: 16,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  totalRow: {
    marginTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  summaryText: {
    fontSize: 15,
    color: '#666',
  },
  summaryPrice: {
    fontSize: 15,
    color: '#333',
  },
  discountText: {
    fontSize: 15,
    color: '#E53935',
    fontWeight: '600',
  },
  totalText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#333',
  },
  totalPrice: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1a5f9c',
  },
  paymentButton: {
    backgroundColor: '#1a5f9c',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  removeBtn: {
    marginLeft: 10,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  paymentIcon: {
    marginLeft: 8,
  },
});