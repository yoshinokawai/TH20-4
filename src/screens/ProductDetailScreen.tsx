import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const PRIMARY_COLOR = '#53B175';

export default function ProductDetailScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  
  // Try to get product from route params, else fallback to mock
  const product = route.params?.product || {
    title: 'Naturel Red Apple',
    volume: '1kg, Price',
    price: '$4.99',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?w=800&q=80',
    description: 'Apples are nutritious. Apples may be good for weight loss. apples may be good for your heart. As part of a healtful and varied diet.'
  };

  const [quantity, setQuantity] = useState(1);
  const [isDetailExpanded, setIsDetailExpanded] = useState(true);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header (Back, Share) */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={28} color="#181725" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="share-outline" size={28} color="#181725" />
          </TouchableOpacity>
        </View>

        {/* Product Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: product.image }} style={styles.productImage} />
        </View>

        <View style={styles.contentContainer}>
          {/* Title & Favorite */}
          <View style={styles.titleRow}>
            <Text style={styles.title}>{product.title}</Text>
            <TouchableOpacity>
              <Ionicons name="heart-outline" size={28} color="#7C7C7C" />
            </TouchableOpacity>
          </View>
          <Text style={styles.volume}>{product.volume}</Text>

          {/* Quantity & Price */}
          <View style={styles.qtyPriceRow}>
            <View style={styles.qtyContainer}>
              <TouchableOpacity onPress={() => setQuantity(Math.max(1, quantity - 1))}>
                <Ionicons name="remove" size={24} color="#B3B3B3" />
              </TouchableOpacity>
              <View style={styles.qtyBox}>
                <Text style={styles.qtyText}>{quantity}</Text>
              </View>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Ionicons name="add" size={24} color={PRIMARY_COLOR} />
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>{product.price}</Text>
          </View>

          <View style={styles.divider} />

          {/* Product Detail Accordion */}
          <TouchableOpacity 
            style={styles.accordionHeader} 
            onPress={() => setIsDetailExpanded(!isDetailExpanded)}
          >
            <Text style={styles.accordionTitle}>Product Detail</Text>
            <Ionicons name={isDetailExpanded ? "chevron-down" : "chevron-forward"} size={24} color="#181725" />
          </TouchableOpacity>
          {isDetailExpanded && (
            <Text style={styles.descriptionText}>
              {product.description}
            </Text>
          )}

          <View style={styles.divider} />

          {/* Nutrition Accordion */}
          <TouchableOpacity style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Nutritions</Text>
            <View style={styles.accordionRight}>
              <View style={styles.nutritionBadge}>
                <Text style={styles.nutritionBadgeText}>100gr</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#181725" />
            </View>
          </TouchableOpacity>

          <View style={styles.divider} />

          {/* Review Accordion */}
          <TouchableOpacity style={styles.accordionHeader}>
            <Text style={styles.accordionTitle}>Review</Text>
            <View style={styles.accordionRight}>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Ionicons key={i} name="star" size={16} color="#F3603F" style={styles.star} />
                ))}
              </View>
              <Ionicons name="chevron-forward" size={24} color="#181725" />
            </View>
          </TouchableOpacity>

          <View style={{ height: 100 }} /* padding for fixed bottom button */ />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.addToBasketButton}>
          <Text style={styles.addToBasketText}>Add To Basket</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 50, // for notch
  },
  iconButton: {
    padding: 5,
  },
  imageContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    backgroundColor: '#F2F3F2', // soft background for image
    marginHorizontal: 10,
    marginTop: -40, // behind header to create a nice effect
    zIndex: -1, 
    paddingTop: 40,
  },
  productImage: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
    flex: 1,
  },
  volume: {
    fontSize: 16,
    color: '#7C7C7C',
    marginTop: 5,
  },
  qtyPriceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyBox: {
    width: 45,
    height: 45,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  qtyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181725',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
    marginVertical: 15,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
  },
  accordionRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 13,
    color: '#7C7C7C',
    lineHeight: 21,
    marginTop: 10,
  },
  nutritionBadge: {
    backgroundColor: '#EBEBEB',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    marginRight: 10,
  },
  nutritionBadgeText: {
    fontSize: 10,
    color: '#7C7C7C',
    fontWeight: '600',
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 10,
  },
  star: {
    marginLeft: 2,
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
  addToBasketButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToBasketText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
