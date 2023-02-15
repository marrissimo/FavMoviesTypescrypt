export interface NavBarProps {
  navigation: any;
}

export interface MovieInterface {
  id: number;
  poster_path: string;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export interface MovieProps {
  movie: MovieInterface;
  onClicked: (movie: MovieInterface) => void;
}

export interface SingleMovieProps {
  route: any;
  navigation: any;
}

export interface FavProps {
  navigation: any;
  route: any;
}
