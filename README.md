# Twitch-Stream-Layout
A web-based Twitch layout that incorporates information from Steam's API

Before using, you need to get a Steam API key <https://steamcommunity.com/login/home/?goto=%2Fdev%2Fapikey> and need to get your Steam ID (which can be easily found here: <http://www.steamid.co>) which can be plugged into the API calls in server.js.

To use 
`
  npm install
` 
`
  node server.js
`

It's set on a 30 second timer - so if nothing shows up despite being in a Steam game, wait and once it pings the external API again, it'll properly display information.
