import Phaser from "phaser";
import Player from "../objects/Player";
import { socket } from "../../apps/socket";

export default class MainScene extends Phaser.Scene {
  constructor(userId, roomId) {
    super("MainScene");
    this.userId = userId;
    this.roomId = roomId;
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/maps/g-1.json");

    // tilesets (same as yours)
    this.load.image("booth", "/tiles/booth.png");
    this.load.image("booth big black [5x5]", "/tiles/booth big black [5x5].png");
    this.load.image("botanical_garden", "/tiles/botanical_garden.png");
    this.load.image("cabinet_chippendale_thin_arch", "/tiles/cabinet_chippendale_thin_arch.png");
    this.load.image("chair_neonoir", "/tiles/chair_neonoir.png");
    this.load.image("chair_small (1)", "/tiles/chair_small (1).png");
    this.load.image("chair_space", "/tiles/chair_space.png");
    this.load.image("cushion", "/tiles/cushion.png");
    this.load.image("desk_cyberpunk (1)", "/tiles/desk_cyberpunk (1).png");
    this.load.image("desk_round", "/tiles/desk_round.png");
    this.load.image("dresser_1x2_drawers", "/tiles/dresser_1x2_drawers.png");
    this.load.image("flag_jolly_roger", "/tiles/flag_jolly_roger.png");
    this.load.image("floor-1", "/tiles/floor-1.png");
    this.load.image("Frame 1", "/tiles/Frame 1.png");
    this.load.image("Frame 31", "/tiles/Frame 31.png");
    this.load.image("free_overview", "/tiles/free_overview.png");
    this.load.image("g1", "/tiles/g1.png");
    this.load.image("g2", "/tiles/g2.png");
    this.load.image("ikea_shelf", "/tiles/ikea_shelf.png");
    this.load.image("lamp_floor", "/tiles/lamp_floor.png");
    this.load.image("life support", "/tiles/life support.png");
    this.load.image("m-bg", "/tiles/m-bg.png");
    this.load.image("more walls", "/tiles/more walls.png");
    this.load.image("office_filecabinets", "/tiles/office_filecabinets.png");
    this.load.image("officeplants[1x1]", "/tiles/officeplants[1x1].png");
    this.load.image("officeplants[2x1]", "/tiles/officeplants[2x1].png");
    this.load.image("plant_potted_skinny_terracotta", "/tiles/plant_potted_skinny_terracotta.png");
    this.load.image("planter_boxes", "/tiles/planter_boxes.png");
    this.load.image("Room_Builder_free_32x32", "/tiles/Room_Builder_free_32x32.png");
    this.load.image("roundtable", "/tiles/roundtable.png");
    this.load.image("shelf-1", "/tiles/shelf-1.png");
    this.load.image("sofa", "/tiles/sofa.png");
    this.load.image("straigh table1", "/tiles/straigh table1.png");
    this.load.image("table_round_marble", "/tiles/table_round_marble.png");
    this.load.image("vending_machine", "/tiles/vending_machine.png");
    this.load.image("vending_machine@2x", "/tiles/vending_machine@2x.png");
    this.load.image("WallpaperExploration", "/tiles/WallpaperExploration.png");

    this.load.image("player", "/sprites/player.png");
  }

  create() {
    this.players = {}; // all players (local + remote)

    const map = this.make.tilemap({ key: "map" });
    const tilesets = map.tilesets.map(ts =>
      map.addTilesetImage(ts.name, ts.name)
    );

    // floors
    map.createLayer("green-bg", tilesets);
    map.createLayer("design-floor", tilesets);
    map.createLayer("yellow-floor", tilesets);
    map.createLayer("sec-floor", tilesets);

    // visuals
    map.createLayer("wall", tilesets);
    map.createLayer("main-wall", tilesets);
    map.createLayer("furniture", tilesets);
    map.createLayer("chair", tilesets);
    map.createLayer("plants", tilesets);

    // --- LOCAL PLAYER ---
    this.localPlayer = new Player(
      this,
      map.widthInPixels / 2,
      map.heightInPixels / 2,
      true,
      this.userId
    );

    this.players[this.userId] = this.localPlayer;

    // --- COLLISION OBJECTS ---
    const collisionLayer = map.getObjectLayer("collision");
    this.walls = this.physics.add.staticGroup();

    collisionLayer.objects.forEach(obj => {
      const rect = this.add.rectangle(
        obj.x + obj.width / 2,
        obj.y + obj.height / 2,
        obj.width,
        obj.height
      );

      rect.setVisible(false);
      this.physics.add.existing(rect, true);
      this.walls.add(rect);
    });

    // --- FURNITURE COLLISION OBJECTS ---
    const furnitureCollisionLayer = map.getObjectLayer("furniture-collision");
    this.furniture = this.physics.add.staticGroup();

    furnitureCollisionLayer.objects.forEach(obj => {
      const rect = this.add.rectangle(
        obj.x + obj.width / 2,
        obj.y + obj.height / 2,
        obj.width,
        obj.height
      );

      rect.setVisible(false); // invisible collision box
      this.physics.add.existing(rect, true);
      this.furniture.add(rect);
    });

    this.physics.add.collider(this.localPlayer, this.walls);
    this.physics.add.collider(this.localPlayer, this.furniture);

    // camera
    this.cameras.main.startFollow(this.localPlayer);
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    // 🔥 SOCKET LISTENER (THIS WAS MISSING)
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type == "joined_room") {
        const { players } = data.payload;
        players.forEach(p => {
          if (p.userId === this.userId) return;

          const remote = new Player(this, p.x, p.y, false, p.userId);
          remote.setTint(0x00ff00);
          this.players[p.userId] = remote;
        });
      }

      // if (data.type == "player_joined") {
      //   const { userId } = data.payload;
      // }


      if (data.type === "player_pos") {
        const { userId, x, y } = data.payload;
        if (userId === this.userId) return;

        if (!this.players[userId]) {
          const remote = new Player(this, x, y, false, userId);
          remote.setTint(0x00ff00);
          this.players[userId] = remote;
        } else {
          const player = this.players[userId];
          player.setPosition(x, y);
          player.syncName(); // 🔥 THIS WAS MISSING
        }
      }



      if (data.type === "player_left") {
        const { userId } = data.payload;
        const player = this.players[userId];
        if (!player) return;
        player.destroy();        // remove sprite from scene
        delete this.players[userId]; // remove reference
      }

    };


  }

  update() {
    if (!this.localPlayer) return;

    this.localPlayer.update();

    // send my position
    socket.send(JSON.stringify({
      type: "pos",
      payload: {
        id: this.roomId,
        userId: this.userId,
        x: this.localPlayer.x,
        y: this.localPlayer.y,
      }
    }));
  }
}
