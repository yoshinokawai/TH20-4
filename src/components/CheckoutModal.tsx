import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView, Animated, Dimensions } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

interface CheckoutModalProps {
  visible: boolean;
  onClose: () => void;
  onPlaceOrder: () => void;
  totalPrice: number;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const PRIMARY_COLOR = '#53B175';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ visible, onClose, onPlaceOrder, totalPrice }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.dismissArea} activeOpacity={1} onPress={onClose} />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Checkout</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#181725" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.optionsList} showsVerticalScrollIndicator={false}>
            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionLabel}>Delivery</Text>
              <View style={styles.optionRight}>
                <Text style={styles.optionValue}>Select Method</Text>
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionLabel}>Payment</Text>
              <View style={styles.optionRight}>
                <Ionicons name="card" size={20} color="#181725" style={{ marginRight: 10 }} />
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionLabel}>Promo Code</Text>
              <View style={styles.optionRight}>
                <Text style={styles.optionValue}>Pick discount</Text>
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.optionItem}>
              <Text style={styles.optionLabel}>Total Cost</Text>
              <View style={styles.optionRight}>
                <Text style={styles.optionValue}>${totalPrice.toFixed(2)}</Text>
                <Ionicons name="chevron-forward" size={20} color="#181725" />
              </View>
            </TouchableOpacity>

            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                By placing an order you agree to our{' '}
                <Text style={styles.termsLink}>Terms</Text> and <Text style={styles.termsLink}>Conditions</Text>
              </Text>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.placeOrderButton} onPress={onPlaceOrder}>
            <Text style={styles.placeOrderText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 25,
    maxHeight: SCREEN_HEIGHT * 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },
  optionsList: {
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7C7C7C',
  },
  optionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginRight: 10,
  },
  termsContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  termsText: {
    fontSize: 14,
    color: '#7C7C7C',
    lineHeight: 22,
  },
  termsLink: {
    color: '#181725',
    fontWeight: 'bold',
  },
  placeOrderButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutModal;
