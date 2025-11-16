import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./AppStack";
import AuthStack from "./AuthStack";

export default function RootNavigator(){
    const isAuthenticated = false;
    return(
        <NavigationContainer>
            {isAuthenticated?
                <AppStack/>
            :<AuthStack/>
            }
        </NavigationContainer>
    );
}