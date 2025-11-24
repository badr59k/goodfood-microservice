import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from "react-native";
import { AppButton } from "@/components/Button";
import { AppInput } from "@/components/Input";
import { LoginSend } from "@/providers/auth/types";
import { useAuth } from "@/providers/auth/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/RootNavigator";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const { login } = useAuth();

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const mutation = useMutation({
    mutationFn: (value: LoginSend) => login(value),
    onError: (error) => {
      console.log("Error ", error);
    },
    onSuccess: () => {
      console.log("Success");
    },
  });

  function isValidEmail(value: string) {
    return /\S+@\S+\.\S+/.test(value);
  }

  function handleLogin() {
    setEmailError(null);
    setPasswordError(null);

    let hasError = false;

    if (!email) {
      setEmailError("Email obligatoire");
      hasError = true;
    } else if (!isValidEmail(email)) {
      setEmailError("Email invalide");
      hasError = true;
    }

    if (!password) {
      setPasswordError("Mot de passe obligatoire");
      hasError = true;
    } else if (password.length < 6) {
      setPasswordError("Minimum 6 caractères");
      hasError = true;
    }

    if (hasError) return;

    mutation.mutate({
      email,
      password,
    });
  }

  return (
    <SafeAreaView>
      <View>
        <AppInput label="Email" value={email} onChangeText={setEmail} />
        {emailError && (
          <Text style={{ color: "red", fontSize: 12 }}>{emailError}</Text>
        )}
        <AppInput
          label="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError && (
          <Text style={{ color: "red", fontSize: 12 }}>{passwordError}</Text>
        )}
      </View>
      <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
        <AppButton
          title={mutation.isPending ? "Connexion..." : "Se connecter"}
          onPress={handleLogin}
          disabled={mutation.isPending}
        />
      </View>

      <Text style={{ marginTop: 16, textAlign: "center" }}>
        Pas encore de compte ?{" "}
        <Text
          style={{ fontWeight: "bold" }}
          onPress={() => navigation.navigate("Register")}
        >
          Inscription
        </Text>
      </Text>
    </SafeAreaView>
  );
}
