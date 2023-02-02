import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
export default function NavBar({ navigation }: any) {
  return (
    <View style={styles.navBar}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fav</Text>
        <Text style={styles.boldTitle}>Movies</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Movies")}>
          <Text style={styles.menuVoice}>Top Rated</Text>
        </TouchableOpacity>
        <TouchableOpacity
        /*           onPress={() => navigation.navigate("Favorites")}
         */
        >
          <Text style={styles.menuVoice}>Favorites</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: "130px",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    flexBasis: "initial",
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
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    flexBasis: "initial",
    gap: "52px",
  },
  menuVoice: {
    fontFamily: "Roboto_500Medium",
    fontSize: 24,
    lineHeight: 28,
    letterSpacing: 0.646,
    color: "#999999",
  },
});
