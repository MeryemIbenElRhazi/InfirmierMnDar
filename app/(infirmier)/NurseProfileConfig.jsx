import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const NurseProfileConfig = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { firstname, lastname, email, Numéro, ville } = route.params;

  const [name, setName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    setName(`${firstname} ${lastname}`);
    setContactNumber(Numéro);
    setUserEmail(email);
  }, [firstname, lastname, email, Numéro]);

  const handleSubmit = () => {
    if (!name || !contactNumber || !userEmail) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs");
      return;
    }
    console.log("Form submitted:", { name, contactNumber, userEmail });
    navigation.navigate("LocationPage"); // Redirige vers la page de localisation
  };

  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <View style={styles.header}>
            <Text style={styles.title}>Configurer votre profil</Text>
            <Text style={styles.subtitle}>
              Mettez à jour votre profil pour établir une meilleure connexion
              avec votre Infirmier
            </Text>
          </View>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../../assets/images/profile-placeholder.png")}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraButton}>
              <Image
                source={require("../../assets/images/camera-icon.png")}
                style={styles.cameraIcon}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.form}>
            <Text style={styles.sectionTitle}>Informations personnelles</Text>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                value={name}
                onChangeText={setName}
                style={styles.input}
              />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Numéro de contact</Text>
              <TextInput
                value={contactNumber}
                onChangeText={setContactNumber}
                style={styles.input}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                value={userEmail}
                onChangeText={setUserEmail}
                style={styles.input}
              />
            </View>
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#E9F5F5",
  },
  header: {
    backgroundColor: "#00bfa5",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  cameraButton: {
    position: "absolute",
    bottom: 0,
    right: "40%",
    borderRadius: 50,
    padding: 5,
  },
  cameraIcon: {
    width: 25,
    height: 25,
    left: 16,
  },
  form: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f7f7f7",
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
});

export default NurseProfileConfig;
