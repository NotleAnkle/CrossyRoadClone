import { _decorator, BoxCollider, Component, ICollisionEvent, Node, Vec2, Vec3 } from 'cc';
import { PlayerController } from '../player/PlayerController';
import { levelManager } from '../../manager/levelManager';
import { AudioType, SoundManager } from '../../manager/SoundManager';
const { ccclass, property } = _decorator;

@ccclass('Eagle')
export class Eagle extends Component {
    private _curPos: Vec3;
    private _tagPos: Vec3;
    private _speed: number = 100;
    private _speedY: number = 1;

    @property(PlayerController)
    player: PlayerController;

    // @property(BoxCollider)
    // collider: BoxCollider;
    // start() {
    //     this.collider.on('onCollisionEnter', this.onCollisionEnter, this);
    // }

    // onCollisionEnter(event: ICollisionEvent){
    //     const player = event.otherCollider.node;
    //     if(player.layer == 1){
    //         event.otherCollider.node.setParent(this.node, true);
    //     }
    // }

    protected onEnable(): void {
        SoundManager.Ins.PlayClip(AudioType.FX_Eagle);
        this.player.disableControl();
        this._curPos = this.node.getPosition();
        this._tagPos = this.player.node.getPosition();

        this._curPos.x = this._tagPos.x + 60;
        this._curPos.z = this._tagPos.z;
        this.node.setPosition(this._curPos);

        this._speedY = (this._curPos.y - this._tagPos.y) * (this._speed) / (this._curPos.x - this._tagPos.x);
        
    }

    protected update(dt: number): void {
        this._curPos.x -= this._speed*dt;
        if(this._curPos.y > this._tagPos.y + 5)
            this._curPos.y -= this._speedY*dt;
        else this._curPos.y += this._speedY*dt;
        this.node.setPosition(this._curPos);

        if(this._curPos.x <= this._tagPos.x){
            // this.player.node.setPosition(this._curPos);
            this.player.node.active = false;
            SoundManager.Ins.PlayClip(AudioType.FX_Chicken_Dead);
            levelManager.Ins.onEnd();
        }
        if(this._curPos.x <= this._tagPos.x - 20) 
        {
            this.node.active = false;
        }
    }
}


