import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootNavigator from "./navigation/RootNavigator";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { UserProvider } from "./providers/UserProvider/UserProvider";

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 }, mutations: { retry: 0 } },
});

export default function App() {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}> 
        <UserProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </UserProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}