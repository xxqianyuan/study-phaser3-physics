import { Scene, Math } from 'phaser'

export class StudyMatter extends Scene {
  constructor() {
    super({
      key: 'StudyMatter',
      physics: {
        default: 'matter',
        matter: {
          gravity: { y: 1 },
          // debug: true,
          debug: {
            renderFill: false,
            // showInternalEdges: true,
            // showConvexHulls: true,
            // showCollisions: true,
          }
        }
      }
    })
  }
  /**
   * 加载资源
   */
  preload() {
    // this.load.image('ball', require('./assets/ball.png'))
    // this.load.image('rock', require('./assets/rock.png'))
    // this.load.image('ship', require('./assets/ship.png'))
    // this.load.image('bg', require('./assets/bg.png'))
  }
  /**
   * 创建内容
   */
  create() {
    console.log('I am Matter')

    const { canvas } = this.game
    this.add.image(canvas.width / 2, canvas.height / 2, 'bg')

    this.matter.world.setBounds(0, 0, canvas.width, canvas.height)
    
    const ball = this.matter.add.image(400, 80, 'ball')
    // 设置为圆形
    ball.setCircle()
    // 设置水平速度
    ball.setVelocityX(10)
    // 设置弹跳
    ball.setBounce(0.9)
    ball.setFriction(0.1, 0.01, 0)
    // ball.setFrictionAir(0)
    // ball.setFrictionStatic(0)

    // rock points
    const points = '2.00,46.75 7.50,19.75 30.50,2.00 158.50,5.75 167.25,12.75 181.00,15.00 183.50,25.50 189.50,31.50 189.75,151.00 188.00,158.00 182.25,163.50 182.00,173.50 176.50,180.00 160.50,188.50 38.75,188.75 26.50,184.50 14.50,176.50 3.25,163.50'
    // 添加大石块作为平台
    // const platform = this.matter.add.image(600, 360, 'rock')
    // const platform = this.matter.add.image(600, 360, 'rock', undefined, { chamfer: { radius: 45 }})
    // const platform = this.matter.add.image(600, 360, 'rock', undefined, {
    //   shape: {
    //     type: 'fromVerts',
    //     verts: points,
    //   }
    // })
    const platform = this.add.image(600, 360, 'rock')
    /**
     * 使用顶点创建一个多边形body，前两个参数是坐标
     * 如果是凹多边形，则会被拆分成多个凸多边形的组合
     */
    const platformBody = this.matter.add.fromVertices(600, 360, points)
    this.matter.add.gameObject(platform, platformBody)
    
    // const vertices = this.matter.vertices.fromPath(points)

    // // 设置body的圆角
    // platform.setBody({}, { chamfer: { radius: 45 }})
    // const verts = this.matter.verts.fromPath('2.00,46.75 7.50,19.75 30.50,2.00 158.50,5.75 167.25,12.75 181.00,15.00 183.50,25.50 189.50,31.50 189.75,151.00 188.00,158.00 182.25,163.50 182.00,173.50 176.50,180.00 160.50,188.50 38.75,188.75 26.50,184.50 14.50,176.50 3.25,163.50')
    // // 设置自定义形状body
    // platform.setBody({
    //   type: 'fromVertices',
    //   verts: points,
    //   flagInternal: true,
    // })
    // 设置为静态
    platform.setStatic(true)
    // 旋转25度
    platform.setAngle(25)

    console.log(platform.body.collisionFilter)

    // const ploy = this.add.polygon(600, 360, points, 0xff0000, 0.2)
    // this.matter.add.gameObject(ploy, { shape: { type: 'fromVerts', verts: points, flagInternal: false }})
    // ploy.setStatic(true)
    // ploy.setAngle(25)

    // 石块
    // const rock = this.matter.add.image(400, 200, 'rock')
    // rock.setFriction(0)
    // rock.setMass(1)
    // rock.setScale(20, 0.1)
    // rock.setRotation(Math.PI / 5)

    // 鼠标拖动物体
    // this.matter.add.mouseSpring()
    this.matter.add.pointerConstraint()

    // 创建一个碰撞组，该组中的物体之间均会发生碰撞
    const collidingGroup = this.matter.world.nextGroup()
    // 创建一个不碰撞的组，该组中的物体之间都不会发生碰撞
    const nonCollidingGroup = this.matter.world.nextGroup(true)

    ball.setCollisionGroup(collidingGroup)

    // 船的顶点
    const shipPoints = '0.00,26.00 2.20,12.40 5.60,4.20 8.60,0.60 11.80,4.40 14.60,12.40 16.40,26.00 16.60,99.60 0.00,99.80'
    // ship
    const ship = this.matter.add.image(100, 100, 'ship', undefined, {
      shape: {
        type: 'fromVerts',
        verts: shipPoints,
      }
    })
    ship.setFriction(0.01, 0, 1)
    ship.setBounce(0.1)

    // 为ball创建一个类别
    const catBall = this.matter.world.nextCategory()
    ball.setCollisionCategory(catBall)

    // 创建一个类别
    const catShip = this.matter.world.nextCategory()
    // 设置所属类别
    ship.setCollisionCategory(catShip)
    // 设置与哪些类别发生碰撞，即设置mask
    ship.setCollidesWith([catShip, 1])

    // 鼠标点击生成ship
    this.input.on('pointerdown', (pointer) => {
      // 创建ship
      const oneShip = this.matter.add.image(pointer.worldX, pointer.worldY, 'ship', undefined, {
        shape: {
          type: 'fromVerts',
          verts: shipPoints,
        }
      })
      oneShip.setFriction(0.01, 0, 1)
      oneShip.setBounce(0.1)
      // 设置所属类别
      oneShip.setCollisionCategory(catShip)
      // 设置与哪些类别发生碰撞，即设置mask
      oneShip.setCollidesWith([catShip, 1])
      // Phaser.Math 通过随机值决定
      if (Math.Between(1, 10) > 5) {
        // 让该ship属于碰撞组
        oneShip.setCollisionGroup(collidingGroup)
      }
    })

    // 通过world监听碰撞事件
    this.matter.world.on('collisionstart', (e, bodyA, bodyB) => {
      console.log('发生碰撞 -- 来自world', e, bodyA, bodyB)
    })

    // 通过特定对象监听碰撞事件
    ball.setOnCollide((pair) => {
      console.log('发生碰撞 -- 来自ball', pair)
    })

    // 创建一个半通明红色矩形游戏对象
    const rect = this.add.rectangle(100, 200, 20, 60, 0xff0000, 0.5)
    // 将传感器body关联到矩形
    this.matter.add.gameObject(rect, { isSensor: true, isStatic: true })
    // 监听碰撞
    rect.setOnCollide((pair) => {
      console.log('矩形被触发')
    })

    // 直接创建一个矩形传感器body
    const sensorBody = this.matter.add.rectangle(200, 200, 20, 60, { isSensor: true, isStatic: true })
    // 修改body的碰撞回调
    sensorBody.onCollideCallback = (pair) => {
      console.log('传感器被触发')
    }
    
    // ~~
    this.matter.pause()
    window.matter = this.matter
    setTimeout(() => this.matter.resume(), 1000)
    // this.matter.resume()
  }
  /**
   * 更新内容
   */
  update() {}

}

export default StudyMatter
