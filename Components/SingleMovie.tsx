import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MovieProps } from "@types";
import { LinearGradient } from "expo-linear-gradient";

export default function SingleMovie(props: MovieProps) {
  const prefix: string = "https://image.tmdb.org/t/p/w500";
  const image: object = { uri: prefix + props.movie.poster_path };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={styles.movieContainer}
      /* onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)} */
      onPress={() => {
        props.onClicked(props.movie);
      }}
    >
      <Image source={image} style={styles.coverImage} />
      {isHovered && (
        <LinearGradient
          colors={["#00000059", "#000000bd"]}
          style={styles.hoverView}
        >
          <View style={styles.labelIcon}>
            <Ionicons name="ios-star" size={15} color="#F6C725" />
            <Text style={styles.label}>{props.movie.vote_average}</Text>
          </View>
          <Text style={styles.label}>
            {props.movie.release_date.split("-")[0]}
          </Text>
        </LinearGradient>
      )}
      <Text style={styles.movieText}>{props.movie.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    width: 180,
    height: 320,
    flexDirection: "column",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  coverImage: {
    width: 180,
    height: 270,
    borderRadius: 10,
    resizeMode: "cover",
  },
  labelIcon: { flexDirection: "row", gap: 4 },
  label: {
    color: "white",
    fontFamily: "Roboto_700Bold",
    fontSize: 16,
    lineHeight: 19,
  },
  movieText: {
    maxWidth: 180,
    height: 50,
    marginTop: 10,
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#000000",
  },
  hoverView: {
    position: "absolute",
    height: 270,
    width: "100%",
    padding: 9,
    marginBottom: 50,
    borderRadius: 10,
    flexDirection: "row",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignContent: "flex-end",
    alignItems: "flex-end",
  },
});
