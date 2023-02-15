import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import NavBar from "../NavBar";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { FavContext } from "../FavContext";
import { SingleMovieProps } from "../types";
import { MovieInterface } from "../types";

export default function MovieDetail(props: SingleMovieProps) {
  const prefix: string = "https://image.tmdb.org/t/p/w500";
  const image: object = { uri: prefix + props.route.params.movie.poster_path };
  const date: string[] = new Date(props.route.params.movie.release_date)
    .toDateString()
    .split(" ");
  const date_noDay: string = date[2] + " " + date[1] + " " + date[3];
  const { favMovie, setFavMovie }: any = useContext(FavContext);
  const [isFav, setIsFav] = useState<boolean>(
    favMovie.includes(props.route.params.movie)
  );
  const buttonText: string = isFav
    ? "Rimuovi dai preferiti"
    : "Aggiungi ai preferiti";

  const addToFav = (): void => {
    favMovie.push(props.route.params.movie);
    setFavMovie(favMovie);
  };

  const removeFav = (movIdtodelete: number): void => {
    const newFavList: MovieInterface[] = favMovie.filter(
      (movie: MovieInterface) => {
        return movie.id !== movIdtodelete;
      }
    );
    setFavMovie(newFavList);
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} />
      <View style={styles.movieContainer}>
        <Image style={styles.coverImage} source={image}></Image>
        <View>
          <Text style={styles.movieTitle}>
            {props.route.params.movie.title}
          </Text>
          <View>
            <View style={styles.labelContainer}>
              <Ionicons name="ios-star" size={15} color="#F6C725" />
              <Text
                style={[
                  styles.movieLabel,
                  { marginLeft: "4px", marginRight: "18px" },
                ]}
              >
                {props.route.params.movie.vote_average}
              </Text>
              <Ionicons name="ios-calendar" size={15} color="#F6C725" />
              <Text style={[styles.movieLabel, { marginLeft: "8px" }]}>
                {date_noDay}
              </Text>
            </View>
            <Text style={styles.movieText}>
              {props.route.params.movie.overview}
            </Text>
            <Pressable
              style={[
                styles.button,
                { backgroundColor: isFav ? "#F14B60" : "#F6C725" },
              ]}
              onPress={() => {
                setIsFav(!isFav);
                isFav ? removeFav(props.route.params.movie.id) : addToFav();
              }}
            >
              <Text style={styles.textButton}>{buttonText}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  movieContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: "22px",
  },
  coverImage: {
    width: "262px",
    height: "393px",
    marginRight: "50px",
  },
  movieTitle: {
    maxWidth: "450px",
    fontFamily: "Roboto_700Bold",
    fontSize: 36,
    lineHeight: 42,
    color: "#000000",
  },
  movieText: {
    maxWidth: "508px",
    marginTop: "15px",
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    lineHeight: 26,
    textAlign: "left",
    color: "#646464",
  },
  movieLabel: {
    fontFamily: "Roboto_700Bold",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "left",
    color: "#B2B2B2",
  },
  button: {
    width: "fit-content",
    height: "49px",
    borderRadius: 30,
    marginTop: "36px",
  },
  textButton: {
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    lineHeight: 23,
    textAlign: "center",
    color: "white",
    marginTop: "14px",
    paddingHorizontal: "33px",
  },
});
