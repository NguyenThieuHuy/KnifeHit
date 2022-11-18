import { _decorator, Component, Node, randomRangeInt, director, RichText } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Level_design')
export class Level_design extends Component {
    
    @property({type: RichText})
    public info: RichText|null = null;

    @property({type: RichText})
    public point: RichText|null = null;
    
    @property({type: RichText})
    public message: RichText|null = null;

    public static Level:number = 1;
    public static Coin:number = 0;
    public static Point:number;
    public static KnifeNum:number;
    public static AppleNum:number;

    currLevel:number;

    start() {
        if(Level_design.Level % 3 == 0){
            if(Level_design.Level >= 15){        
                Level_design.Point = 20;
                Level_design.KnifeNum = 5;
                Level_design.AppleNum = 3;
            }else{
                Level_design.Point = randomRangeInt(5, 5 + (Level_design.Level / 2));
                Level_design.KnifeNum = randomRangeInt(3,5);
                Level_design.AppleNum = randomRangeInt(1,3);
            }
        }else{
            if(Level_design.Level >= 10){        
                Level_design.Point = 10;
                Level_design.KnifeNum = 3;
                Level_design.AppleNum = randomRangeInt(0,2);
            }else{
                Level_design.Point = randomRangeInt(3, 3 + (Level_design.Level / 2));
                Level_design.KnifeNum = randomRangeInt(1,Level_design.Level/5);
                Level_design.AppleNum = randomRangeInt(0,3);
            }
        }

        this.currLevel = Level_design.Level;

    }

    update(deltaTime: number) {
        this.info.string = "<color=#FFD700>Level: </color>"+Level_design.Level+"<br/><color=#ff0000>Apple: </color>"+Level_design.Coin;
        this.point.string = "<b><color=#0000>"+Level_design.Point+"</color></b>";
        if(Level_design.Level % 3 == 0){
            this.message.string = "<b><color=#00ff00>BOSS</color> <color=#0fffff>FIGHT</color></b>";
        }

        if(Level_design.Point <= 0){
            director.loadScene("main");
            Level_design.Level = this.currLevel + 1;
        }
    }
}


