import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const Authlayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="landing"
          options={{
            headerTitle: "Confirmer votre Identité",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="identity"
          options={{
            headerTitle: "Vos Informations",
            //headerShown: false,
          }}
        />

        <Stack.Screen
          name="DemandList"
          options={{
            headerTitle: "Liste de l'historique des demandes",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="profileInfirmier"
          options={{
            headerTitle: "Profil Infirmier",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditProfileInfirmier"
          options={{
            headerTitle: "Modifier Profile Infirmier",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="NurseProfileConfig"
          options={{
            headerTitle: "Configuration du profil Infirmier",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="LocationPage"
          options={{
            headerTitle: "Localisation",
            //headerShown: false,
          }}
        />
        <Stack.Screen
          name="PrivacyPolicy"
          options={{
            headerTitle: "Confidentialité",
            //headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Authlayout;
