import { View, ScrollView, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import { useRouter } from "expo-router";
import CustomButton from "../../components/CustomButton";
const Landing = () => {
  const router = useRouter();

  return (
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[75vh] px-4 my-6">
          <Image
            source={images.logoIMD}
            resizeMode="contain"
            className="w-[350px] h-[130px]"
          />

          <Text className="text-2xl font-semibold text-gray-100  mt-10 font-psemibold">
            Bienvenue à InfirmierMnDar
          </Text>

          <View style={{ height: 16 }} />

          <Text className="text-lg text-center text-gray-100 font-pregular">
            Créez votre profil sur InfirmierMnDar.
          </Text>

          <View style={{ height: 16 }} />

          <Text className="text-lg text-center text-gray-100 font-semibold">
            Un membre de l'équipe InfirmierMnDar vous contactera pour confirmer
            votre compte et finaliser votre inscription.
          </Text>
          <CustomButton
            title="Se Connecter"
            handlePress={() => router.push("/sign-in")}
            containerStyles="mt-7"
          />

          <CustomButton
            title="S'inscrire"
            handlePress={() => router.push("/identity")}
            containerStyles="mt-7"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Landing;
