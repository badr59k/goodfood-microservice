import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import RootNavigator from "./navigation/RootNavigator";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./query/client";

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient} />
      <RootNavigator />
    </SafeAreaProvider>
  );
}
