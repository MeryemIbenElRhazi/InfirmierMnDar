import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const PrivacyPolicy = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.content}>
        <Ionicons
          name="lock-closed"
          size={40}
          color="black"
          style={styles.icon}
        />
        <Text style={styles.title}>Politique de confidentialité</Text>
        <Text style={styles.paragraph}>
          Votre confidentialité nous tient à cœur. Cette politique de
          confidentialité vous informe sur la manière dont nous collectons,
          utilisons et protégeons vos informations personnelles lorsque vous
          utilisez notre application mobile "InfirmierMnDar".
        </Text>
        <Text style={styles.subtitle}>
          Collecte et utilisation des informations
        </Text>
        <View style={styles.bulletPointContainer}>
          <Text style={styles.bulletPoint}>
            • Nous ne vendons, n'échangeons ni ne louons vos informations
            personnelles à des tiers sans votre consentement, sauf dans les cas
            suivants :
          </Text>
          <Text style={styles.bulletPoint}>
            • Lorsque cela est nécessaire pour répondre à une exigence légale,
            protéger nos droits ou la sécurité d'autrui, ou faire respecter nos
            politiques ;
          </Text>
          <Text style={styles.bulletPoint}>
            • Lorsque cela est nécessaire pour fournir les services demandés par
            l'utilisateur, comme la mise en relation avec un infirmier à
            domicile.
          </Text>
          <Text style={styles.bulletPoint}>
            • Nous prenons des mesures pour protéger les informations
            personnelles que vous nous fournissez contre tout accès non
            autorisé, divulgation, altération ou destruction. Cependant,
            veuillez noter qu'aucune méthode de transmission sur Internet ou de
            stockage électronique n'est sécurisée à 100 % et nous ne pouvons
            donc pas garantir une sécurité absolue.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("DemandList")}
      >
        <Text style={styles.buttonText}>Accepter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#E9F5F5",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  bulletPointContainer: {
    marginLeft: 20,
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 10,
    lineHeight: 24,
    color: "black",
  },
  button: {
    backgroundColor: "#00bfa5",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    alignSelf: "center",
    marginBottom: 20,
  },
});

export default PrivacyPolicy;
