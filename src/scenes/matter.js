import { Scene } from 'phaser'

export class StudyMatter extends Scene {
  constructor() {
    super({
      key: 'StudyMatter',
      physics: {
        default: 'matter',
        matter: {
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
    console.log('I am Matter')
  }
  /**
   * 更新内容
   */
  update() {}

}

export default StudyMatter
