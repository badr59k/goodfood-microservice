import { SafeAreaView } from "react-native-safe-area-context";
import { View } from "react-native";
import { useMutation } from "@tanstack/react-query";
import { RegisterSend } from "@/providers/auth/types";
import { useState } from "react";
import { useAuth } from "@/providers/auth/AuthContext";
import { AppInput } from "@/components/Input";
import { AppButton } from "@/components/Button";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootNavigator";

export default function RegisterScreen() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mutation = useMutation({
    mutationFn: (value: RegisterSend) => register(value),
    onError: (error) => {
      console.log("Error ", error);
    },
    onSuccess: () => {
      console.log("Success");
      navigation.navigate("Login");
    },
  });

  function handleRegister() {
    mutation.mutate({
      firstName,
      email,
      password,
    });
  }

  return (
    <SafeAreaView>
      <View>
        <AppInput
          label="Firstname"
          value={firstName}
          onChangeText={setFirstName}
        />
        <AppInput label="Email" value={email} onChangeText={setEmail} />
        <AppInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <AppButton
          title={mutation.isPending ? "Inscription en cours..." : "S'inscrire"}
          onPress={handleRegister}
          disabled={mutation.isPending}
        />
      </View>
    </SafeAreaView>
  );
}
