import { _decorator, BoxCollider, Component, ICollisionEvent, Node } from 'cc';
import { AudioType, SoundManager } from '../../manager/SoundManager';
import SimplePool from '../../Pool/SimplePool';
import { PoolMember } from '../../Pool/PoolMember';
const { ccclass, property } = _decorator;

@ccclass('Apple')
export class Apple extends PoolMember {
    @property(BoxCollider)
    collider: BoxCollider;

    start() {
        this.collider.on('onCollisionEnter', this.onCollision, this);
    }

    private onCollision(event: ICollisionEvent) {
        console.log("Táo ăn cho vui thôi chứ k có thưởng đâu");
        SoundManager.Ins.PlayClip(AudioType.FX_Apple);
        SimplePool.despawn(this)
    }
}


