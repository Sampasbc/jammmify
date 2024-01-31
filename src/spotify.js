const clientId = "9db45e5eeb2a48ccaa82c44bb7dfe32f";
let AUTHCODE = null;

// API Functions

const appInitialization = async () => {
  if (!getAuthCode()) return;

  const accessToken = await getAccessToken(clientId, getAuthCode());
  const profile = await fetchProfile(accessToken);
  return profile;
};

// Redirects user to authentication page
const redirectToAuthCodeFlow = async (clientId) => {
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:3000");
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
        clearInterval(interval);
        setAuthCode(code);
        // localStorage.setItem("auth_code", code);
        getAccessToken(clientId, code);
        authWindow.close();
      }
    } catch (e) {
      console.log(e);
    }
  }, 1000);
};

// Get access code from user code
const getAccessToken = async (clientId, code) => {
  const verifier = localStorage.getItem("verifier");
  // const authCode = localStorage.getItem("auth_code");
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", "http://localhost:3000");
  params.append("code_verifier", verifier);

  try {
    const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params,
    });
    if (result.status === 200) {
      const { access_token } = await result.json();
      localStorage.setItem("access_token", access_token);
      return access_token;
    } else {
      throw new Error("Access Token Request Failed");
    }
  } catch (e) {
    console.log(e);
  }
};

// Call API and fetch profile data
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
  } catch (e) {}
};

const getUserProfile = async (token) => {
  const userProfile = await fetchProfile(token);
  console.log(userProfile);
};

// Helper Functions

const setAuthCode = (code) => {
  AUTHCODE = code;
};

const getAuthCode = () => {
  return AUTHCODE;
};

const stateSetter = (setState, value) => {
  setState(value);
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
  appInitialization,
  stateSetter,
  getAuthCode,
  setAuthCode,
  getUserProfile,
};
