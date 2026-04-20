# GeoMapping Studio

## Tech stack

`React` / `TS` / `Vite` / `Material UI` / `Deck.gl` / `MapLibre GL` / `Jest` / `React Testing Library`

## How to run project locally

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Run tests

```bash
npm test
```

## Import GeoJSON examples

Example URLs:

- `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson`
- `https://opendata.arcgis.com/api/v3/datasets/b5f660b9f0f44ced915995b6d49f6385_0/downloads/data?format=geojson&spatialRefId=4326&where=1%3D1`
- `https://api.weather.gov/alerts/active`

## Architecture decisions

The project uses a lightweight feature-based structure:

- `app` for setup
- `entities` for shared domain models
- `features` for user-facing modules
- `pages` for screen-level composition

Imported data and drawn data are stored separately, the search marker is treated as temporary UI state rather than part of the dataset.

State is managed with React state and custom hooks. I intentionally did not introduce a heavier global state manager, because the app is centered around a single main workflow and local state was sufficient.

I chose MapLibre with an OpenStreetMap-based basemap and Nominatim for geocoding, because both are open and easy to integrate.
