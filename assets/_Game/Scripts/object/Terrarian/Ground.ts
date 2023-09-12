import { _decorator, BoxCollider, Component, ICollisionEvent, Node, tween, Vec3 } from 'cc';
import { levelManager } from '../../manager/levelManager';
import { PoolMember } from '../../Pool/PoolMember';
import Utilities from '../../helper/Utilities';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends PoolMember {

    private isCounted: boolean = false;

    public start () {
        let collider = this.node.getComponent(BoxCollider);
        // Listening to 'onCollisionStay' Events
        collider.on('onCollisionEnter', this.onCollision, this);
    }

    public OnInit(): void {
        this.isCounted = false;
    }

    onInit(){
        let pos = this.node.getPosition();
        pos.z = Utilities.randomWithStep(-10,20,5);
        this.node.setPosition(pos);
    }
    
    private onCollision (event: ICollisionEvent) {
        if(event.otherCollider.node.layer == 1){
            if(!this.isCounted){
                levelManager.Ins.increasingScore();
                this.isCounted = true;
            }
            levelManager.Ins.player.resetJump();
            // tween(event.otherCollider.node.position)
            // .to(0.01,{x: this.node.position.x})
            // .start();
        }
    }
}


