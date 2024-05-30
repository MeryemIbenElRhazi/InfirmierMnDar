import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Parametres = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Fonction pour gérer l'affichage du formulaire de changement de mot de passe
  const toggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleLogout = () => {
    navigation.navigate("acceuilpage");
  };

  // Fonction pour gérer le changement de mot de passe
  const handleChangePassword = () => {
    // Vérifier si les mots de passe correspondent
    if (newPassword !== confirmPassword) {
      console.log("Les mots de passe ne correspondent pas");
      return;
    }

    // Mettez ici votre logique de changement de mot de passe
    console.log("Changer le mot de passe");
    // Réinitialiser les champs de mot de passe
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.setting} onPress={toggleChangePassword}>
        <Ionicons name="key-outline" size={24} color="#29CCB1" />
        <Text style={styles.settingText}>Changer le mot de passe</Text>
      </TouchableOpacity>
      {showChangePassword && (
        <View style={styles.changePasswordContent}>
          <View style={styles.passwordInput}>
            <Text style={styles.label}>Nouveau mot de passe:</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.passwordInput}>
            <Text style={styles.label}>Confirmer le mot de passe:</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={handleChangePassword}
          >
            <Text style={styles.changePasswordButtonText}>
              Changer le mot de passe
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 80,
  },
  setting: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  settingText: {
    marginLeft: 20,
    fontSize: 18,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: "#29CCB1",
  },
  changePasswordContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    marginTop: 10,
  },
  passwordInput: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  changePasswordButton: {
    backgroundColor: "#29CCB1",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  changePasswordButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Parametres;
