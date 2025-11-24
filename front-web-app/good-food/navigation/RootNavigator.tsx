import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";
import { useAuth } from "@/providers/auth/AuthContext";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};

export default function RootNavigator() {
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
