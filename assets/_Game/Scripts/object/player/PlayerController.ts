import { _decorator, BoxCollider, Component, director, EventTouch, Input, input, Node, Quat, RigidBody, Tween, tween, Vec2, Vec3} from 'cc';
import Utilities from '../../helper/Utilities';
import { UIManager } from '../../manager/UIManager';
import { levelManager } from '../../manager/levelManager';
import { AudioType, SoundManager } from '../../manager/SoundManager';
import { GameManager, GameState } from '../../manager/GameManager';
import { Warning } from './Warning';
const { ccclass, property } = _decorator;

@ccclass('PlayerController')
export class PlayerController extends Component {

    private _isDead: boolean = false;

    private _speed: number = 25;
    private _maxDistance: number = 4.8;
    private _moveDistance: number;
    private _isMoving: boolean = false;

    private _readyJump: boolean = true;

    private _turnTime: number = 0.2;

    private _curPos: Vec3 = new Vec3();
    // the difference in position of the current frame movement during each jump
    public _deltaPos: Vec3 = new Vec3(0, 0, 0);
    // target position of the character
    private _targetPos: Vec3 = new Vec3();

    public _direction: Vec3 = new Vec3(1,0,0);

    private isFall: boolean = false;

    private frontDir: Vec3 = new Vec3(1,0,0);

    private soundCd: number = 3;
    private curSoundCd: number = 0;

    private curCd: number = 0;
    

    @property(RigidBody)
    private rb: RigidBody = null;

    @property(BoxCollider)
    private colider: BoxCollider = null;

    @property(Warning)
    private warning: Warning;

    protected start(): void {
        this.onInit();
    }
    
    onInit(){
        this._isDead = false;
        this.scaleY(1);
        this.node.setPosition(-20,3,10);
        this._direction.set(1,0,0);
        this.rb.linearDamping = 0.1;

        this.rb.enabled = true;
        this.colider.enabled = true;
        
        this._moveDistance = 0;
        this._readyJump = true;

        this.resetCd();
    }

    onStart() {        
        input.on(Input.EventType.TOUCH_START, this.onTouchBegan, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        this.startJump();
        this.turnTo(this._direction);
    }

    update(deltaTime: number) {
        if(this._isMoving) this.move(deltaTime);  
        
        if(this.node.position.y < -10){
            this.isFall = true;
            this.onDeath();
        }
        
        if(GameManager.Ins.isState(GameState.Playing)){
            this.curSoundCd -= deltaTime;  
            this.curCd -= deltaTime;
            // console.log(this.curCd);
            if(this.curCd < -8) this.warning.onStart();
            else this.warning.onPause();

            if(this.curCd < -10) levelManager.Ins.onEndByEagle();
        }
    }

//di chuyển -----------------------------------------------------------

    private startJump(){
        if(this._readyJump){
            if(this.curSoundCd < 0){
                SoundManager.Ins.PlayClip(AudioType.FX_Chicken);
                this.curSoundCd = this.soundCd;
            }

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
            // Vec3.moveTowards(this._curPos, this._curPos, this._deltaPos, 10);
            // this.rb.applyForce(this._deltaPos, this.node.position);
        }
        else{
            if(!this._readyJump){
                this._deltaPos.set(0,0,0);
                this._isMoving = false;
                if(this._direction.equals(this.frontDir))

                tween(this.node.scale)
                    .to(0.2, {y : 0.8})
                    .call(() => {
                        this.scaleY(1);
                    })
                    .start();
            }      
        }
    }

    resetJump(){
        this._readyJump = true;
        // if(this._direction.equals(this.frontDir)){
        //     this.curCd = 0;
        // }
    }

    resetCd(){
        this.curCd = 0;
    }

//-----------------------------------------------



//Điều khiển nhân vật  --------------------------------------------------------

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
    
            const touchOffsetX = endTouchPos.x - this.touchPosition.x;
            const touchOffsetY = endTouchPos.y - this.touchPosition.y;
            
    
            this.scaleY(1);
    
            if(Math.abs(touchOffsetX) <= 50) {
                if((touchOffsetY) < -50){
                    this._direction.set(-1,0,0);
                    this.turnTo(this.BACK);
                }
                else{
                    this._direction.set(1,0,0)
                    this.turnTo(this.FRONT);
                }
            }
            else {
                const offset = (touchOffsetX / Math.abs(touchOffsetX));
                this._direction.set(0,0,offset);
    
    
                // Tính toán góc quay dựa trên touchOffsetX
                const rotationAngle = -90 * offset;
                
                // Lấy góc quay hiện tại của player
                const curRotation = this.node.eulerAngles;
                
                this.turnTo(this.SIDE.set(0,rotationAngle,0))
                
            }
            
            this.startJump();         
        }
    }
//-----------------------------------------------------------------
    
    private FRONT: Vec3 = new Vec3(0,0,0);
    private SIDE: Vec3 = new Vec3(0,0,1);
    private BACK: Vec3 = new Vec3(0,180,0);
    private turnTo(dir: Vec3){
        tween(this.node)
        .to(this._turnTime, { eulerAngles: (dir) })
        .start();
    }

    public scaleY(scale: number){
        tween(this.node.scale)
        .to(0.1, {y : scale})
        .start();
    }

    public goBack(v3 : Vec3){
        this._direction.x *= -1;
        this._direction.z *= -1;
    }

    disableControl (){
        input.off(Input.EventType.TOUCH_START);
        input.off(Input.EventType.TOUCH_END);
    }

    onDeath(){
        if(!this._isDead){
            SoundManager.Ins.PlayClip(AudioType.FX_Chicken_Dead)
            this._isDead = true;

            this.disableControl();
            // Tween.stopAll();

            this._isMoving = false;
            if(!this.isFall) {
                this._curPos.y = 0.05;
                this.node.setPosition(this._curPos);
            }    

            this.node.scale.set(1.2,.15,1.2);
            this.rb.linearDamping = 1;

            this.rb.enabled = false;
            this.colider.enabled = false;

            levelManager.Ins.onEnd();
        }
    }
}


