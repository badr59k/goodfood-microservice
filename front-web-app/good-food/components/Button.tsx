import { Pressable, Text, StyleSheet } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export const AppButton = ({
  title,
  onPress,
  disabled = false,
}: ButtonProps) => (
  <Pressable
    onPress={onPress}
    disabled={disabled}
    style={({ pressed }) => [
      styles.base,
      pressed && styles.pressed,
      disabled && styles.disabled,
    ]}
  >
    <Text style={styles.text}>{title}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    height: 35,
    backgroundColor: "#2563eb",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    marginVertical: 8,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
    opacity: 0.8,
  },
  disabled: {
    opacity: 0.8,
  },
  text: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
