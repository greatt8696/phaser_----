import Phaser from "phaser";
import firebase from "firebase/compat/app";
import Preload from "./scenes/Preload";
import PlayScene from "./scenes/PlayScene";

let width = 600;
let height = 400;

const SHARED_CONFIG = {
  width: width,
  height: height,
  debug: true,
};

// const Scenes = [Preload, PlayScene];
const Scenes = [PlayScene, Preload];
const createScene = (Scene) => new Scene(SHARED_CONFIG);
const initScenes = () => Scenes.map(createScene);

/* const scenes = [
   new Scene(SHARED_CONFIG), 
   new Scene(SHARED_CONFIG), 
   new Scene(SHARED_CONFIG)
  ] 
*/

// const config = {
//   //webGL : Phaser.AUTO
//   type: Phaser.AUTO,
//   ...SHARED_CONFIG,
//   pixcelArt: true,
//   zoom: 1,
//   physics: {
//     //경량 물리엔진 arcade
//     default: "arcade",
//     arcade: {
//       debug: true,
//       // gravity: 50,
//     },
//   },
//   scene: initScenes(),
// };

const config = {
  //webGL : Phaser.AUTO
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixcelArt: true,
  zoom: 2,
  physics: {
    //경량 물리엔진 arcade
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 20 },
    },
  },
  scene: initScenes(),
  // scene: [new PlayScene(SHARED_CONFIG), Preload],
};

new Phaser.Game(config);
