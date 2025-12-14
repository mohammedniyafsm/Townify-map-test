import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ padding: 40 ,display:"flex",flexFlow:"column"}}>
      <h1>Office App</h1>
      <Link to="/create">Create Office</Link>
      <Link to="/join">Join Office</Link>
      <Link to="/game">Enter Office</Link>
    </div>
  );
}
