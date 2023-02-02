import { StyleSheet, Text, View, Image } from "react-native";
import NavBar from "./NavBar";

interface MovieProps {
  route: any;
  navigation: any;
}
export default function MovieDetail(props: MovieProps) {
  return (
    <View>
      <NavBar navigation={props.navigation} />
      <View style={styles.movieContainer}>
        <Image
          source={{ uri: props.route.params.movie.image }}
          style={styles.coverImage}
        />
        <Text style={styles.movieText}>{props.route.params.movie.title}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    flexDirection: "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  coverImage: {
    width: "180px",
    height: "270px",
    borderRadius: 10,
  },
  movieText: {
    maxWidth: "180px",
    height: "50px",
    marginTop: "10px",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#000000",
  },
});
