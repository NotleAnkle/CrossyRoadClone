import { _decorator, CCFloat, Component, Node, tween, Vec3 } from 'cc';
import { PoolMember } from '../../Pool/PoolMember';
const { ccclass, property } = _decorator;

@ccclass('MovingObject')
export class MovingObject extends PoolMember {

    _curPos: Vec3 = new Vec3(0,0,0);
    _direction: number = 1;
    
    @_decorator.property({
        type: CCFloat
    })
    limitZ = 50;    
    @_decorator.property({
        type: CCFloat
    })
    defaultSpeed = 20;

    private speed: number;
    
    protected onLoad(): void {
        this.node.getPosition(this._curPos);
        this.speed = this.defaultSpeed;
    }

    onInit(direction: number, speed : number){
        this._direction = direction;
        if(direction == -1){
            this.node.eulerAngles = new Vec3(0,180,0);
        }
        this.speed += speed;
        this.node.getPosition(this._curPos);
    }

    public OnInit(): void {
        this.speed = this.defaultSpeed;
    }

    update(deltaTime: number) {
        this._curPos.z += this.speed * deltaTime * this._direction;

        if(Math.abs(this._curPos.z) >= Math.abs(this.limitZ * this._direction)) 
            this._curPos.z = -this.limitZ * this._direction;

        this.node.setPosition(this._curPos);
    }
}


