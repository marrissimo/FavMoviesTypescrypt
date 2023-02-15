import { createContext, useState, useEffect } from "react";
import { MovieInterface } from "@types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavContext = createContext<any>([]);

export const FavProvider = ({ children }: any) => {
  const [favMovie, setFavMovie] = useState<MovieInterface[] | []>([]);
  useEffect(() => {
    AsyncStorage.getItem("favMovie").then((data) => {
      if (data) {
        setFavMovie(JSON.parse(data));
      }
    });
  }, []);

  return (
    <FavContext.Provider value={{ favMovie, setFavMovie }}>
      {children}
    </FavContext.Provider>
  );
};
