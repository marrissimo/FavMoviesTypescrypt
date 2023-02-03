import { StyleSheet, Text, View } from "react-native";
import NavBar from "./NavBar";

export default function Favorites() {
  return (
    <View>
      <NavBar />
      <Text>Favorites</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    width: "180px",
    height: "320px",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "20px",
  },
});
