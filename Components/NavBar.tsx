import { StyleSheet, Text, View, Pressable } from "react-native";
import { useRoute } from "@react-navigation/native";
import { NavBarProps } from "./types";

export default function NavBar(props: NavBarProps) {
  const activeRoute = useRoute().name;
  const activeColor = "#F5BD00";
  const inactiveColor = "#999999";

  return (
    <View style={styles.navBar}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fav</Text>
        <Text style={styles.boldTitle}>Movies</Text>
      </View>
      <View style={styles.menuContainer}>
        <Pressable onPress={() => props.navigation.navigate("Movies")}>
          <Text
            style={[
              styles.menuVoice,
              {
                color:
                  activeRoute === "Movies" || activeRoute === "Details"
                    ? activeColor
                    : inactiveColor,
              },
            ]}
          >
            Top Rated
          </Text>
        </Pressable>
        <Pressable onPress={() => props.navigation.navigate("Favorites")}>
          <Text
            style={[
              styles.menuVoice,
              {
                color:
                  activeRoute === "Favorites" ? activeColor : inactiveColor,
              },
            ]}
          >
            Favorites
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: 130,
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  title: {
    fontFamily: "Roboto_400Regular",
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.646,
    color: "#000000",
  },
  boldTitle: {
    fontFamily: "Roboto_700Bold",
    fontSize: 34,
    lineHeight: 40,
    letterSpacing: 0.646,
    color: "#000000",
  },
  menuContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    gap: 52,
  },
  menuVoice: {
    fontFamily: "Roboto_500Medium",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.646,
  },
});
