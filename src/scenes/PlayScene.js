import Player from "../characters/Players";
import Pasher from "phaser";
import initAnimation from "../characters/anims/playerAnims";

class PlayScene extends Pasher.Scene {
  // new PlayScene(SHARED_CONFIG) 때 입력값을 config 으로 받음 (SHARED_CONFIG = config)
  constructor(config) {
    super("PlayScene");
    this.config = config;
    this.VELOCITY = 400;
  }
  create() {
    //바탕화면 선언
    this.add
      .image(this.config.width / 2, this.config.height / 2, "background")
      .setOrigin(0.5);

    // 입자효과 선언 (preload에서 미리 로드된 이미지 : particle-2)
    this.particle = this.add.particles("particle-2");

    // 플레이어 선언
    this.player = this.physics.add //this.physics 물리엔진 arcade에 적용될 객체 sprite 선언
      .sprite(this.config.width / 2, this.config.height / 2, "cat") // 처음 위치할 x,y 좌표와 'cat'이미지 설정
      .setScale(0.4) // 크기 설정값
      .setOrigin(0.5); // 기준값 정중앙으로 변경

    this.player.setImmovable(); // 다른 객체들과 충돌했을때 무시함.

    this.player.body.velocity.x = this.VELOCITY; // 초기 속도 설정

    this.player.setBounce(1) // 충돌했을때 튕겨나오는 정도 설정
    .setCollideWorldBounds(true); //맵 가장자리에서 튕겨나오는 여부

    initAnimation(this.anims);// 애니메이션 선언

    this.player.play("cat").setOrigin(0.5); // 플레이어에 

    this.cameras.main.startFollow(this.player);
    this.cameras.main.shake(500, 0.01, 0.01);

    // set camera center
    this.cameras.main.setFollowOffset(-180, -100);

    this.group = this.physics.add.group();

    for (let idx = 0; idx < 500; idx++) {
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
      temp.setMaxVelocity(100);
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
    this.physics.collide(this.group);
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
