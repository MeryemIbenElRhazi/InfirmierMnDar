import {
  View,
  Text,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import * as DocumentPicker from "expo-document-picker"; // For PDF upload
import { Picker } from "@react-native-picker/picker"; // For dropdown list
import { useRouter } from "expo-router";
import axios from "axios";

const moroccanCities = [
  "Agadir",
  "Ain Harrouda",
  "Ait Melloul",
  "Al Hoceima",
  "Assilah",
  "Azemmour",
  "Azrou",
  "Beni Mellal",
  "Berkane",
  "Berrechid",
  "Boujdour",
  "Bouskoura",
  "Casablanca",
  "Chefchaouen",
  "Dakhla",
  "El Jadida",
  "El Kelaa des Sraghna",
  "Errachidia",
  "Essaouira",
  "Fès",
  "Fnideq",
  "Fquih Ben Salah",
  "Guelmim",
  "Guercif",
  "Ifrane",
  "Imzouren",
  "Kenitra",
  "Khemisset",
  "Khenifra",
  "Khouribga",
  "Ksar El Kebir",
  "Laayoune",
  "Larache",
  "Marrakech",
  "Martil",
  "Meknès",
  "Midelt",
  "Mohammedia",
  "Nador",
  "Ouarzazate",
  "Oued Zem",
  "Oujda",
  "Rabat",
  "Safi",
  "Salé",
  "Sefrou",
  "Settat",
  "Sidi Bennour",
  "Sidi Ifni",
  "Sidi Kacem",
  "Sidi Slimane",
  "Skhirat",
  "Tanger",
  "Tan-Tan",
  "Taounate",
  "Taourirt",
  "Tarfaya",
  "Taroudant",
  "Taza",
  "Témara",
  "Tétouan",
  "Tiflet",
  "Tiznit",
  "Youssoufia",
  "Zagora",
];

const Identity = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    ville: "",
    email: "",
    password: "",
    Numero: "",
    Expérience: "",
    CIN: "",
    Formation: "",
    Spécialité: "",
  });
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [uploadedPDF, setUploadedPDF] = useState(null);

  const specialties = [
    "Réadaptation",
    "Obtérique",
    "Cardiologie",
    "Neurologie",
  ];

  const handleDocumentPicker = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: "application/pdf",
      copyToCacheDirectory: true,
    });
    if (result.type === "success") {
      setUploadedPDF(result.uri);
      setForm({ ...form, Formation: result.name });
    }
  };

  const submit = async () => {
    if (
      !form.firstname ||
      !form.lastname ||
      !form.email ||
      !form.password ||
      !form.Numero ||
      !form.Expérience ||
      !form.CIN ||
      !form.Spécialité ||
      !form.ville
    ) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      console.log("Sending sign-up request to backend with:", form);
      await axios.post("http://172.16.1.236:8080/api/auth/signup-infirmier", {
        nom: form.firstname,
        prenom: form.lastname,
        email: form.email,
        password: form.password,
        specialite: form.Spécialité,
        ville: form.ville,
        numero: form.Numero,
        experience: form.Expérience,
        cin: form.CIN,
        localisation: form.localisation,
        imageProfile: form.imageProfile,
      });

      router.push({
        pathname: "/NurseProfileConfig",
        params: {
          firstname: form.firstname,
          lastname: form.lastname,
          email: form.email,
          Numéro: form.Numero,
          ville: form.ville,
        },
      });
    } catch (error) {
      console.error("Error during sign-up:", error);
      Alert.alert(
        "Error",
        error.response ? error.response.data : error.message
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        >
          <View className="w-full px-4 my-6">
            <Image
              source={images.carteid}
              resizeMode="contain"
              className="w-[350px] h-[130px]"
            />
            <FormField
              title="Nom"
              value={form.firstname}
              handleChangeText={(e) => setForm({ ...form, firstname: e })}
              otherStyles="mt-10"
            />
            <FormField
              title="Prénom"
              value={form.lastname}
              handleChangeText={(e) => setForm({ ...form, lastname: e })}
              otherStyles="mt-10"
            />
            <FormField
              title="Email"
              value={form.email}
              placeholder="okn@gmail.com"
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <FormField
              title="Mot de passe"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
              secureTextEntry
            />
            <Text className="mt-10">Ville</Text>
            <View className="border mt-2 rounded">
              <Picker
                selectedValue={form.ville}
                onValueChange={(itemValue) => {
                  setForm({ ...form, ville: itemValue });
                }}
              >
                {moroccanCities.map((city, index) => (
                  <Picker.Item key={index} label={city} value={city} />
                ))}
              </Picker>
            </View>
            <FormField
              title="Numéro de téléphone"
              value={form.Numero}
              placeholder="+212 |"
              handleChangeText={(e) => setForm({ ...form, Numero: e })}
              otherStyles="mt-7"
              keyboardType="phone-pad"
            />
            <Text className="mt-10">Spécialité</Text>
            <View className="border mt-2 rounded">
              <Picker
                selectedValue={selectedSpecialty}
                onValueChange={(itemValue) => {
                  setSelectedSpecialty(itemValue);
                  setForm({ ...form, Spécialité: itemValue });
                }}
              >
                {specialties.map((specialty, index) => (
                  <Picker.Item
                    key={index}
                    label={specialty}
                    value={specialty}
                  />
                ))}
              </Picker>
            </View>
            <FormField
              title="Expérience"
              value={form.Expérience}
              handleChangeText={(e) => setForm({ ...form, Expérience: e })}
              otherStyles="mt-7"
              keyboardType="numeric"
            />
            <FormField
              title="CIN"
              value={form.CIN}
              placeholder="CD64558"
              handleChangeText={(e) => setForm({ ...form, CIN: e })}
              otherStyles="mt-7"
              keyboardType="default"
            />
            <CustomButton
              title="Continuer"
              handlePress={submit}
              containerStyles="mt-7"
              isLoading={isSubmitting}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Identity;
