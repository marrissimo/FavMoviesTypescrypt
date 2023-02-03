import { StyleSheet, Text, View } from "react-native";
import NavBar from "./NavBar";

interface FavProps {
  navigation: any;
}

export default function Favorites(props: FavProps) {
  return (
    <View>
      <NavBar navigation={props.navigation} />
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
