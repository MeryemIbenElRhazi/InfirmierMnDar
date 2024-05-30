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
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");

const acceuilpage = () => {
  const router = useRouter();
  return (
    <SafeAreaView className="h-full">
      <ImageBackground
        source={images.background}
        style={{ flex: 1 }}
        className="w-full h-full"
      >
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image
              source={images.logoInfirmierMnDar}
              className="w-[130px] h-[130px]"
              resizeMode="contain"
            />
            <Image
              source={images.cardsInfirmier}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />

            <View className="relative mr-5">
              <Text className="text-3xl text-gray-100 font-bold text-center ">
                Rendez-vous Simplifiés avec{" "}
                <Text className="text-secondary-200">InfirmierMnDar</Text>
              </Text>
              <Image
                className="w-[140px] h-[15px] absolute -bottom-2 right-0"
                resizeMode="contain"
              />
            </View>
            <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
              Planifiez vos consultations avec facilité et profitez de soins
              infirmiers de qualité en un clic.
            </Text>

            <CustomButton
              title="Commencer en tant qu'invité"
              handlePress={() => router.push("/home")}
              containerStyles="w-full mt-6"
            />
            <CustomButton
              title="Continuer avec un Email"
              handlePress={() => router.push("/Choixuser")}
              containerStyles="w-full mt-5"
            />
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default acceuilpage;
