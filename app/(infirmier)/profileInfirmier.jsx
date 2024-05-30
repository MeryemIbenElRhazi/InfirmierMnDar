import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import MenuInfirmier from "../../components/MenuInfirmier";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ProfileInfirmier = () => {
  const navigation = useNavigation();

  const [infirmier, setInfirmier] = useState({
    nom: "",
    prenom: "",
    email: "",
    specialite: "",
    experience: "",
    ville: "",
    availability: "",
  });

  useEffect(() => {
    fetchInfirmier();
  }, []);

  const fetchInfirmier = async () => {
    try {
      const response = await axios.get(
        "http://172.16.1.236:8080/api/infirmiers/11"
      );
      const data = response.data;
      if (data) {
        setInfirmier({
          ...infirmier,
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          specialite: data.specialite,
          experience: data.experience,
          ville: data.ville,
          availability: data.availability,
        });
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'infirmier:", error);
    }
  };

  const handleEditProfile = () => {
    navigation.navigate("EditProfileInfirmier");
  };

  return (
    <View style={styles.container}>
      <MenuInfirmier />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.userBubble}>
            <Image
              style={styles.userImage}
              source={require("../../assets/images/image1.png")}
            />
          </View>
          <Text style={styles.userName}>
            Bonjour, {`${infirmier.nom} ${infirmier.prenom}`}
          </Text>
        </View>
        <View style={styles.profileSection}>
          <Text style={styles.sectionTitle}>Information du profile</Text>
          <View style={styles.profileDetails}>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Email:</Text> {infirmier.email}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Spécialité:</Text>{" "}
              {infirmier.specialite}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Expérience:</Text>{" "}
              {infirmier.experience}
            </Text>
            <Text style={styles.detailText}>
              <Text style={styles.boldText}>Ville:</Text> {infirmier.ville}
            </Text>

            <TouchableOpacity
              style={styles.editButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  userBubble: {
    backgroundColor: "#29CCB1",
    borderRadius: 50,
    padding: 5,
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
  profileSection: {
    marginBottom: 20,
  },
  profileDetails: {
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginVertical: 4,
  },
  boldText: {
    fontWeight: "bold",
  },
  editButton: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#29CCB1",
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
});

export default ProfileInfirmier;
