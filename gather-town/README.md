# 🗺️ Step-1: Initial Map Load (Phaser + React + Vite)
Branch
`
Initial-map-Load`

Goal of this Step

`The goal of this branch is to successfully load and render a Tiled map inside a Phaser game, embedded within a React + Vite application, using a clean and scalable folder structure.`

This step focuses only on map loading — no player, no movement, no UI logic yet.

✅ What Is Working in This Branch

React + Vite app setup

Phaser game integrated into React

Tiled map (g-1.json) loads correctly

All tilesets are correctly bound

Multiple layers render in correct order

Wall layer has collision enabled

Game is accessible through a route (/game)



# 🧱 Project Structure (Important)
`src/
│
├─ apps/                     # React application layer
│  ├─ pages/
│  │  ├─ Home.jsx            # Entry page
│  │  └─ GamePage.jsx        # Page that mounts the game
│  ├─ router.jsx             # App routes
│  └─ App.jsx                # Router provider
│
├─ game/                     # Phaser game module (isolated)
│  ├─ Game.tsx               # React ↔ Phaser bridge
│  ├─ config/
│  │  └─ phaserConfig.ts     # Phaser engine configuration
│  └─ scenes/
│     └─ MainScene.ts        # Map loading & layer setup
│
└─ main.jsx                  # Vite entry

📁 Public Assets
public/
│
├─ maps/
│  └─ g-1.json               # Tiled map file
│
└─ tiles/
   └─ *.png                  # Individual tileset images

`

# All assets are served from public/ so Phaser can load them using absolute paths.

# 🎮  How the Game Loads (Flow)

User opens /

Clicks Enter Office

Route navigates to /game

GamePage.jsx mounts <Game />

Game.tsx creates a Phaser instance

Phaser starts MainScene

MainScene.preload() loads:

Tiled map JSON

All tileset images

MainScene.create():

Creates tilemap

Auto-binds tilesets

Creates layers in order

Enables wall collisions

# 🧠 Key Design Decisions
✔ Separation of Concerns

React handles routing & layout

Phaser handles game logic

Scenes contain gameplay logic only

Config contains engine setup only

✔ Scalable Architecture

This structure supports:

Multiple maps

Multiple scenes

Multiplayer logic later

UI overlays later

# 🚫 What Is Intentionally NOT Included

Player sprite

Movement

Camera follow

Interactions

UI / HUD

These will be added in later branches.

# 🔖 Commit Message
(Step-1) Initial Map Load Process

➡️ Next Step (Next Branch)

Step-2: Player spawn & collision
Branch idea:

Step-2-Player-Spawn