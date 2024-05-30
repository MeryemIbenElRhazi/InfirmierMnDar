// app/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { BlurView } from "expo-blur";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import CatalogueScreen from "./(tabs)/catalogue";
import ProfileScreen from "./(tabs)/profile";
import SettingsScreen from "./parametre";
import HelpScreen from "./serviceAide";
import ConfidentialiteScreen from "./confidentialite";
const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  return (
    <BlurView intensity={50} style={StyleSheet.absoluteFill}>
      <View style={styles.drawerContent}>
        <TouchableOpacity onPress={() => navigation.navigate("Catalogue")}>
          <Text style={styles.menuItem}>Catalogue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.menuItem}>Mes Achats</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Confidentialite")}
        >
          <Text style={styles.menuItem}>Confidentialité</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Help")}>
          <Text style={styles.menuItem}>Service Aide</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
          <Text style={styles.menuItem}>Paramètre</Text>
        </TouchableOpacity>
      </View>
    </BlurView>
  );
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
          ),
          headerTitle: "",
        }}
      >
        <Drawer.Screen name="Catalogue" component={CatalogueScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen
          name="Confidentialite"
          component={ConfidentialiteScreen}
        />
        <Drawer.Screen name="Help" component={HelpScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    padding: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  menuItem: {
    fontSize: 18,
    marginVertical: 10,
  },
  menuIcon: {
    fontSize: 24,
    marginLeft: 10,
  },
});

export default AppNavigator;
