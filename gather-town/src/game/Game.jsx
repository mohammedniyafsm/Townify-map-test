import { useEffect, useRef } from "react";
import Phaser from "phaser";
import config from "./config/phaserConfig";
import MainScene from "./scenes/MainScene";

export default function Game({ userId, roomId }) {
  const gameRef = useRef(null);

  useEffect(() => {
    gameRef.current = new Phaser.Game({
      ...config,
      scene: new MainScene(userId, roomId)
    });

    return () => gameRef.current.destroy(true);
  }, []);

  return <div id="game-container" />;
}
