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
    this.player.body.velocity.y = this.VELOCITY; // 초기 속도 설정

    this.player
      .setBounce(1.5) // 충돌했을때 튕겨나오는 정도 설정
      .setCollideWorldBounds(true); //맵 가장자리에서 튕겨나오는 여부

    initAnimation(this.anims); // 애니메이션 선언

    this.player.play("cat").setOrigin(0.5); // 플레이어에 씌울 에니메이션의 기준점을 중앙으로 설정

    // this.player = new Player(width, height)

    // set camera center
    this.cameras.main.startFollow(this.player); // 카메라를 플레이어에 고정시킴
    this.cameras.main.shake(500, 0.01, 0.01); // 카메라 흔드는 효과
    this.cameras.main.setFollowOffset(-180, -100); // 정중앙 설정

    this.group = this.physics.add.group(); // 그룹설정

    // 500개의 개체 생성
    for (let idx = 0; idx < 20; idx++) {
      // this.group에 새로운 개체를 push 함.
      const temp = this.group.create(
        //초기 좌표값 설정
        Phaser.Math.Between(0, this.config.width),
        Phaser.Math.Between(0, this.config.height),
        "cat" //이미지 설정
      );
      temp.setScale(0.25); // 해당 개체의 스케일을 축소 1:기본값 값이 크면 더 커짐
      temp.setBounce(1.5); // 튕겨오르는 정도 1: 기본값  값이 크면 더 튕김
      temp.setCollideWorldBounds(true); // 월드맵 가장자리에서 튕겨오름

      // 초기 속도 설정
      temp.setVelocity(
        Phaser.Math.Between(-200, 200), // x속도 -200에서 200 사이의 랜덤값 생성
        Phaser.Math.Between(-100, -200) // y속도 -100에서 -200 사이의 랜덤값 생성
      );

      temp.setMaxVelocity(200); // 최대 속도 제한
    }

    // 그룹에 속한 개체들을 foreach 문으로 돌림
    this.group.children.iterate((child) => {
      // 개체의 애니메이션을 시작함
      child.play("cat");
    });

    // 플레이어와 그룹 개체들간에 충돌 여부 설정, 설정 안하면 통과함
    this.physics.add.collider(this.player, this.group);

    // this.particle emitter 생성 (emitter는 잔상효과나 파편효과 등을 말함)
    this.particle.createEmitter({
      x: this.config.width / 2, // 초기 기준 좌표
      y: this.config.height / 2, // 초기 기준 좌표
      lifespan: 1000, // 생명주기 짧으면 빨리 사라짐
      speed: { min: 150, max: 300 }, // 효과들의 속도 설정 min ~ max 값 사이의 랜덤숫자로 속도가 결정됨
      scale: { start: 0.3, end: 0 }, // 효과들의 크기 설정 생성되어서 없어질때 까지의 크기, 1이 기본크기
      gravityY: 1200, // 효과들의 중력값 설정 크면 빨리 떨어짐
      follow: this.player, // 기준좌표가 플레이어를 따라다님
      blendMode: "ADD", // ADD 블랜더 효과를 줌
    });

    this.circle = new Phaser.Geom.Circle(400, 300, 260);
    // this.groups = this.add.group({ key: "cat", frameQuantity: 18 });

    //////////
    this.groups = this.physics.add.group(); // 그룹설정

    // 500개의 개체 생성
    for (let idx = 0; idx < 10; idx++) {
      // this.group에 새로운 개체를 push 함.
      const temp = this.groups.create(
        //초기 좌표값 설정
        // Phaser.Math.Between(0, this.config.width),
        // Phaser.Math.Between(0, this.config.height),
        0,
        0,
        "cat" //이미지 설정
      );
      temp.setScale(0.25); // 해당 개체의 스케일을 축소 1:기본값 값이 크면 더 커짐
      temp.setBounce(1.5); // 튕겨오르는 정도 1: 기본값  값이 크면 더 튕김
      temp.setImmovable(true);

      // temp.setCollideWorldBounds(true); // 월드맵 가장자리에서 튕겨오름

      // 초기 속도 설정
      // temp.setVelocity(
      //   Phaser.Math.Between(-200, 200), // x속도 -200에서 200 사이의 랜덤값 생성
      //   Phaser.Math.Between(-100, -200) // y속도 -100에서 -200 사이의 랜덤값 생성
      // );

      // temp.setMaxVelocity(200); // 최대 속도 제한
    }
    this.physics.add.collider(this.group, this.groups);

    ///////////////
    Phaser.Actions.PlaceOnCircle(this.groups.getChildren(), this.circle);

    this.tween = this.tweens.addCounter({
      from: 260,
      to: 0,
      duration: 3000,
      delay: 2000,
      ease: "Sine.easeInOut",
      repeat: -1,
      yoyo: true,
    });

    this.groups.children.iterate((child) => {
      // 개체의 애니메이션을 시작함
      child.play("cat");
      child.setScale(0.5);
    });
    this.isRotate = false;
  }

  preload(){
    
  }
  // 매프레임 마다 호출되는 함수 중요
  update() {
    this.groups.setVelocityX(this.player.body.velocity.x);
    this.groups.setVelocityY(this.player.body.velocity.y);
    Phaser.Actions.RotateAroundDistance(
      this.groups.getChildren(),
      { x: this.player.body.x + 40, y: this.player.body.y + 40 },
      0.02,
      this.tween.getValue()
    );
    if (!this.isRotate)

    this.physics.collide(this.group); // 그룹 개체간의 충돌여부를 확인함
    // console.log( this.player.setVelocityX());
    // this.player.flipX = this.player.setVelocityX() < 0 ? true : false
    // console.log(this.player.body.velocity.angle());

    this.group.children.iterate((child) => {
      child.rotation = child.body.velocity.angle();
      child.flipX = child.body.velocity.x > 0 ? true : false;
    });

    this.player.flipX = this.player.body.velocity.x > 0 ? true : false;
    this.player.flipY = this.player.body.velocity.y > 0 ? false : true;
    this.player.rotation = this.player.body.velocity.angle();
    console.log(this.player.body.velocity);

    if (this.player.body.velocity.x < 0 && this.player.body.velocity.y > 0)
      this.player.flipX = true;
    if (this.player.body.velocity.x < 0 && this.player.body.velocity.y < 0)
      this.player.flipX = true;

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
