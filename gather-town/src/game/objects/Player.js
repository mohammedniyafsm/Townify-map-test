import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, isLocal = false, name = "") {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setSize(24, 24);
    this.setOffset(4, 4);

    this.speed = 160;
    this.isLocal = isLocal;

    this.nameText = scene.add.text(x, y - 20, name, {
      fontSize: "12px",
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,0.5)",
      padding: { x: 4, y: 2 }
    }).setOrigin(0.5);

    if (isLocal) {
      this.cursors = scene.input.keyboard.createCursorKeys();
      this.keys = scene.input.keyboard.addKeys("W,A,S,D");
    }
  }

  update() {
    if (!this.isLocal) return;

    const body = this.body;
    body.setVelocity(0);

    if (this.cursors.left.isDown || this.keys.A.isDown) body.setVelocityX(-this.speed);
    else if (this.cursors.right.isDown || this.keys.D.isDown) body.setVelocityX(this.speed);

    if (this.cursors.up.isDown || this.keys.W.isDown) body.setVelocityY(-this.speed);
    else if (this.cursors.down.isDown || this.keys.S.isDown) body.setVelocityY(this.speed);

    body.velocity.normalize().scale(this.speed);

    // 🔥 local player sync
    this.syncName();
  }

  syncName() {
    this.nameText.setPosition(
      Math.round(this.x),
      Math.round(this.y - 20)
    );
  }

  destroy(fromScene) {
    this.nameText.destroy();
    super.destroy(fromScene);
  }
}

