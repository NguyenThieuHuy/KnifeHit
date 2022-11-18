import { _decorator, Component, Node, RigidBody2D, Collider2D, Contact2DType, IPhysics2DContact, Vec3 } from 'cc';
import { Wood } from "./Wood";
import { Level_design } from "./Level_design";
const { ccclass, property } = _decorator;

@ccclass('Apple')
export class Apple extends Component {

    @property({type: RigidBody2D})
    public BodyAnim: RigidBody2D|null = null;

    @property({type: Wood})
    public wood: Wood|null = null;

    angle: number;

    start() {
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }
    
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        if (otherCollider.tag == 1)
        {
            Level_design.Coin++;
            setTimeout(() => {
                this.node.destroy();
            }, 1);
        }
    }

    update(deltaTime: number) {
        let newPosition = new Vec3(85 * Math.cos((this.wood.node.eulerAngles.z + this.angle) * 3.14/180), 85 * Math.sin((this.wood.node.eulerAngles.z + this.angle) * 3.14/180), 0);
        this.node.position = newPosition;            
        this.node.setRotationFromEuler(new Vec3(0, 0, this.wood.node.eulerAngles.z + this.angle - 270));
    }
}


