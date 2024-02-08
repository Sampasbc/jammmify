 ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?logo=javascript&logoColor=black) ![React](https://img.shields.io/badge/-React-blue?logo=react&logoColor=white) ![Spotify API](https://img.shields.io/badge/-Spotify%20API-1ED760?logo=spotify&logoColor=white) ![OAuth 2.0](https://img.shields.io/badge/-OAuth%202.0-2CA5E0?logo=oauth&logoColor=white)

Jammmify 🎵
===========

Jammmify is an interactive web application built with React that allows users to explore and interact with Spotify's vast music library. With Jammmify, users can search for their favorite songs, play song previews, manage playlists, and much more, all within a sleek and user-friendly interface.  Leveraging the Spotify API, users can discover and curate their favourite tracks seamlessly. Through OAuth authentication, users can securely login with their Spotify credentials, providing a personalized music experience tailored to their tastes.

Features
--------

-   Search Songs: Easily search for songs by title, artist, or album using the Spotify API.
-   Song Details: View detailed information about each song, including album artwork, artist name, and duration.
-   Preview Songs: Listen to a short preview of each song directly within the app.
-   User Authentication: Log in to your Spotify account to access additional features, such as adding songs to playlists.
-   Playlist Management: Create, view, and manage your playlists. Add or remove songs, reorder tracks, and more.
-   Open Playlists on Spotify: Quickly open your playlists in the Spotify app for seamless listening.
-   Responsive Design: Enjoy a smooth and consistent experience across devices of all sizes.

Getting Started
---------------

To get started with Jammmify, follow these simple steps:

1.  Clone the Repository: Clone the Jammmify repository to your local machine using the following command:

    ```console
    git clone https://github.com/your-username/jammmify.git
    ```
2.  Install Dependencies: Navigate to the project directory and install the required dependencies using npm or yarn:

    ```console
    cd jammmify
    npm install
    ```
    or
    ```console
    yarn install
    ```
3.  Set Up Spotify API: Obtain your Spotify API credentials and set them up in the project. You can follow the instructions here to create a Spotify Developer account and obtain your client ID and client secret.

4.  Configure Environment Variables:

    ```javascript
    // On spotify.js change URI to you own server
    REDIRECT_URI = "http://localhost:3000"
    ```
5.  Run the Application: Start the development server to run Jammmify locally:

    ```console
    npm start
    ```
    or

    ```console
    yarn start
    ```
6.  Explore Jammmify: Open your browser and navigate to `http://localhost:3000` (or your own server) to explore Jammmify. Enjoy searching for songs, managing playlists, and jamming out to your favorite tunes!

Technologies Used
-----------------

-   React
-   Spotify API
-   OAuth Authentication
-   HTML5
-   CSS3
-   JavaScript

Contributing
------------

Contributions to Jammmify are welcome! If you encounter any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.

License
-------

This project is licensed under the MIT License. See the LICENSE file for details.
