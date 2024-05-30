import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput, Button } from "react-native-paper";
import MenuInfirmier from "../../components/MenuInfirmier";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const EditProfileInfirmier = () => {
  const navigation = useNavigation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    fetchInfirmierData();
  }, []);

  const fetchInfirmierData = async () => {
    try {
      const response = await axios.get(
        "http://172.16.1.236:8080/api/infirmiers/11" // Remplacez l'URL par l'URL correcte pour récupérer les informations de l'infirmier connecté
      );
      const infirmierData = response.data;
      if (infirmierData) {
        setFirstName(infirmierData.prenom);
        setLastName(infirmierData.nom);
        setEmail(infirmierData.email);
        // Remplacez `setProfileImage` par la logique pour récupérer l'image du profil
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'infirmier:",
        error
      );
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        "http://172.16.1.236:8080/api/infirmiers/profile/11", // Remplacez l'URL par l'URL correcte pour mettre à jour le profil de l'infirmier connecté
        {
          nom: firstName,
          prenom: lastName,
          email: email,
          // Ajoutez d'autres champs si nécessaire
        }
      );
      // Si la requête est réussie, affichez un message de succès
      Alert.alert("Profil mis à jour avec succès");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      // Si la requête échoue, affichez un message d'erreur
      Alert.alert("Erreur lors de la mise à jour du profil");
    }
  };

  const handleChoosePhoto = () => {
    // Logique pour choisir une photo depuis la galerie
  };

  return (
    <View style={styles.container}>
      <MenuInfirmier />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <View style={styles.imageContainer}>
            {profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.image} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderText}>
                  Ajouter une photo
                </Text>
              </View>
            )}
            <Ionicons
              name="camera"
              size={24}
              color="#29CCB1"
              style={styles.cameraIcon}
            />
          </View>
        </TouchableOpacity>
        <TextInput
          label="Prénom"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
          style={styles.input}
          theme={{ colors: { primary: "#29CCB1", background: "#FFF" } }}
        />
        <TextInput
          label="Nom"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
          style={styles.input}
          theme={{ colors: { primary: "#29CCB1", background: "#FFF" } }}
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          theme={{ colors: { primary: "#29CCB1", background: "#FFF" } }}
          keyboardType="email-address"
        />
        <Button
          mode="contained"
          onPress={handleSaveProfile}
          style={styles.button}
          theme={{ colors: { primary: "#29CCB1" } }}
        >
          Enregistrer
        </Button>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 80,
    paddingBottom: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    position: "relative",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  imagePlaceholderText: {
    color: "#29CCB1",
    fontSize: 16,
  },
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FFF",
    padding: 5,
    borderRadius: 15,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#E9F5F5",
  },
  button: {
    marginTop: 20,
  },
});

export default EditProfileInfirmier;
