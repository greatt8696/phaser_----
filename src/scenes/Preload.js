import Phaser from 'phaser';

class Preload extends Phaser.Scene {
  constructor(config) {
    super("PreloadScene");
    this.config = config;
  }
  preload() {

    console.log("preload")

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
    // this.add
    //   .image(this.config.width / 2, this.config.height / 2, "player_character")
    //   .setOrigin(0.5);
  }
}

// this.add.sprite(this.config, this.config, 'player').setOrigin(0);
// this.scene.start('PlayScene');

export default Preload;
