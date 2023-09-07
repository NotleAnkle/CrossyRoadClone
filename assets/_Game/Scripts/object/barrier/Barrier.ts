import { _decorator, BoxCollider, Component, ICollisionEvent, Node, Vec3} from 'cc';
import { PlayerController } from '../player/PlayerController';
import { PoolMember } from '../../Pool/PoolMember';
const { ccclass, property } = _decorator;



@ccclass('Barrier')
export class Barrier extends PoolMember {

    @property(BoxCollider)
    private collider : BoxCollider = null;

    private _curPos: Vec3 = new Vec3();

    start() {
        this.node.getPosition(this._curPos);
        this.collider.on('onCollisionEnter', this.onCollision, this);
    }

    
    private onCollision(event: ICollisionEvent) {
        
        if(event.otherCollider.node.layer == 1){
            const player =  event.otherCollider.getComponent(PlayerController);
            player.goBack(this.node.position);
        }

    }
}


