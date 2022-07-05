import Player from "../characters/Players";
import Pasher from "phaser";
import initAnimation from "../characters/anims/playerAnims";

// class PlayScene extends Pasher.Scene {
//   constructor(config) {
//     super("PlayScene");
//     this.config = config;
//   }
//   create() {
//     this.player = this.createPlayer();
//     console.log(this.player);
//     const map = {};
//     const camera = this.cameras.main;
//     // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
//     // camera.startFollow(this.player.sprite);
//     // camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
//   }
//   createPlayer() {
//     this.add
//       .image(this.config.width / 2, this.config.height / 2, "player_character")
//       .setOrigin(0.5);
//     return new Player(this, this.config.width / 2, this.config.height / 2);
//   }
//   update(){
//     console.log("playscene start")
//   }
// }

// export default PlayScene;

class PlayScene extends Pasher.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
    this.player;
    this.VELOCITY = 150;
  }
  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("player_character", "assets/player_1/Pink_Monster.png");
    this.load.spritesheet(
      "player-1-idle",
      "assets/player_1/Pink_Monster_Idle_4.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-1-run",
      "assets/player_1/Pink_Monster_Run_6.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-1-throw",
      "assets/player_1/Pink_Monster_Throw_4.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-1-back",
      "assets/player_1/Pink_Monster_Climb_4.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );
  }
  create() {
    this.add
      .image(this.config.width / 2, this.config.height / 2, "background")
      .setOrigin(0.5);
    this.player = this.physics.add
      .sprite(this.config.width / 2, this.config.height / 2, "player_character")
      .setOrigin(0.5);
    // debugger;
    this.player.body.velocity.x = this.VELOCITY;

    initAnimation(this.anims);
    this.player.play("run");
    this.cameras.main.startFollow(this.player);
  }

  update() {
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
