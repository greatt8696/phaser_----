export default (anims) => {
  anims.create({
    key: "idle",
    frames: anims.generateFrameNumbers("player_1_idle", { start: 0, end: 4 }),
    frameRate: 8,
    repeat: -1,
  });
  anims.create({
    key: "run",
    frames: anims.generateFrameNumbers("player_1_run", { start: 0, end: 6 }),
    frameRate: 6,
    repeat: -1,
  });
  anims.create({
    key: "back",
    frames: anims.generateFrameNumbers("player_1_back", { start: 0, end: 4 }),
    frameRate: 4,
    repeat: -1,
  });
  anims.create({
    key: "hurt",
    frames: anims.generateFrameNumbers("player_1_hurt", { start: 0, end: 4 }),
    frameRate: 4,
    repeat: 3,
  });
  anims.create({
    key: "death",
    frames: anims.generateFrameNumbers("player_1_death", { start: 0, end: 8 }),
    frameRate: 8,
    repeat: 0,
  });
  anims.create({
    key: "throw",
    frames: anims.generateFrameNumbers("player_1_death", { start: 0, end: 4 }),
    frameRate: 8,
    repeat: 0,
  });
};
