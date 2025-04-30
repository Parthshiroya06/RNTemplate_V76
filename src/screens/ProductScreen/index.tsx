import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Image, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, Card, Title, Paragraph } from 'react-native-paper';
import { styles } from './style';

const ProductScreen = () => {

    const route = useRoute();

    const navigation = useNavigation();

    const { product } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Product Details</Text>

            <Image source={{ uri: product.image }} style={styles.productImage} />

            <Text style={styles.title}>{product.title}</Text>

            <View style={styles.infoRow}>
                <Text style={styles.infoText}>Rate: {product.rating.rate}</Text>
                <Text style={styles.infoText}>Count: {product.rating.count}</Text>
                <Text style={styles.infoText}>Price: ${product.price.toFixed(2)}</Text>
            </View>

            <View style={styles.buttonRow}>
                <Button mode="contained" onPress={() => { navigation.goBack() }} style={styles.button}>
                    Back
                </Button>
                <Button mode="contained" onPress={() => { }} style={styles.button}>
                    Add to Cart
                </Button>
            </View>

            <Card style={styles.card}>
                <Card.Content>
                    <Title>Description:</Title>
                    <Paragraph>{product.description}</Paragraph>
                </Card.Content>
            </Card>
        </ScrollView>
    );
};



export default ProductScreen;
