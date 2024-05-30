import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Purchases = () => {
  // Supposons que vous ayez une liste d'achats à afficher
  const purchases = [
    { id: 1, item: "Produit A", price: "$10" },
    { id: 2, item: "Produit B", price: "$20" },
    { id: 3, item: "Produit C", price: "$15" },
    // Ajoutez d'autres achats ici...
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Achats</Text>
      {purchases.map((purchase) => (
        <View key={purchase.id} style={styles.purchaseItem}>
          <Text style={styles.purchaseText}>{purchase.item}</Text>
          <Text style={styles.purchaseText}>{purchase.price}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  purchaseItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#CCCCCC",
    paddingVertical: 10,
  },
  purchaseText: {
    fontSize: 16,
  },
});

export default Purchases;
