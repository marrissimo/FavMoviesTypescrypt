import { StyleSheet, View } from "react-native";
import Movies from "@pages/Movies";
import MovieDetail from "@pages/MovieDetail";
import Favorites from "@pages/Favorites";
import { FavProvider } from "@components/FavContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Dimensions } from "react-native";
const fullHeight = Dimensions.get("window").height;

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
    <FavProvider>
      <View style={styles.container}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Movies">
            <Stack.Screen
              name="Movies"
              component={Movies}
              options={{ title: "FavMovies" }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{ title: "Favorites Movies" }}
            />

            <Stack.Screen
              name="Details"
              component={MovieDetail}
              options={{ title: "Details" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </FavProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: fullHeight,
    backgroundColor: "#fff",
    margin: 0,
    paddingHorizontal: 240,
    paddingVertical: 0,
  },
});
