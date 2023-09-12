import { _decorator, BoxCollider, Component, director, ICollisionEvent, Node, RigidBody, tween, Vec3 } from 'cc';
import { MovingObject } from './MovingObject';
import { PlayerController } from '../player/PlayerController';
import { levelManager } from '../../manager/levelManager';
const { ccclass, property } = _decorator;

@ccclass('Log')
export class Log extends MovingObject {
    @property(BoxCollider)
    private collider : BoxCollider = null;

    private isCounted: boolean = false;

    private rb: RigidBody;

    start() {
        this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
        this.collider.on('onCollisionExit', this.onCollisionExit, this);
        this.node.getPosition(this._curPos);

        this.rb = this.node.getComponent(RigidBody);
        this.rb.angularDamping = 1;
        this.rb.linearDamping = 1;
    }

    public OnInit(): void {
        this.isCounted = false;
    }

    onCollisionEnter(event: ICollisionEvent){
        if(event.otherCollider.node.layer == 1){
            // const player = event.otherCollider.node;
            // this.node.getPosition(this._curPos);

            // console.log(player.getWorldPosition(), player.getPosition());

            // player.setParent(this.node, true);
 
            // console.log(player.getWorldPosition(), player.getPosition());

            if(!this.isCounted){
                levelManager.Ins.increasingScore();
                this.floatUpAndDown();
                this.isCounted = true;

            }
            levelManager.Ins.player.resetJump();
            tween(event.otherCollider.node.position)
            .to(0.05,{x: this.node.position.x})
            .start();
        }
    }

    onCollisionExit(event: ICollisionEvent){
        if(event.otherCollider.node.layer == 1){
            // event.otherCollider.node.setParent(director.getScene());
        }
    }

    floatUpAndDown(){
        tween(this.node.position)
            .to(0.1,{y : this._curPos.y - 0.5})
            .call(() => {
                tween(this.node.position)
                .to(0.1,{y : this._curPos.y})
                .start()
            })
            .start();
    }
}


