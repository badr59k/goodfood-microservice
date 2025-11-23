import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { AppButton } from "@/components/Button";
import { useAuth } from "@/providers/auth/AuthContext";

export default function HomeScreen() {
  const { logout } = useAuth();
  return (
    <SafeAreaView>
      <Text>Tu es connecté #top</Text>
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <AppButton title={"Se déconnecter"} onPress={logout} />
      </View>
    </SafeAreaView>
  );
}
