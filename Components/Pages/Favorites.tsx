import { useContext } from "react";
import { Platform, StyleSheet, View, ScrollView } from "react-native";
import { FavContext } from "@components/FavContext";
import NavBar from "@components/NavBar";
import SingleMovie from "@components/SingleMovie";
import { MovieInterface } from "@types";
import { FavProps } from "../types";
import { Dimensions } from "react-native";
const fullwidth = Dimensions.get("window").width;
export const isWeb: boolean = Platform.OS === "web";

export default function Favorites(props: FavProps) {
  const { favMovie } = useContext(FavContext);
  const movieClicked = (movie: MovieInterface) => {
    props.navigation.navigate("Details", { movie });
  };
  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} />

      <ScrollView contentContainerStyle={styles.moviesContainer}>
        {favMovie?.map((movie: MovieInterface, key: number) => (
          <SingleMovie key={key} movie={movie} onClicked={movieClicked} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    height: isWeb ? "100vh" : "100%",
    overflow: "hidden",
  },
  moviesContainer: {
    width: isWeb ? "100%" : fullwidth,
    flexDirection: isWeb ? "row" : "column",
    flexWrap: "wrap",
    alignItems: isWeb ? "flex-start" : "center",
    justifyContent: "space-between",
    rowGap: 0,
    columnGap: 27,
    overflow: "hidden",
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
