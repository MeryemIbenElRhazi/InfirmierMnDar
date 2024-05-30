import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
const Authlayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="intro"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="acceuilpage"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Authlayout;
