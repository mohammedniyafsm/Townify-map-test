import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import GamePage from "./pages/GamePage";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/game", element: <GamePage /> }
]);
