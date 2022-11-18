
import { _decorator, Component, Node, RigidBody, director, RigidBody2D, Vec3, Collider2D, IPhysics2DContact, Contact2DType } from 'cc';
import { Wood } from "./Wood";
import { Level_design } from "./Level_design";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Knife
 * DateTime = Sun Oct 24 2021 14:41:15 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Knife.ts
 * FileBasenameNoExtension = Knife
 * URL = db://assets/Knife.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Knife')
export class Knife extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({type: RigidBody2D})
    public BodyAnim: RigidBody2D|null = null;

    @property({type: Wood})
    public wood: Wood|null = null;

    @property
    public trangthai: number = 10;

    angle: number = 0;

    start () {
        // [3]
        if(this.trangthai == 10){
            this.trangthai = 2;
            this.angle = -this.wood.node.eulerAngles.z;
        }        

        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    update (deltaTime: number) {
    //     // [4]
        if (this.trangthai == 1)
        {
            let newPosition = new Vec3(85 * Math.cos((this.wood.node.eulerAngles.z + this.angle) * 3.14/180), 85 * Math.sin((this.wood.node.eulerAngles.z + this.angle) * 3.14/180), 0);
            this.node.position = newPosition;            
            this.node.setRotationFromEuler(new Vec3(0, 0, this.wood.node.eulerAngles.z + this.angle - 270));
        }
        else if (this.trangthai == 2)
        {
            let newY = this.node.position.y + deltaTime * 3000;
            if (newY > -100)
            {
                newY = -100;
                this.trangthai = 1;
            }
            this.node.position = new Vec3(0, newY, 0);
            this.angle = -this.wood.node.eulerAngles.z - 90;
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (this.trangthai == 2 && otherCollider.tag == 1)
        {
            console.log("-------------Game Over-------------");
            
            director.loadScene("main");
            Level_design.Level = 1;
        }
    }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
