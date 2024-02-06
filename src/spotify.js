// const clientId = "9db45e5eeb2a48ccaa82c44bb7dfe32f";
let AUTHCODE = null;

// REDIRECTS USER TO AUTHENTICATION PAGE
const redirectToAuthCodeFlow = async (clientId, setIsLoggedIn) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  // params.append("redirect_uri", "http://localhost:3000");
  params.append("redirect_uri", "https://nando-jammmify.netlify.app");
  params.append(
    "scope",
    "user-read-private user-read-email playlist-read-private playlist-modify-private playlist-modify-public"
  );
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;
  const authWindow = window.open(
    authUrl,
    "Spotify Authentication",
    "width=600,height=800"
  );

  const interval = setInterval(() => {
    try {
      const params = new URLSearchParams(authWindow.location.search);
      const code = params.get("code");
      if (code) {
        console.log(code);
        setAuthCode(code);
        getAccessToken(clientId, setIsLoggedIn);
        clearInterval(interval);
        authWindow.close();
      }
    } catch (e) {
      console.log(e);
    }
  }, 2000);
};

// GET ACCESS TOKEN FROM USER AUTHCODE
const getAccessToken = async (clientId, setIsLoggedIn) => {
  const verifier = localStorage.getItem("verifier");
  // const authCode = localStorage.getItem("auth_code");
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", AUTHCODE);
  // params.append("redirect_uri", "http://localhost:3000");
  params.append("redirect_uri", "https://nando-jammmify.netlify.app");
  params.append("code_verifier", verifier);

  try {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    console.log("before try");
    if (result.status === 200) {
      console.log("after try");
      const { access_token } = await result.json();
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("is_logged_in", true);
      setIsLoggedIn(true);
      // window.location.reload();
      return access_token;
    } else {
      throw new Error("Access Token Request Failed");
    }
  } catch (e) {
    console.log(e);
  }
};

// CALL API AND FETCH PROFILE DATA
const fetchProfile = async (token) => {
  try {
    const result = await fetch("https://api.spotify.com/v1/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (result.ok) {
      const data = await result.json();
      return data;
    } else {
      throw new Error("Fetch Profile Failed");
    }
  } catch (e) {
    console.log(e);
  }
};

const getUserProfile = async (token) => {
  const userProfile = await fetchProfile(token);
  // console.log(userProfile);
  return userProfile;
};

// CALL API AND FETCH USER PLAYLISTS
const fetchPlaylists = async (token) => {
  const userId = localStorage.getItem("profile_id");
  const url = "https://api.spotify.com/v1/users/";
  const endpoint = "/playlists";
  const limit = "?limit=50";
  const fullUrl = url + userId + endpoint + limit;
  try {
    const result = await fetch(fullUrl, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (result.ok) {
      const data = await result.json();
      return data["items"];
    }
  } catch (e) {
    console.log(e);
  }
};

const getUserPlaylists = async (token) => {
  const userPlaylists = await fetchPlaylists(token);
  return userPlaylists;
};

// ADD SONG TO A PLAYLIST
const addSongToPlaylist = async (
  token,
  playlistId,
  playlistName,
  trackId,
  trackName
) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const params = {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uris: ["spotify:track:" + trackId.toString()],
      // position: 0,
    }),
  };

  try {
    const result = await fetch(url, params);
    console.log(url);
    console.log(params);
    if (result.ok) {
      const data = await result.json();
      console.log(data);
      window.alert(
        `${trackName} has been added to the playlist "${playlistName}"`
      );
    } else {
      window.alert("Sorry, something went wrong. Please try again");
      throw new Error("Failed to add song to the playlist");
    }
  } catch (e) {
    console.log(e);
  }
};

// REMOVE SONG FROM PLAYLIST
const removeSongFromPlaylist = async (
  token,
  playlistId,
  playlistName,
  trackId,
  trackName
) => {
  const url = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  const params = {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tracks: [
        {
          uri: "spotify:track:" + trackId.toString(),
        },
      ],
    }),
  };

  try {
    const result = await fetch(url, params);
    if (result.ok) {
      const data = await result.json();
      console.log(data);
      console.log("song removed from playlist");
      window.alert(`${trackName} has been removed from "${playlistName}"`);
      window.location.reload();
    } else {
      window.alert("Sorry, something went wrong. Please try again later");
      throw new Error("Failed to remove song");
    }
  } catch (e) {
    console.log(e);
  }
};

// HELPER FUNCTIONS

const setAuthCode = (code) => {
  AUTHCODE = code;
};

const getAuthCode = () => {
  return AUTHCODE;
};

const generateCodeVerifier = (length) => {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

const generateCodeChallenge = async (codeVerifier) => {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "-")
    .replace(/=+$/, "");
};

export {
  generateCodeVerifier,
  generateCodeChallenge,
  redirectToAuthCodeFlow,
  getAccessToken,
  fetchProfile,
  getAuthCode,
  setAuthCode,
  getUserProfile,
  getUserPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
};
