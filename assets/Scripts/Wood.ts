
import { _decorator, Component, Node, Vec3, systemEvent, SystemEventType, EventKeyboard, macro, Prefab, instantiate, RichText, RichTextComponent, animation, randomRange } from 'cc';
import { Knife } from "./Knife";
import { Apple } from "./Apple";
import { Level_design } from "./Level_design";
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Wood
 * DateTime = Sun Oct 24 2021 14:40:39 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Wood.ts
 * FileBasenameNoExtension = Wood
 * URL = db://assets/Wood.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Wood')
export class Wood extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({type: Prefab})
    public knifePrefab: Prefab|null = null;

    @property({type: Prefab})
    public applePrefab: Prefab|null = null;

    start () {
        // [3]
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);

        for (let i = 0; i < Level_design.KnifeNum; i++) {
            let newKnife = instantiate(this.knifePrefab);
            newKnife.parent = this.node.parent;
            newKnife.getComponent(Knife).angle = randomRange(0,-360);
            newKnife.getComponent(Knife).trangthai = 1;
            newKnife.getComponent(Knife).wood = this;
        
        }

        for (let i = 0; i < Level_design.AppleNum; i++) {
            let newApple = instantiate(this.applePrefab);
            newApple.parent = this.node.parent;
            newApple.getComponent(Apple).angle = randomRange(0,-360);
            newApple.getComponent(Apple).wood = this;
        
        }

    }

    update (deltaTime: number) {
    //     // [4]
        let newRotation = this.node.eulerAngles.z + 100 * deltaTime;
        this.node.eulerAngles = new Vec3(0, 0, newRotation);
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.a:
                let newKnife = instantiate(this.knifePrefab);
                newKnife.parent = this.node.parent;
                newKnife.position = new Vec3(0, -250, 0);
                newKnife.getComponent(Knife).wood = this;
                Level_design.Point--;
                break;
        }
    }

    onClickButton (event: CustomEvent) {
        console.log('click button');
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
