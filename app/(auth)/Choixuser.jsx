import { View,ScrollView, Text, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import {Link} from "expo-router"
import {  router } from "expo-router";
import { useNavigation } from '@react-navigation/native'; 

import CustomButton from  "../../components/CustomButton";

const Choixuser = () => {
    const navigation = useNavigation();
  return (
    <SafeAreaView className=" h-full">
    <ScrollView>
      <View className="w-full justify-center min-h-[87vh] px-4 my-6">
      <Image source={images.logo} resizeMode='contain'  className="w-[350px] h-[130px] "></Image>
      <Text className="text-lg  text-center text-gray-100 font-semibold  ">
      Continuer en tant que 
            </Text>
       
            
            <CustomButton
              title="Patient"
              handlePress={() => router.push("/sign-in")}
              containerStyles="mt-7"
              
            />
          
                  
        <Image source={images.profile} resizeMode='contain'  className="w-[350px] h-[130px] "></Image>
        <Text className="text-lg  text-center text-gray-100 font-semibold  ">
      Continuer en tant que 
            </Text>
        
        
        <CustomButton
                    title="Infirmier"
                    handlePress={() => router.push("/landing")}
                    containerStyles="mt-7"
                  
                  />

<View className="flex justify-center pt-5 flex-row gap-2">
<Text className="text-lg text-gray-100 font-pregular">
              Visit Us?
            </Text>
            <Link
              href="/home"
              className="text-lg font-psemibold text-secondary"
            >
              Home
            </Link>
          </View>
      </View>
    </ScrollView>
  </SafeAreaView>
);

};
export default Choixuser