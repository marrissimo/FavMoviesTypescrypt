import {
  StyleSheet,
  Text,
  View,
  Pressable,
  FlatList,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import SingleMovie from "@components/SingleMovie";
import NavBar from "@components/NavBar";
import axios from "axios";
import { MovieInterface } from "@types";
import { Dimensions } from "react-native";

const fullwidth = Dimensions.get("window").width;
export const isWeb: boolean = Platform.OS === "web";

export default function Movies({ navigation }: any) {
  const [data, setData] = useState<MovieInterface[]>([]);
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          onPress={() => {
            navigation.navigate("Favorites");
          }}
        >
          <Text style={{ color: "#007AFF", fontSize: 17, lineHeight: 19 }}>
            Favorites
          </Text>
        </Pressable>
      ),
    });
  }, [navigation]);

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

  const movieClicked = (movie: MovieInterface) => {
    navigation.navigate("Details", { movie });
  };

  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />

      <FlatList
        contentContainerStyle={[
          styles.moviesContainer,
          isWeb && { flexWrap: "wrap" },
        ]}
        data={data}
        renderItem={({ item }) => (
          <SingleMovie movie={item} onClicked={movieClicked} />
        )}
        keyExtractor={(item) => String(item.id)}
        onEndReachedThreshold={0.01}
        onEndReached={() => {
          if (!isWeb) loadMore();
        }}
      />
      {isWeb && (
        <Pressable style={styles.button} onPress={loadMore}>
          <Text style={styles.textButton}>Load More</Text>
        </Pressable>
      )}
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
  },
  moviesContainer: {
    width: isWeb ? "100%" : fullwidth,
    flexDirection: isWeb ? "row" : "column",
    numColumns: isWeb ? 4 : 1,
    alignItems: "center",
    justifyContent: "space-between",
    rowGap: 0,
    columnGap: 27,
    overflow: "hidden",
  },

  button: {
    width: 155,
    height: 46,
    backgroundColor: "#F9F9F9",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 60,
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
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
