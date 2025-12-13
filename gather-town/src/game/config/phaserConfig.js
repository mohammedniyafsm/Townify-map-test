import Phaser from "phaser";
import MainScene from "../scenes/MainScene";

const phaserConfig = {
  type: Phaser.AUTO,
  width: 1520,
  height: 620,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: { debug: true }
  },
  scene: [MainScene]
};

export default phaserConfig;
