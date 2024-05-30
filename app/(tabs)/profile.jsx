import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import Menu from "../../components/Menu";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import { Alert } from "react-native";

const Profile = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchPatientData();
  }, []);

  const fetchPatientData = async () => {
    try {
      const response = await axios.get(
        "http://172.16.1.236:8080/api/patients/1"
      );
      const patientData = response.data;
      if (patientData) {
        setFirstName(patientData.prenom);
        setLastName(patientData.nom);
        setEmail(patientData.email);
        setName(`${patientData.prenom} ${patientData.nom}`);
        // Remplacez `setProfileImage` par la logique pour récupérer l'image du profil
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de l'patient:",
        error
      );
    }
  };

  const handleSaveProfile = async () => {
    try {
      const response = await axios.put(
        "http://172.16.1.236:8080/api/patients/profile/1", // Remplacez l'URL par l'URL correcte pour mettre à jour le profil de patient connecté
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchPatientData();
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Menu />
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View style={styles.userBubble}>
            <Image
              style={styles.userImage}
              source={require("../../assets/images/profile-placeholder.png")}
            />
          </View>
          <Text style={styles.userName}>Bonjour, {name}</Text>
          <Text style={styles.description}>
            Bienvenue sur InfirmierMnDar ! Modifiez votre profil ci-dessous.
          </Text>
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Modifier vos informations</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholder="Entrez votre prénom "
            />
            <TextInput
              style={styles.input}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholder="Entrez votre nom de famille "
            />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholder="Entrez votre email "
              keyboardType="email-address"
            />
            <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
              <Text style={styles.buttonText}>
                Enregistrer les modifications
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#E6F7FF",
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
    top: 40,
  },
  userBubble: {
    backgroundColor: "#29CCB1",
    borderRadius: 100,
    padding: 20,
    marginBottom: 20,
    top: 20,
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  userName: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    textAlign: "center",
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
  formContainer: {
    marginBottom: 20,
    top: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#29CCB1",
  },
  form: {},
  input: {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#29CCB1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
