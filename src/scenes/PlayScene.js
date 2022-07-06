import Player from "../characters/Players";
import Pasher from "phaser";
import initAnimation from "../characters/anims/playerAnims";

class PlayScene extends Pasher.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
    this.player;
    this.VELOCITY = 400;
  }
  create() {
    this.add
      .image(this.config.width / 2, this.config.height / 2, "background")
      .setOrigin(0.5);

    this.particle = this.add.particles("particle-2");
    this.player = this.physics.add
      .sprite(this.config.width, this.config.height, "cat")
      .setScale(0.4)
      .setOrigin(0.5);

    this.player.body.velocity.x = this.VELOCITY;

    this.player.setBounce(1).setCollideWorldBounds(true);

    initAnimation(this.anims);

    this.player.play("cat").setOrigin(0.5);

    // this.cameras.follow(this.player, Phaser.Cameras, 0.1, 0.1);
    // this.input.onDown.add(shake, this);

    this.cameras.main.startFollow(this.player);
    this.cameras.main.shake(500, 0.01, 0.01);

    // set camera center
    this.cameras.main.setFollowOffset(-180, -100);

    this.group = this.physics.add.group();

    for (let idx = 0; idx < 100; idx++) {
      const temp = this.group.create(
        Phaser.Math.Between(0, this.config.width),
        Phaser.Math.Between(0, this.config.height),
        "cat"
      );
      temp.setScale(0.3);
      temp.setBounce(1);
      temp.setCollideWorldBounds(true);
      temp.setVelocity(
        Phaser.Math.Between(-200, 200),
        Phaser.Math.Between(-100, -200)
      );
      temp.setMaxVelocity(300);
    }
    this.group.children.iterate((child) => {
      child.play("cat");
    });
    this.physics.add.collider(this.player, this.group);

    this.particle.createEmitter({
      x: this.config.width / 2,
      y: this.config.height / 2,
      lifespan: 1000,
      speed: { min: 150, max: 300 },
      scale: { start: 0.3, end: 0 },
      gravityY: 1200,
      follow: this.player,
      blendMode: "ADD",
    });
  }

  update() {
    // console.log( this.player.setVelocityX());
    // this.player.flipX = this.player.setVelocityX() < 0 ? true : false
    // console.log(this.player.body.velocity.angle());
    this.player.rotation = this.player.body.velocity.angle();

    this.group.children.iterate((child) => {
      child.rotation = child.body.velocity.angle();
      child.flipX = child.body.velocity.x > 0 ? true : false;
    });

    this.player.flipX = this.player.body.velocity.x > 0 ? true : false;

    if (this.player.x >= this.config.width - this.player.width / 2) {
      this.player.body.velocity.x = -this.VELOCITY;
    } else if (this.player.x <= this.player.width / 2) {
      this.player.body.velocity.x = this.VELOCITY;
    }

    if (this.player.y >= this.config.height - this.player.height / 2) {
      this.player.body.velocity.y = -this.VELOCITY;
    } else if (this.player.y <= this.player.height / 2) {
      this.player.body.velocity.y = this.VELOCITY;
    }
  }
}

export default PlayScene;
