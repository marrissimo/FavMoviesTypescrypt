import { createContext, useState } from "react";
import Movie from "./MovieInterface";

export const FavContext = createContext<any>([]);

export const FavProvider = ({ children }: any) => {
  const [favMovie, setFavMovie] = useState<Movie[] | []>([]);

  return (
    <FavContext.Provider value={{ favMovie, setFavMovie }}>
      {children}
    </FavContext.Provider>
  );
};
