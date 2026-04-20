import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';
import CheckoutModal from '../components/CheckoutModal';
import FailureModal from '../components/FailureModal';

const PRIMARY_COLOR = '#53B175';

export default function CartScreen() {
  const navigation = useNavigation<any>();
  const { cartItems, updateQuantity, removeFromCart, totalPrice, checkout } = useCart();
  
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [failureVisible, setFailureVisible] = useState(false);

  const handleOpenCheckout = () => {
    if (cartItems.length > 0) {
        setCheckoutVisible(true);
    }
  };

  const handlePlaceOrder = async () => {
    setCheckoutVisible(false);
    
    // Simulate a failure chance (e.g., 20%)
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
        await checkout();
        navigation.navigate('OrderAccepted');
    } else {
        setFailureVisible(true);
    }
  };

  const handleTryAgain = () => {
    setFailureVisible(false);
    setCheckoutVisible(true);
  };

  const handleBackToHome = () => {
    setFailureVisible(false);
    navigation.navigate('Home');
  };


  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeFromCart(item.id)}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemVolume}>{item.volume}</Text>
        <View style={styles.priceRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, -1)}>
              <Ionicons name="remove" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, 1)}>
              <Ionicons name="add" size={20} color={PRIMARY_COLOR} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>

        <FlatList 
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="cart-outline" size={64} color="#E2E2E2" />
              <Text style={styles.emptyText}>Your cart is empty</Text>
            </View>
          }
        />

        {cartItems.length > 0 && (
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleOpenCheckout}>
              <Text style={styles.checkoutText}>Go to Checkout</Text>
              <View style={styles.totalBadge}>
                <Text style={styles.totalBadgeText}>${totalPrice.toFixed(2)}</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}

        <CheckoutModal 
          visible={checkoutVisible}
          onClose={() => setCheckoutVisible(false)}
          onPlaceOrder={handlePlaceOrder}
          totalPrice={totalPrice}
        />

        <FailureModal 
            visible={failureVisible}
            onClose={() => setFailureVisible(false)}
            onTryAgain={handleTryAgain}
            onBackToHome={handleBackToHome}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center',
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120, // push list above absolutely positioned bottom container
  },
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },
  itemVolume: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginHorizontal: 15,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  checkoutButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  totalBadge: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  totalBadgeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginTop: 10,
  },
});
