import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ConfirmationPage from "../../components/ConfirmationPage"; // Adjust the path as necessary
import { images } from "../../constants";

const PrivacyPolicy = () => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const navigation = useNavigation();

  const handleConfirm = () => {
    setIsConfirmed(true);
  };

  const handleFinish = () => {
    setIsConfirmed(false);
    navigation.navigate("DemandList"); // Navigate to Home page acceuilpage
  };

  if (isConfirmed) {
    return <ConfirmationPage onConfirm={handleFinish} />;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={images.politique} style={styles.image} />
      </View>
      <Text style={styles.title}>Politique de confidentialité</Text>
      <Text style={styles.paragraph}>
        Votre confidentialité est importante pour nous. Cette politique de
        confidentialité vous informe sur la manière dont nous collectons,
        utilisons et protégeons vos informations personnelles lorsque vous
        utilisez notre application mobile "InfirmierMnDar".
      </Text>
      <Text style={styles.paragraph}>
        • Nous ne vendons, n'échangeons ni ne louons vos informations
        personnelles à des tiers sans votre consentement, sauf dans les cas
        suivants :
      </Text>
      <Text style={styles.paragraph}>
        • Lorsque cela est nécessaire pour répondre à une exigence légale,
        protéger nos droits ou la sécurité d'autrui, ou faire respecter nos
        politiques ;
      </Text>
      <Text style={styles.paragraph}>
        • Lorsque cela est nécessaire pour fournir les services demandés par
        l'utilisateur, comme la mise en relation avec un infirmier à domicile.
      </Text>
      <Text style={styles.paragraph}>
        • Nous prenons des mesures pour protéger les informations personnelles
        que vous nous fournissez contre tout accès non autorisé, divulgation,
        altération ou destruction. Cependant, veuillez noter qu'aucune méthode
        de transmission sur Internet ou de stockage électronique n'est sécurisée
        à 100 % et nous ne pouvons donc pas garantir une sécurité absolue.
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Accepter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#E9F5F5",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#00bfa5",
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  image: {
    width: 150,
    height: 130,
  },
});

export default PrivacyPolicy;
