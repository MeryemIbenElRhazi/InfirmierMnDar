// app/accueil/intro.jsx

import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

const Intro = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.circleBackground}>
          <View style={styles.circle} />
          <Image
            source={images.cards}
            resizeMode="cover"
            style={styles.image}
          />
        </View>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Rendez-vous Simplifiés</Text>
          <Text style={styles.subtitle}>
            Planifiez vos consultations avec facilité et profitez de soins
            infirmiers de qualité en un clic.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/acceuilpage")}
          >
            <Text style={styles.buttonText}>Commencer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.skipButton}
            onPress={() => router.push("/home")}
          >
            <Text style={styles.skipText}>Suivant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  circleBackground: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: 300,
    marginBottom: 30,
  },
  circle: {
    position: "absolute",
    width: 250,
    height: 250,
    borderRadius: 125,
    backgroundColor: "#29CCB1",
    top: -100,
    left: width / 2 - 0.2,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  innerContainer: {
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#7a7a7a",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#29CCB1",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  skipButton: {
    marginTop: 20,
  },
  skipText: {
    color: "#29CCB1",
    fontSize: 16,
  },
});

export default Intro;
