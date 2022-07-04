import Phaser from "phaser";
import Player from "../characters/Players";

class Play extends Phaser.Scene {
  constructor(config) {
    super("PlayScene");
    this.config = config;
  }

  create({ gameStatus }) {
    const map = {};

    const camera = this.cameras.main;
    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.player = this.createPlayer()
    camera.startFollow(this.player.sprite);

  }
  createPlayer() {
    return new Player(this, 100, 250);
  }
}

export default Play;
