import { Scene } from 'phaser'

export class StudyArcade extends Scene {
  constructor() {
    super({
      key: 'StudyArcade',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 600 },
          debug: true,
        }
      }
    })
  }
  /**
   * 加载资源
   */
  preload() {
    this.load.image('ball', require('./assets/ball.png'))
    this.load.image('rock', require('./assets/rock.png'))
    this.load.image('ship', require('./assets/ship.png'))
    this.load.image('bg', require('./assets/bg.png'))
  }
  /**
   * 创建内容
   */
  create() {
    console.log('I am Arcade')

    this.add.image(this.game.canvas.width / 2, this.game.canvas.height / 2, 'bg')


    // const b1 = this.add.sprite(400, 300, 'ball')
    // this.physics.world.enable(b1, Phaser.Physics.Arcade.STATIC_BODY)

    const rock = this.physics.add.image(200, 150, 'rock')
    rock.setBounce(0.1)
    rock.setCollideWorldBounds(true)
    // 设置摩擦力系数
    rock.setFriction(0.6)
    // rock.body.setAngularVelocity(100)

    const ball = this.physics.add.image(500, 50, 'ball')
    // 与世界边缘碰撞
    ball.setCollideWorldBounds(true)
    // 弹跳系数
    ball.setBounce(0.9)
    // 设置水平速度
    ball.setVelocityX(200)
    // 设置摩擦系数
    ball.setFriction(0.9)
    // 设置为圆形
    ball.body.isCircle = true

    // 添加碰撞检测对象
    this.physics.add.collider(rock, ball)

    // // ship group
    // const shipGroup = this.physics.add.group()

    const objGroup = this.add.group()
    
    // for(let i = 0; i < 10; i++) {
    //   // const ship = shipGroup.create(0, 0, 'ship')
    //   const ship = this.physics.add.image(0, 0, 'ship')
    //   ship.setCollideWorldBounds(true)
    //   ship.setBounce(0.2)
    //   ship.setVelocityX(-100)
    //   ship.setRandomPosition()

    //   objGroup.add(ship)
    // }

    // 创建一个静态物理组
    const platforms = this.physics.add.staticGroup({
      // 使用石块图片
      key: 'rock',
      // 一共生成10个（第一次创建后再重复创建9次）
      repeat: 9,
      // 设置缩放
      setScale: {
        x: 0.1,
        y: 0.1,
      },
      // 设置位置
      setXY: {
        x: 500,
        y: 300,
        // 每次重复生成时 x坐标的增量
        stepX:25,
      }
    })
    // 由于静态物体body不会自动同步对象的大小与位置等信息，所以需要手动刷新一下
    platforms.children.iterate(child => child.refreshBody())

    this.physics.add.collider(ball, platforms)

    // this.physics.add.collider(rock, shipGroup)
    // this.physics.add.collider(ball, shipGroup)
    this.physics.add.collider(rock, objGroup)
    this.physics.add.collider(ball, objGroup)
    
    // // ~~
    // this.physics.pause()
    // window.physics = this.physics
    // // this.physics.resume()
  }
  /**
   * 更新内容
   */
  update() {
    // 切换场景
    this.scene.start('StudyMatter')
  }

}

export default StudyArcade
