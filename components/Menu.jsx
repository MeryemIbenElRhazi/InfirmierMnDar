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

const Menu = () => {
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
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate("catalogue");
          }}
        >
          <View style={styles.menuItem}>
            <Ionicons name="book" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Catalogue</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate("Confidentialité");
          }}
        >
          <View style={styles.menuItem}>
            <Ionicons name="lock-closed" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Confidentialité</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate("Service Aide");
          }}
        >
          <View style={styles.menuItem}>
            <Ionicons name="help-circle" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Service Aide</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleMenu();
            navigation.navigate("Paramètres");
          }}
        >
          <View style={styles.menuItem}>
            <Ionicons name="settings" size={24} color="#333333" />
            <Text style={styles.menuItemText}>Paramètre</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout}>
          <View style={styles.menuItem}>
            <Ionicons name="log-out" size={24} color="red" />
            <Text style={[styles.menuItemText, { color: "red" }]}>
              Déconnexion
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  menuButton: {
    position: "absolute",
    top: 55,
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
    width: width * 0.6, // Vous pouvez ajuster la largeur selon votre préférence
    backgroundColor: "#FFFFFF",
    paddingTop: 85,
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
  },
  menuItemText: {
    fontSize: 18,
    marginLeft: 15,
    color: "#333333",
  },
});

export default Menu;
