import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";


function CreateRoom() {

  const [id, setId] = useState();
  const [password, setpassword] = useState();
  const [userId, setUserId] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "connected") {
        setUserId(data.payload.userId);
      }

      if (data.type === "room_created") {
        navigate("/game", {
          state: {
            roomId: data.payload.roomId,
            userId: data.payload.userId
          }
        });
      }
    };
  }, []);

  const handleSubmit = () => {
    socket.send(JSON.stringify({
      type: "create",
      payload: {
        id,
        password
      }
    }));
  };


  return (
    <div style={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", placeItems: "center" }} >

      <h1>Create Room</h1>
      <input onChange={(e) => setId(e.target.value)} type="text" />
      <input onChange={(e) => setpassword(e.target.value)} type="text" />
      {userId && <h1>{userId}</h1>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default CreateRoom
