# Food Ex — React + Firebase menu app

A lightweight, modern restaurant menu app built with React, Firebase and MUI.  
Designed for quick local development, easy data seeding and simple admin tools.

## Key tech
- React 18 (CRA) — app shell and routing ([src/App.js](src/App.js))
- Firebase — Auth, Firestore, Storage ([src/firebase/firebaseConfig.js](src/firebase/firebaseConfig.js))
- Material UI — layout & components
- SweetAlert2 — friendly alerts
- Local JSON seeds: [src/components/mealsData.json](src/components/mealsData.json), [src/components/rating.json](src/components/rating.json)
## project preview by https://food-ex-website-by-react-d5uc.vercel.app/
## Quick start
1. Install deps
   ```sh
   npm install
   ```
2. Add Firebase keys to `.env.local` (ignored, see [.gitignore](.gitignore))
3. Run locally
   ```sh
   npm start
   ```

## Useful scripts
- npm start — development server
- npm run build — production build
- npm test — run tests

(Defined in [package.json](package.json))

## Project structure — important files & symbols
- Entry & routing
  - [src/index.js](src/index.js)
  - [src/App.js](src/App.js)
- Contexts / state
  - [`MyContextProvider`](src/components/MainDataContext.js) — main app state & Firebase reads/writes
  - [`DataContextProvider`](src/firebase/dataBaseContext.js) — placeholder provider
- Firebase
  - [src/firebase/firebaseConfig.js](src/firebase/firebaseConfig.js)
- Main screens & components
  - [src/components/foodWebsite.js](src/components/foodWebsite.js)
  - [src/components/appBarComponent.js](src/components/appBarComponent.js)
  - [src/components/Dishes.js](src/components/Dishes.js)
  - [src/components/MealDesc.js](src/components/MealDesc.js)
  - [src/components/login.js](src/components/login.js) — sign-in using `firebase/auth`
  - [src/components/register.js](src/components/register.js) — sign-up and Firestore user doc
  - [src/Dashbord/adminDashbord.js](src/Dashbord/adminDashbord.js) — admin upload / delete tools
- Data seeds & sample tests
  - [src/components/mealsData.json](src/components/mealsData.json)
  - [src/components/rating.json](src/components/rating.json)
  - [src/App.test.js](src/App.test.js)

## Admin & data workflow
- Use `AdminDashbord` ([src/Dashbord/adminDashbord.js](src/Dashbord/adminDashbord.js)) to bulk upload local seed [src/components/mealsData.json](src/components/mealsData.json) into Firestore.
- User favorites and activity are stored on each user doc (see [`MyContextProvider`](src/components/MainDataContext.js) and [src/components/Dishes.js](src/components/Dishes.js)).

## Notes & tips
- Environment keys must be set in `.env.local`:
  - REACT_APP_FODEX_FIREBASE_KEY, REACT_APP_FODEX_FIREBASE_AUTH_DOMAIN, etc (used in [src/firebase/firebaseConfig.js](src/firebase/firebaseConfig.js)).
- Local storage is used for reviews and menu caching — clears on new installs.
- For production: secure Firebase rules, remove seed upload UI or protect it (admin-only).

## Contacts / contribution
...