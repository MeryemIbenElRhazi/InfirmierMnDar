import { View, Text, ScrollView, Alert, Image } from "react-native";
import React from "react";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import axios from "axios";

export const SignUp = () => {
  const [isSubmitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const router = useRouter();

  const submit = async () => {
    if (!form.username || !form.email || !form.password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    setSubmitting(true);
    try {
      console.log("Sending sign-up request to backend with:", form);
      await axios.post("http://172.16.1.236:8080/api/auth/signup", {
        nom: form.username,
        email: form.email,
        password: form.password,
      });

      router.replace("/home");
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
    <SafeAreaView className=" h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.logoInfirmierMnDar}
            resizeMode="contain"
            className="w-[350px] h-[130px]"
          />
          <Text className="text-sm font-pregular text-gray-100 mt-7 text-align-left">
            Rejoignez-nous pour débuter vos recherches dès aujourd'hui!
          </Text>

          <FormField
            title="Username"
            placeholder={"Username"}
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            placeholder={"ana@gmail.com"}
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Mot de passe"
            placeholder={"°°°°°°°°°"}
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />

          <CustomButton
            title="Sign Up"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading={isSubmitting}
          />

          <View className="flex justify-center pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-Light">
              Have an account already?
            </Text>
            <Link
              href="/sign-in"
              className="text-lg font-psemibold text-secondary"
            >
              Login
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SignUp;
