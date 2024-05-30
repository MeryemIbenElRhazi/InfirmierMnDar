import {
  View,
  Text,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";

const SignIn = () => {
  const navigation = useNavigation();
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      console.log("Sending request to backend with:", form);
      const response = await axios.post(
        "http://172.16.1.236:8080/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // Assurez-vous que votre backend renvoie l'ID de l'infirmier sous la clé "infirmierId"
      const infirmierId = response.data.infirmierId;
      console.log("id", infirmierId);

      console.log("Received response:", response.data);
      const userType = response.data.userType;
      if (userType === "PATIENT") {
        navigation.navigate("(tabs)", {
          screen: "home",
          params: { userType: "PATIENT" },
        });
      } else if (userType === "INFIRMIER") {
        // Vous pouvez utiliser l'ID de l'infirmier ici si nécessaire
        navigation.navigate("DemandList", { infirmierId });
      } else {
        Alert.alert("Error", "Invalid response from server");
      }
    } catch (error) {
      console.error("Error during sign in:", error);
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
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Image
            source={images.logoInfirmierMnDar}
            resizeMode="contain"
            className="w-[350px] h-[130px]"
          />
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-align-left">
            Nous sommes heureux de vous retrouver parmi nous. Prêt à reprendre
            là où nous nous sommes arrêtés?
          </Text>
          <FormField
            title="Email"
            placeholder={"mer@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Mot de passe"
            placeholder={"°°°°°°°°°°"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title="Sign In"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />
          {isSubmitting && <ActivityIndicator size="large" color="#0000ff" />}
          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">
              Don't have an account?
            </Text>
            <Link
              href="/sign-up"
              className="text-lg font-psemibold text-secondary"
            >
              Signup
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
