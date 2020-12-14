import Phaser from "phaser";
import StudyArcade from "./scenes/arcade";
import StudyMatter from "./scenes/matter";

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 400,
  // 配置场景，第一个为默认场景
  scene: [StudyArcade, StudyMatter],
};
// 创建游戏实例
const game = new Phaser.Game(config);
