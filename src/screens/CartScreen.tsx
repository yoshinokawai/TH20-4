import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#53B175';

const initialCart = [
  { id: '1', title: 'Bell Pepper Red', volume: '1kg, Price', price: 4.99, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400&q=80', quantity: 1 },
  { id: '2', title: 'Egg Chicken Red', volume: '4pcs, Price', price: 1.99, image: 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?w=400&q=80', quantity: 1 },
  { id: '3', title: 'Organic Bananas', volume: '12kg, Price', price: 3.00, image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?w=400&q=80', quantity: 1 },
  { id: '4', title: 'Ginger', volume: '250gm, Price', price: 2.99, image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?w=400&q=80', quantity: 1 },
];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const renderItem = ({ item }: { item: typeof initialCart[0] }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
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
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutText}>Go to Checkout</Text>
          <View style={styles.totalBadge}>
            <Text style={styles.totalBadgeText}>${total.toFixed(2)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});
