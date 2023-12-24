import {
  IAnimationConfig,
  IEntityDataModel,
  IImmutableVector2,
} from 'engine_api'
import { EntityDataManager, JsObjectDataLoader, Vector2 } from 'engine'
import { ballAnimations } from './ballSprite'

export default class EntityData extends EntityDataManager {
  private _dataLoader = new JsObjectDataLoader<IEntityDataModel>(
    'data/entityData.json'
  )

  constructor(private readonly _center: IImmutableVector2) {
    super()
  }

  async createData(fromCode = true, saveData = false) {
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
            speed: new Vector2(object.speed.x, object.speed.y),
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
        color: 'green',
        position: new Vector2(center.x + 150, center.y + 150),
        size: new Vector2(150, 50),
        speed: new Vector2(),
        spriteOffset: new Vector2(),
        mass: 0,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('object2', {
      object: {
        id: '',
        name: '',
        color: 'yellow',
        position: new Vector2(center.x + 150, center.y - 150),
        size: new Vector2(150, 50),
        speed: new Vector2(),
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
        position: new Vector2(center.x - 50 - 100, center.y - 75),
        size: new Vector2(50, 150),
        speed: new Vector2(100, 100),
        spriteOffset: new Vector2(),
        mass: 70,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('player2', {
      object: {
        id: '',
        name: '',
        color: 'blue',
        position: new Vector2(center.x + 100, center.y - 75),
        size: new Vector2(50, 150),
        speed: new Vector2(100, 100),
        spriteOffset: new Vector2(),
        mass: 70,
      },
      animations: {} as IAnimationConfig[],
    })

    this.add('object3', {
      object: {
        id: '',
        name: '',
        color: '',
        position: new Vector2(center.x, center.y),
        size: new Vector2(150, 50),
        speed: new Vector2(),
        spriteOffset: new Vector2(),
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
