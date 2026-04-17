import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PRIMARY_COLOR = '#53B175';

const favouriteItems = [
  { id: '1', title: 'Sprite Can', volume: '325ml, Price', price: 1.50, image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&q=80' },
  { id: '2', title: 'Diet Coke', volume: '355ml, Price', price: 1.99, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
  { id: '3', title: 'Apple & Grape Juice', volume: '2L, Price', price: 15.50, image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80' },
  { id: '4', title: 'Coca Cola Can', volume: '325ml, Price', price: 4.99, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80' },
  { id: '5', title: 'Pepsi Can', volume: '330ml, Price', price: 4.99, image: 'https://images.unsplash.com/photo-1629203851288-7ece11236502?w=400&q=80' },
];

export default function FavouriteScreen() {
  const navigation = useNavigation<any>();

  const renderItem = ({ item }: { item: typeof favouriteItems[0] }) => (
    <View style={styles.favouriteItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.volumeRow}>
          <Text style={styles.itemVolume}>{item.volume}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <Ionicons name="chevron-forward" size={24} color="#181725" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favorurite</Text>
      </View>

      <FlatList 
        data={favouriteItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
      />

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addAllButton}>
          <Text style={styles.addAllText}>Add All To Cart</Text>
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
  favouriteItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
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
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },
  volumeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  itemVolume: {
    fontSize: 14,
    color: '#7C7C7C',
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
  addAllButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
