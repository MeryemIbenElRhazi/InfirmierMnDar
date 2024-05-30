import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  Linking,
  Modal,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons"; // Import de Ionicons

const Reservation = () => {
  const route = useRoute();
  const { infirmier } = route.params || {};
  const navigation = useNavigation();

  const [patientFullName, setPatientFullName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientAddress, setPatientAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false); // État pour afficher le popup

  const onCancelPress = () => {
    navigation.navigate("catalogue");
  };

  const onCallPress = (number) => {
    Linking.openURL(`tel:${number}`);
  };

  const onAddButtonPress = async () => {
    try {
      // Vérifier si un infirmier est sélectionné
      if (!infirmier) {
        console.error("Aucun infirmier sélectionné.");
        return;
      }

      // Créer l'objet de demande à envoyer à l'API
      const requestObj = {
        patientFullName,
        patientPhone,
        patientAddress,
        infirmier: { id: infirmier.id }, // Enregistrer l'ID de l'infirmier
      };

      // Envoyer la demande à l'API
      const response = await fetch("http://172.16.1.236:8080/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestObj),
      });

      // Vérifier la réponse de l'API
      if (response.ok) {
        // Demande enregistrée avec succès
        setShowPopup(true); // Afficher le popup
        const data = await response.json();
        console.log("Request enregistrée :", data);
      } else {
        // Gérer les erreurs de l'API
        console.error(
          "Erreur lors de l'enregistrement de la demande :",
          response.statusText
        );
      }
    } catch (error) {
      // Gérer les erreurs générales
      console.error("Erreur lors de la requête :", error.message);
    }
  };

  const handleConfirm = () => {
    setShowPopup(false); // Cacher le popup
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.background}
      >
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Votre Panier</Text>
          </View>
          {infirmier ? (
            <View style={styles.infirmierContainer}>
              <View style={styles.infirmierDetails}>
                <View style={styles.infirmierInfo}>
                  <Text
                    style={styles.infirmierName}
                  >{`${infirmier.nom} ${infirmier.prenom}`}</Text>
                  <Text
                    style={styles.infirmierText}
                  >{`Spécialité: ${infirmier.specialite}`}</Text>
                  <Text
                    style={styles.infirmierText}
                  >{`Expérience: ${infirmier.experience}`}</Text>
                  <Text style={styles.infirmierText}>{`Prix: 280 DH`}</Text>
                </View>
                <Image
                  source={
                    infirmier.imageUrl
                      ? { uri: infirmier.imageUrl }
                      : require("../../assets/images/nurse1.jpg")
                  }
                  style={styles.itemImage}
                />
              </View>
            </View>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Votre panier est vide.</Text>
            </View>
          )}
          {infirmier && (
            <View style={styles.formContainer}>
              <Text style={styles.formHeader}>Confirmer vos informations</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom complet du patient"
                value={patientFullName}
                onChangeText={setPatientFullName}
              />
              <TextInput
                style={styles.input}
                placeholder="Numéro de téléphone du patient"
                value={patientPhone}
                onChangeText={setPatientPhone}
              />
              <TextInput
                style={styles.input}
                placeholder="Adresse du patient"
                value={patientAddress}
                onChangeText={setPatientAddress}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={onAddButtonPress}
              >
                <Text style={styles.addButtonText}>Ajouter</Text>
              </TouchableOpacity>
            </View>
          )}
          {infirmier && (
            <View style={styles.callContainer}>
              <Text style={styles.callHeader}>Appeler notre service:</Text>
              <View style={styles.numbersContainer}>
                <View style={styles.numberRow}>
                  <TextInput
                    style={styles.numberInput}
                    placeholder="Numéro 1"
                    value="+212 6 49 69 28 94"
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => onCallPress("+212 6 49 69 28 94")}
                  >
                    <Ionicons name="call" size={24} color="white" />
                  </TouchableOpacity>
                </View>
                <View style={styles.numberRow}>
                  <TextInput
                    style={styles.numberInput}
                    placeholder="Numéro 2"
                    value="+212 6 39 63 23 54"
                    editable={false}
                  />
                  <TouchableOpacity
                    style={styles.callButton}
                    onPress={() => onCallPress("+212 6 39 63 23 54")}
                  >
                    <Ionicons name="call" size={24} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
          <TouchableOpacity style={styles.cancelButton} onPress={onCancelPress}>
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>
          {/* Popup */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showPopup}
            onRequestClose={() => setShowPopup(false)}
          >
            <View style={styles.popupContainer}>
              <View style={styles.popupInner}>
                <Text style={styles.popupText}>
                  Merci, votre demande a été envoyée avec succès. Veuillez
                  contacter notre service pour continuer.
                </Text>
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: "center",
  },
  headerContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  infirmierContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  infirmierDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  infirmierInfo: {
    flex: 1,
  },
  infirmierName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  infirmierText: {
    fontSize: 16,
    marginBottom: 5,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  emptyText: {
    fontSize: 18,
    color: "black",
  },
  formContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  formHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#29CCB1",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  callContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  callHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  callButton: {
    backgroundColor: "#29CCB1",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },
  callButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  numbersContainer: {
    marginBottom: 10,
  },
  numberRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  numberInput: {
    backgroundColor: "#e0e0e0",
    color: "black",
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    flex: 1,
  },
  cancelButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    marginTop: 20,
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  popupContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupInner: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  confirmButton: {
    backgroundColor: "#29CCB1",
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
};

export default Reservation;
