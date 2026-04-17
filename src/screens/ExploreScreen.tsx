import React from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const categories = [
  { id: '1', name: 'Fresh Fruits\n& Vegetable', image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400&q=80', color: 'rgba(83, 177, 117, 0.1)', borderColor: 'rgba(83, 177, 117, 0.7)' },
  { id: '2', name: 'Cooking Oil\n& Ghee', image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80', color: 'rgba(248, 164, 76, 0.1)', borderColor: 'rgba(248, 164, 76, 0.7)' },
  { id: '3', name: 'Meat & Fish', image: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?w=400&q=80', color: 'rgba(247, 165, 147, 0.1)', borderColor: 'rgba(247, 165, 147, 0.7)' },
  { id: '4', name: 'Bakery & Snacks', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80', color: 'rgba(211, 176, 224, 0.1)', borderColor: 'rgba(211, 176, 224, 0.7)' },
  { id: '5', name: 'Dairy & Eggs', image: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&q=80', color: 'rgba(253, 229, 152, 0.1)', borderColor: 'rgba(253, 229, 152, 0.7)' },
  { id: '6', name: 'Beverages', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&q=80', color: 'rgba(183, 223, 245, 0.1)', borderColor: 'rgba(183, 223, 245, 0.7)' },
];

export default function ExploreScreen() {
  const navigation = useNavigation<any>();

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor: item.color, borderColor: item.borderColor }]}
      onPress={() => {
        if (item.name === 'Beverages') {
          navigation.navigate('Beverages');
        } else {
          // just mock navigating to Beverages anyway for demonstration
          navigation.navigate('Beverages', { category: item.name });
        }
      }}
    >
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Find Products</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#7C7C7C" style={styles.searchIcon} />
        <TextInput 
          placeholder="Search Store" 
          placeholderTextColor="#7C7C7C"
          style={styles.searchInput}
        />
      </View>

      <FlatList 
        data={categories}
        renderItem={renderCategory}
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#181725',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  card: {
    flex: 1,
    height: 190,
    margin: 5,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  cardImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
  },
});
