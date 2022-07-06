import Phaser from "phaser";
import firebase from "firebase/compat/app";
import PreloadScene from "./scenes/Preload";
import PlayScene from "./scenes/PlayScene";

let width = 1700;
let height = 850;



// 다른 Scene들과 공유할 config 
const SHARED_CONFIG = {
  width: width,
  height: height,
  debug: true,
};


// 다중 Scene 초기화(선언)하기
// PreloadScene : 이미지 요소를 미리 로드함.
// PlayScene : 게임과 관련된 주된 Scene
const Scenes = [PreloadScene, PlayScene];

//클래스 선언함수
const createScene = (Scene) => new Scene(SHARED_CONFIG);

//Scenes 배열에 담겨있는 Scene마다 createScene함수 실행하기
const initScenes = () => Scenes.map(createScene);


//게임 초기 설정값
const config = {
  //webGL : Phaser.AUTO webGL 설정
  type: Phaser.AUTO,

  // 다른 Scene들과 공유할 config 내용을 게임 초기설정값에 적용
  ...SHARED_CONFIG,

  //모름
  pixcelArt: true,

  //확대 설정값
  zoom: 1.5,

  //물리엔진
  physics: {
    //경량 물리엔진 arcade
    default: "arcade",

    //
    arcade: {

      //디버그 옵션 true로 바꾸면 객체마다 박스와 진행방향 보임
      debug: false,

      // 게임 전반에 공통적인 중력 값이 적용
      gravity: { y: 20 },
    },
  },


  // Scenes 배열에 담겨있는 Scene들을 선언하여 config 설정값에 저장
  scene: initScenes(),
  // scene: [new PlayScene(SHARED_CONFIG), Preload],
};



//게임 시작 함수
new Phaser.Game(config);
