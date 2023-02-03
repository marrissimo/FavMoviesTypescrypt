import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { FavContext } from "./FavContext";
import NavBar from "./NavBar";
import SingleMovie from "./SingleMovie";

interface FavProps {
  navigation: any;
  route: any;
  movieClicked: (movie: any) => void;
}

export default function Favorites(props: FavProps) {
  const { favMovie }: any = useContext(FavContext);
  console.log("favMovie_favorites", favMovie);
  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} />

      <View style={styles.moviesContainer}>
        {favMovie?.map((movie: any, key: number) => (
          <SingleMovie key={key} movie={movie} onClicked={props.movieClicked} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  moviesContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: "27px",
  },

  button: {
    width: "155px",
    height: "46px",
    backgroundColor: "#F9F9F9",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: " 0px 1px 0px rgba(0, 0, 0, 0.05)",
    borderRadius: 60,
    marginTop: "58px",
    marginBottom: "53px",
  },
  textButton: {
    maxWidth: "180px",
    height: "50px",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#000000",
    marginTop: "12px",
  },
});
