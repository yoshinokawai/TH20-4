import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import storageService from '../services/storageService';

const PRIMARY_COLOR = '#53B175';

export default function OrdersScreen({ navigation }: any) {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await storageService.getOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  const renderOrderItem = ({ item }: { item: any }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>Order ID: {item.id}</Text>
        <Text style={styles.orderTime}>{item.timestamp}</Text>
      </View>
      
      <View style={styles.itemsPreview}>
        {item.items.slice(0, 3).map((product: any, index: number) => (
          <Image key={index} source={typeof product.image === 'string' ? { uri: product.image } : product.image} style={styles.productThumbnail} />
        ))}
        {item.items.length > 3 && (
          <View style={styles.moreCount}>
            <Text style={styles.moreText}>+{item.items.length - 3}</Text>
          </View>
        )}
      </View>

      <View style={styles.orderFooter}>
        <Text style={styles.itemCount}>{item.items.length} Items</Text>
        <Text style={styles.totalAmount}>Total: ${item.total.toFixed(2)}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="receipt-outline" size={80} color="#E2E2E2" />
            <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  listContent: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  orderId: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181725',
  },
  orderTime: {
    fontSize: 12,
    color: '#7C7C7C',
  },
  itemsPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  productThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
    resizeMode: 'contain',
    backgroundColor: '#F2F3F2',
  },
  moreCount: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: '#F2F3F2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreText: {
    fontSize: 12,
    color: '#7C7C7C',
    fontWeight: 'bold',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 10,
  },
  itemCount: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: PRIMARY_COLOR,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 20,
  },
});
