import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import { FavContext } from "@components/FavContext";
import NavBar from "@components/NavBar";
import { SingleMovieProps } from "@types";
import { MovieInterface } from "@types";

import { Dimensions } from "react-native";
const fullwidth = Dimensions.get("window").width;
export const isWeb: boolean = Platform.OS === "web";

export default function MovieDetail(props: SingleMovieProps) {
  const prefix: string = "https://image.tmdb.org/t/p/w500";
  const image: object = isWeb
    ? { uri: prefix + props.route.params.movie.poster_path }
    : { uri: prefix + props.route.params.movie.backdrop_path };
  const date: string[] = new Date(props.route.params.movie.release_date)
    .toDateString()
    .split(" ");
  const date_noDay: string = date[2] + " " + date[1] + " " + date[3];
  const { favMovie, setFavMovie }: any = useContext(FavContext);
  const [isFav, setIsFav] = useState(
    favMovie.includes(props.route.params.movie)
  );

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            setIsFav(!isFav);
            isFav ? removeFav(props.route.params.movie.id) : addToFav();
          }}
        >
          <Ionicons
            name={isFav ? "ios-heart" : "ios-heart-outline"}
            size={25}
            color={isFav ? "#E10D01" : "#007AFF"}
          />
        </Pressable>
      ),
    });
  }, [isFav]);

  const isItemInList = () => {
    return AsyncStorage.getItem("favMovie").then((data) => {
      if (data) {
        const parsedData = JSON.parse(data);
        const bool: boolean = parsedData.some(
          (item: any) => item.id === props.route.params.movie.id
        );
        setIsFav(bool);
        return bool;
      }
      return false;
    });
  };
  isItemInList();

  const buttonText: string = isFav
    ? "Rimuovi dai preferiti"
    : "Aggiungi ai preferiti";

  const addToFav = (): void => {
    favMovie.push(props.route.params.movie);
    setFavMovie(favMovie);
    AsyncStorage.setItem("favMovie", JSON.stringify(favMovie));
  };

  const removeFav = (movIdtodelete: number): void => {
    const newFavList: MovieInterface[] = favMovie.filter(
      (movie: MovieInterface) => {
        return movie.id !== movIdtodelete;
      }
    );
    setFavMovie(newFavList);
    AsyncStorage.setItem("favMovie", JSON.stringify(newFavList));
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={props.navigation} />
      <ScrollView contentContainerStyle={styles.movieContainer}>
        <ImageBackground style={styles.coverImage} source={image}>
          {!isWeb && (
            <Text style={styles.movieTitle}>
              {props.route.params.movie.title}
            </Text>
          )}
        </ImageBackground>
        <View>
          {isWeb && (
            <Text style={styles.movieTitle}>
              {props.route.params.movie.title}
            </Text>
          )}
          <View>
            {isWeb && (
              <View style={styles.labelContainer}>
                <Ionicons name="ios-star" size={15} color="#F6C725" />
                <Text
                  style={[
                    styles.movieLabel,
                    { marginLeft: 4, marginRight: 18 },
                  ]}
                >
                  {props.route.params.movie.vote_average}
                </Text>
                <Ionicons name="ios-calendar" size={15} color="#F6C725" />
                <Text style={[styles.movieLabel, { marginLeft: 8 }]}>
                  {date_noDay}
                </Text>
              </View>
            )}
            <Text style={styles.movieText}>
              {props.route.params.movie.overview}
            </Text>
            {isWeb && (
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
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  movieContainer: {
    flexDirection: isWeb ? "row" : "column",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  labelContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    marginTop: 22,
  },
  coverImage: {
    width: isWeb ? 262 : fullwidth,
    height: isWeb ? 393 : 285,
    marginRight: isWeb ? 50 : 0,
  },
  movieTitle: {
    maxWidth: isWeb ? 450 : fullwidth,
    marginTop: isWeb ? 0 : 196,
    paddingLeft: isWeb ? 0 : 25,
    paddingRight: isWeb ? 0 : 62,
    fontFamily: isWeb ? "Roboto_700Bold" : "Roboto_400Regular",
    fontSize: isWeb ? 36 : 28,
    lineHeight: isWeb ? 42 : 32,
    color: isWeb ? "#000000" : "white",
  },
  movieText: {
    maxWidth: isWeb ? 508 : fullwidth,
    marginTop: isWeb ? 15 : 25,
    paddingHorizontal: isWeb ? 0 : 25,
    fontFamily: "Roboto_400Regular",
    fontSize: isWeb ? 18 : 20,
    lineHeight: isWeb ? 26 : 28,
    textAlign: "left",
    color: isWeb ? "#646464" : "#333",
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
    height: 49,
    borderRadius: 30,
    marginTop: 36,
  },
  textButton: {
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    lineHeight: 23,
    textAlign: "center",
    color: "white",
    marginTop: 14,
    paddingHorizontal: 33,
  },
});
