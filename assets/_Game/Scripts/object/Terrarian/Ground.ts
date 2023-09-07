import { _decorator, BoxCollider, Component, ICollisionEvent, Node } from 'cc';
import { levelManager } from '../../manager/levelManager';
const { ccclass, property } = _decorator;

@ccclass('Ground')
export class Ground extends Component {
    public start () {
        let collider = this.node.getComponent(BoxCollider);
        // Listening to 'onCollisionStay' Events
        collider.on('onCollisionEnter', this.onCollision, this);
    }
    
    private onCollision (event: ICollisionEvent) {
        if(event.otherCollider.node.layer == 1){
            levelManager.Ins.player.resetJump();
        }
    }
}


