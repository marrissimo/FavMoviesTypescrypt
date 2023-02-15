import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FavContext } from "@components/FavContext";
import NavBar from "@components/NavBar";
import SingleMovie from "@components/SingleMovie";
import { MovieInterface } from "@types";
import { FavProps } from "../types";

export default function Favorites(props: FavProps) {
  const { favMovie } = useContext(FavContext);
  const movieClicked = (movie: MovieInterface) => {
    props.navigation.navigate("Details", { movie });
  };
  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} />

      <View style={styles.moviesContainer}>
        {favMovie?.map((movie: MovieInterface, key: number) => (
          <SingleMovie key={key} movie={movie} onClicked={movieClicked} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    height: "100%",
  },
  moviesContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 27,
  },

  button: {
    width: 155,
    height: 46,
    backgroundColor: "#F9F9F9",
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 60,
    marginTop: 58,
    marginBottom: 53,
  },
  textButton: {
    maxWidth: 180,
    height: 50,
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#000000",
    marginTop: 12,
  },
});
