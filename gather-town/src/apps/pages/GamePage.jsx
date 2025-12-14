import { useLocation } from "react-router-dom";
import Game from "../../game/Game";

export default function GamePage() {
  const { state } = useLocation();
  const { userId, roomId } = state;

  return <Game userId={userId} roomId={roomId} />;
}
