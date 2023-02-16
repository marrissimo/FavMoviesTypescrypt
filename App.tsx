import { Pressable, StyleSheet, View, Text, Platform } from "react-native";
import Movies from "@pages/Movies";
import MovieDetail from "@pages/MovieDetail";
import Favorites from "@pages/Favorites";
import { FavProvider } from "@components/FavContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Dimensions } from "react-native";
const fullHeight = Dimensions.get("window").height;
export const isWeb: boolean = Platform.OS === "web";

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
              options={{
                title: "Movies",
                headerStyle: { backgroundColor: "#F8F8F8" },
                headerShown: isWeb ? false : true,
                headerRight: () => (
                  <Pressable onPress={() => {}}>
                    <Text>Favorites</Text>
                  </Pressable>
                ),
              }}
            />
            <Stack.Screen
              name="Favorites"
              component={Favorites}
              options={{
                title: "Favorites",
                headerStyle: { backgroundColor: "#F8F8F8" },
                headerShown: isWeb ? false : true,
                headerBackTitle: "Movies",
              }}
            />

            <Stack.Screen
              name="Details"
              component={MovieDetail}
              options={{
                title: "Movie Info",
                headerShown: isWeb ? false : true,
                headerStyle: { backgroundColor: "#F8F8F8" },
                headerBackTitle: "Movies",
                headerRight: () => (
                  <Pressable onPress={() => {}}>
                    <Ionicons
                      name="ios-heart-outline"
                      size={25}
                      color="#007AFF"
                    />
                  </Pressable>
                ),
              }}
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
    paddingHorizontal: isWeb ? 240 : 0,
    paddingVertical: 0,
  },
});
