import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  TextInput,
} from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SelectList } from "react-native-dropdown-select-list";
import { FontAwesome } from "@expo/vector-icons";

const Catalogue = () => {
  const [infirmiers, setInfirmiers] = useState([]);
  const [allInfirmiers, setAllInfirmiers] = useState([]);
  const [searchSpeciality, setSearchSpeciality] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const category = route.params?.category;

  useEffect(() => {
    fetchInfirmiers();
  }, []);

  useEffect(() => {
    if (category) {
      const filteredInfirmiers = allInfirmiers.filter(
        (infirmier) => infirmier.specialite === category
      );
      setInfirmiers(filteredInfirmiers);
      setSearchSpeciality(category);
    } else {
      setInfirmiers(allInfirmiers);
    }
  }, [category, allInfirmiers]);

  const fetchInfirmiers = async () => {
    try {
      const response = await axios.get(
        "http://172.16.1.236:8080/api/infirmiers"
      );
      setInfirmiers(response.data);
      setAllInfirmiers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  const moroccanCities = [
    { key: "1", value: "Agadir" },
    { key: "2", value: "Ain Harrouda" },
    { key: "3", value: "Ait Melloul" },
    { key: "4", value: "Al Hoceima" },
    { key: "5", value: "Assilah" },
    { key: "6", value: "Azemmour" },
    { key: "7", value: "Azrou" },
    { key: "8", value: "Beni Mellal" },
    { key: "9", value: "Berkane" },
    { key: "10", value: "Berrechid" },
    { key: "11", value: "Boujdour" },
    { key: "12", value: "Bouskoura" },
    { key: "13", value: "Casablanca" },
    { key: "14", value: "Chefchaouen" },
    { key: "15", value: "Dakhla" },
    { key: "16", value: "El Jadida" },
    { key: "17", value: "El Kelaa des Sraghna" },
    { key: "18", value: "Errachidia" },
    { key: "19", value: "Essaouira" },
    { key: "20", value: "Fès" },
    { key: "21", value: "Fnideq" },
    { key: "22", value: "Fquih Ben Salah" },
    { key: "23", value: "Guelmim" },
    { key: "24", value: "Guercif" },
    { key: "25", value: "Ifrane" },
    { key: "26", value: "Imzouren" },
    { key: "27", value: "Kenitra" },
    { key: "28", value: "Khemisset" },
    { key: "29", value: "Khenifra" },
    { key: "30", value: "Khouribga" },
    { key: "31", value: "Ksar El Kebir" },
    { key: "32", value: "Laayoune" },
    { key: "33", value: "Larache" },
    { key: "34", value: "Marrakech" },
    { key: "35", value: "Martil" },
    { key: "36", value: "Meknès" },
    { key: "37", value: "Midelt" },
    { key: "38", value: "Mohammedia" },
    { key: "39", value: "Nador" },
    { key: "40", value: "Ouarzazate" },
    { key: "41", value: "Oued Zem" },
    { key: "42", value: "Oujda" },
    { key: "43", value: "Rabat" },
    { key: "44", value: "Safi" },
    { key: "45", value: "Salé" },
    { key: "46", value: "Sefrou" },
    { key: "47", value: "Settat" },
    { key: "48", value: "Sidi Bennour" },
    { key: "49", value: "Sidi Ifni" },
    { key: "50", value: "Sidi Kacem" },
    { key: "51", value: "Sidi Slimane" },
    { key: "52", value: "Skhirat" },
    { key: "53", value: "Tanger" },
    { key: "54", value: "Tan-Tan" },
    { key: "55", value: "Taounate" },
    { key: "56", value: "Taourirt" },
    { key: "57", value: "Tarfaya" },
    { key: "58", value: "Taroudant" },
    { key: "59", value: "Taza" },
    { key: "60", value: "Témara" },
    { key: "61", value: "Tétouan" },
    { key: "62", value: "Tiflet" },
    { key: "63", value: "Tiznit" },
    { key: "64", value: "Youssoufia" },
    { key: "65", value: "Zagora" },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemTouchable}
      onPress={() => navigation.navigate("Reservation", { infirmier: item })}
    >
      <View style={styles.itemContainer}>
        <Image
          source={
            item.imageUrl
              ? { uri: item.imageUrl }
              : require("../../assets/images/nurse1.jpg")
          }
          style={styles.itemImage}
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>
            {item.nom} {item.prenom}
          </Text>
          <Text style={styles.itemType}>{item.specialite}</Text>
          <Text style={styles.itemType}>{item.ville}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleSearchSpeciality = (text) => {
    setSearchSpeciality(text);
    filterInfirmiers(text, selectedCity);
  };

  const handleSelectCity = (val) => {
    setSelectedCity(val);
    filterInfirmiers(searchSpeciality, val);
  };

  const filterInfirmiers = (speciality, city) => {
    const filteredInfirmiers = allInfirmiers.filter((infirmier) => {
      const matchesSpeciality = speciality
        ? infirmier.specialite.toLowerCase().includes(speciality.toLowerCase())
        : true;
      const matchesCity = city
        ? infirmier.ville.toLowerCase().includes(city.toLowerCase())
        : true;
      return matchesSpeciality && matchesCity;
    });
    setInfirmiers(filteredInfirmiers);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground
        source={require("../../assets/images/background.jpg")}
        style={styles.background}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Catalogue des Infirmiers</Text>
        </View>
        <View style={styles.dropdownWrapper}>
          <SelectList
            setSelected={handleSelectCity}
            data={moroccanCities}
            save="value"
            search={false}
            placeholder="Sélectionnez une ville..."
            boxStyles={styles.dropdown}
            arrowicon={
              <FontAwesome name="chevron-down" size={12} color={"black"} />
            }
          />
        </View>
        <View style={styles.searchWrapper}>
          <TextInput
            value={searchSpeciality}
            onChangeText={handleSearchSpeciality}
            placeholder="Rechercher par spécialité..."
            style={styles.searchInput}
          />
        </View>
        <FlatList
          data={infirmiers}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContainer}
          numColumns={2}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  headerContainer: {
    marginVertical: 60,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingTop: 20,
  },
  itemTouchable: {
    flex: 1,
    margin: 8,
  },
  itemContainer: {
    width: "100%",
    aspectRatio: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemInfo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  itemType: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    textAlign: "center",
  },
  searchWrapper: {
    flexDirection: "row",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    backgroundColor: "#edfcfa",
    paddingHorizontal: 8,
    fontSize: 16,
    marginRight: 8,
  },
  dropdown: {
    height: 50,
    borderRadius: 8,
    backgroundColor: "#FFF",
  },
  dropdownWrapper: {
    position: "absolute",
    zIndex: 10000,
    right: 20,
    left: 20,
    top: 100,
    backgroundColor: "#FFF",
  },
});

export default Catalogue;
