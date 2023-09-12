import { _decorator, BoxCollider, Component, ITriggerEvent, Node } from 'cc';
import { Enemy } from '../enemy/Enemy';
const { ccclass, property } = _decorator;

@ccclass('SoundDetector')
export class SoundDetector extends Component {
    @property(BoxCollider)
    private collider: BoxCollider;

    start() {
        this.collider.on('onTriggerEnter', this.onTriggerEnter, this);
    }

    onTriggerEnter(event: ITriggerEvent){  
    }
}


