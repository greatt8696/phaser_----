// import Phaser from 'Phaser';

class Preload extends Phaser.Scene {
  constructor(config) {
    super("PreloadScene");
    this.config = config;
  }
  preload() {
    this.load.image("background", "assets/background.png");

    this.load.image("player_character", "assets/player_1/Pink_Monster.png");

    this.load.spritesheet(
      "player-idle",
      "assets/player_1/Pink_Monster_Idle_4.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-run",
      "assets/player_1/Pink_Monster_Run_6.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-throw",
      "assets/player_1/Pink_Monster_Throw_4.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );

    this.load.spritesheet(
      "player-back-run",
      "assets/player_1/Pink_Monster_Climb_4.png",
      {
        frameWidth: 32,
        frameHeight: 32,
        spacing: 32,
      }
    );
  }
  create() {
    this.add.image(0, 0, "background").setOrigin(0);
  }
}

// this.add.sprite(this.config, this.config, 'player').setOrigin(0);
// this.scene.start('PlayScene');

export default Preload;
