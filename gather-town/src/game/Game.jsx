import { useEffect, useRef } from "react";
import Phaser from "phaser";
import config from "./config/phaserConfig";

export default function Game() {
  const gameRef = useRef(null);

  useEffect(() => {
    if (gameRef.current) return;

    gameRef.current = new Phaser.Game(config);

    return () => {
      gameRef.current.destroy(true);
      gameRef.current = null;
    };
  }, []);

  return <div id="game-container" />;
}
