import Phaser from "phaser";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "player");

    // Add to scene
    scene.add.existing(this);

    // Add physics body
    scene.physics.add.existing(this);

    // ✅ IMPORTANT
    this.setCollideWorldBounds(true);

    // Adjust hitbox (VERY IMPORTANT)
    this.setSize(24, 24);
    this.setOffset(4, 4);

    this.setDepth(10);

    this.speed = 160;

    // Input
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.keys = scene.input.keyboard.addKeys("W,A,S,D");
  }

  update() {
    const body = this.body;
    body.setVelocity(0);

    if (this.cursors.left.isDown || this.keys.A.isDown) {
      body.setVelocityX(-this.speed);
    } else if (this.cursors.right.isDown || this.keys.D.isDown) {
      body.setVelocityX(this.speed);
    }

    if (this.cursors.up.isDown || this.keys.W.isDown) {
      body.setVelocityY(-this.speed);
    } else if (this.cursors.down.isDown || this.keys.S.isDown) {
      body.setVelocityY(this.speed);
    }

    body.velocity.normalize().scale(this.speed);
  }
}
