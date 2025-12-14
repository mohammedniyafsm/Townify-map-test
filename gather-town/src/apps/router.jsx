import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";
import CreateRoom from "./pages/CreateRoom";
import JoinRoom from "./pages/joinRoom";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/create", element: <CreateRoom /> },
  { path: "/join", element: <JoinRoom /> },
  { path: "/game", element: <GamePage /> }
]);
