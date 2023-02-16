import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Platform,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { MovieProps } from "@types";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
const fullwidth = Dimensions.get("window").width;
export const isWeb: boolean = Platform.OS === "web";

export default function SingleMovie(props: MovieProps) {
  const prefix: string = "https://image.tmdb.org/t/p/w500";
  const image: object = { uri: prefix + props.movie.poster_path };
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      style={styles.movieContainer}
      onHoverIn={() => {
        if (isWeb) setIsHovered(true);
      }}
      onHoverOut={() => {
        if (isWeb) setIsHovered(false);
      }}
      onPress={() => {
        props.onClicked(props.movie);
      }}
    >
      <View style={{ flexDirection: "row" }}>
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
        <View style={styles.textLabel}>
          <Text style={styles.movieText}>{props.movie.title}</Text>
          {!isWeb && (
            <View style={styles.labelRow}>
              <View style={styles.labelIcon}>
                <Ionicons name="calendar" size={12} color="#D9D9D9" />
                <Text style={[styles.label, { marginRight: 5 }]}>
                  {props.movie.release_date.split("-")[0]}
                </Text>
              </View>
              <View style={styles.labelIcon}>
                <Ionicons name="ios-star" size={12} color="#F6C725" />
                <Text style={styles.label}>{props.movie.vote_average}</Text>
              </View>
            </View>
          )}
        </View>
      </View>
      {!isWeb && <Ionicons name="arrow-forward" size={12} color="#d9d9d9" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  movieContainer: {
    width: isWeb ? 180 : fullwidth,
    height: isWeb ? 320 : 112,
    marginTop: isWeb ? 20 : 0,
    padding: isWeb ? 0 : 20,
    backgroundColor: "#ffffff",
    flexDirection: isWeb ? "column" : "row",
    alignItems: "center",
    justifyContent: isWeb ? "center" : "space-between",
    borderBottomWidth: isWeb ? 0 : 1,
    borderColor: "#D7D7D7",
  },
  coverImage: {
    width: isWeb ? 180 : 72,
    height: isWeb ? 270 : 72,
    borderRadius: isWeb ? 10 : 4,
    resizeMode: "cover",
    marginRight: isWeb ? 0 : 15,
  },
  textLabel: {
    flexDirection: "column",
    marginRight: 41,
    justifyContent: "center",
  },
  labelRow: { flexDirection: "row", gap: 5 },
  labelIcon: { flexDirection: "row", gap: 4 },
  label: {
    color: isWeb ? "white" : "#919191",
    fontFamily: "Roboto_700Bold",
    fontSize: isWeb ? 16 : 14,
    lineHeight: isWeb ? 19 : 16,
  },
  movieText: {
    maxWidth: 180,
    height: isWeb ? 50 : 44,
    marginTop: isWeb ? 10 : 0,
    fontFamily: isWeb ? "Roboto_400Regular" : "Roboto_500Medium",
    fontSize: isWeb ? 16 : 21,
    lineHeight: isWeb ? 19 : 22,
    textAlign: isWeb ? "center" : "left",
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
