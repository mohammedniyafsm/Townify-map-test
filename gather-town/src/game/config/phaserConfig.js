import Phaser from "phaser";
import MainScene from "../scenes/MainScene";

const phaserConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: { debug: true }
  },
  scene: [MainScene]
};

export default phaserConfig;
