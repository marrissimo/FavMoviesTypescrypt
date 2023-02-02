import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, Pressable } from "react-native";
import { useState, useEffect } from "react";
import SingleMovie from "./SingleMovie";
import NavBar from "./NavBar";
import axios from "axios";

interface MovieResults {
  movieList: string[];
}

export default function Movies({ navigation }: any) {
  const [data, setData] = useState<any[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=1"
        );
        setData(response.data.results);
      } catch (error) {
        console.log(error);
      }
    };
    loadMovies();

    //console.log("API_CALL_GENERALE", data);
  }, []);
  const loadMore = async () => {
    const pageNew: number = page + 1;
    setPage(pageNew);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=" +
          pageNew
      );
      setData([...data, ...response.data.results]);
    } catch (error) {
      console.log(error);
    }
  };

  const movieClicked = (movie: any) => {
    navigation.navigate("Details", { movie });
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />

      <View style={styles.moviesContainer}>
        {data.map((movie, key) => (
          <SingleMovie key={key} movie={movie} onClicked={movieClicked} />
        ))}
      </View>
      <Pressable style={styles.button} onPress={loadMore}>
        <Text style={styles.textButton}>Load More</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: "240px",
    paddingVertical: "0px",
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: "58px",
    marginBottom: "53px",
  },
  textButton: {
    maxWidth: "180px",
    height: "50px",
    marginTop: "10px",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#000000",
  },
});