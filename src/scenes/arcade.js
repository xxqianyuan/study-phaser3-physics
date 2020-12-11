import { Scene } from 'phaser'

export class StudyArcade extends Scene {
  constructor() {
    super({
      key: 'StudyArcade',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 10 },
        }
      }
    })
  }
  /**
   * 加载资源
   */
  preload() {}
  /**
   * 创建内容
   */
  create() {
    console.log('I am Arcade')
  }
  /**
   * 更新内容
   */
  update() {}

}

export default StudyArcade
