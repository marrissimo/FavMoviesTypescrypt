import { StyleSheet, View } from "react-native";
import Movies from "./Components/Movies";
import MovieDetail from "./Components/MovieDetail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

export default function App() {
  const Stack = createNativeStackNavigator();
  let [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Movies">
          <Stack.Screen
            name="Movies"
            component={Movies}
            options={{ title: "FavMovies" }}
          />

          <Stack.Screen
            name="Details"
            component={MovieDetail}
            options={{ title: "Details" }}
          />
          {/*   <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={{ title: "Favorites Movies" }}
          />  */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    height: "100vh",
    backgroundColor: "#fff",
  },
});