import { createServer } from "http";
import { json } from "stream/consumers";
import { WebSocketServer, WebSocket } from "ws";

interface PlayerState {
  userId: string;
  x: number;
  y: number;
}

interface RoomI {
  id: string;
  password: string;
  sockets: Map<string, WebSocket>;
  players: Map<string, PlayerState>;
}

interface WSWithUser extends WebSocket {
  userId?: string;
}

const rooms = new Map<string, RoomI>();

const server = createServer();
server.listen(3000, "0.0.0.0", () => {
  console.log("✅ Server running on port 3000");
});

const wss = new WebSocketServer({ server });

wss.on("connection", (ws: WSWithUser) => {
  const userId = Math.random().toString(36).slice(2, 9);
  console.log("User connected:", userId);
  ws.userId = userId;

  ws.send(JSON.stringify({
    type: "connected",
    payload: { userId }
  }));

  ws.on("message", (msg) => {
    const { type, payload } = JSON.parse(msg.toString());

    // CREATE ROOM
    if (type === "create") {
      rooms.set(payload.id, {
        id: payload.id,
        password: payload.password,
        sockets: new Map([[userId, ws]]),
        players: new Map([[userId, { userId, x: 400, y: 300 }]])
      });

      ws.send(JSON.stringify({
        type: "room_created",
        payload: { roomId: payload.id, userId }
      }));
    }

    // JOIN ROOM
    if (type === "join") {
      const room = rooms.get(payload.id);
      if (!room || room.password !== payload.password) return;

      room.sockets.set(userId, ws);
      room.players.set(userId, { userId, x: 400, y: 300 });

      ws.send(JSON.stringify({
        type: "joined_room",
        payload: { roomId: room.id, userId, players: Array.from(room.players.values()) }
      }));

      // room.sockets.forEach(s =>
      //   s.send(JSON.stringify({
      //     type: "player_joined",
      //     payload: { userId }
      //   }))
      // );
    }

    // PLAYER POSITION
    if (type === "pos") {
      const room = rooms.get(payload.id);
      if (!room) return;

      room.players.set(payload.userId, payload);

      room.sockets.forEach(s =>
        s.send(JSON.stringify({
          type: "player_pos",
          payload
        }))
      );
    }

    
  });

  ws.on("close", () => {
    let leftRoomId: string | null = null;

    // find room & remove user
    rooms.forEach((room, roomId) => {
      if (room.sockets.has(userId)) {
        room.sockets.delete(userId);
        room.players.delete(userId);
        leftRoomId = roomId;

        // 🔥 notify remaining players
        room.sockets.forEach(s =>
          s.send(JSON.stringify({
            type: "player_left",
            payload: { userId }
          }))
        );
      }
    });

    // optional: delete empty room
    if (leftRoomId) {
      const room = rooms.get(leftRoomId);
      if (room && room.sockets.size === 0) {
        rooms.delete(leftRoomId);
      }
    }

    console.log("User disconnected:", ws.userId);
  });


});
