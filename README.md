# Bodega Cat

A community (of real humans) to find cats and create NFTs of them! Share your local friendly (optional) bodega cat with your community 🐱

## Inspiration

My sister and I love visiting the neighborhood cats and bodegas are generally a consistent place to find them. We thought others would feel similar for their neighborhood furry friends :)

## What it does

This project combines decentralized storage both for NFT metadata and images. NFTs are minted both on Rinkeby and testnet Near! Anyone can submit their cat photos and explore what others are up to. All the data is stored in Tableland, so it's very easy to do any relational queries.

## How it's built

Frontend: ReactJS / Chakra UI
Backend: ExpressJS

### Mintbase
1. NFT creations
1. Buy/sell

### Tableland
1. Relational store for metadata, image resources, etc

### WorldID
1. Validates a real human is minting (can also make it unique per cat)

## Challenges I ran into
I should've done the NodeJS backend earlier so some of the stuff that should be in the backend is sort of hacked into the frontend instead.

Google Maps pricing plans made it pain to try to use them, but I feel OSM probably better anyway.

## Accomplishments that we're proud of
The thing is live, it mints, it lists out stuff, the map shows markers. My core goals were done.

## What we learned

Don't use NodeJS libraries in the frontend that uses webpack 5 (a lot of time wasted on this).

## What's next for Bodega Cat
Cats, many of them, near you and searchable through the app ;)