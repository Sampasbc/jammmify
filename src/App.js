import "./css/App.css";
import SearchBar from "./components/SearchBar";
import Header from "./components/Header";
import PlaylistContainer from "./components/PlaylistContainer";
import PlaylistItem from "./components/PlaylistItem";

export const PLAYLISTS = [
  {
    name: "Playlist",
    author: "John Doe",
    imgSrc:
      "https://i0.wp.com/olumuse.org/wp-content/uploads/2020/09/unnamed.jpg?fit=512%2C512&ssl=1",
    songs: [
      {
        name: "Music",
        artist: "John Smith",
        album: "Music album",
        duration: 2000,
      },
    ],
  },
];

function App() {
  return (
    <div className="App">
      <Header>
        <SearchBar />
      </Header>
      <PlaylistContainer />
    </div>
  );
}

export default App;
