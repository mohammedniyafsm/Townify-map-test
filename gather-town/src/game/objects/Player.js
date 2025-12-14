export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, isLocal = false) {
    super(scene, x, y, "player");

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setSize(24, 24);
    this.setOffset(4, 4);

    this.speed = 160;
    this.isLocal = isLocal;

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
  }
}
