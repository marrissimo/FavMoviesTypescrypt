import { StyleSheet, Text, Image, TouchableOpacity } from "react-native";

interface MovieProps {
  movie: any;
  onClicked: (movie: any) => void;
}
export default function SingleMovie(props: MovieProps) {
  const prefix = "https://image.tmdb.org/t/p/w500";
  const image = { uri: prefix + props.movie.poster_path };
  return (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => {
        props.onClicked(props.movie);
      }}
    >
      <Image source={image} style={styles.coverImage} />
      <Text style={styles.movieText}>{props.movie.title}</Text>
    </TouchableOpacity>
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
  coverImage: {
    width: "180px",
    height: "270px",
    borderRadius: 10,
  },
  movieText: {
    maxWidth: "180px",
    height: "50px",
    marginTop: "10px",
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#000000",
  },
});
