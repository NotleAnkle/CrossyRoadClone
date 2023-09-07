import { _decorator, BoxCollider, Component, director, ICollisionEvent, Node } from 'cc';
import { MovingObject } from './MovingObject';
import { PlayerController } from '../player/PlayerController';
const { ccclass, property } = _decorator;

@ccclass('Log')
export class Log extends MovingObject {
    @property(BoxCollider)
    private collider : BoxCollider = null;

    start() {
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.on('onCollisionExit', this.onCollisionExit, this);
        this.node.getPosition(this._curPos);
    }

    onCollisionEnter(event: ICollisionEvent){
        if(event.otherCollider.node.layer == 1){
            // event.otherCollider.node.setParent(null);
            // event.otherCollider.node.setParent(this.node);
        }
    }
    onCollisionExit(event: ICollisionEvent){
        if(event.otherCollider.node.layer == 1){
            // event.otherCollider.node.setParent(null);
            // event.otherCollider.node.setParent(director.getScene());
        }
    }
}


