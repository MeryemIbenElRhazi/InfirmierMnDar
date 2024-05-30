import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";

const LocationPage = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const handleEnableLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    try {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      Alert.alert("Location Enabled", `Location: ${JSON.stringify(location)}`);

      // Wait for 3 seconds before navigating to PrivacyPolicy
      setTimeout(() => {
        navigation.navigate("PrivacyPolicy");
      }, 0);
    } catch (error) {
      setErrorMsg("Could not fetch location. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Localisation</Text>
            <Image
              source={require("../../assets/images/location-icon.png")}
              style={styles.icon}
            />
            <Text style={styles.subtitle}>
              Ajouter votre adresse personnelle
            </Text>
          </View>
          {location ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <Marker
                coordinate={{
                  latitude: location.coords.latitude,
                  longitude: location.coords.longitude,
                }}
                title={"You are here"}
              />
            </MapView>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={handleEnableLocation}
            >
              <Text style={styles.buttonText}>Enable Location</Text>
            </TouchableOpacity>
          )}
          <Text style={styles.subtitle}>
            Votre localisation est en sécurité :
          </Text>
          <CustomButton
            title="Confirmer"
            handlePress={() => navigation.navigate("PrivacyPolicy")}
            containerStyles={styles.customButton}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9F5F5",
  },
  innerContainer: {
    width: "100%",
    justifyContent: "center",
    minHeight: "70vh",
    paddingHorizontal: 16,
    marginVertical: 40,
  },
  header: {
    alignItems: "center",
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginVertical: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginVertical: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#00bfa5",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 100,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  customButton: {
    marginTop: 35,
  },
});

export default LocationPage;
