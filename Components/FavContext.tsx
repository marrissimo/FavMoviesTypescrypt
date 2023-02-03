import { createContext, useState } from "react";

export const FavContext = createContext<any>([]);

export const FavProvider = ({ children }: any) => {
  const [favMovie, setFavMovie] = useState([]);

  return (
    <FavContext.Provider value={{ favMovie, setFavMovie }}>
      {children}
    </FavContext.Provider>
  );
};
