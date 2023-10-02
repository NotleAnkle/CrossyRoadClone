import { _decorator, BoxCollider, Component, ICollisionEvent, ITriggerEvent, Node, Vec3 } from 'cc';
import { levelManager } from '../../manager/levelManager';
const { ccclass, property } = _decorator;

@ccclass('HightScoreLine')
export class HightScoreLine extends Component {
    private score: number;
    private _curPos: Vec3 = new Vec3(0,0,0);

    @property(BoxCollider)
    collider: BoxCollider;
    start() {
        this.collider.on('onCollisionEnter', this.onCollision, this);
        this.onInit();
    }

    onInit(){
        this.node.active = true;
        this.node.getPosition(this._curPos);
        this.score = parseInt(localStorage.getItem("score"));
        this._curPos.x = this.score* 5  + -15;
        
        this.node.setPosition(this._curPos);
    }

    private onCollision (event: ICollisionEvent) {
        this.node.active = false;        
    }
}


