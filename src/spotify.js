import SpotifyWebApi from "spotify-web-api-js";

const clientId = "9db45e5eeb2a48ccaa82c44bb7dfe32f";
const spotifyApi = new SpotifyWebApi({
  clientId: clientId,
});

export default spotifyApi;
