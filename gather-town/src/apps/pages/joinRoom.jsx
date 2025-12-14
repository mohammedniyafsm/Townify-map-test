import React, { useEffect, useState } from 'react'
import { socket } from '../socket'
import { useNavigate } from 'react-router-dom';

function JoinRoom() {

  const [userId, setUserid] = useState();
  const [id, setId] = useState();
  const [password, setpassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type == "connected") {
        setUserid(data.payload.userId);
        setId(data.payload.id);
      }

      if (data.type == "joined_room") {
        setTimeout(() => {
          navigate('/game',
            {
              state: {
                roomId: data.payload.roomId,
                userId: data.payload.userId
              }
            }
          )
        }, 2000)
      }
    }

  }, [])

  const handleSubmit = () => {
    socket.send(JSON.stringify({
      type: "join",
      payload: {
        id: id,
        password: password,
        userId: userId
      }
    }))

  }


  return (
    <div>
      <h1>Join Room</h1>
      <input type="text" onChange={((e) => setId(e.target.value))} />
      <input type="text" onChange={((e) => setpassword(e.target.value))} />
      {userId && <h1>{userId}</h1>}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  )
}

export default JoinRoom
