import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View, ImageBackground } from "react-native";
import React, { useEffect } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('intro');
    }, 1500);

    return () => clearTimeout(timer);
  }, [router]);
  return (
    <SafeAreaView className="h-full">
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1 }}
        className="w-full h-full"
      >
        <ScrollView contentContainerStyle={{ height: "100%" }}>
          <View className="w-full justify-center items-center min-h-[85vh] px-4">
            <Image
              source={images.logoInfirmierMnDar}
              className="max-w-[380px] w-full h-[300px]"
              resizeMode="contain"
            />
            
          </View>
        </ScrollView>
        <StatusBar backgroundColor="#161622" style="light" />
      </ImageBackground>
    </SafeAreaView>
  );
}