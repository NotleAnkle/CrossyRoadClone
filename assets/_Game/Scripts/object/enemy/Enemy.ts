import { _decorator, BoxCollider, CCFloat, CCInteger, Collider, Component, director, ICollisionEvent, Node, Vec3 } from 'cc';
import { MovingObject } from './MovingObject';
const { ccclass, property } = _decorator;

@ccclass('Enemy')
export class Enemy extends MovingObject {

    @property(BoxCollider)
    private collider : BoxCollider = null;
    


    start() {
        this.node.getPosition(this._curPos);
        this.collider.on('onCollisionEnter', this.onCollision, this);
    }

    private onCollision(event: ICollisionEvent) {
        if(event.otherCollider.node.layer == 1){

            event.otherCollider.node.active  = false;
        }

    }
}


