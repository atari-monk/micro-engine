import {
  IAnimationConfig,
  IEntityDataModel,
  IImmutableVector2,
} from 'engine_api'
import { EntityDataManager, JsObjectDataLoader, Vector2 } from 'engine'
import { ballAnimations } from './ballSprite'
import { bluePlayerAnimations, redPlayerAnimations } from './playerSprite'

export default class EntityData extends EntityDataManager {
  private _dataLoader = new JsObjectDataLoader<IEntityDataModel>(
    'data/entityData.json'
  )

  constructor(private readonly _center: IImmutableVector2) {
    super()
  }

  async createData(fromCode = false, saveData = false) {
    if (fromCode) {
      this.createDataByCode()
    } else {
      const dataObj = await this._dataLoader.getData()
      Object.entries(dataObj).forEach(([key, value]) => {
        const { animations, object } = value
        this.add(key, {
          animations,
          object: {
            id: object.id || '',
            name: object.name || '',
            color: object.color,
            position: new Vector2(object.position.x, object.position.y),
            size: new Vector2(object.size.x, object.size.y),
            moveStep: new Vector2(object.moveStep.x, object.moveStep.y),
            velocity: new Vector2(object.moveStep.x, object.moveStep.y),
            spriteOffset: new Vector2(
              object.spriteOffset.x,
              object.spriteOffset.y
            ),
            mass: object.mass,
          },
        })
      })
    }
    if (saveData) {
      this.saveToFile()
    }
  }

  private createDataByCode() {
    const center = this._center

    this.add('object1', {
      object: {
        id: '',
        name: '',
        color: 'red',
        position: new Vector2(26, center.y),
        size: new Vector2(50, 150),
        moveStep: new Vector2(),
        velocity: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('object2', {
      object: {
        id: '',
        name: '',
        color: 'blue',
        position: new Vector2(740 - 26, center.y),
        size: new Vector2(50, 150),
        moveStep: new Vector2(),
        velocity: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('player1', {
      object: {
        id: '',
        name: '',
        color: 'red',
        position: new Vector2(center.x - 100, center.y),
        size: new Vector2(40, 110),
        moveStep: new Vector2(50, 50),
        velocity: new Vector2(),
        spriteOffset: new Vector2(-36, -75),
        mass: 70,
      },
      animations: redPlayerAnimations,
    })

    this.add('player2', {
      object: {
        id: '',
        name: '',
        color: 'blue',
        position: new Vector2(center.x + 100, center.y),
        size: new Vector2(40, 110),
        moveStep: new Vector2(50, 50),
        velocity: new Vector2(),
        spriteOffset: new Vector2(-40, -75),
        mass: 70,
      },
      animations: bluePlayerAnimations,
    })

    this.add('object3', {
      object: {
        id: '',
        name: '',
        color: 'purple',
        position: new Vector2(center.x, center.y),
        size: new Vector2(25, 25),
        moveStep: new Vector2(),
        velocity: new Vector2(),
        spriteOffset: new Vector2(-35, -19),
        mass: 1,
      },
      animations: ballAnimations,
    })
  }

  private toJSON(): any {
    const data: any = {}

    this.forEach((entityId, entityData) => {
      data[entityId] = entityData
    })

    return data
  }

  private saveToFile(): void {
    const jsonData = this.toJSON()
    const jsonString = JSON.stringify(jsonData, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'entityData.json'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }
}
