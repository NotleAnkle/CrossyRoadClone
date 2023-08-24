import { _decorator, Component, EventTouch, Input, input, Node, Quat, tween, Vec2, Vec3} from 'cc';
import Utilities from '../../helper/Utilities';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _speed: number = 10;
    private _maxDistance: number = 5;
    private _moveDistance: number;
    private _isMoving: boolean = false;

    private _readyJump: boolean = true;

    private _turnTime: number = 0.2;

    private _curPos: Vec3 = new Vec3();
    // the difference in position of the current frame movement during each jump
    private _deltaPos: Vec3 = new Vec3(0, 0, 0);
    // target position of the character
    private _targetPos: Vec3 = new Vec3();

    private _direction: Vec3 = new Vec3(0,0,0);
    
    start() {
        input.on(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(deltaTime: number) {
        if(this._isMoving) this.move(deltaTime);
    }

    private startJump(){
        
        if(this._readyJump){
            this._isMoving = true;

            this._readyJump = false;
   
            this._moveDistance = 0;
            this.node.getPosition(this._curPos);
            const moveVector = this._direction.clone();
            Vec3.add(this._targetPos, this._curPos, moveVector.multiplyScalar(this._maxDistance));
            
          } 
    }

    private move(deltaTime : number){
        if(this._moveDistance < this._maxDistance){
            this._moveDistance += this._speed*deltaTime;

            const moveVector = this._direction.clone();

            this._curPos.add(moveVector.multiplyScalar(this._speed*deltaTime));

            if(this._moveDistance < this._maxDistance/2){
                this._deltaPos.y = deltaTime * this._speed;
            } 
            else {
                this._deltaPos.y = -deltaTime * this._speed/1.5;
            }
            
            Vec3.add(this._curPos, this._curPos, this._deltaPos); 

            this.node.setPosition(this._curPos);
        }
        else{
            if(!this._readyJump){
                // this.node.setPosition(this._targetPos);   
                this._readyJump = true;
                this._deltaPos.set(0,0,0);
                this._isMoving = false;
                tween(this.node.scale)
                    .to(0.2, {y : 0.8})
                    .call(() => {
                        this.scaleY(1);
                    })
                    .start();
            }         
        }
    }

    private touchPosition: Vec2 = new Vec2();

    private onTouchBegan(event: EventTouch): void {
        // Lấy vị trí chạm tại điểm đầu tiên
        this.touchPosition = event.getLocation();

        if(this._readyJump){
            this.scaleY(0.6);
        }
    }

    private onTouchEnd(event: EventTouch) {
        if(this._readyJump){
            const endTouchPos = event.getLocation();
    
            const touchOffset = endTouchPos.x - this.touchPosition.x;
    
            this.scaleY(1);
    
            if(Math.abs(touchOffset) <= 5) {
                this._direction.set(1,0,0)
                this.turnTo(this.FRONT);
            }
            else {
                const offset = (touchOffset / Math.abs(touchOffset));
                this._direction.set(0,0,offset);
    
    
                // Tính toán góc quay dựa trên touchOffset
                const rotationAngle = -90 * offset;
                
                // Lấy góc quay hiện tại của player
                const curRotation = this.node.eulerAngles;
                
                this.turnTo(this.SIDE.set(0,rotationAngle,0))
                
            }
            
            this.startJump();

        }
    }
    
    private FRONT: Vec3 = new Vec3(0,0,0);
    private SIDE: Vec3 = new Vec3(0,0,1);
    private turnTo(dir: Vec3){
        tween(this.node)
        .to(this._turnTime, { eulerAngles: (dir) })
        .start();
    }

    private scaleY(scale: number){
        tween(this.node.scale)
        .to(0.1, {y : scale})
        .start();
    }
}


