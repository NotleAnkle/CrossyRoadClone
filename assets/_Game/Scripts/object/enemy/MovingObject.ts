import { _decorator, CCFloat, Component, Node, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MovingObject')
export class MovingObject extends Component {

    _curPos: Vec3 = new Vec3(0,0,0);
    _direction: number = 1;
    
    @_decorator.property({
        type: CCFloat
    })
    limitZ = 50;    
    @_decorator.property({
        type: CCFloat
    })
    speed = 20;
    
    protected start(): void {
        this.node.getPosition(this._curPos);
    }

    onInit(direction: number){
        this._direction = direction;
        
    }

    update(deltaTime: number) {
        this._curPos.z += this.speed * deltaTime * this._direction;

        if(Math.abs(this._curPos.z) >= Math.abs(this.limitZ * this._direction)) 
            this._curPos.z = -this.limitZ * this._direction;

        this.node.setPosition(this._curPos);
    }
}


