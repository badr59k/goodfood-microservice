import { TextInput, StyleSheet, View, Text } from "react-native";

type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  label?: string;
};

export const AppInput = ({
  value,
  onChangeText,
  secureTextEntry = false,
  label,
}: InputProps) => (
  <View style={styles.wrapper}>
    {label && <Text style={styles.label}>{label}</Text>}

    <TextInput
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      style={styles.input}
    />
  </View>
);

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  label: {
    marginBottom: 4,
    fontWeight: "600",
    color: "#374151",
  },
  input: {
    height: 35,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    backgroundColor: "white",
    color: "#000",
  },
});
