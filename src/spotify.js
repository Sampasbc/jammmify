// const clientId = "9db45e5eeb2a48ccaa82c44bb7dfe32f";
const code = undefined;

if (code) {
  // const accessToken = await getAccessToken(clientId, code);
  // const profile = await fetchProfile(accessToken);
}

const redirectToAuthCodeFlow = async (clientId) => {
  // Redirects user to authentication page

  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);

  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", "http://localhost:3000");
  params.append("scope", "user-read-private user-read-email");
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

  window.open(authUrl, "Spotify Authentication", "width=600,height=800");
};

// const getAccessToken = async (clientId, code) => {
//   // Get access code from user code
// };

// const fetchProfile = async (token) => {
//   // Call API and fetch profile data
// };

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

export { generateCodeVerifier, generateCodeChallenge, redirectToAuthCodeFlow };
