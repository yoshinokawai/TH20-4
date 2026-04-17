import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PRIMARY_COLOR = '#53B175';

const beverages = [
  { id: '1', title: 'Diet Coke', volume: '355ml, Price', price: '$1.99', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80', description: 'Diet Coke is an iconic brand and one of the most recognizable soft drinks in the world.' },
  { id: '2', title: 'Sprite Can', volume: '325ml, Price', price: '$1.50', image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&q=80', description: 'Sprite is a clear, lemon and lime-flavored soft drink.' },
  { id: '3', title: 'Apple & Grape Juice', volume: '2L, Price', price: '$15.99', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80', description: 'Refreshing mix of Apple and Grape juice.' },
  { id: '4', title: 'Orenge Juice', volume: '2L, Price', price: '$15.99', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&q=80', description: 'Pure orange juice packed with Vitamin C.' },
  { id: '5', title: 'Coca Cola Can', volume: '325ml, Price', price: '$4.99', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80', description: 'Coca-Cola original taste.' },
  { id: '6', title: 'Pepsi Can', volume: '330ml, Price', price: '$4.99', image: 'https://images.unsplash.com/photo-1629203851288-7ece11236502?w=400&q=80', description: 'Pepsi cola classic flavour.' },
];

export default function BeveragesScreen() {
  const navigation = useNavigation<any>();

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardVolume}>{item.volume}</Text>
      <View style={styles.cardBottomRow}>
        <Text style={styles.cardPrice}>{item.price}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => {}}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="options-outline" size={24} color="#181725" />
        </TouchableOpacity>
      </View>

      {/* Grid */}
      <FlatList 
        data={beverages}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  filterButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    margin: 5,
  },
  cardImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 5,
  },
  cardVolume: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 15,
  },
  cardBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
  },
  addButton: {
    backgroundColor: PRIMARY_COLOR,
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
