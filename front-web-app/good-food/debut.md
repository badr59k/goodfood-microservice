
Exemple de typage:
```tsx

type UserProps = { // 
  name?: string;// optional
  mail: string; 
  password: string; 
};// on ajoute props pour dire que c'est un type d'objet / interafce


type ButtonProps = {
  onPress: () => void; // on rajoute une fonction 
  title: string;
}
```
Un composant sans et avec argument:
```tsx

export function InformationsPersonnelles() {

}

/////////
export function InformationsPersonnelles({ name, mail, password }: UserProps) {
  return (
    <View style={styles.container}>
      <Text>Hello {name}  </Text>
    </View>
  );
}
```
Le style
```tsx
const styles = StyleSheet.create({
  container: { padding: 16 },
});

export default Hello;
```

Navigation:
```tsx
    on type les entrées des ecrans ex:
    export type RootStackParamList = {
      Home: undefined;
      Details: { id: string };
    };
    quand on appelle l'ecran :
    type Props = NativeStackScreenProps<RootStackParamList, "Details">;
    export function DetailsScreen({ route, navigation }: Props) {
      const { id } = route.params;
      ...
    }
```

React Query:
```tsx
        // on peut avoir autre chose que isLoading (isError,refresh)
      const { data, isLoading } = useQuery({
        queryKey: ["products"],
        queryFn: () => get<Product[]>("/owner/products"),
      });

      const createProduct = useMutation({
        mutationFn: (p: NewProduct) => post("/owner/products", p),
      });
```



```tsx


type ButtonProps = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
};

export const AppButton = ({ title, onPress, disabled = false }: ButtonProps) => (
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

///// Autre fichier : //////

export function LoginScreen() {
    const handleLogin = () => {
        Alert.alert("Connexion réussie", "Bienvenue sur GoodFood !");
    };
 
    return (
        <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
            <AppButton title="Se connecter" onPress={handleLogin} /> // on appelle le boutton qu'on a crée 
        </View>
    );
}
```


### Components

Contient les composants réutilisables (AppButton, Input, Modal, etc.).

### Navigation

Définit la navigation entre les écrans (stacks, routes, typage des paramètres).

### Screens

Regroupe les pages principales de l’application.
Chaque fichier représente un écran unique.

### Providers

Gère les contextes React (ex. état global d’authentification).
Expose des hooks personnalisés (useAuth, etc.).

### Services

Centralise les appels API, la configuration réseau (fetch)

### Query

Configure le client React Query (QueryClient) et les options globales du cache.

### Storage

Gère le stockage local sécurisé (token JWT, préférences utilisateur) via expo-secure-store.

### Utils  

Contient les fonctions utilitaires et constantes globales 








