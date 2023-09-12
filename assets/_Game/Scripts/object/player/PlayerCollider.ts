import { _decorator, BoxCollider, Component, ICollisionEvent, ITriggerEvent, Node } from 'cc';
import { PlayerController } from './PlayerController';
import { SoundManager } from '../../manager/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('PlayerCollider')
export class PlayerCollider extends Component {
    @property(BoxCollider)
    private collider: BoxCollider;
    @property(PlayerController)
    private controller: PlayerController;
    start() {
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onTriggerEnter(event: ITriggerEvent){
        this.controller.onDeath();
    }
}


