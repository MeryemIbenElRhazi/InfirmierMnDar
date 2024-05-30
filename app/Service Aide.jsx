import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ServiceAide = () => {
  const handleContactSupport = () => {
    // Remplacez le numéro de téléphone par le numéro du support client de votre application
    const phoneNumber = "0123456789";
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Ionicons name="help-circle-outline" size={80} color="#29CCB1" />
      <Text style={styles.title}>Besoin d'aide ? Contactez-nous</Text>
      <TouchableOpacity
        style={styles.contactButton}
        onPress={handleContactSupport}
      >
        <Text style={styles.contactButtonText}>
          Contacter le Support Client
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  contactButton: {
    backgroundColor: "#29CCB1",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ServiceAide;
