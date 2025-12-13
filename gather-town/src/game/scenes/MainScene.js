import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    // Load map
    this.load.tilemapTiledJSON("map", "/maps/g-1.json");

    // === LOAD ALL TILESETS USED IN TILED ===
    this.load.image("booth", "/tiles/booth.png");
    this.load.image("booth big black [5x5]", "/tiles/booth big black [5x5].png");
    this.load.image("botanical_garden", "/tiles/botanical_garden.png");
    this.load.image(
      "cabinet_chippendale_thin_arch",
      "/tiles/cabinet_chippendale_thin_arch.png"
    );
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
    this.load.image(
      "office_filecabinets",
      "/tiles/office_filecabinets.png"
    );
    this.load.image(
      "officeplants[1x1]",
      "/tiles/officeplants[1x1].png"
    );
    this.load.image(
      "officeplants[2x1]",
      "/tiles/officeplants[2x1].png"
    );
    this.load.image(
      "plant_potted_skinny_terracotta",
      "/tiles/plant_potted_skinny_terracotta.png"
    );
    this.load.image("planter_boxes", "/tiles/planter_boxes.png");
    this.load.image(
      "Room_Builder_free_32x32",
      "/tiles/Room_Builder_free_32x32.png"
    );
    this.load.image("roundtable", "/tiles/roundtable.png");
    this.load.image("shelf-1", "/tiles/shelf-1.png");
    this.load.image("sofa", "/tiles/sofa.png");
    this.load.image("straigh table1", "/tiles/straigh table1.png");
    this.load.image(
      "table_round_marble",
      "/tiles/table_round_marble.png"
    );
    this.load.image("vending_machine", "/tiles/vending_machine.png");
    this.load.image(
      "vending_machine@2x",
      "/tiles/vending_machine@2x.png"
    );
    this.load.image(
      "WallpaperExploration",
      "/tiles/WallpaperExploration.png"
    );
  }

  create() {
    const map = this.make.tilemap({ key: "map" });

    // === AUTO-BIND ALL TILESETS ===
    const tilesets = map.tilesets.map((tileset) =>
      map.addTilesetImage(tileset.name, tileset.name)
    );

    // === CREATE LAYERS (ORDER SAME AS TILED) ===
    map.createLayer("green-bg", tilesets);
    map.createLayer("design-floor", tilesets);
    map.createLayer("yellow-floor", tilesets);
    map.createLayer("sec-floor", tilesets);

    const wallLayer = map.createLayer("wall", tilesets);
    map.createLayer("main-wall", tilesets);
    map.createLayer("furniture", tilesets);
    map.createLayer("chair", tilesets);
    map.createLayer("plants", tilesets);

    // Collision
    wallLayer.setCollisionByProperty({ collides: true });

    this.physics.world.setBounds(
      0,
      0,
      map.widthInPixels,
      map.heightInPixels
    );
  }
}
