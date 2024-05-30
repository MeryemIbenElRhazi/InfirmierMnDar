import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const Categories = () => {
  const navigation = useNavigation();

  const services = [
    {
      id: "1",
      title: "SERVICE",
      subtitle: "Cardiologie",
      description: "Diagnostic et traitement des maladies cardiaques",
      image: require("../../assets/images/assurance-sante.png"),
    },
    {
      id: "2",
      title: "SERVICE",
      subtitle: "Pédiatrie",
      description: "Soins médicaux pour les enfants et les adolescents",
      image: require("../../assets/images/assurance-sante.png"),
    },
    {
      id: "3",
      title: "SERVICE",
      subtitle: "Neurologie",
      description: "Traitement des troubles du système nerveux",
      image: require("../../assets/images/assurance-sante.png"),
    },
    {
      id: "4",
      title: "SERVICE",
      subtitle: "Oncologie",
      description: "Soins et soutien pour les patients atteints de cancer",
      image: require("../../assets/images/assurance-sante.png"),
    },
    {
      id: "5",
      title: "SERVICE",
      subtitle: "Gériatrie",
      description: "Soins pour les personnes âgées",
      image: require("../../assets/images/assurance-sante.png"),
    },

    {
      id: "8",
      title: "SERVICE",
      subtitle: "Réhabilitation",
      description: "Soins pour aider les patients à retrouver leur autonomie",
      image: require("../../assets/images/assurance-sante.png"),
    },
    {
      id: "9",
      title: "SERVICE",
      subtitle: "Diabétologie",
      description: "Gestion et traitement du diabète",
      image: require("../../assets/images/assurance-sante.png"),
    },
    {
      id: "10",
      title: "SERVICE",
      subtitle: "Soins intensifs",
      description: "Soins pour les patients en état critique",
      image: require("../../assets/images/assurance-sante.png"),
    },
    {
      id: "11",
      title: "SERVICE",
      subtitle: "Obstétrique",
      description: "Soins pour les femmes enceintes et les nouveau-nés",
      image: require("../../assets/images/assurance-sante.png"),
    },

    {
      id: "13",
      title: "SERVICE",
      subtitle: "Chirurgie",
      description: "Soins pré et post-opératoires",
      image: require("../../assets/images/assurance-sante.png"),
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemTouchable}
      onPress={() =>
        navigation.navigate("catalogue", { category: item.subtitle })
      }
    >
      <View style={styles.itemContainer}>
        <Image source={item.image} style={styles.itemImage} />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemType}>{item.subtitle}</Text>
          {item.description && (
            <Text style={styles.itemDescription}>{item.description}</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.background}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Catalogue des Services</Text>
        </View>
        <FlatList
          data={services}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          numColumns={2} // Affiche les éléments en deux colonnes
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    marginVertical: 2,
    paddingHorizontal: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 12,
    left: 65,
  },
  listContainer: {
    padding: 8,
    margin: 8, // Ajout d'une marge pour espacer les éléments
  },
  itemTouchable: {
    flex: 1,
    margin: 8,
  },
  itemContainer: {
    width: "100%", // Pour s'assurer que chaque item occupe 100% de son espace parent
    aspectRatio: 1, // Pour que les items soient carrés
    alignItems: "center", // Centrer le contenu horizontalement
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 60, // Ajuster la taille de l'image pour qu'elle soit plus petite
    height: 60, // Ajuster la taille de l'image pour qu'elle soit plus petite
    borderRadius: 8,
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    alignItems: "center", // Centrer le contenu horizontalement
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center", // Centrer le texte
  },
  itemType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    textAlign: "center", // Centrer le texte
  },
  itemDescription: {
    fontSize: 12,
    color: "#999",
    textAlign: "center", // Centrer le texte
  },
});

export default Categories;
