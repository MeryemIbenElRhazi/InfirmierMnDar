import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

const MenuInfirmier = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const slideAnim = useState(new Animated.Value(-width))[0];
  const navigation = useNavigation();

  const toggleMenu = () => {
    if (menuVisible) {
      closeMenu();
    } else {
      setMenuVisible(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -width,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setMenuVisible(false));
  };

  const handleLogout = () => {
    navigation.navigate("acceuilpage");
  };

  return (
    <>
      <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
        <Ionicons name="menu" size={30} color="black" />
      </TouchableOpacity>
      {menuVisible && (
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.blurContainer} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View
        style={[
          styles.menuContainer,
          { transform: [{ translateX: slideAnim }] },
        ]}
      >
        <TouchableOpacity onPress={() => navigation.navigate("DemandList")}>
          <View style={styles.menuItem}>
            <Ionicons name="list" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Demandes</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Confidentialité")}
        >
          <View style={styles.menuItem}>
            <Ionicons name="lock-closed" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Confidentialité</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Service Aide")}>
          <View style={styles.menuItem}>
            <Ionicons name="help-circle" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Service Aide</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Paramètres")}>
          <View style={styles.menuItem}>
            <Ionicons name="settings" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Paramètres</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.menuItem}>
            <Ionicons name="log-out" size={24} color="red" />
            <Text style={styles.logoutText}>Déconnexion</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 5,
    left: 20,
    zIndex: 2,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },
  menuContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: width * 0.6, // Ajustez la largeur du menu selon votre préférence
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333333",
  },
  logoutText: {
    fontSize: 18,
    marginLeft: 15,
    color: "red",
  },
});

export default MenuInfirmier;
