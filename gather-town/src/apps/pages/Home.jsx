import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Office App</h1>
      <Link to="/game">Enter Office</Link>
    </div>
  );
}
