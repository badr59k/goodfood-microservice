import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { AppButton } from "@/components/Button";
import { AppInput } from "@/components/Input";

export default function LoginScreen() {
  return (
    <SafeAreaView>
      <View>
        <AppInput
          label="Email"
          value={""}
          onChangeText={() => console.log("Email")}
        />
        <AppInput
          label="Password"
          value={""}
          onChangeText={() => console.log("Password")}
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <AppButton
          title="Se connecter"
          onPress={() => console.log("Bonjour")}
        />
      </View>
    </SafeAreaView>
  );
}
