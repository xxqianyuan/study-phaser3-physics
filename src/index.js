import Phaser from "phaser";
import StudyArcade from "./scenes/arcade";
import StudyMatter from "./scenes/matter";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
  scene: [StudyArcade, StudyMatter],
};
// 创建游戏实例
const game = new Phaser.Game(config);
