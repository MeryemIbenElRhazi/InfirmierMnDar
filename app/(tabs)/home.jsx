import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  RefreshControl,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { images } from "../../constants";

import { useNavigation, useRoute } from "@react-navigation/native";
import SearchInput from "../../components/SearchInput";

import axios from "axios";

const Home = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { userType } = route.params; // Récupération du type d'utilisateur

  const [refreshing, setRefreshing] = useState(false);
  const [topInfirmiers, setTopInfirmiers] = useState([]);
  const [catalogueInfirmiers, setCatalogueInfirmiers] = useState([]);

  useEffect(() => {
    fetchInfirmiers();
  }, []);

  const fetchInfirmiers = async () => {
    try {
      const response = await axios.get(
        "http://172.16.1.236:8080/api/infirmiers"
      );
      const data = response.data;
      // Filtrer les infirmiers avec une expérience >= 10 ans
      const filteredInfirmiers = data.filter(
        (infirmier) => infirmier.experience >= 10
      );
      setTopInfirmiers(filteredInfirmiers);
      setCatalogueInfirmiers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des infirmiers:", error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchInfirmiers();
    setRefreshing(false);
  };

  const isListEmpty = (data) => {
    return data.length === 0;
  };

  const renderWelcomeMessage = () => {
    if (userType === "PATIENT") {
      return (
        <View style={styles.profileButton}>
          <AntDesign name="user" size={24} color="black" />
          <Text style={styles.welcomeText}>Bonjour</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.monCompteButton}
          onPress={() => router.push("/Choixuser")}
        >
          <Text style={styles.monCompteText}>Mon Compte</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={images.background}
        style={{ flex: 1 }}
        className="w-full h-full"
      ></ImageBackground>
      <ScrollView
        contentContainerStyle={styles.background}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.headerContainer}>
          <View style={styles.greenContainer}>
            <Text style={styles.headerTitle}>InfirmierMnDar</Text>

            {renderWelcomeMessage()}

            <Text style={styles.headerSubtitle}>
              Prenez rendez-vous et choisissez votre infirmier
            </Text>

            {userType !== "PATIENT" && (
              <TouchableOpacity
                style={styles.joinButton}
                onPress={() => router.push("/landing")}
              >
                <Text style={styles.joinButtonText}>
                  Vous êtes un infirmier ?
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.sectionTitle}>Top Infirmiers</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.itemList}
            >
              {topInfirmiers.map((infirmier) => (
                <TouchableOpacity
                  key={infirmier.id}
                  style={styles.itemContainer}
                  onPress={() =>
                    navigation.navigate("Reservation", { infirmier })
                  }
                >
                  <View style={styles.bubble}>
                    <Image
                      source={
                        infirmier.imageUrl
                          ? { uri: infirmier.imageUrl }
                          : require("../../assets/images/nurse5.jpg")
                      }
                      style={styles.itemImage}
                    />
                    <Text
                      style={styles.itemTitle}
                    >{`${infirmier.nom} ${infirmier.prenom}`}</Text>
                    <Text style={styles.itemSpecialite}>
                      {infirmier.specialite}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.categoryContainer}>
              <Text style={styles.sectionTitle}>Catalogue Infirmier</Text>
              <TouchableOpacity
                style={styles.seeAllButton}
                onPress={() => router.push("/Categories")}
              >
                <Text style={styles.seeAllText}>Voir Catégories</Text>
                <AntDesign name="right" size={19} color="black" />
              </TouchableOpacity>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={styles.itemList}
              showsHorizontalScrollIndicator={false}
            >
              {catalogueInfirmiers &&
                catalogueInfirmiers.map((infirmier) => (
                  <TouchableOpacity
                    key={infirmier.id}
                    style={styles.itemContainer}
                    onPress={() =>
                      navigation.navigate("Reservation", { infirmier })
                    }
                  >
                    <View style={styles.bubble}>
                      <Image
                        source={
                          infirmier.imageUrl
                            ? { uri: infirmier.imageUrl }
                            : require("../../assets/images/nurse1.jpg")
                        }
                        style={styles.itemImage}
                      />
                      <Text
                        style={styles.itemTitle}
                      >{`${infirmier.nom} ${infirmier.prenom}`}</Text>
                      <Text style={styles.itemSpecialite}>
                        {infirmier.specialite}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = {
  safeArea: {
    flex: 1,
  },
  background: {
    flexGrow: 1,
    backgroundColor: "#edfaf8",
  },
  headerContainer: {
    marginVertical: 24,
    paddingHorizontal: 16,
  },
  greenContainer: {
    backgroundColor: "#29CCB1",
    borderRadius: 8,
    padding: 16,
    marginBottom: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#FFF",
    marginBottom: 16,
    top: 10,
  },
  joinButton: {
    backgroundColor: "#FFF",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  joinButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#29CCB1",
  },
  contentContainer: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    paddingTop: 40,
    marginBottom: 16,
    color: "black",
  },
  itemList: {
    flexDirection: "row",
  },
  itemContainer: {
    marginRight: 16,
    alignItems: "center",
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 16,
    color: "#29CCB1",
    marginTop: 8,
    textAlign: "center",
  },
  itemSpecialite: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
    textAlign: "center",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -80,
  },
  monCompteButton: {
    position: "absolute",
    top: 20,
    left: 243,
    backgroundColor: "#FFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
  },
  monCompteText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#29CCB1",
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  seeAllButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 23,
  },
  seeAllText: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    color: "#29CCB1",
  },
  bubble: {
    alignItems: "center",
  },
  profileButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 5,
    color: "black",
  },
};

export default Home;
