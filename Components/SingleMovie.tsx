import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface MovieProps {
  movie: any;
  onClicked: (movie: any) => void;
}
export default function SingleMovie(props: MovieProps) {
  const prefix = "https://image.tmdb.org/t/p/w500";
  const image = { uri: prefix + props.movie.poster_path };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={styles.movieContainer}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      onPress={() => {
        props.onClicked(props.movie);
      }}
    >
      <Image source={image} style={styles.coverImage} />
      {isHovered && (
        <View style={styles.hoverView}>
          <View style={styles.labelIcon}>
            <Ionicons name="ios-star" size={15} color="#F6C725" />
            <Text style={styles.label}>{props.movie.vote_average}</Text>
          </View>
          <Text style={styles.label}>
            {props.movie.release_date.split("-")[0]}
          </Text>
        </View>
      )}
      <Text style={styles.movieText}>{props.movie.title}</Text>
    </Pressable>
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
    resizeMode: "cover",
  },
  labelIcon: { display: "flex", flexDirection: "row", gap: "4px" },
  label: {
    color: "white",
    fontFamily: "Roboto_700Bold",
    fontSize: 16,
    lineHeight: 19,
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
  hoverView: {
    position: "absolute",
    height: "270px",
    width: "100%",
    padding: 9,
    marginBottom: "50px",
    backgroundColor:
      "linear-gradient(180deg, rgba(0, 0, 0, 0.348166) 0%, rgba(0, 0, 0, 0.741225) 100%),",
    borderRadius: 10,
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
});
